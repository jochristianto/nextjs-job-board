import { jobLocations, jobTypes } from "@/constants";

export function getJobTypeLabel(jobType: string): string | undefined {
  return jobTypes.find((x) => x.value === jobType)?.label;
}

export function getJobLocationLabel(value: string): string | undefined {
  return jobLocations.find((x) => x.value === value)?.label;
}
