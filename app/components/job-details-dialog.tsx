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
  setOpen: (open: boolean) => void;
  data: TJob | null;
};

const JobDetailsDialog: FC<JobDetailsDialogProps> = ({ open, setOpen, data }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton
        className="p-0 flex flex-col rounded-none md:rounded-xl lg:min-w-1/2"
      >
        <DialogHeader className="border-b border-gray-200 pb-4 p-6 rounded-t bg-gray-100 flex-none">
          <DialogTitle>
            <Text variant="h4" className="font-bold text-left">
              {data.title}
            </Text>
          </DialogTitle>
          <DialogDescription asChild>
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
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 w-full h-full flex flex-col overflow-y-auto">
          <div className="px-6 pb-6">
            <Text variant="h5">About the job</Text>
            <Text className="mt-2 whitespace-pre-line">{data.description}</Text>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
