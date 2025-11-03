import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/query-keys";
import { jobApi } from "../api/job-api";

export const useJobsQuery = (date?: string) => {
  return useQuery({
    queryKey: date ? queryKeys.jobs.job_history(date) : queryKeys.jobs.all(),
    queryFn: () => (date ? jobApi.getJobsHistory(date) : jobApi.getJobs()),
    staleTime: 5 * 60 * 1000,
  });
};
