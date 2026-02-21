"use client";

import { Suspense, useState } from "react";

import { usePathname } from "next/navigation";

import {
  Bookmark,
  BriefcaseBusiness,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { toast } from "sonner";

import { UserRole } from "@/generated/prisma/browser";
import { useAutoCloseOnGreaterThanOrEqualToBreakpoint } from "@/hooks/useAutoCloseModalOnBreakPoint";
import { Session as UserSession } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

import { ProfileDropdownMenu } from "./profile-dropdown-menu";
import { CustomLink } from "./shared/custom-link";
import { ThemeSwitch } from "./theme-switch";
import { ThemeSwitchMobile } from "./theme-switch-mobile";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";

type Session = typeof authClient.$Infer.Session | null;

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const JOB_SEEKER_NAV_ITEMS: NavItem[] = [
  {
    href: "/job-seeker/jobs?page=1",
    label: "Jobs",
    icon: <BriefcaseBusiness size={16} />,
  },
  {
    href: "/job-seeker/bookmarks",
    label: "Bookmarks",
    icon: <Bookmark size={16} />,
  },
  {
    href: "/job-seeker/applications",
    label: "Applications",
    icon: <FileText size={16} />,
  },
];

const EMPLOYER_NAV_ITEMS: NavItem[] = [
  {
    href: "/employer/jobs?page=1",
    label: "Posted Jobs",
    icon: <BriefcaseBusiness size={16} />,
  },
];

function NavbarWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const path = usePathname();

  return (
    <header className="w-full border-b h-16 bg-background flex items-center justify-center">
      <nav className="w-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <Suspense>
            <SideMenu session={session} />
          </Suspense>

          <CustomLink
            href="/"
            className="font-extrabold text-2xl text-brand hover:text-brand-hover transition-colors"
            isActive={path === "/"}
          >
            Careerly
          </CustomLink>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {children}
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}

function NavbarLoading({ session }: { session: Session }) {
  return (
    <NavbarWrapper session={session}>
      <div className="flex items-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20" />
        ))}
        <span className="inline-block h-5 border-r-2 mx-2" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
    </NavbarWrapper>
  );
}

function NavbarWithoutAuth({ session }: { session: Session }) {
  const path = usePathname();

  return (
    <NavbarWrapper session={session}>
      <Button asChild size="sm" variant="outline">
        <CustomLink href="/sign-in" isActive={path === "/sign-in"}>
          Sign in
        </CustomLink>
      </Button>
    </NavbarWrapper>
  );
}

function NavbarWithAuth({ session }: { session: UserSession }) {
  return (
    <NavbarWrapper session={session}>
      <ProfileDropdownMenu
        image={session.user.image}
        role={session.user.role as UserRole}
      />
    </NavbarWrapper>
  );
}

function JobSeekerNavbar({ session }: { session: UserSession }) {
  const path = usePathname();

  return (
    <NavbarWrapper session={session}>
      <div className="flex items-center gap-2">
        {JOB_SEEKER_NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = path === href.split("?")[0];

          return (
            <Button
              key={href}
              asChild
              size="sm"
              variant="ghost"
              className={isActive ? "text-brand hover:text-brand" : ""}
            >
              <CustomLink href={href} prefetch={false} isActive={isActive}>
                {icon}
                {label}
              </CustomLink>
            </Button>
          );
        })}
        <span className="inline-block h-5 border-r-2" />
      </div>

      <ProfileDropdownMenu
        image={session.user.image}
        role={session.user.role as UserRole}
      />
    </NavbarWrapper>
  );
}

function EmployerNavbar({ session }: { session: UserSession }) {
  const path = usePathname();

  return (
    <NavbarWrapper session={session}>
      <div className="flex items-center gap-2">
        {EMPLOYER_NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = path === href.split("?")[0];

          return (
            <Button
              key={href}
              asChild
              size="sm"
              variant="ghost"
              className={isActive ? "text-brand hover:text-brand" : ""}
            >
              <CustomLink href={href} prefetch={false} isActive={isActive}>
                {icon}
                {label}
              </CustomLink>
            </Button>
          );
        })}
        <span className="inline-block h-5 border-r-2" />
      </div>

      <ProfileDropdownMenu
        image={session.user.image}
        role={session.user.role as UserRole}
      />
    </NavbarWrapper>
  );
}

function SideMenu({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  useAutoCloseOnGreaterThanOrEqualToBreakpoint(isOpen, setIsOpen);

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="mr-3 md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-48 gap-0 p-0!">
        <SheetHeader className="p-0!">
          <SheetTitle className="text-brand text-2xl font-extrabold border-b h-16 p-4">
            Careerly
          </SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between p-4">
          <div className="flex flex-col gap-2">
            {!session?.user?.id && (
              <CustomLink href="/sign-in" isActive={path === "/sign-in"}>
                Sign In
              </CustomLink>
            )}

            {session?.user?.role === UserRole.JOB_SEEKER &&
              JOB_SEEKER_NAV_ITEMS.map(({ href, label }) => (
                <CustomLink key={href} href={href}>
                  {label}
                </CustomLink>
              ))}

            {session?.user?.role === UserRole.EMPLOYER &&
              EMPLOYER_NAV_ITEMS.map(({ href, label }) => (
                <CustomLink key={href} href={href}>
                  {label}
                </CustomLink>
              ))}

            {session?.user?.id && (
              <Button variant="link" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            )}
          </div>

          <ThemeSwitchMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <NavbarLoading session={session} />;

  if (session?.user?.role === UserRole.JOB_SEEKER)
    return <JobSeekerNavbar session={session} />;

  if (session?.user?.role === UserRole.EMPLOYER)
    return <EmployerNavbar session={session} />;

  if (session?.user?.id) return <NavbarWithAuth session={session} />;

  return <NavbarWithoutAuth session={session} />;
}
