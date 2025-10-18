"use client";

import { Card, Flex, Skeleton, Stack } from "@mantine/core";

export const JobCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" h="auto" withBorder>
      <Stack align="stretch" justify="center" gap="lg">
        <div>
          <Skeleton height={22} width="70%" />
          <Skeleton mt="xs" height={10} width={40} />
          <Skeleton mt="xs" height={10} width={55} />
        </div>
        <Skeleton height={12} width="50%" />
        <Flex
          gap={4}
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Skeleton height={14} w={40} radius="xl" />
          <Skeleton height={14} w={55} radius="xl" />
          <Skeleton height={14} w={45} radius="xl" />
        </Flex>
        <Skeleton height={35} width="40%" radius="xl" />
      </Stack>
    </Card>
  );
};
