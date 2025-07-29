import db from "@/utils/firebase";
import { JobType } from "@/lib/parser";

const saveJobPosts = async (jobPosts: JobType[]) => {
  const batch = db.batch();

  jobPosts.forEach((jobPost) => {
    const jobPostRef = db.collection("job-posts").doc();
    batch.set(jobPostRef, jobPost);
  });

  await batch.commit();
};

export { saveJobPosts };
