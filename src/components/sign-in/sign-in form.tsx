"use client";

// ========================================
// Imports
// ========================================
import { useState } from "react";
import { useRouter } from "next/navigation";

// lib
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";
import { signInSchema, SignInValues } from "@/lib/validation";

// components
import { PasswordField } from "../shared/password-field";
import { Spinner } from "../spinner";
import { CustomLink } from "../custom-link";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";
import { Checkbox } from "../ui/checkbox";

// 3rd party
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// ========================================
// SignInForm component
// ========================================
export function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit({ email, password, rememberMe }: SignInValues) {
    setErrorMessage("");
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message || "Something went wrong");
    } else {
      toast.success("Signed in successfully");
      router.push(ROUTES.SELECT_USER_ROLE);
    }
  }

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
          <CardTitle className="text-lg font-bold">
            Sign in to <span className="text-brand">Careerly</span>
          </CardTitle>
          <CardDescription>
            Fill in the fields below to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="custom" className="mb-4">
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="johndoe@gmail.com"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    field={field}
                    fieldState={fieldState}
                    showForgotPassword
                    placeholder="Enter your password"
                  />
                )}
              />
            </FieldGroup>

            {/* Remember me */}
            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center gap-2 mt-4">
                  <Checkbox
                    id={field.name}
                    checked={!!field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    className={`cursor-pointer ${field.value ? "bg-brand! text-white! dark:text-background! border-brand!" : ""}`}
                  />
                  <FieldLabel htmlFor={field.name} className="cursor-pointer">
                    Remember me
                  </FieldLabel>
                </div>
              )}
            />

            {/* Sign in button */}
            <Button
              variant="brand"
              disabled={loading}
              className="w-full mt-4 font-semibold"
            >
              Sign in
            </Button>
          </form>

          <div className="grid grid-cols-2 gap-4 border-t pt-6 mt-6">
            {/* Sign in with google button */}
            <Button
              variant="outline"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialSignIn("google")}
              className="w-full"
            >
              <FcGoogle /> Google {loadingProvider === "google" && <Spinner />}
            </Button>

            {/* Sign in with github button */}
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

        <CardFooter>
          <div className="flex w-full justify-center">
            <p className="text-muted-foreground text-center text-sm">
              Don&apos;t have an account?{" "}
              <CustomLink href="/sign-up" className="underline">
                Sign up
              </CustomLink>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
