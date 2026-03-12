import { Suspense } from "react";

import { Public_Sans } from "next/font/google";

import { NavigationProgress } from "@/components/navigation-progress";
import { Providers } from "@/components/providers/providers";

import "./globals.css";

const fontFamily = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontFamily.className}  antialiased`}>
        <Suspense>
          <NavigationProgress />
        </Suspense>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
