import { parseJobPosts, JobType } from "@/lib/parser";
import { getRandomHeaders } from "@/utils/headers";
import { delay } from "@/utils/helper";
import { checkJobDate, getOnlyTodayJobs } from "@/utils/jobs";
import axios from "axios";

const BASE_URL = "https://www.onlinejobs.ph/jobseekers/jobsearch";

export async function GET() {
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

      await delay(1000);

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

      await delay(3000);
    } while (proceed);

    return Response.json({ jobs });
  } catch (err: any) {
    throw new Error(err);
  }
}
