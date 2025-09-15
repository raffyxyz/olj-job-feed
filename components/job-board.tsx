"use client";

import { Container, Grid } from "@mantine/core";
import { JobCard } from "./ui/job-card";
import { JobDocumentData } from "@/lib/types";

const JobBoard = ({ data }: { data: JobDocumentData[] }) => {
  return (
    <Container size="lg" p={"md"}>
      <Grid>
        {data.map((job, index) => (
          <Grid.Col key={index} span={4}>
            <JobCard job={job} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export { JobBoard };
