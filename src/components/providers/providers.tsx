"use client";

// components
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackProvider } from "@/components/providers/tanstack-provider";

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
      </ThemeProvider>
    </TanstackProvider>
  );
}
