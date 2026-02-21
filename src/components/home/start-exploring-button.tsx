"use client";

import { CustomLink } from "@/components/shared/custom-link";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRole } from "@/generated/prisma/browser";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { authClient } from "@/lib/auth-client";

export function StartExploringButton() {
  const { data: session, isPending } = authClient.useSession();
  const router = useCustomRouter();

  if (isPending) {
    return (
      <Skeleton className="border text-transparent rounded-full h-14 px-6 font-medium">
        Start Exploring
      </Skeleton>
    );
  }

  if (session?.user.id && !session.user.role) {
    router.push("/select-user-role");
  }

  let href = "/sign-in";

  if (session?.user.role === UserRole.JOB_SEEKER) {
    href = "/job-seeker/jobs?page=1";
  }

  if (session?.user.role === UserRole.EMPLOYER) {
    href = "/employer/jobs?page=1";
  }

  return (
    <div className="flex items-center">
      <CustomLink
        href={href}
        className="bg-brand rounded-full px-6 py-4 hover:bg-brand-hover transition text-white dark:text-background font-semibold"
        prefetch={true}
      >
        Start Exploring
      </CustomLink>
    </div>
  );
}
