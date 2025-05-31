"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { getJobLocationLabel, getJobTypeLabel } from "@/lib/jobs";
import { TJob } from "@/types/job";
import { DataTableRowAction } from "@/types/tanstack-table";
import { User } from "@supabase/supabase-js";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";

export const getColumns = ({
  user,
  setRowAction
}: {
  user: User | null;
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<TJob> | null>>;
}): ColumnDef<TJob>[] => {
  return [
    {
      accessorKey: "title",
      header: "Job",
      meta: { className: "w-3/12 text-left" },
      cell: ({ row }) => {
        const Content = () => (
          <div className="flex flex-col items-start gap-1">
            <Text className="font-semibold">{row.original.title}</Text>

            <div className="flex flex-row items-start gap-1">
              <Text variant="smallText" className="text-muted-foreground font-medium">
                {row.original.companyName}
              </Text>

              <Text variant="smallText" className="text-muted-foreground">
                &bull;
              </Text>

              <Text variant="smallText" className="text-muted-foreground">
                {getJobLocationLabel(row.original.location)}
              </Text>
            </div>
          </div>
        );

        return (
          <>
            <div
              onClick={() => setRowAction({ row, type: "view" })}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${row.original.title}`}
              className="cursor-pointer"
            >
              <Content />
            </div>
          </>
        );
      }
    },
    {
      accessorKey: "jobType",
      header: "Job type",
      meta: { className: "w-1/12 text-left" },
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {getJobTypeLabel(row.original.jobType)}
          </Badge>
        </div>
      )
    },
    {
      accessorKey: "description",
      header: "Description",
      meta: { className: "w-6/12 text-left" },
      cell: ({ row }) => {
        // Remove HTML tags for table preview
        const plainText = row.original.description.replace(/<[^>]+>/g, "");
        return (
          <Text variant="smallText" className="break-words whitespace-pre-line line-clamp-2">
            {plainText}
          </Text>
        );
      }
    },
    {
      id: "actions",
      meta: { className: "w-1/12 text-center" },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              className="size-10 p-0"
              title="Preview job"
              onClick={() => setRowAction({ row, type: "view" })}
            >
              <span className="sr-only">Preview</span>
              <EyeIcon className="size-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={user?.id !== row.original.createdBy}>
                <Button variant="ghost" className="size-10 p-0" title="More actions">
                  <span className="sr-only">Open menu</span>
                  <MoreVerticalIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setRowAction({ row, type: "update" })}>
                  <PencilIcon className="size-4" />
                  Update
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-500"
                  onSelect={() => setRowAction({ row, type: "delete" })}
                >
                  <Trash2Icon className="size-4 text-red-500" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
    }
  ];
};
