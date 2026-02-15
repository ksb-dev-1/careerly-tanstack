"use client";

// ========================================
// Imports
// ========================================
import { useState } from "react";
import { useRouter } from "next/navigation";

// lib
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";

// components
import { Spinner } from "../spinner";
import { PasswordField } from "./password-field";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";
import { Checkbox } from "../ui/checkbox";

// 3rd party
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// ========================================
// Zod schema
// ========================================
const signInSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});
type SignInValues = z.infer<typeof signInSchema>;

// ========================================
// SignInForm component
// ========================================
export function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("tyhthtyhnth");
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
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold">
            Sign in to <span className="text-brand">Careerly</span>
          </CardTitle>
          <CardDescription>
            Enter your email and password below to login into your account
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
                  <PasswordField field={field} fieldState={fieldState} />
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
                    className={`${field.value ? "bg-brand! text-white! dark:text-background! border-brand!" : ""}`}
                  />
                  <FieldLabel htmlFor={field.name} className="cursor-pointer">
                    Remember me
                  </FieldLabel>
                </div>
              )}
            />

            {/* Sign in button */}
            <Button variant="brand" disabled={loading} className="w-full mt-4">
              Sign in
            </Button>
          </form>

          <div className="relative border-t my-8">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-slate-600 dark:text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialSignIn("google")}
              className="w-full"
            >
              <FcGoogle /> Sign in with Google{" "}
              {loadingProvider === "google" && <Spinner />}
            </Button>
            <Button
              variant="outline"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialSignIn("github")}
              className="w-full"
            >
              <FaGithub /> Sign in with Github
              {loadingProvider === "github" && <Spinner />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
