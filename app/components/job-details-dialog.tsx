import JobHero from "@/app/components/job-hero";
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
import { quillOlBulletToUl } from "@/lib/string";
import { TJob } from "@/types/job";
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
      <DialogHeader className="sr-only">
        <DialogTitle>{data.title}</DialogTitle>
        <DialogDescription>View details for the job at {data.companyName}</DialogDescription>
      </DialogHeader>

      <DialogContent
        showCloseButton
        className="p-6 flex flex-col rounded-lg min-w-1/2 max-w-2/3 max-h-2/3"
      >
        <JobHero data={data} />

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
