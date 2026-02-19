import { cache } from "react";
import { headers } from "next/headers";

// auth
import { auth } from "@/lib/auth";

export const getServerSession = cache(async () => {
  console.log("getServerSession");
  return await auth.api.getSession({ headers: await headers() });
});
