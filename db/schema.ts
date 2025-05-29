import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const companiesTable = pgTable("companies", {
  id: uuid("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  website: varchar("website", { length: 256 }),
  location: text("location"),
});

export const jobsTable = pgTable("jobs", {
  id: uuid("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  companyId: uuid("company_id").references(() => companiesTable.id),
  location: text("location"),
  salary: varchar("salary", { length: 256 }),
  employmentType: text("employment_type"),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  createdBy: uuid("created_by").references(() => authUsers.id, {
    onDelete: "cascade",
  }),
});

export const applicationsTable = pgTable("applications", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => authUsers.id),
  jobId: uuid("job_id").references(() => jobsTable.id),
  status: text("status"),
  appliedAt: text("applied_at"),
});

export type InsertUser = typeof authUsers.$inferInsert;
export type SelectUser = typeof authUsers.$inferSelect;

export type InsertCompany = typeof companiesTable.$inferInsert;
export type SelectCompany = typeof companiesTable.$inferSelect;

export type InsertJob = typeof jobsTable.$inferInsert;
export type SelectJob = typeof jobsTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;
