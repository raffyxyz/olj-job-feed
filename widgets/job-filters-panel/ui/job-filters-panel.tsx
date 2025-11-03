"use client";

import { DateFilter } from "@/features/date-filter";
import { JobTitleFilter } from "@/features/job-title-filter";
import { RefreshJobsButton } from "@/features/refresh-jobs";
import { Badge, Button, Flex, Group, Text, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

type Props = {
  total: number;
  filters: string[];
  setFiltersAction: (filters: string[]) => void;
};

export const JobFiltersPanel = ({
  total,
  filters,
  setFiltersAction,
}: Props) => {
  const removeFilter = (filterToRemove: string) => {
    setFiltersAction(filters.filter((f) => f !== filterToRemove));
  };

  const badgeSize = useMatches({
    base: "xs",
    sm: "sm",
    md: "md",
  });

  return (
    <>
      <Group justify="space-between" mt={40} align="end">
        <Flex align="end" gap={{ base: "sm", md: "md" }} wrap="wrap">
          <DateFilter />
          <JobTitleFilter filters={filters} setFilters={setFiltersAction} />
          <RefreshJobsButton />
        </Flex>
        <Text size="sm" c="dimmed">
          {total || 0} job post available.
        </Text>
      </Group>
      {filters.length > 0 && (
        <Flex mt="sm" gap="xs" align="center" wrap="wrap">
          <Text className="mantine-visible-from-sm">Active Filters: </Text>
          {filters.map((filter, idx) => (
            <Badge
              key={idx}
              size={badgeSize}
              variant="outline"
              rightSection={
                <IconX
                  size={14}
                  onClick={() => removeFilter(filter)}
                  style={{ cursor: "pointer" }}
                />
              }
            >
              {filter}
            </Badge>
          ))}
          <Button
            variant="transparent"
            color="red"
            onClick={() => setFiltersAction([])}
          >
            Clear All
          </Button>
        </Flex>
      )}
    </>
  );
};
