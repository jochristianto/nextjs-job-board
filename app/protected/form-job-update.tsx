"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
import { useFormContext } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { z } from "zod";

type FormJobUpdateProps = {
  isSubmitting: boolean;
};

const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), { ssr: false });

const FormJobUpdate: FC<FormJobUpdateProps> = ({ isSubmitting }) => {
  // Ref to prevent onChange firing during reset
  const skipNextQuillChange = useRef(false);

  const form = useFormContext<z.infer<typeof jobCreateSchema>>();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Fill in the basic details of the job listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
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

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  >
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
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
          <CardDescription>
            Provide a detailed description of the job responsibilities, requirements, and benefits.
            Use rich text formatting to enhance readability.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FormJobUpdate;
