"use client";

// ========================================
// Imports
// ========================================
import { useState } from "react";
import { ControllerRenderProps, ControllerFieldState } from "react-hook-form";

// components
import { CustomLink } from "../custom-link";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

// 3rd party
import { Eye, EyeOff } from "lucide-react";

// ========================================
// Types
// ========================================
type PasswordFieldProps = {
  field: ControllerRenderProps<any, "password">;
  fieldState: ControllerFieldState;
};

// ========================================
// PasswordField component
// ========================================
export function PasswordField({ field, fieldState }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e); // VERY IMPORTANT
    if (!e.target.value) {
      setShowPassword(false);
    }
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <CustomLink href="#" className="underline text-sm">
          Forgot your password?
        </CustomLink>
      </div>

      <div className="relative">
        <Input
          {...field}
          id="password"
          type={showPassword ? "text" : "password"}
          aria-invalid={fieldState.invalid}
          placeholder="Enter your password"
          autoComplete="off"
          onChange={handleChange}
          className="pr-10"
        />

        {field.value && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
