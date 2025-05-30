"use client";

import Hero from "@/app/components/hero";
import JobCard from "@/app/components/job-card";
import JobDetailsDialog from "@/app/components/job-details-dialog";
import JobFilter from "@/app/components/job-filter";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";

export default function Home() {
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch jobs when filters or search change
  useEffect(() => {
    // Only fetch if keyword is empty or at least 3 chars
    if (searchQuery && searchQuery.length > 0 && searchQuery.length < 3) {
      return;
    }

    setIsLoading(true);
    const params = new URLSearchParams();
    if (locationFilter !== "all") params.append("location", locationFilter);
    if (typeFilter !== "all") params.append("jobType", typeFilter);
    if (searchQuery && searchQuery.length >= 3) params.append("keyword", searchQuery);

    fetch(`/api/jobs?${params.toString()}`)
      .then((res) => res.json())
      .then(setJobs)
      .finally(() => setIsLoading(false));
  }, [locationFilter, typeFilter, searchQuery]);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1">
        <Header />

        <Hero isLoading={isLoading} onSearch={setSearchQuery} />

        <Container className="px-4 py-8 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-8 w-full">
            <JobFilter
              isLoading={isLoading}
              onChange={({ location, jobType }) => {
                setLocationFilter(location);
                setTypeFilter(jobType);
              }}
            />

            <div className="col-span-3">
              <div className="flex flex-col gap-5">
                {isLoading ? (
                  <p>Loading...</p>
                ) : jobs.length === 0 ? (
                  <p>No jobs found.</p>
                ) : (
                  jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={(job) => {
                        setSelectedJob(job);
                        setDialogOpen(true);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <JobDetailsDialog open={dialogOpen} setOpen={setDialogOpen} data={selectedJob} />

      <Footer />
    </main>
  );
}
