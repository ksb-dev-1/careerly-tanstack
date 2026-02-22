"use client";

import { useEffect } from "react";

import { CustomLink } from "@/components/shared/custom-link";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRole } from "@/generated/prisma/browser";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { authClient } from "@/lib/auth-client";
import { EMPLOYER_ROUTES, JOB_SEEKER_ROUTES, ROUTES } from "@/lib/routes";

export function StartExploringButton() {
  const { data: session, isPending } = authClient.useSession();
  const router = useCustomRouter();

  useEffect(() => {
    if (session?.user.id && !session.user.role) {
      router.push(ROUTES.SELECT_USER_ROLE);
    }
  }, [session, router]);

  if (isPending) {
    return (
      <Skeleton className="border text-transparent rounded-full h-14 px-6 font-medium">
        Start Exploring
      </Skeleton>
    );
  }

  let href: string = ROUTES.SIGN_IN;

  if (session?.user.role === UserRole.JOB_SEEKER) {
    href = JOB_SEEKER_ROUTES.JOBS;
  }

  if (session?.user.role === UserRole.EMPLOYER) {
    href = EMPLOYER_ROUTES.JOBS;
  }

  return (
    <div className="flex items-center">
      <CustomLink
        href={href}
        className="bg-brand rounded-full px-6 py-4 hover:bg-brand-hover transition text-white dark:text-background font-semibold"
        prefetch
      >
        Start Exploring
      </CustomLink>
    </div>
  );
}
