// ========================================
// Imports
// ========================================
import { Metadata } from "next";

// components
import { SignInForm } from "@/components/sign-in/sign-in form";

// ========================================
// Metadata
// ========================================
export const metadata: Metadata = {
  title: "Sign in - Careerly",
  description: "Sign in to your Careerly account",
};

// ========================================
// Sign-in page
// ========================================
export default function SignInPage() {
  return <SignInForm />;
}
