"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  console.log(session);

  async function handleSocialSignIn(provider: "github" | "google") {
    try {
      setLoading(true);
      setErrorMessage("");

      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/sign-in",
      });

      if (result?.error) {
        setErrorMessage(result.error.message ?? "Something went wrong");
        setLoading(false); // only stop loading if we stay on page
      }

      // IMPORTANT:
      // If signIn triggers a redirect (which it usually does),
      // code below may never execute because page unloads.
    } catch (err) {
      console.error("Social sign-in failed:", err);
      setErrorMessage("Unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={() => handleSocialSignIn("google")}
      >
        Google
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => handleSocialSignIn("github")}
      >
        Github
      </button>
    </div>
  );
}
