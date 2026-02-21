"use client";

// ========================================
// Imports
// ========================================
import { Toaster } from "../ui/sonner";
import { TanstackProvider } from "./tanstack-provider";
import { ThemeProvider } from "./theme-provider";

// ========================================
// Providers component
// ========================================
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </TanstackProvider>
  );
}
