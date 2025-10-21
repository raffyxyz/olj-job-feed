"use client";

import { JobTitleFilter } from "@/features/job-title-filter";
import { RefreshJobsButton } from "@/features/refresh-jobs";
import { Badge, Button, Flex, Group, Text, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

type Props = {
  total: number;
  filters: string[];
  setFilters: (filters: string[]) => void;
};

export const JobFiltersPanel = ({ total, filters, setFilters }: Props) => {
  const removeFilter = (filterToRemove: string) => {
    setFilters(filters.filter((f) => f !== filterToRemove));
  };

  const badgeSize = useMatches({
    base: "xs",
    sm: "sm",
    md: "md",
  });

  return (
    <>
      <Group justify="space-between" mt={40} align="end">
        <Flex align="end" gap="md">
          <JobTitleFilter filters={filters} setFilters={setFilters} />
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
            onClick={() => setFilters([])}
          >
            Clear All
          </Button>
        </Flex>
      )}
    </>
  );
};
