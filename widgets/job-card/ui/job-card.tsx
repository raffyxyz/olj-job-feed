"use client";

import { Anchor, Badge, Button, Card, Flex, Stack, Text } from "@mantine/core";
import {
  IconBriefcase,
  IconBuilding,
  IconExternalLink,
} from "@tabler/icons-react";

type Props = {
  title: string;
  posterName: string;
  employmentType: string;
  salary: string | number;
  tags: string[];
  url: string;
};

export const JobCard = ({
  title,
  posterName,
  employmentType,
  salary,
  tags,
  url,
}: Props) => {
  function tagIsEmpty(tags: string[]) {
    return tags.length === 1 && tags[0] === "";
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" h="auto" withBorder>
      <Stack align="stretch" justify="center" gap="md">
        <div>
          <Text fw={600} size="lg">
            {title}
          </Text>
          <Flex gap={4} align="center">
            <IconBuilding size={16} />
            <Text size="sm">{posterName}</Text>
          </Flex>
          <Flex gap={4} align="center">
            <IconBriefcase size={16} />
            <Text size="sm">{employmentType}</Text>
          </Flex>
        </div>
        <Text>{salary}</Text>
        {!tagIsEmpty(tags) && (
          <Flex
            gap={4}
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {tags.map((tag, idx) => (
              <Badge key={idx} size="sm" variant="light">
                {tag}
              </Badge>
            ))}
          </Flex>
        )}
        <Anchor href={`https://onlinejobs.ph${url}`} target="_blank">
          <Button rightSection={<IconExternalLink size={14} />} radius="xl">
            More Details
          </Button>
        </Anchor>
      </Stack>
    </Card>
  );
};
