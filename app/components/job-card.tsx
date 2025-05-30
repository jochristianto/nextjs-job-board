import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getJobLocationLabel, getJobTypeLabel } from "@/lib/jobs";
import { TJob } from "@/types/job";
import { Building2Icon, ContactIcon, MapPinIcon } from "lucide-react";

type JobCardProps = {
  data: TJob;
  onClick?: (data: TJob) => void;
};

export default function JobCard({ data, onClick }: JobCardProps) {
  return (
    <Card
      className="flex flex-col gap-1 shadow-none cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300 border-l-4 border-l-gray-100"
      onClick={() => onClick?.(data)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${data.title}`}
    >
      <CardHeader className="space-y-2">
        <CardTitle>
          <Text variant="h4" className="font-bold">
            {data.title}
          </Text>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-gray-600">
            <div className="flex items-center gap-2">
              <Building2Icon className="size-4" />
              <Text variant="body">{data.companyName}</Text>
            </div>
            <Text className="hidden md:block text-gray-500">&bull;</Text>
            <div className="flex items-center gap-2">
              <MapPinIcon className="size-4" />
              <Text variant="body">{getJobLocationLabel(data.location)}</Text>
            </div>
            <Text className="hidden md:block text-gray-500">&bull;</Text>
            <div className="flex items-center gap-2">
              <ContactIcon className="size-4" />
              <Text variant="body">{getJobTypeLabel(data.jobType)}</Text>
            </div>
            <Text className="hidden md:block text-gray-500">&bull;</Text>
            <div className="flex items-center gap-2">
              <Text variant="body">
                Posted on{" "}
                {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "Unknown"}
              </Text>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
