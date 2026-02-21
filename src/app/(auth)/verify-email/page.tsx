import type { Metadata } from "next";

import { VerifyEmailContent } from "@/components/auth/verify-email-content";

export const metadata: Metadata = {
  title: "Verify Email - Careerly",
};

export default async function VerifyEmailPage() {
  return <VerifyEmailContent />;
}
