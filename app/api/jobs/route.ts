import { getJobs } from "@/app/actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const keyword = searchParams.get("keyword") || undefined;

  const jobTypeParam = searchParams.get("jobType");
  const validJobTypes = ["full_time", "part_time", "contract"] as const;
  const jobType = validJobTypes.includes(jobTypeParam as any)
    ? (jobTypeParam as (typeof validJobTypes)[number])
    : undefined;

  const filters = {
    location: searchParams.get("location") || undefined,
    jobType: jobType,
    keyword: keyword || undefined
  };

  const jobs = await getJobs(filters);
  return Response.json(jobs);
}
