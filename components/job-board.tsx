"use client";

import {
  ActionIcon,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { JobCard } from "./ui/job-card";
import { JobDocumentData } from "@/lib/types";
import { IconBriefcase, IconMenu2, IconSettings } from "@tabler/icons-react";

const JobBoard = ({ data }: { data: JobDocumentData[] | undefined }) => {
  return (
    <Container size="lg" p={"md"}>
      <Group justify="space-between">
        <Title order={1}>Browse Job Posting Today</Title>
        <ActionIcon variant="transparent" color="dark" aria-label="Menu">
          <IconSettings />
        </ActionIcon>
      </Group>
      <Group justify="space-between" mt={40} align="end">
        <TextInput
          label="Job Title"
          placeholder="Search for a job title"
          leftSection={<IconBriefcase size={16} />}
          aria-label="Search job title"
        />
        <Text size="sm" c="dimmed">
          104 job post available.
        </Text>
      </Group>

      <SimpleGrid mt={30} cols={3}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md"
          >
            <Text fw={500}>Lead Product Manager</Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export { JobBoard };
