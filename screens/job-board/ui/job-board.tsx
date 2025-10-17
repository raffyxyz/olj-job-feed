"use client";

import { FilterByTitle } from "@/entities/job";
import { JobDocumentData } from "@/shared/types";
import { JobBoardHeader } from "@/widgets/header";
import { JobCard } from "@/widgets/job-card";
import { JobFiltersPanel } from "@/widgets/job-filters-panel";
import { Container, Grid } from "@mantine/core";
import { useMemo, useState } from "react";

export const JobBoard = ({ data }: { data: JobDocumentData[] }) => {
  const [filters, setFilters] = useState<string[]>([]);

  const filteredJobs = useMemo(() => FilterByTitle(data, filters), [filters]);

  return (
    <Container size="lg" p={"md"}>
      <JobBoardHeader />
      <JobFiltersPanel
        total={filteredJobs.length}
        filters={filters}
        setFilters={setFilters}
      />
      <Grid mt={30}>
        {filteredJobs?.map((job, index) => (
          <Grid.Col span={4} key={index}>
            <JobCard
              key={index}
              title={job.title}
              employmentType={job.employmentType}
              posterName={job.posterName}
              salary={job.salary}
              tags={job.tags}
              url={job.url}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
