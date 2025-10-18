// Format date similar to what onlinejobs.ph is using.
export function formatDate(date: Date) {
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatted;
}
