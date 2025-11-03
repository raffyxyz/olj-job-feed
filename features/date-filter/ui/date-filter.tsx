"use client";

import { getDateYesterday } from "@/shared/lib";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

export const DateFilter = () => {
  const [dateValue, setDateValue] = useState<string | null>(null);
  const [formattedValue, setFormattedValue] = useState("");

  const maxDate = getDateYesterday("YYYY-MM-DD");

  const handleChange = (date: string | null) => {
    setDateValue(date);
    setFormattedValue(date ? dayjs(date).format("MMM DD, YYYY") : "");
  };

  return (
    <DatePickerInput
      label="Filter By Date"
      placeholder="Pick a date"
      valueFormat="MMM DD, YYYY"
      leftSection={<IconCalendar size={16} />}
      value={dateValue}
      onChange={handleChange}
      maxDate={maxDate}
      miw="153px"
      clearable
    />
  );
};
