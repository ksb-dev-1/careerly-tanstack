// ========================================
// Imports
// ========================================
import { Metadata } from "next";

// components
import { SignUpForm } from "@/components/sign-up/sign-up-form";

// ========================================
// Metadata
// ========================================
export const metadata: Metadata = {
  title: "Sign up - Careerly",
  description: "Create your careerly account",
};

// ========================================
// Sign-in page
// ========================================
export default function SignUpPage() {
  return <SignUpForm />;
}
