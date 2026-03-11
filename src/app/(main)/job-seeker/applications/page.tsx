import { Metadata } from "next";

import { Applications } from "./applications";

export const metadata: Metadata = {
  title: "Applications - Careerly",
  description: "View all your applications.",
};

export default function ApplicationsPage() {
  return <Applications />;
}
