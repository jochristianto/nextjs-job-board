"use client";

import { getJobById, updateJob } from "@/app/actions";
import FormJobUpdate from "@/app/protected/form-job-update";
import { jobCreateSchema } from "@/db/zod-schemas";
import { TJob } from "@/types/job";
import { LoaderCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const JobEditPage = () => {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<TJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const jobData = await getJobById(params.id as string);
        setJob(jobData);
      } catch {
        toast.error("Failed to load job");
        router.push("/protected");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params.id, router]);

  const handleSubmit = async (data: z.infer<typeof jobCreateSchema>) => {
    const res = await updateJob(params.id as string, data);
    if (res.success) {
      toast.success("Job updated!");
      router.push("/protected");
    } else {
      toast.error(res.error || "Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoaderCircleIcon className="animate-spin mr-2" />
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <span>Job not found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <FormJobUpdate
        data={job}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/protected")}
      />
    </div>
  );
};

export default JobEditPage;
