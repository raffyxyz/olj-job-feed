import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { corsCheck } from "@/shared/lib/cors-check";
import { getDatabase } from "@/shared/lib/mongodb";

const getCachedJobs = unstable_cache(
  async (date) => {
    const db = await getDatabase();
    const jobPostCollection = db.collection("jobs");

    const jobPost = await jobPostCollection
      .find({ postedDate: date })
      .toArray();

    return jobPost;
  },
  ["job-history-cache"],
  {
    revalidate: false, // never revalidate
    tags: ["job-history"], // optional: for manual revalidation if needed
  },
);

export async function GET(request: NextRequest) {
  const { allowed, origin } = corsCheck(request);
  if (!allowed) {
    return NextResponse.json(
      { error: "Access forbidden: Invalid origin" },
      { status: 403 },
    );
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter required" },
      { status: 400 },
    );
  }

  const jobPost = await getCachedJobs(date);

  return NextResponse.json({
    status: 200,
    headers: origin
      ? {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Credentials": "true",
        }
      : {},
    jobs: jobPost,
  });
}
