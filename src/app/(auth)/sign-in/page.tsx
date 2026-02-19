// External libraries
import { Metadata } from "next";

// Internal absolute imports (@/)
import { SignInForm } from "@/components/auth/sign-in form";

// Page metadata
export const metadata: Metadata = {
  title: "Sign in - Careerly",
};

// Sign-in page component
export default function SignInPage() {
  return <SignInForm />;
}
