import { Text } from "@/components/ui/text";
import { getJobLocationLabel, getJobTypeLabel } from "@/lib/jobs";
import { timeAgo } from "@/lib/timeago";
import { TJob } from "@/types/job";
import { format } from "date-fns";
import { BriefcaseIcon, Building2Icon, ClockIcon, MapPinIcon } from "lucide-react";
import type { FC } from "react";

type JobHeroProps = {
  data: TJob | null;
};

const JobHero: FC<JobHeroProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-6">
          <div className="size-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
            {data.companyName.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 space-y-2">
            <Text variant="h3" className="line-clamp-2 p-0">
              {data.title}
            </Text>

            <div className="flex items-center text-lg text-gray-600">
              <Building2Icon className="size-5 mr-2" />
              <Text variant="largeText" className="line-clamp-1">
                {data.companyName}
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-4" />
                <Text variant="body">{getJobLocationLabel(data.location)}</Text>
              </div>

              <div className="flex items-center gap-2">
                <BriefcaseIcon className="size-4" />
                <Text variant="body">{getJobTypeLabel(data.jobType)}</Text>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon className="size-4" />
                <span
                  title={data.createdAt ? format(new Date(data.createdAt), "PPpp") : undefined}
                  className="cursor-help"
                >
                  Posted {data.createdAt ? timeAgo(data.createdAt) : "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHero;
