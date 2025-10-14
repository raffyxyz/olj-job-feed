export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Format date similar to what onlinejobs.ph is using.
export function formatDate(date: Date) {
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatted;
}

// Get the date yesterday.
export function getDateYesterday() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  return formatDate(yesterday);
}
