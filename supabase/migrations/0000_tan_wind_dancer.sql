CREATE TYPE "public"."jobTypes" AS ENUM('full_time', 'part_time', 'contract');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"job_id" uuid,
	"status" text,
	"applied_at" text
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text,
	"company_name" text,
	"jobType" "jobTypes",
	"location" text,
	"description" text,
	"created_at" text,
	"updated_at" text,
	"created_by" uuid
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;