import { JobBoard } from "@/components/job-board";
import { JobDocumentData } from "@/lib/types";

const fetchJobPosting = async (): Promise<JobDocumentData[]> => {
  const response = await fetch(`${process.env.API_ENDPOINT}/api`, {
    // cache: "force-cache",
  });

  const data = await response.json();

  return data.jobs;
};

export default async function Home() {
  const jobs = await fetchJobPosting();

  return <JobBoard data={jobs} />;
}
