"use client";

import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Menu,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { JobDocumentData } from "@/lib/types";
import {
  IconBriefcase,
  IconBuilding,
  IconExternalLink,
  IconMenu2,
  IconMoonStars,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";

const JobBoard = ({ data }: { data: JobDocumentData[] | undefined }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  function tagIsEmpty(tags: string[]) {
    return tags.length === 1 && tags[0] === "";
  }
  return (
    <Container size="lg" p={"md"}>
      <Group justify="space-between">
        <Title order={1}>Browse Job Posting Today</Title>
        <Menu
          width={200}
          shadow="md"
          trigger="hover"
          openDelay={100}
          closeDelay={400}
          position="bottom-end"
          arrowPosition="center"
          withArrow
        >
          <Menu.Target>
            <ActionIcon variant="transparent" color="dark" aria-label="Menu">
              <IconMenu2 />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Menu</Menu.Label>
            <Menu.Item
              leftSection={
                colorScheme === "light" ? (
                  <IconMoonStars size={14} />
                ) : (
                  <IconSun size={14} />
                )
              }
              onClick={toggleColorScheme}
            >
              {colorScheme === "light" ? "Dark Mode" : "Light Mode"}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Group justify="space-between" mt={40} align="end">
        <TextInput
          label="Job Title"
          placeholder="Search for a job title"
          leftSection={<IconSearch size={16} />}
          aria-label="Search job title"
        />
        <Text size="sm" c="dimmed">
          {data?.length} job post available.
        </Text>
      </Group>

      <Grid mt={30}>
        {data?.map((job, index) => (
          <Grid.Col span={4} key={index}>
            <Card shadow="sm" padding="lg" radius="md" h="auto" withBorder>
              <Stack align="stretch" justify="center" gap="md">
                <div>
                  <Text fw={600} size="lg">
                    {job.title}
                  </Text>
                  <Flex gap={4} align="center">
                    <IconBuilding size={16} />
                    <Text size="sm">{job.posterName}</Text>
                  </Flex>
                  <Flex gap={4} align="center">
                    <IconBriefcase size={16} />
                    <Text size="sm">{job.employmentType}</Text>
                  </Flex>
                </div>
                <Text>{job.salary}</Text>
                {!tagIsEmpty(job.tags) && (
                  <Flex
                    gap={4}
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    {job.tags.map((tag, idx) => (
                      <Badge key={idx} size="sm" variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                )}
                <Anchor
                  href={`https://onlinejobs.ph${job.url}`}
                  target="_blank"
                >
                  <Button
                    rightSection={<IconExternalLink size={14} />}
                    radius="xl"
                  >
                    More Details
                  </Button>
                </Anchor>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export { JobBoard };
