"use client";

import { createJob, deleteJob, getJobs, updateJob } from "@/app/actions";
import { getColumns } from "@/app/protected/columns";
import DialogJobCreate from "@/app/protected/dialog-job-create";
import DialogJobDelete from "@/app/protected/dialog-job-delete";
import DialogJobUpdate from "@/app/protected/dialog-job-update";
import Container from "@/components/container";
import { DataTable } from "@/components/ui/data-table";
import { useUser } from "@/components/user-provider";
import { jobCreateSchema } from "@/db/zod-schemas";
import { TJob } from "@/types/job";
import { DataTableRowAction } from "@/types/tanstack-table";
import { useEffect, useMemo, useState, type FC } from "react";
import { toast } from "sonner";
import { z } from "zod";

type JobsPageProps = {};

const JobsPage: FC<JobsPageProps> = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [rowAction, setRowAction] = useState<DataTableRowAction<TJob> | null>(null);

  const columns = useMemo(() => {
    return getColumns({ setRowAction, user });
  }, [setRowAction, user]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const jobsData = await getJobs();
      setJobs(jobsData ?? []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (!user) return null;

  const onSubmitCreate = async (job: z.infer<typeof jobCreateSchema>, close: () => void) => {
    try {
      const res = await createJob(job);
      if (!res.success) {
        toast.error(res.message || "Failed to create job");
        return;
      }

      fetchJobs();
      toast.success("Job created successfully!");
      close();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };
  return (
    <>
      <Container className="flex flex-1 flex-col">
        <div className="flex w-full flex-col justify-start gap-6">
          <div className="flex items-center justify-between">
            <div></div>
            <div>
              <DialogJobCreate disabled={isLoading} onSubmit={onSubmitCreate} />
            </div>
          </div>

          <DataTable isLoading={isLoading} columns={columns} data={jobs} />
        </div>
      </Container>

      {rowAction && rowAction.type === "update" && (
        <DialogJobUpdate
          open
          setOpen={() => setRowAction(null)}
          data={rowAction.row.original}
          onSubmit={async (job, close) => {
            try {
              // Call your update job function here
              const res = await updateJob(rowAction.row.original.id, job);
              if (!res.success) {
                toast.error(res.error || "Failed to update job");
                close();
                return;
              }

              // If successful, refetch jobs and close the dialog
              fetchJobs();
              toast.success("Job updated successfully!");
              close();
            } catch (error) {
              console.error("Error updating job:", error);
              toast.error("Failed to update job.");
            }
          }}
        />
      )}

      {rowAction && rowAction.type === "delete" && (
        <DialogJobDelete
          open
          setOpen={() => setRowAction(null)}
          data={rowAction.row.original}
          onDelete={async () => {
            try {
              // Call your delete job function here
              const res = await deleteJob(rowAction.row.original.id);
              if (!res.success) {
                toast.error(res.error || "Failed to delete job");
                close();
                return;
              }

              // If successful, refetch jobs and close the dialog
              fetchJobs();
              toast.success("Job deleted successfully!");
              close();
            } catch (error) {
              console.error("Error deleting job:", error);
              toast.error("Failed to delete job.");
            }
          }}
        />
      )}
    </>
  );
};

export default JobsPage;
