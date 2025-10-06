import { saveJobPosts } from "@/lib/api/firestore";
import { getJobPosts } from "@/lib/api/firestore/get-job-posts";
import { parseJobPosts, JobType } from "@/lib/parser";
import { delay, checkLastJobFound, getDateYesterday } from "@/utils/helper";
import { checkJobDate } from "@/utils/jobs";

// export const dynamic = "force-static";

const BASE_URL = "https://www.onlinejobs.ph/jobseekers/jobsearch";
let START_PAGE = 0;

export async function GET() {
  try {
    let lastJobIndex: number = -1;
    const jobs: JobType[] = [];

    do {
      const response = await fetch(`${BASE_URL}/${START_PAGE}`);
      const result = await response.text();

      const jobPosts: JobType[] = parseJobPosts(result);

      const jobDate = checkJobDate(jobPosts);

      return Response.json({ date: jobDate });
    } while (false);

    // do {
    //   // Get the last job from firebase.
    //   const lastJob = await getJobPosts();
    //   console.log("Last job: ", lastJob[0]?.title);

    //   // Fetch a request to onlinejobs posting.
    //   console.log("Fetching from onlinejobs...");
    //   const response = await fetch(`${BASE_URL}/${START_PAGE}`);
    //   const result = await response.text();

    //   // Parse job posts.
    //   console.log("Parsing job posts...");
    //   const jobPosts: JobType[] = parseJobPosts(result);

    //   lastJobIndex = checkLastJobFound(jobPosts, lastJob[0]?.title);

    //   console.log("LastJobIndex: ", lastJobIndex);

    //   if (lastJobIndex < 0) {
    //     console.log("Checking for job date...");
    //     const jobDate = checkJobDate(jobPosts);
    //     if (jobDate === "all-new") {
    //       console.log("Jobs are all new...");
    //       // Copy all no changes needed.
    //       jobs.push(...jobPosts);

    //       await saveJobPosts(jobPosts);
    //     } else if (jobDate === "had-old") {
    //       console.log("Jobs have old date");
    //       // Don't copy the old jobs.
    //       const newJobs = getOnlyTheNewJobs(jobPosts);
    //       jobs.push(...newJobs);

    //       await saveJobPosts(newJobs);
    //     } else if (jobDate === "all-old") {
    //       console.log("Jobs are all old stopping...");
    //       // Stop the process.
    //       break;
    //     }

    //     console.log("Last job is not found yet..");

    //     console.log("Adding 2 seconds delay...");
    //     await delay(2000);

    //     console.log("Iterating start page...");
    //     START_PAGE += 30;
    //   } else {
    //     console.log("Last job is found at index: ", lastJobIndex);

    //     console.log("Slicing the job posts from the last index...");
    //     const slicedJobPosts = jobPosts.slice(0, lastJobIndex);
    //     jobs.push(...slicedJobPosts);

    //     console.log("Saving sliced data to database...");
    //     await saveJobPosts(slicedJobPosts);
    //   }
    // } while (lastJobIndex < 0);

    // return Response.json({ totalJobs: jobs.length, jobs: jobs });
  } catch (err: any) {
    throw new Error(err);
  }
}
