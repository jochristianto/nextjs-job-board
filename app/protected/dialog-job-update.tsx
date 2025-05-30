"use client";

import FormJobUpdate from "@/app/protected/form-job-update";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { jobCreateSchema } from "@/db/zod-schemas";
import { TJob } from "@/types/job";
import { type FC } from "react";
import { z } from "zod";

type DialogJobUpdateProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: TJob;
  onSubmit: (data: z.infer<typeof jobCreateSchema>, close: () => void) => void;
};

const DialogJobUpdate: FC<DialogJobUpdateProps> = ({ open, setOpen, data, onSubmit }) => {
  const handleSubmit = (data: z.infer<typeof jobCreateSchema>) => {
    onSubmit(data, () => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
          <DialogDescription>
            Fill in the details below to update the job listing.
            <br />
            Ensure all required fields are completed before submitting.
          </DialogDescription>
        </DialogHeader>

        <FormJobUpdate data={data} onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogJobUpdate;
