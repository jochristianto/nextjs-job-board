import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { getJobLocationLabel, getJobTypeLabel } from "@/lib/jobs";
import { TJob } from "@/types/job";
import { Building2Icon, ContactIcon, MapPinIcon } from "lucide-react";
import { FC } from "react";

type JobDetailsDialogProps = {
  open: boolean;
  job: TJob | null;
  onClose: () => void;
};

const JobDetailsDialog: FC<JobDetailsDialogProps> = ({ open, job, onClose }) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton className="min-w-1/2 max-w-11/12 max-h-11/12 p-0">
        <DialogHeader className="border-b border-gray-200 pb-4 p-6 rounded-t bg-gray-100">
          <DialogTitle>
            <Text variant="h4" className="font-bold">
              {job.title}
            </Text>
          </DialogTitle>
          <DialogDescription>
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
                <ContactIcon className="size-4" />
                <Text variant="body">{getJobTypeLabel(job.jobType)}</Text>
              </div>
              <Text className="text-gray-500">&bull;</Text>
              <div className="flex items-center gap-2">
                <Text variant="body">
                  Posted on{" "}
                  {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown"}
                </Text>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <Text variant="h5">About the job</Text>
          <Text className="mt-2 whitespace-pre-line">{job.description}</Text>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
