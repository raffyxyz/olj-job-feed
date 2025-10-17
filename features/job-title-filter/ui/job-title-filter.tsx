"use client";

import { Button, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  filters: string[];
  setFilters: (filters: string[]) => void;
};

export const JobTitleFilter = ({ filters, setFilters }: Props) => {
  const [filterInput, setFilterInput] = useState("");

  const addFilter = () => {
    const trimmed = filterInput.trim();
    if (trimmed && !filters.includes(trimmed)) {
      setFilters([...filters, trimmed]);
      setFilterInput("");
    }
  };

  return (
    <Flex justify="flex-start" align="end" gap="xs" direction="row" wrap="wrap">
      <TextInput
        label="Filter Job Title"
        placeholder="Enter job title keyword (e.g., Developer, Accountant, Editor)"
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addFilter()}
        leftSection={<IconSearch size={16} />}
        aria-label="Filter job title"
      />
      <Button onClick={addFilter}>Add Filter</Button>
    </Flex>
  );
};
