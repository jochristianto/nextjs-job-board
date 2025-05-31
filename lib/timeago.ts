import { formatDistanceToNow, parseISO } from "date-fns";

export function timeAgo(date: string | Date) {
  if (!date) return "";
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}
