import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { getJobLocationLabel } from "@/lib/jobs";
import { TJob } from "@/types/job";
import { Building2Icon, MapPinIcon } from "lucide-react";
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
      <DialogContent showCloseButton className="min-w-1/2 max-w-11/12 max-h-11/12">
        <DialogHeader>
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
                <Text variant="body">
                  {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown"}
                </Text>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div>
          <Text className="mt-2 whitespace-pre-line">{job.description}</Text>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
