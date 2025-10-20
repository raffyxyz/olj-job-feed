import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/query-keys";
import { fetchJobs } from "../api/fetch-jobs";

export const useJobsQuery = () => {
  return useQuery({
    queryKey: queryKeys.jobs.all(),
    queryFn: () => fetchJobs(),
    staleTime: 5 * 60 * 1000,
  });
};
