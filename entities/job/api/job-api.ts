import { JobType } from "@/shared/types";

export const jobApi = {
  getJobs: async (): Promise<JobType[]> => {
    const response = await fetch("/api/jobs", { next: { revalidate: 60 } });

    const data = await response.json();

    return data.jobs;
  },
};
