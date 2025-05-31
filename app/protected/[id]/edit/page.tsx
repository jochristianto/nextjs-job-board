"use client";

import { getJobById, updateJob } from "@/app/actions";
import FormJobUpdate from "@/app/protected/form-job-update";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { jobCreateSchema } from "@/db/zod-schemas";
import { TJob } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircleIcon, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const JobEditPage = () => {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<TJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  type JobFormValues = z.infer<typeof jobCreateSchema>;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: job || {
      title: "",
      companyName: "",
      jobType: "" as JobFormValues["jobType"],
      location: "",
      description: ""
    }
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const jobData = await getJobById(params.id as string);
        setJob(jobData);
      } catch {
        toast.error("Failed to load job");
        router.push("/protected");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [params.id, router]);

  useEffect(() => {
    if (job) {
      form.reset(job);
    }
  }, [job, form]);

  const handleSubmit = async (data: z.infer<typeof jobCreateSchema>) => {
    setIsSaving(true);
    const res = await updateJob(params.id as string, data);
    if (res.success) {
      toast.success("Job updated!");
      router.push("/protected");
    } else {
      setIsSaving(false);
      toast.error(res.error || "Failed to update job");
    }
  };

  if (isLoading || !job) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        {isLoading ? (
          <>
            <LoaderCircleIcon className="animate-spin mr-2" />
            Loading...
          </>
        ) : (
          <span>Job not found.</span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="size-4" />
              </Button>
              <div>
                <Text variant="h5">Edit Job Posting</Text>
                <Text variant="smallText" className="text-gray-600">
                  Update job details and requirements
                </Text>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/protected")}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isLoading || isSaving}
                onClick={() => formRef.current?.requestSubmit()}
              >
                <Save className="size-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <FormProvider {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Container className="p-4">
            {form.getValues("jobType") && form.getValues("location") ? (
              <FormJobUpdate isSubmitting={isSaving} />
            ) : (
              <div className="h-32 flex items-center justify-center">Loading form...</div>
            )}
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default JobEditPage;
