import { getJobLocationLabel } from "@/lib/jobs";
import { TJob } from "@/types/job";

type JobCardProps = {
  job: TJob;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white flex flex-col gap-2">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <div className="text-gray-600">{job.companyName}</div>
      <div className="text-gray-500 text-sm">{getJobLocationLabel(job.location)}</div>
      <div className="text-gray-700 whitespace-pre-line break-words">{job.description}</div>
      <div className="text-xs text-gray-400 mt-2">
        Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown"}
      </div>
    </div>
  );
}
