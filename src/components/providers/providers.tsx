"use client";

// Relative imports
import { ThemeProvider } from "./theme-provider";
import { TanstackProvider } from "./tanstack-provider";
import { Toaster } from "../ui/sonner";

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
