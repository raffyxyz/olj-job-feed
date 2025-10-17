import { JobDocumentData } from "@/shared/types";
import { JobBoard } from "@/screens/job-board";

const fetchJobPosting = async (): Promise<JobDocumentData[]> => {
  const response = await fetch(`${process.env.API_ENDPOINT}/api`, {});

  const data = await response.json();

  return data.jobs;
};

const Page = async () => {
  const jobs = await fetchJobPosting();

  return <JobBoard data={jobs} />;
};

export default Page;
