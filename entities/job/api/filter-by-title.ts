import { JobDocumentData } from "@/shared/types";

export const FilterByTitle = (
  jobs: JobDocumentData[],
  filterKeywords: string[]
) => {
  if (!filterKeywords || filterKeywords.length === 0) return jobs;

  const keywords = filterKeywords.map((k) => k.toLowerCase().trim());

  return jobs.filter((job) => {
    const titleText = job.title.toLowerCase();

    return keywords.some((keyword) => titleText.includes(keyword));
  });
};
