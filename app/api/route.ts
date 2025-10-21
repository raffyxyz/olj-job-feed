import { NextResponse } from "next/server";

export async function GET() {
  console.log("ENDPOINT: ", process.env.API_ENDPOINT);
  console.log("BEARER TOKEN: ", process.env.BEARER_TOKEN);
  try {
    if (!process.env.API_ENDPOINT || !process.env.BEARER_TOKEN) {
      console.error("Missing environment variables:", {
        hasApiEndpoint: !!process.env.API_ENDPOINT,
        hasBearerToken: !!process.env.BEARER_TOKEN,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(`${process.env.API_ENDPOINT}/api/jobs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(
        "API request failed:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data.jobs);
  } catch (error) {
    console.error("Error in GET /api/route: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
