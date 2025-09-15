"use client";

import { JobDocumentData } from "@/lib/types";
import { Card, Text } from "@mantine/core";

const JobCard = ({ job }: { job: JobDocumentData }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500}>{job.title}</Text>
    </Card>
  );
};

export { JobCard };
