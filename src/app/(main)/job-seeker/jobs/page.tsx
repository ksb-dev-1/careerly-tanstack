import { Suspense } from "react";

import { Metadata } from "next";

import { SearchInput } from "@/components/search-input";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
import { Separator } from "@/components/ui/separator";

import { JobList } from "./job-list";

export const metadata: Metadata = {
  title: "Jobs - Careerly",
  description: "Easily browse job listings using filters and pagination.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen max-w-custom mx-auto w-full mt-32 mb-16 px-4">
      <Suspense fallback={<JobListSkeleton />}>
        <JobList />
      </Suspense>
    </div>
  );
}
