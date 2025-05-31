"use client";

import { createJob } from "@/app/actions";
import FormJobCreate from "@/app/protected/form-job-create";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { jobCreateSchema } from "@/db/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const JobCreatePage = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  type JobFormValues = z.infer<typeof jobCreateSchema>;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: "",
      companyName: "",
      jobType: "" as JobFormValues["jobType"],
      location: "",
      description: ""
    }
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: JobFormValues) => {
    setIsSaving(true);
    const res = await createJob(data);
    if (res.success) {
      toast.success("Job created!");
      router.push("/protected");
    } else {
      toast.error(res.error || "Failed to create job");
    }
    setIsSaving(false);
  };

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
                <Text variant="h5">Create Job Posting</Text>
                <Text variant="smallText" className="text-gray-600">
                  Fill in the details to create a new job listing.
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
                disabled={isSaving}
                onClick={() => formRef.current?.requestSubmit()}
              >
                <Save className="size-4 mr-2" />
                {isSaving ? "Creating..." : "Create Job"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <FormProvider {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Container className="p-4">
            <FormJobCreate isSubmitting={isSaving} />
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default JobCreatePage;
