"use client";

// ========================================
// Imports
// ========================================
import { useState } from "react";

// lib
import { authClient } from "@/lib/auth-client";

// components
import { ActionButton } from "@/components/shared/action-button";

// ========================================
// Resend verification button
// ========================================
export function ResendVerificationButton({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resendVerificationEmail() {
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/email-verified",
    });

    setIsLoading(false);

    if (error) {
      setError(error.message || "Something went wrong");
    } else {
      setSuccess("Verification email sent successfully");
    }
  }

  return (
    <div className="space-y-4">
      {success && (
        <div role="status" className="text-sm text-green-600">
          {success}
        </div>
      )}
      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <ActionButton onClick={resendVerificationEmail} loading={isLoading}>
        Resend verification email
      </ActionButton>
    </div>
  );
}
