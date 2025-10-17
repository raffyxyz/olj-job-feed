"use client";

import { JobTitleFilter } from "@/features/job-title-filter";
import { Badge, Button, Flex, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

type Props = {
  total: number;
  filters: string[];
  setFilters: (filters: string[]) => void;
};

export const JobFiltersPanel = ({ total, filters, setFilters }: Props) => {
  return (
    <>
      <Group justify="space-between" mt={40} align="end">
        <JobTitleFilter filters={filters} setFilters={setFilters} />
        <Text size="sm" c="dimmed">
          {total} job post available.
        </Text>
      </Group>
      {filters.length > 0 && (
        <Flex mt="sm" gap="xs" align="center">
          <Text>Active Filters: </Text>
          {filters.map((filter, idx) => (
            <Badge
              key={idx}
              variant="outline"
              rightSection={<IconX size={12} />}
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
