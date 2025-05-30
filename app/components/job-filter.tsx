"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { jobLocations, jobTypes } from "@/constants";
import { useEffect, useState, type FC } from "react";

type JobFilterProps = {
  onChange?: (filters: { location: string; jobType: string }) => void;
};

const JobFilter: FC<JobFilterProps> = ({ onChange }) => {
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Emit changes to parent when filters change
  useEffect(() => {
    if (onChange) {
      onChange({ location: locationFilter, jobType: typeFilter });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationFilter, typeFilter]);

  return (
    <div className="grid-cols-1">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Filter Jobs</CardTitle>
          <CardDescription>
            Use the filters below to narrow down job listings based on location and job type.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {jobLocations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Job Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setLocationFilter("all");
              setTypeFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobFilter;
