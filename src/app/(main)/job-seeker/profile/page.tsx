import { Metadata } from "next";

import { JobSeekerProfileDetails } from "./profile-details";

export const metadata: Metadata = {
  title: "Profile - Careerly",
  description: "Manage your job seeker profile easily.",
};

export default function JobSeekerProfileDetailsPage() {
  return <JobSeekerProfileDetails />;
}
