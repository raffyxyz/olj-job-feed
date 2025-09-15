"use server";

import { Job, JobDocumentData } from "@/lib/types";
import db from "@/utils/firebase";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

// Helper function to convert Firestore document to Job object
function documentToJob(doc: QueryDocumentSnapshot<DocumentData>): Job {
  const data = doc.data() as JobDocumentData;

  return {
    id: doc.id,
    createdAt: data.createdAt,
    description: data.description,
    employmentType: data.employmentType,
    postedDate: data.postedDate,
    posterName: data.posterName,
    salary: data.salary,
    tags: data.tags || [], // Handle potential undefined arrays
    title: data.title,
    url: data.url,
  };
}

const getJobPosts = async (): Promise<Job[]> => {
  const snapshot = await db
    .collection("job-posts")
    .orderBy("createdAt", "asc")
    .get();

  if (snapshot.empty) {
    console.log("No jobs found.");
    return [];
  }

  const jobs: Job[] = [];
  snapshot.forEach((doc) => {
    jobs.push(documentToJob(doc));
  });

  return JSON.parse(JSON.stringify(jobs));
};

export { getJobPosts };
