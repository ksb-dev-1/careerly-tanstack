"use client";

import { useQuery } from "@tanstack/react-query";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { JobCard } from "@/components/job-card";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
import { BookmarksApiResponse } from "@/types/api";

export function Bookmarks() {
  const { data, isLoading, error } = useQuery<
    BookmarksApiResponse,
    { status: number; message?: string }
  >({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await fetch(`/api/job-seeker/bookmarks`);
      const body: BookmarksApiResponse = await res.json();

      if (!body.success) {
        throw { status: res.status, message: body.error };
      }

      return body;
    },
  });

  if (isLoading) return <JobListSkeleton />;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  const bookmarks = data?.bookmarks;

  if (!bookmarks || bookmarks.length === 0) return <EmptyState />;

  return (
    <div className="grid md:grid-cols-1 gap-6">
      {bookmarks.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
