"use client";

import { useQuery } from "@tanstack/react-query";

export function JobList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetch("/api/jobs").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-custom w-full mx-auto my-16">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-custom w-full mx-auto my-16">
      Job List
    </div>
  );
}
