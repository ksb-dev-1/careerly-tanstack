"use client";

// ========================================
// Imports
// ========================================
import { ThemeProvider as NextThemesProvider } from "next-themes";

// ========================================
// Theme provider component
// ========================================
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
