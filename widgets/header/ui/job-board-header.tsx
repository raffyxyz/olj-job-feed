"use client";

import {
  ActionIcon,
  em,
  Group,
  Menu,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconInfoCircle,
  IconLock,
  IconMenu2,
  IconMoonStars,
  IconSun,
} from "@tabler/icons-react";

interface JobHeaderProps {
  onAboutClick: () => void;
  onPrivPolClick: () => void;
}

export const JobBoardHeader: React.FC<JobHeaderProps> = ({
  onAboutClick,
  onPrivPolClick,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group justify="space-between">
      <Title order={isMobile ? 4 : 1}>Browse Job Posting Today</Title>
      <Menu
        width={200}
        shadow="md"
        trigger="click"
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
                <IconMoonStars size={16} />
              ) : (
                <IconSun size={16} />
              )
            }
            onClick={toggleColorScheme}
          >
            {colorScheme === "light" ? "Dark Mode" : "Light Mode"}
          </Menu.Item>
          <Menu.Item
            onClick={onAboutClick}
            leftSection={<IconInfoCircle size={16} />}
          >
            About
          </Menu.Item>
          <Menu.Item
            onClick={onPrivPolClick}
            leftSection={<IconLock size={16} />}
          >
            Privacy Policy
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
