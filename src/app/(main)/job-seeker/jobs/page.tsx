import { Metadata } from "next";

import { JobList } from "./job-list";

export const metadata: Metadata = {
  title: "Jobs - Careerly",
  description: "Easily browse job listings using filters and pagination.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <JobList />
    </div>
  );
}
