"use client";

// ========================================
// Imports
// ========================================

// External libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Absolute imports
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";
import { signUpSchema, SignUpValues } from "@/lib/validation";

// Relative imports
import { ActionButton } from "../shared/action-button";
import { CustomLink } from "../shared/custom-link";
import { PasswordField } from "../shared/password-field";

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

// ========================================
// Sign-up form component
// ========================================
export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // Reset form on mount
  useEffect(() => {
    form.reset(form.formState.defaultValues);
  }, [form]);

  // Handle form submit
  async function onSubmit({ email, password, name }: SignUpValues) {
    setError(null);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      setError(error.message || "Something went wrong");
    } else {
      toast.success("Signed up successfully");
      router.push(ROUTES.VERIFY_EMAIL);
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Create your <span className="text-brand">Careerly</span> account
          </CardTitle>
          <CardDescription>
            Fill in the fields below to sign up to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Error message */}
          {error && (
            <Alert variant="error" className="mb-4 flex items-center flex-wrap">
              {error}
            </Alert>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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
                      placeholder="your@email.com"
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
                    label="Password"
                    placeholder="Create a password"
                  />
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="passwordConfirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    field={field}
                    fieldState={fieldState}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                  />
                )}
              />
            </FieldGroup>

            {/* Sign up button */}
            <ActionButton loading={loading} className="w-full mt-4">
              Create an account
            </ActionButton>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex w-full justify-center">
            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <CustomLink href="/sign-in" className="underline">
                Sign in
              </CustomLink>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
