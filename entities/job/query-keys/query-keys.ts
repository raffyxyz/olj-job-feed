export const queryKeys = {
  jobs: {
    all: () => ["jobs"],
    job_history: (date: string) => ["job-history", date],
  },
} as const;
