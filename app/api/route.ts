import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(`${process.env.API_ENDPOINT}/api/jobs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });

  const data = await response.json();

  return NextResponse.json(data.jobs);
}
