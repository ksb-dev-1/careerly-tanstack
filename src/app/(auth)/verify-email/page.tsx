// External libraries
import type { Metadata } from "next";

// Absolute imports
import { VerifyEmailContent } from "@/components/auth/verify-email-content";

// Page metadata
export const metadata: Metadata = {
  title: "Verify Email - Careerly",
};

// Verify email page component
export default async function VerifyEmailPage() {
  return <VerifyEmailContent />;
}
