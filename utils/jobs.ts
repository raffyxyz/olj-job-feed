import { JobType } from "@/lib/parser";
import { getDateYesterday } from "./helper";

type JobPostDate = "had-old" | "all-new" | "all-old";

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
