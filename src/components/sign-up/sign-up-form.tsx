"use client";

// ========================================
// Imports
// ========================================
import { useState } from "react";
import { useRouter } from "next/navigation";

// lib
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";
import { signUpSchema, SignUpValues } from "@/lib/validation";

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

export function SignUpForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-sm w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Create your <span className="text-brand">Careerly</span> account
          </CardTitle>
          <CardDescription>
            Fill in the fields below to sign up to your account.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
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
