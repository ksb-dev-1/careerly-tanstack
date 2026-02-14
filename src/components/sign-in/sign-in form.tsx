"use client";

// ========================================
// Imports
// ========================================
import { useState } from "react";

// lib
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";

// components
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 3rd party
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function SignInForm() {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSocialSignIn(provider: "github" | "google") {
    setLoadingProvider(provider);
    setErrorMessage("");

    const result = await authClient.signIn.social({
      provider,
      callbackURL: ROUTES.SELECT_USER_ROLE,
    });

    if (result?.error) {
      setErrorMessage(result.error.message ?? "Something went wrong");
      setLoadingProvider(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-sm w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold">
            Sign in to <span className="text-brand">Careerly</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialSignIn("google")}
              className="w-full"
            >
              <FcGoogle /> Google {loadingProvider === "google" && <Spinner />}
            </Button>
            <Button
              variant="outline"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialSignIn("github")}
              className="w-full"
            >
              <FaGithub /> Github
              {loadingProvider === "github" && <Spinner />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
