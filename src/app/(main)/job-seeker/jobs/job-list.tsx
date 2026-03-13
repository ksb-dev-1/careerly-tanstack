"use client";

import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { pagination } from "@/app/api/jobs/route";
import { JobPagination } from "@/components/pagination";
import { JobListApiResponse } from "@/types/api";

export function JobList() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const jobType = searchParams.get("jobType");
  const jobMode = searchParams.get("jobMode");
  const experience = searchParams.get("experience");

  const { data, isLoading, error } = useQuery<
    JobListApiResponse,
    { status: number; message?: string }
  >({
    queryKey: ["jobs", page, limit, jobType, jobMode, experience],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.set("page", page);
      params.set("limit", limit);
      if (jobType) params.set("jobType", jobType);
      if (jobMode) params.set("jobMode", jobMode);
      if (experience) params.set("experience", experience);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const body: JobListApiResponse = await res.json();

      if (!body.success) {
        throw {
          status: res.status,
          message: body.error,
        };
      }
      return body;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if (error.status === 401) return <div>{error.message}</div>;
    if (error.status === 500) return <div>{error.message}</div>;
    return <div>Error: {error.message}</div>;
  }

  const jobs = data?.data;
  const pagination: pagination | undefined = data?.pagination;

  return (
    <div>
      {jobs?.map((job) => (
        <div key={job.id}>
          <p>{job.companyName}</p>
        </div>
      ))}

      {pagination && <JobPagination totalPages={pagination.totalPages} />}
    </div>
  );
}
