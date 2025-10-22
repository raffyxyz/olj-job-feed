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

  const jobs: JobType[] = [];

  let proceed = false;

  try {
    do {
      const response = await axios.get(`${BASE_URL}/${START_PAGE}`, {
        headers: browserHeaders,
      });

      if (response.status === 200) {
        console.log("Scraping OK!");
      } else {
        console.log("Error: ", response.status);
        console.log(response.data);
      }

      const jobPosts: JobType[] = parseJobPosts(response.data);

      const jobDate = checkJobDate(jobPosts);

      // All new proceed to the next page.
      if (jobDate === "all-new") {
        jobs.push(...jobPosts);
        START_PAGE += 30;
        proceed = true;
      }
      // Had old get only the new job post.
      if (jobDate === "had-old") {
        const newPostingOnly = getOnlyTodayJobs(jobPosts);
        jobs.push(...newPostingOnly);
        START_PAGE += 30;
        proceed = true;
      }
      // All Old end to process.
      if (jobDate === "all-old") proceed = false;

      await delay(1000);
    } while (proceed);

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
