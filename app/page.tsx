import { Suspense } from "react";
import { JobBoard } from "@/screens/job-board";

const Page = async () => {
  return (
    <Suspense>
      <JobBoard />
    </Suspense>
  );
};

export default Page;
