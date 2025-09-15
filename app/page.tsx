import { getJobPosts } from "@/lib/api/firestore/get-job-posts";
import { JobBoard } from "@/components/job-board";

export default async function Home() {
  const jobs = await getJobPosts();

  return <JobBoard data={jobs} />;
}
