import { jobLocations } from "@/constants";
import { z } from "zod";

export const jobCreateSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  jobType: z.enum(["full_time", "part_time", "contract"], {
    errorMap: () => ({ message: "Job type is required" })
  }),
  location: z.enum(jobLocations.map((loc) => loc.value) as [string, ...string[]], {
    errorMap: () => ({ message: "Location is required" })
  }),
  description: z.string().min(1, "Description is required")
});
