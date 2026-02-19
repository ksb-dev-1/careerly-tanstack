// ========================================
// Imports
// ========================================

// lib
import { cn } from "@/lib/utils";

// 3rd party
import { LoaderCircle } from "lucide-react";

// ========================================
// Types
// ========================================
interface SpinnerProps {
  className?: string;
  size?: number;
  color?: string;
}

// ========================================
// Spinner component
// ========================================
export function Spinner({ size = 16, color, className }: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn("animate-spin", color, className)}
      size={size}
      aria-label="Loading"
    />
  );
}
