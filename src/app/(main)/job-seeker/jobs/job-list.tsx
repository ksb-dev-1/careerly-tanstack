"use client";

import { ListFilter } from "lucide-react";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { JobCard } from "@/components/job-card";
import { JobPagination } from "@/components/pagination";
import { SearchInput } from "@/components/search-input";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFetchJobs } from "@/hooks/useFetchJobs";

export function JobList() {
  const { data, isLoading, error } = useFetchJobs();

  if (isLoading) return <JobListSkeleton />;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  const jobs = data?.jobs;
  const totalPages = data?.totalPages;

  if (!jobs || jobs.length === 0) return <EmptyState />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="font-bold w-fit">All Jobs</h3>

        <div className="w-full sm:max-w-sm flex items-center gap-2">
          <SearchInput />
          <Button variant="outline" className="font-bold!">
            <ListFilter />
            Filter
          </Button>
        </div>
      </div>

      <div className="max-w-custom w-full mx-auto grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div>
        {totalPages && totalPages > 1 && (
          <JobPagination totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
