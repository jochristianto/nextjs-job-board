"use client";

import { deleteJob, getJobs } from "@/app/actions";
import JobDetailsDialog from "@/app/components/job-details-dialog";
import { getColumns } from "@/app/protected/columns";
import DialogJobDelete from "@/app/protected/dialog-job-delete";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useUser } from "@/components/user-provider";
import { TJob } from "@/types/job";
import { DataTableRowAction } from "@/types/tanstack-table";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type FC } from "react";
import { toast } from "sonner";

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
      const jobsData = await getJobs(user?.id ? { userId: user.id } : undefined);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Container className="flex flex-1 flex-col">
        <div className="flex w-full flex-col justify-start gap-6">
          <div className="flex items-center justify-between">
            <div></div>
            <div>
              {/* <DialogJobCreate disabled={isLoading} onSubmit={onSubmitCreate} /> */}
              <Link href="/protected/create">
                <Button size="sm">
                  <IconPlus />
                  <span className="hidden lg:inline">Create Job</span>
                </Button>
              </Link>
            </div>
          </div>

          <DataTable isLoading={isLoading} columns={columns} data={jobs} />
        </div>
      </Container>

      {rowAction && rowAction.type === "view" && (
        <JobDetailsDialog open setOpen={() => setRowAction(null)} data={rowAction.row.original} />
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
