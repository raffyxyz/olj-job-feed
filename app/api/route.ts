import { parseJobPosts, JobType } from "@/lib/parser";

export const dynamic = "force-static";

const BASE_URL = "https://www.onlinejobs.ph/jobseekers/jobsearch";

export async function GET() {
  const response = await fetch(BASE_URL);
  const result = await response.text();

  const extractedJobs: JobType[] = parseJobPosts(result);

  return Response.json({ data: extractedJobs });
}
