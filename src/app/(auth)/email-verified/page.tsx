// ========================================
// Imports
// ========================================
import type { Metadata } from "next";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";

// ========================================
// Metadata
// ========================================
export const metadata: Metadata = {
  title: "Email Verified",
};

// ========================================
// Email verified page
// ========================================
export default function EmailVerifiedPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Email verified</h1>
          <p className="text-muted-foreground">
            Your email has been verified successfully.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
