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

export function checkLastJobFound(jobs: JobType[], title: string) {
  return jobs.findIndex((job) => job.title === title);
}
