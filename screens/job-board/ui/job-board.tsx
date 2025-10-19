"use client";

import { FilterByTitle, useJobsQuery } from "@/entities/job";
import { JobCardSkeleton } from "@/shared/ui/job-card-skeleton";
import { JobBoardHeader } from "@/widgets/header";
import { JobCard } from "@/widgets/job-card";
import { JobFiltersPanel } from "@/widgets/job-filters-panel";
import { Container, Grid } from "@mantine/core";
import { useMemo, useState } from "react";

export const JobBoard = () => {
  const [filters, setFilters] = useState<string[]>([]);

  const { data, isLoading } = useJobsQuery();

  const filteredJobs = useMemo(
    () => FilterByTitle(data!, filters),
    [filters, data]
  );

  return (
    <Container size="lg" p={"md"}>
      <JobBoardHeader />
      <JobFiltersPanel
        total={filteredJobs?.length}
        filters={filters}
        setFilters={setFilters}
      />
      <Grid mt={30}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid.Col span={{ base: 12, xs: 6, md: 4 }} key={index}>
                <JobCardSkeleton />
              </Grid.Col>
            ))
          : filteredJobs?.map((job, index) => (
              <Grid.Col span={{ base: 12, xs: 6, md: 4 }} key={index}>
                <JobCard {...job} />
              </Grid.Col>
            ))}
      </Grid>
    </Container>
  );
};
