import { Suspense } from "react";

import { Metadata } from "next";

import { JobDetails } from "./job-details";

export const metadata: Metadata = {
  title: "Job Details - Careerly",
  description:
    "Explore job details, requirements, and company information, and apply for the job.",
};

export default function JobsDetailsPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <JobDetails />
      </Suspense>
    </div>
  );
}
