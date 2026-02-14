"use client";

// ----------------------------------------
// Imports
// ----------------------------------------
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// generated
import { UserRole } from "@/generated/prisma/browser";

// lib
import { authClient } from "@/lib/auth-client";

// components
import { CustomLink } from "@/components/custom-link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 3rd party
import { toast } from "sonner";
import { LogOut, User } from "lucide-react";
import { EMPLOYER_ROUTES, JOB_SEEKER_ROUTES } from "@/lib/routes";

// ----------------------------------------
// Types
// ----------------------------------------
interface ProfileDropdownProps {
  image?: string | null;
  role?: UserRole;
}

// ----------------------------------------
// Constants
// ----------------------------------------

const AVATAR_SIZE = 32;

// ----------------------------------------
// Profile dropdown component
// ----------------------------------------
export function ProfileDropdownMenu({ image, role }: ProfileDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    setOpen(false);
    setIsSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
        },
      });

      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  let profileRoute;

  if (role === UserRole.JOB_SEEKER) {
    profileRoute = JOB_SEEKER_ROUTES.PROFILE();
  } else if (role === UserRole.EMPLOYER) {
    profileRoute = EMPLOYER_ROUTES.PROFILE;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full ml-2"
        aria-label="Open user menu"
      >
        <Avatar>
          {image ? (
            <Image
              src={image}
              alt="Profile picture"
              height={AVATAR_SIZE}
              width={AVATAR_SIZE}
              className="border rounded-full object-cover"
            />
          ) : (
            <AvatarFallback>
              <User size={16} aria-hidden="true" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {profileRoute && (
          <DropdownMenuItem asChild onClick={() => setOpen(false)}>
            <CustomLink
              href={profileRoute}
              className="cursor-pointer"
              prefetch={false}
              isActive={path === profileRoute}
            >
              <User className="mr-2 h-4 w-4" aria-hidden="true" />
              Profile
            </CustomLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          disabled={isSigningOut}
          onClick={handleSignOut}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          {isSigningOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
