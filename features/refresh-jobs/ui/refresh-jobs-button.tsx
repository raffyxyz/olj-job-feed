"use client";

import { Tooltip, ActionIcon } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

export const RefreshJobsButton = () => {
  const handleRefreshJobs = () => {
    window.location.reload();
  };
  return (
    <Tooltip label="Refresh Jobs" withArrow>
      <ActionIcon variant="default" size="lg" onClick={handleRefreshJobs}>
        <IconRefresh size={16} />
      </ActionIcon>
    </Tooltip>
  );
};
