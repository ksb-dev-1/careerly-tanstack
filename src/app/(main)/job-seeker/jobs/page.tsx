import { Metadata } from "next";

import { JobList } from "./job-list";

export const metadata: Metadata = {
  title: "Jobs - Careerly",
  description: "Easily browse job listings using filters and pagination.",
};

export default function JobsPage() {
  return <JobList />;
}
