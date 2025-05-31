"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { jobLocations, jobTypes } from "@/constants";
import { jobCreateSchema } from "@/db/zod-schemas";
import { TJob } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { z } from "zod";

type FormJobUpdateProps = {
  data: TJob;
  onSubmit: (data: z.infer<typeof jobCreateSchema>) => void;
  onCancel?: () => void;
};

const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), { ssr: false });

const FormJobUpdate: FC<FormJobUpdateProps> = ({ data, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof jobCreateSchema>>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: data.title,
      companyName: data.companyName,
      jobType: data.jobType,
      location: data.location,
      description: data.description
    }
  });

  // Ref to prevent onChange firing during reset
  const skipNextQuillChange = useRef(false);

  // Keep Quill in sync with form reset (e.g. when editing a different job)
  useEffect(() => {
    skipNextQuillChange.current = true;
    form.reset({
      title: data.title,
      companyName: data.companyName,
      jobType: data.jobType,
      location: data.location,
      description: data.description
    });
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          setIsSubmitting(true);
          onSubmit(e);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isSubmitting}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Acme Corp"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isSubmitting}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-start">
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                  <FormControl>
                    <SelectTrigger className="w-full truncate" disabled={isSubmitting}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="w-full truncate">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobLocations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div>
                  <QuillNoSSRWrapper
                    theme="snow"
                    value={field.value ?? ""}
                    onChange={(value) => {
                      // Prevent double onChange when resetting
                      if (skipNextQuillChange.current) {
                        skipNextQuillChange.current = false;
                        return;
                      }
                      field.onChange(value);
                    }}
                    readOnly={isSubmitting}
                    placeholder="Describe the responsibilities, requirements, and benefits.&#10;e.g. We are looking for a frontend engineer with experience in React and TypeScript..."
                    style={{ minHeight: 150 }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircleIcon className="animate-spin" size={16} />}
            {isSubmitting ? "Updating Job ..." : "Update Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormJobUpdate;
