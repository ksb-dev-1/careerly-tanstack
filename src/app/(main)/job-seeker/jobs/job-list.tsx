"use client";

import { useQuery } from "@tanstack/react-query";

import { JobListApiResponse, JobListItem } from "@/types/api";

export function JobList() {
  const { data, isLoading, error } = useQuery<
    JobListItem[],
    { status: number; message?: string }
  >({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch("/api/jobs");
      const body: JobListApiResponse = await res.json();

      if (!body.success) {
        throw {
          status: res.status,
          message: body.error,
        };
      }

      return body.data ?? [];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-custom w-full mx-auto my-16">
        Loading...
      </div>
    );
  }

  if (error) {
    if (error.status === 401)
      return (
        <div className="min-h-screen max-w-custom w-full mx-auto my-16">
          {error.message}
        </div>
      );

    if (error.status === 500)
      return (
        <div className="min-h-screen max-w-custom w-full mx-auto my-16">
          {error.message}
        </div>
      );

    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen max-w-custom w-full mx-auto my-16">
      {data?.map((job) => (
        <div key={job.id}>{job.companyName}</div>
      ))}
    </div>
  );
}
