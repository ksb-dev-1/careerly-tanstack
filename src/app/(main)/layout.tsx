// Absolute imports
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Main layout component
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
