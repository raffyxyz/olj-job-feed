import { JobType } from "@/shared/types";

export const jobApi = {
  getJobs: async (): Promise<JobType[]> => {
    const response = await fetch("/api/jobs");

    const data = await response.json();

    return data.jobs;
  },
};
