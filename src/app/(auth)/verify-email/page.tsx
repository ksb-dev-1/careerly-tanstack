// ========================================
// Imports
// ========================================
import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// generated
import { UserRole } from "@/generated/prisma/enums";

// lib
import { getServerSession } from "@/lib/get-server-session";
import { EMPLOYER_ROUTES, JOB_SEEKER_ROUTES, ROUTES } from "@/lib/routes";

// components
import { LoadingFallback } from "@/components/shared/loading-fallback";

import { ResendVerificationButton } from "./resend-verification-button";

// ========================================
// Metadata
// ========================================
export const metadata: Metadata = {
  title: "Verify Email",
};

// ========================================
// Verify email page
// ========================================

async function VerifyEmailContent() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect(ROUTES.SIGN_IN);

  // const roleRedirectMap: Record<UserRole, string> = {
  //   [UserRole.JOB_SEEKER]: JOB_SEEKER_ROUTES.JOBS,
  //   [UserRole.EMPLOYER]: EMPLOYER_ROUTES.JOBS,
  //   [UserRole.NOT_ASSIGNED]: ROUTES.SELECT_USER_ROLE,
  // };

  // if (user.emailVerified) {
  //   // if (user.role === UserRole.JOB_SEEKER) redirect(JOB_SEEKER_ROUTES.JOBS);
  //   // if (user.role === UserRole.EMPLOYER) redirect(EMPLOYER_ROUTES.JOBS);
  //   // if (user.role === UserRole.NOT_ASSIGNED) redirect(ROUTES.SELECT_USER_ROLE);
  //   redirect(roleRedirectMap[user.role as UserRole]);
  // }

  return (
    <div className="min-h-screen flex flex-1 items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Verify your email</h1>
          <p className="text-slate-600 dark:text-muted-foreground">
            A verification email was sent to your inbox.
          </p>
        </div>
        <ResendVerificationButton email={user.email} />
      </div>
    </div>
  );
}
export default async function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback color="text-brand" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
