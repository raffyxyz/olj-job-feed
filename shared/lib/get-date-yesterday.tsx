import { formatDate } from "./format-date";

// Get the date yesterday.
export function getDateYesterday() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  return formatDate(yesterday);
}
