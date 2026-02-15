import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

// generated
import { UserRole } from "@/generated/prisma/enums";

// lib
import { EMPLOYER_ROUTES, JOB_SEEKER_ROUTES, ROUTES } from "@/lib/routes";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // Ignore static & internal
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1️⃣ Not logged in
  if (!session?.user.id) {
    if (
      pathname === ROUTES.HOME ||
      pathname === ROUTES.SIGN_IN ||
      pathname === ROUTES.SIGN_UP
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // 2️⃣ Logged in but no role
  if (session.user.role === UserRole.NOT_ASSIGNED) {
    if (pathname === ROUTES.SELECT_USER_ROLE) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(ROUTES.SELECT_USER_ROLE, request.url));
  }

  // 3️⃣ Job Seeker
  if (session.user.role === UserRole.JOB_SEEKER) {
    if (pathname.startsWith(JOB_SEEKER_ROUTES.BASE)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(JOB_SEEKER_ROUTES.JOBS, request.url));
  }

  // 4️⃣ Employer
  if (session.user.role === UserRole.EMPLOYER) {
    if (pathname.startsWith(EMPLOYER_ROUTES.BASE)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(EMPLOYER_ROUTES.JOBS, request.url));
  }

  return NextResponse.next();
}
