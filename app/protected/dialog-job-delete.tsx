import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TJob } from "@/types/job";
import type { FC } from "react";

type DialogJobDeleteProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: TJob;
  onDelete?: () => void; // Optional callback for delete action
};

const DialogJobDelete: FC<DialogJobDeleteProps> = ({ open, setOpen, data, onDelete }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job and all associated
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild className="bg-destructive text-white hover:bg-destructive/90">
            <Button variant="destructive" onClick={onDelete}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogJobDelete;
