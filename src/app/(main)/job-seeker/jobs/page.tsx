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
    <div className="min-h-screen mt-32 mb-16">
      <Suspense fallback={<JobListSkeleton />}>
        <JobList />
      </Suspense>
    </div>
  );
}

{
  /* <div className="max-w-custom w-full mx-auto mb-6 flex flex-col items-center px-4">
          <h2 className="mb-4 font-bold">Find your perfect job</h2>
          <SearchInput />
        </div> */
}

{
  /* <Separator className="my-8" /> */
}
