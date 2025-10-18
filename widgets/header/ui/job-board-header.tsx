"use client";

import {
  ActionIcon,
  Group,
  Menu,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMenu2, IconMoonStars, IconSun } from "@tabler/icons-react";

export const JobBoardHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
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
  );
};
