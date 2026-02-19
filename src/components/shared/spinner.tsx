"use client";

// External libraries
import { LoaderCircle } from "lucide-react";

// Absolute imports
import { cn } from "@/lib/utils";

// Types
interface SpinnerProps {
  className?: string;
  size?: number;
  color?: string;
}

// Spinner component
export function Spinner({ size = 16, color, className }: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn("animate-spin", color, className)}
      size={size}
      aria-label="Loading"
    />
  );
}
