import { formatDate } from "@/shared/lib";
import { getDateYesterday } from "@/shared/lib";
import { JobType } from "@/shared/types";

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

// Get only the job post that have date today.
export function getOnlyTodayJobs(jobs: JobType[]) {
  const today = formatDate(new Date());

  return jobs.filter((item) => item.postedDate === today);
}
