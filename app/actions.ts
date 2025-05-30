"use server";

import { db } from "@/db";
import { jobsTable } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { and, eq, ilike, or } from "drizzle-orm";

async function getSupabaseUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

function withAuth(action: (user: any, ...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    const user = await getSupabaseUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return action(user, ...args);
  };
}

export async function getJobs(filters?: {
  keyword?: string;
  title?: string;
  companyName?: string;
  description?: string;
  location?: string;
  jobType?: string;
}) {
  const query = db.select().from(jobsTable);

  const whereClauses = [];

  if (filters?.keyword && filters.keyword.trim().length >= 3) {
    const keyword = `%${filters.keyword}%`;
    whereClauses.push(
      or(
        ilike(jobsTable.title, keyword),
        ilike(jobsTable.companyName, keyword),
        ilike(jobsTable.description, keyword),
        ilike(jobsTable.location, keyword)
      )
    );
  }

  // Other filters AND logic
  if (filters?.title) whereClauses.push(ilike(jobsTable.title, `%${filters.title}%`));
  if (filters?.companyName)
    whereClauses.push(ilike(jobsTable.companyName, `%${filters.companyName}%`));
  if (filters?.description)
    whereClauses.push(ilike(jobsTable.description, `%${filters.description}%`));
  if (filters?.location) whereClauses.push(ilike(jobsTable.location, `%${filters.location}%`));
  if (filters?.jobType) whereClauses.push(ilike(jobsTable.jobType, `%${filters.jobType}%`));

  if (whereClauses.length > 0) {
    query.where(and(...whereClauses));
  }

  // const { sql, params } = query.toSQL();
  // console.log("SQL:", sql);
  // console.log("Params:", params);

  const jobs = await query;
  return jobs.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const createJob = withAuth(async (user, jobData) => {
  try {
    const data = {
      ...jobData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id
    };

    console.log("Creating job for user:", user.id, "with data:", data);

    const result = await db.insert(jobsTable).values(data);

    return { success: true, job: result[0] };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "Failed to create job" };
  }
});

export const updateJob = withAuth(async (user, jobId, jobData) => {
  if (!jobId || !jobData) {
    return { success: false, error: "Job ID and data are required" };
  }

  try {
    const updatedData = {
      ...jobData,
      updatedAt: new Date().toISOString()
    };

    const result = await db
      .update(jobsTable)
      .set(updatedData)
      .where(and(eq(jobsTable.id, jobId), eq(jobsTable.createdBy, user.id)))
      .returning();

    if (result.length === 0) {
      return { success: false, error: "Job not found or unauthorized" };
    }

    return { success: true, job: result[0] };
  } catch (error) {
    console.error("Error updating job:", error);
    return { success: false, error: "Failed to update job" };
  }
});

export const deleteJob = withAuth(async (user, jobId) => {
  try {
    const result = await db
      .delete(jobsTable)
      .where(and(eq(jobsTable.id, jobId), eq(jobsTable.createdBy, user.id)))
      .returning();

    if (result.length === 0) {
      return { success: false, error: "Job not found or unauthorized" };
    }

    return { success: true, message: `Job with ID ${jobId} deleted successfully.` };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, error: "Failed to delete job" };
  }
});
