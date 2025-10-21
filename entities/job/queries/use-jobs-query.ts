import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/query-keys";
import { jobApi } from "../api/job-api";

export const useJobsQuery = () => {
  return useQuery({
    queryKey: queryKeys.jobs.all(),
    queryFn: () => jobApi.getJobs(),
    staleTime: 5 * 60 * 1000,
  });
};
