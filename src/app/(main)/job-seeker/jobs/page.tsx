"use client";

import { useClientSession } from "@/hooks/useClientSession";
export default function JobsPage() {
  const { data: session } = useClientSession();
  console.log(session);
  return <div>JobsPage</div>;
}
