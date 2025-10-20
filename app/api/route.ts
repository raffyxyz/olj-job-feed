import { getRandomHeaders } from "@/entities/axios";
import { checkJobDate, getOnlyTodayJobs, parseJobPosts } from "@/entities/job";
import { delay } from "@/shared/lib/delay";
import { JobType } from "@/shared/types";

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://www.onlinejobs.ph/jobseekers/jobsearch";

export async function GET(request: NextRequest) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.API_KEY}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let START_PAGE = 0;

  const jobs: JobType[] = [];

  let proceed = false;
  const headers = getRandomHeaders();

  try {
    do {
      const response = await axios.get(`${BASE_URL}/${START_PAGE}`, {
        headers,
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

    return Response.json({ jobs });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unknown error:", err);
    }
  }
}
