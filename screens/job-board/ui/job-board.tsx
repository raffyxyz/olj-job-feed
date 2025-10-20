"use client";

import { FilterByTitle, useJobsQuery } from "@/entities/job";
import { JobCardSkeleton } from "@/shared/ui/job-card-skeleton";
import { JobBoardHeader } from "@/widgets/header";
import { JobCard } from "@/widgets/job-card";
import { JobFiltersPanel } from "@/widgets/job-filters-panel";
import { Container, Grid, Title } from "@mantine/core";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export const JobBoard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<string[]>(() => {
    return searchParams.getAll("filter");
  });

  const { data, isLoading } = useJobsQuery();

  const filteredJobs = useMemo(
    () => FilterByTitle(data!, filters),
    [filters, data]
  );

  // Sync filters to URL whenever they change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Remove all existing filter params
    params.delete("filter");

    // Add current filters
    filters.forEach((filter) => {
      params.append("filter", filter);
    });

    // Update URL
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }, [filters, pathname, router, searchParams]);

  return (
    <Container size="lg" p={"md"}>
      <JobBoardHeader />
      <JobFiltersPanel
        total={filteredJobs?.length}
        filters={filters}
        setFilters={setFilters}
      />
      <Grid mt={30}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Grid.Col span={{ base: 12, xs: 6, md: 4 }} key={index}>
              <JobCardSkeleton />
            </Grid.Col>
          ))
        ) : filteredJobs.length === 0 ? (
          <Grid.Col span={12}>
            <Title order={2} ta="center" c="dimmed" mt={40}>
              No job post available🥹
            </Title>
          </Grid.Col>
        ) : (
          filteredJobs?.map((job, index) => (
            <Grid.Col span={{ base: 12, xs: 6, md: 4 }} key={index}>
              <JobCard {...job} />
            </Grid.Col>
          ))
        )}
      </Grid>
    </Container>
  );
};
