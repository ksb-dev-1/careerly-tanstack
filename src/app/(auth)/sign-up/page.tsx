// External libraries
import { Metadata } from "next";

// Absolute imports
import { SignUpForm } from "@/components/auth/sign-up-form";

// Page metadata
export const metadata: Metadata = {
  title: "Sign up - Careerly",
};

// Sign-up page component
export default function SignUpPage() {
  return <SignUpForm />;
}
