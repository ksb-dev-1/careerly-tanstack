// External libraries
import { Metadata } from "next";

// Internal absolute imports (@/)
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

// Page metadata
export const metadata: Metadata = {
  title: "Forgot password - Careerly",
};

// Forgot password page component
export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
