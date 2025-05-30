"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Filter Jobs</h3>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
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
