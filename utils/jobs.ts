import { JobType } from "@/lib/parser";
import { getDateYesterday, formatDate } from "./helper";

type JobPostDate = "had-old" | "all-new" | "all-old";

// Checks if a scanned job posting are all new, all old or had old.
export function checkJobDate(jobs: JobType[]): JobPostDate {
  const yesterdayDate = getDateYesterday();

  const oldJobs = jobs.filter((job) => job.postedDate === yesterdayDate);

  if (oldJobs.length === jobs.length) {
    return "all-old";
  }

  if (oldJobs.length < jobs.length && oldJobs.length !== 0) {
    return "had-old";
  }

  return "all-new";
}

export function getOnlyTodayJobs(jobs: JobType[]) {
  const yesterdayDate = getDateYesterday();

  console.log("Yesterday date: ", yesterdayDate);

  // Scan through the array to find where all remaining jobs are yesterday
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].postedDate === yesterdayDate) {
      console.log("Found old date..");
      // Found a yesterday job, check if all remaining are yesterday
      const remainingJobs = jobs.slice(i);
      const allRemainingAreYesterday = remainingJobs.every(
        (job) => job.postedDate === yesterdayDate
      );

      if (allRemainingAreYesterday) {
        // This is our cutoff point - slice here
        return jobs.slice(0, i);
      }
      // If not all remaining are yesterday, continue scanning
      console.log("Not all remaining, continue scanning...");
    }
  }

  // No cutoff point found, return all jobs
  return jobs;
}

export function getOnlyTodayJobsV1(jobs: JobType[]) {
  const today = formatDate(new Date());

  return jobs.filter((item) => item.postedDate === today);
}
