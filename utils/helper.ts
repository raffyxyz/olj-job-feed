import { JobType } from "@/lib/parser";

type JobPostDate = "had-old" | "all-new" | "all-old";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getOnlyTodayJobs(jobs: JobType[]) {
  const yesterdayDate = "Jul 28, 2025";

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

export function checkJobDate(jobs: JobType[]): JobPostDate {
  const oldJobs = jobs.filter((job) => job.postedDate === "Jul 28, 2025");

  if (oldJobs.length === jobs.length) {
    return "all-old";
  }

  if (oldJobs.length < jobs.length && oldJobs.length !== 0) {
    return "had-old";
  }

  return "all-new";
}

export function getOnlyTheNewJobs(jobs: JobType[]): JobType[] {
  const newJobs = jobs.filter((job) => job.postedDate === "Jul 29, 2025");

  return newJobs;
}

export function checkLastJobFound(jobs: JobType[], title: string) {
  return jobs.findIndex((job) => job.title === title);
}
