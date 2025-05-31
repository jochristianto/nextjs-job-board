import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { getJobLocationLabel, getJobTypeLabel } from "@/lib/jobs";
import { quillOlBulletToUl } from "@/lib/string";
import { TJob } from "@/types/job";
import { BriefcaseIcon, Building2Icon, ClockIcon, MapPinIcon } from "lucide-react";
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
      <DialogHeader>
        <DialogTitle>{data.title}</DialogTitle>
        <DialogDescription>View details for the job at {data.companyName}</DialogDescription>
      </DialogHeader>

      <DialogContent
        showCloseButton
        className="p-6 flex flex-col rounded-lg min-w-1/2 max-w-2/3 max-h-2/3"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                {data.companyName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
                <div className="flex items-center text-lg text-gray-600 mb-3">
                  <Building2Icon className="size-5 mr-2" />
                  <Text variant="largeText">{data.companyName}</Text>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPinIcon className="size-4 mr-1" />
                    <Text variant="body">{getJobLocationLabel(data.location)}</Text>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="size-4 mr-1" />
                    <Text variant="body">{getJobTypeLabel(data.jobType)}</Text>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="size-4 mr-1" />
                    <span>
                      Posted{" "}
                      {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex-1 w-full h-full flex flex-col overflow-y-auto">
          <Card className="border-none p-0">
            <CardContent className="p-0">
              <Text variant="h5">About the job</Text>
              <Text
                as="div"
                className="mt-2 prose prose-sm prose-p:m-0 prose-ol:m-0 prose-ul:m-0 max-w-none"
                dangerouslySetInnerHTML={{ __html: quillOlBulletToUl(data.description) }}
              />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
