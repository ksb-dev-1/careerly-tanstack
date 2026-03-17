import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { JobListApiResponse } from "@/types/api";

function buildJobsUrl(params: Record<string, string | null>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  return `/api/job-seeker/jobs?${searchParams.toString()}`;
}

export function useFetchJobs() {
  const searchParams = useSearchParams();

  const filters = {
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "6",
    jobType: searchParams.get("jobType"),
    jobMode: searchParams.get("jobMode"),
    experience: searchParams.get("experience"),
  };

  return useQuery<JobListApiResponse, { status: number; message?: string }>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const res = await fetch(buildJobsUrl(filters));
      const body: JobListApiResponse = await res.json();

      if (!body.success) {
        throw { status: res.status, message: body.error };
      }

      return body;
    },
  });
}
