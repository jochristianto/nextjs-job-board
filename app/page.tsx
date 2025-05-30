"use client";

import Hero from "@/app/components/hero";
import JobCard from "@/app/components/job-card";
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
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch jobs when filters or search change
  useEffect(() => {
    // Only fetch if keyword is empty or at least 3 chars
    if (searchQuery && searchQuery.length > 0 && searchQuery.length < 3) {
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    if (locationFilter !== "all") params.append("location", locationFilter);
    if (typeFilter !== "all") params.append("jobType", typeFilter);
    if (searchQuery && searchQuery.length >= 3) params.append("keyword", searchQuery);

    fetch(`/api/jobs?${params.toString()}`)
      .then((res) => res.json())
      .then(setJobs)
      .finally(() => setLoading(false));
  }, [locationFilter, typeFilter, searchQuery]);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1">
        <Header />

        <Hero onSearch={setSearchQuery} />

        <Container className="px-4 py-8 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-8 w-full">
            <JobFilter
              onChange={({ location, jobType }) => {
                setLocationFilter(location);
                setTypeFilter(jobType);
              }}
            />

            <div className="col-span-3">
              <div className="flex flex-col gap-5">
                {loading ? (
                  <p>Loading...</p>
                ) : jobs.length === 0 ? (
                  <p>No jobs found.</p>
                ) : (
                  jobs.map((job) => <JobCard key={job.id} job={job} />)
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  );
}
