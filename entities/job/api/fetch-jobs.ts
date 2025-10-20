"use server";

import { JobType } from "@/shared/types";

export async function fetchJobs(): Promise<JobType[] | undefined> {
  console.log("API_ENDPOINT: ", process.env.API_ENDPOINT);
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/api`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    const data = await response.json();

    return data.jobs;
  } catch (err) {
    console.log("Error occured");
    console.log(err);
  }
}
