"use client";

import { Anchor, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconLock } from "@tabler/icons-react";

interface PrivacyPolicyModalProps {
  opened: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  opened,
  onClose,
}) => {
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
              <IconLock />
              <Title order={3} fw={500}>
                Privacy Policy
              </Title>
            </Flex>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Text>
              This privacy policy describes how this web application collects,
              uses, and protects your information when you use this service to
              view job postings aggregated from OnlineJobs.ph.
            </Text>

            <Text>
              This application displays job feeds from OnlineJobs.ph by scraping
              publicly available job postings. I do not require any user
              registration or login, and I do not collect, store, or process any
              personal information such as names, email addresses, or contact
              details from users.
            </Text>

            <Text>
              I collect anonymous analytics data to understand how visitors use
              this application. This includes information such as page views,
              browser type, device type, and general geographic location. This
              data is collected solely to improve the functionality and user
              experience of the service. I do not use this information to
              identify individual users, and I do not share this data with third
              parties except for analytics service providers.
            </Text>

            <Text>
              This application does not use cookies for tracking purposes beyond
              what is necessary for basic website functionality and analytics.
              You can control cookie preferences through your browser settings.
            </Text>

            <Text>
              This is a hobby project I created to make job searching easier on
              OnlineJobs.ph. The application is open source, and the code is
              available for review on GitHub. I make no warranties about the
              accuracy, completeness, or availability of the job postings
              displayed, and the service may experience interruptions due to
              maintenance or changes on the source platform.
            </Text>

            <Text>
              I reserve the right to update this privacy policy at any time. Any
              changes will be posted on this page with an updated effective
              date. By continuing to use this application, you agree to the
              terms outlined in this privacy policy.
            </Text>

            <Text size="sm" c="dimmed">
              Last updated: October 27, 2025
            </Text>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
