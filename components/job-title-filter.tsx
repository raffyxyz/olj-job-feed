"use client";

import { Button, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type JobTitleFilterProps = {
  addFilter: () => void;
};

const JobTitleFilter: React.FC<JobTitleFilterProps> = ({ addFilter }) => {
  const [filterInput, setFilterInput] = useState<string>("");

  return (
    <Flex justify="flex-start" align="end" gap="xs" direction="row" wrap="wrap">
      <TextInput
        label="Filter Job Title"
        placeholder="Enter job title keyword (e.g., Developer, Accountant, Editor)"
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        leftSection={<IconSearch size={16} />}
        aria-label="Filter job title"
      />
      <Button onClick={addFilter}>Add Filter</Button>
    </Flex>
  );
};

export default JobTitleFilter;
