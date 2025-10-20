"use server";

import { JobType } from "@/shared/types";

export async function fetchJobs(): Promise<JobType[] | undefined> {
  console.log("API_ENDPOINT: ", process.env.API_ENDPOINT);
  console.log("API_KEY: ", process.env.API_KEY);
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/api`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    console.log("Response: ", response);

    const data = await response.json();

    console.log("Data: ", data);

    return data.jobs;
  } catch (err) {
    console.log("Error occured");
    console.log(err);
  }
}
