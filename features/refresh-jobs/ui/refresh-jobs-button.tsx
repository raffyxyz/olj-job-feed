"use client";

import { Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

export const RefreshJobsButton = () => {
  const handleRefreshJobs = () => {
    window.location.reload();
  };
  return (
    <Button
      color="green"
      rightSection={<IconRefresh size={16} />}
      onClick={handleRefreshJobs}
    >
      Refresh Jobs
    </Button>
  );
};
