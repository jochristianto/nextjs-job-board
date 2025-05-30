"use client";

import FormJobCreate from "@/app/protected/jobs/form-job-create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { jobCreateSchema } from "@/db/zod-schemas";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IconPlus } from "@tabler/icons-react";
import { useState, type FC } from "react";
import { z } from "zod";

type DialogJobCreateProps = {
  disabled?: boolean;
  onSubmit: (data: z.infer<typeof jobCreateSchema>, close: () => void) => void;
};

const DialogJobCreate: FC<DialogJobCreateProps> = ({ disabled = false, onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: z.infer<typeof jobCreateSchema>) => {
    onSubmit(data, () => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={disabled}>
          <IconPlus />
          <span className="hidden lg:inline">Create Job</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Job</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new job listing.
            <br />
            Ensure all required fields are completed before submitting.
          </DialogDescription>
        </DialogHeader>

        <FormJobCreate onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogJobCreate;
