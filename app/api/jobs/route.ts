import { getBrowserHeaders } from "@/entities/axios";
import { checkJobDate, getOnlyTodayJobs, parseJobPosts } from "@/entities/job";
import { delay } from "@/shared/lib/delay";
import { JobType } from "@/shared/types";

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { corsCheck } from "@/shared/lib/cors-check";

const BASE_URL = "https://www.onlinejobs.ph/jobseekers/jobsearch";

export async function GET(request: NextRequest) {
  // Use the client's headers instead of creating a random one.
  const browserHeaders = getBrowserHeaders(request);

  // Check cors.
  const { allowed, origin } = corsCheck(request);
  if (!allowed) {
    return NextResponse.json(
      { error: "Access forbidden: Invalid origin" },
      { status: 403 }
    );
  }

  let START_PAGE = 0;
  const CONCURRENT_REQUESTS = 3; // Number of pages to fetch concurrently
  const PAGE_INCREMENT = 30;

  const jobs: JobType[] = [];
  let proceed = true;

  try {
    while (proceed) {
      // Create array of page numbers to fetch concurrently
      const pagesToFetch = Array.from(
        { length: CONCURRENT_REQUESTS },
        (_, index) => START_PAGE + index * PAGE_INCREMENT
      );

      console.log(`Fetching pages: ${pagesToFetch.join(", ")}`);

      // Make concurrent requests
      const responses = await Promise.allSettled(
        pagesToFetch.map((pageNumber) =>
          axios.get(`${BASE_URL}/${pageNumber}`, {
            headers: browserHeaders,
          })
        )
      );

      // Process responses
      let shouldContinue = false;
      let allPagesOld = true;

      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];

        if (response.status === "fulfilled") {
          const axiosResponse = response.value;

          if (axiosResponse.status === 200) {
            console.log(`Scraping OK for page ${pagesToFetch[i]}!`);

            const jobPosts: JobType[] = parseJobPosts(axiosResponse.data);
            const jobDate = checkJobDate(jobPosts);

            // All new proceed to the next page.
            if (jobDate === "all-new") {
              jobs.push(...jobPosts);
              shouldContinue = true;
              allPagesOld = false;
            }
            // Had old get only the new job post.
            else if (jobDate === "had-old") {
              const newPostingOnly = getOnlyTodayJobs(jobPosts);
              jobs.push(...newPostingOnly);
              shouldContinue = true;
              allPagesOld = false;
            }
            // All Old end to process.
            else if (jobDate === "all-old") {
              // This page is all old, but we need to check all pages in the batch
            }
          } else {
            console.log(
              `Error for page ${pagesToFetch[i]}:`,
              axiosResponse.status
            );
            console.log(axiosResponse.data);
            allPagesOld = false; // Treat errors as non-old to continue
          }
        } else {
          console.error(
            `Failed to fetch page ${pagesToFetch[i]}:`,
            response.reason
          );
          allPagesOld = false; // Treat errors as non-old to continue
        }
      }

      // Only stop if ALL pages in the batch are old (matching original behavior)
      if (allPagesOld && !shouldContinue) {
        proceed = false;
      } else if (shouldContinue) {
        START_PAGE += CONCURRENT_REQUESTS * PAGE_INCREMENT;
        // Add delay between batches to avoid rate limiting
        await delay(1000);
      } else {
        proceed = false;
      }
    }

    return NextResponse.json({
      status: 200,
      headers: origin
        ? {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Credentials": "true",
          }
        : {},
      jobs,
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      {
        status: 500,
        headers: origin
          ? {
              "Access-Control-Allow-Origin": origin,
            }
          : {},
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const { allowed, origin } = corsCheck(request);

  if (!allowed || !origin) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // 24 hours
    },
  });
}
