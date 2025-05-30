import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getJobLocationLabel } from "@/lib/jobs";
import { TJob } from "@/types/job";
import { Building2Icon, MapPinIcon } from "lucide-react";

type JobCardProps = {
  job: TJob;
  onClick?: (job: TJob) => void;
};

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <Card
      className="flex flex-col gap-1 shadow-none cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300 border-l-4"
      onClick={() => onClick?.(job)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${job.title}`}
    >
      <CardHeader className="space-y-2">
        <CardTitle>
          <Text variant="h4" className="font-bold">
            {job.title}
          </Text>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="flex items-center gap-2">
              <Building2Icon className="size-4" />
              <Text variant="body">{job.companyName}</Text>
            </div>
            <Text className="text-gray-500">&bull;</Text>
            <div className="flex items-center gap-2">
              <MapPinIcon className="size-4" />
              <Text variant="body">{getJobLocationLabel(job.location)}</Text>
            </div>
            <Text className="text-gray-500">&bull;</Text>
            <div className="flex items-center gap-2">
              <Text variant="body">
                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown"}
              </Text>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
