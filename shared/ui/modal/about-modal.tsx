"use client";

import { Anchor, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconInfoCircle } from "@tabler/icons-react";

interface AboutModalProps {
  opened: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ opened, onClose }) => {
  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      size="lg"
      centered
      padding={"xl"}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Flex align="center" gap={4}>
              <IconInfoCircle />
              <Title order={3} fw={500}>
                About
              </Title>
            </Flex>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Text>
              This is a web application that aggregates job postings from
              OnlineJobs.ph to make job searching easier and more efficient. It
              displays all job postings from the current day in a single view,
              eliminating the need to navigate through multiple pages.
            </Text>

            <Text>
              The app features a multi-filter system that allows you to search
              and filter by multiple job titles simultaneously, helping you
              quickly find relevant opportunities without switching between
              searches.
            </Text>

            <Text>
              This is a hobby project I built to improve the job hunting
              experience on OnlineJobs.ph. Please note that the app may
              occasionally experience downtime or break if there are changes to
              the source platform, such as during maintenance or structural
              updates.
            </Text>

            <Text>
              No login is required to use this service. The application is open
              source and respects your privacy—I only collect anonymous
              analytics to improve the user experience.
            </Text>

            <Flex align="center" gap={3}>
              <IconBrandGithub size={18} />
              <Anchor
                href="https://github.com/raffyxyz/olj-job-feed"
                target="_blank"
                c="inherit"
                size="sm"
              >
                View on Github
              </Anchor>
            </Flex>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
