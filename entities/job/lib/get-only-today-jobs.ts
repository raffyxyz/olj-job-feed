import { formatDate } from "@/shared/lib/";
import { JobType } from "@/shared/types";

// Get only the job post that have date today.
export function getOnlyTodayJobs(jobs: JobType[]) {
  const today = formatDate(new Date());

  return jobs.filter((item) => item.postedDate === today);
}
