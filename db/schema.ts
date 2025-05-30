import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const jobTypeEnum = pgEnum("jobTypes", ["full_time", "part_time", "contract"]);

export const jobsTable = pgTable("jobs", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  companyName: text("company_name").notNull(),
  jobType: jobTypeEnum().notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  createdBy: uuid("created_by").references(() => authUsers.id, {
    onDelete: "cascade"
  })
});

export const applicationsTable = pgTable("applications", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => authUsers.id),
  jobId: uuid("job_id").references(() => jobsTable.id),
  status: text("status"),
  appliedAt: text("applied_at")
});

export type InsertUser = typeof authUsers.$inferInsert;
export type SelectUser = typeof authUsers.$inferSelect;

export type InsertJob = typeof jobsTable.$inferInsert;
export type SelectJob = typeof jobsTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;
