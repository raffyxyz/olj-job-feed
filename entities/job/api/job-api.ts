import { JobType } from "@/shared/types";

export const jobApi = {
  getJobs: async (): Promise<JobType[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
      {}
    );

    const data = await response.json();

    return data.jobs;
  },
};
