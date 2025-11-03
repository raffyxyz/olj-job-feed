import dayjs from "dayjs";

// Format date similar to what onlinejobs.ph is using.
export function formatDate(date: Date, dateFormat: string = "MMM DD, YYYY") {
  return dayjs(date).format(dateFormat);
}
