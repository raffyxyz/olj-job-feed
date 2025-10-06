import { JobType } from "@/lib/parser";

type JobPostDate = "had-old" | "all-new" | "all-old";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date: Date) {
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatted;
}

export function getDateYesterday() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  return formatDate(yesterday);
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

export function checkLastJobFound(jobs: JobType[], title: string) {
  return jobs.findIndex((job) => job.title === title);
}
