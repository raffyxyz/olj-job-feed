"use client";

import { getDateYesterday } from "@/shared/lib";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface DateFilterProps {
  dateFilter: string | null;
  setDateFilter: (dateFilter: string | null) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  dateFilter,
  setDateFilter,
}) => {
  const searchParams = useSearchParams();
  const [dateValue, setDateValue] = useState<string | null>(dateFilter);

  const maxDate = getDateYesterday("YYYY-MM-DD");

  const handleChange = (date: string | null) => {
    setDateValue(date);
    const value = date ? dayjs(date).format("MMM DD, YYYY") : "";

    setDateFilter(value);
  };

  const clearDateFilter = () => {
    setDateValue(null);
    setDateFilter("");
    const params = new URLSearchParams(searchParams);
    params.delete("date-filter");
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
      rightSection={
        dateValue && (
          <IconX
            style={{ cursor: "pointer" }}
            onClick={clearDateFilter}
            size={16}
          />
        )
      }
    />
  );
};
