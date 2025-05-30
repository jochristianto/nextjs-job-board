import { getJobs } from "@/app/actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const keyword = searchParams.get("keyword") || undefined;

  const filters = {
    location: searchParams.get("location") || undefined,
    jobType: searchParams.get("jobType") || undefined,
    keyword: keyword || undefined
  };

  const jobs = await getJobs(filters);
  return Response.json(jobs);
}
