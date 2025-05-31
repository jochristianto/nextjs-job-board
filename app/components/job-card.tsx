import JobHero from "@/app/components/job-hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TJob } from "@/types/job";

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
        <CardContent className="p-0">
          <JobHero data={data} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
