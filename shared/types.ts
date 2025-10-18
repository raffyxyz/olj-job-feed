interface JobType {
  title: string;
  url: string | undefined;
  posterName: string;
  postedDate: string;
  salary: string | number;
  description: string;
  tags: string[];
  employmentType: string;
  createdAt: number;
}

export type { JobType };
