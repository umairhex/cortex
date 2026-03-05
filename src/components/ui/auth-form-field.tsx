import { Input } from "./input";
import { Label } from "./label";
import { Eye, EyeOff } from "lucide-react";
import type * as React from "react";

export interface AuthFormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const AuthFormField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  showPasswordToggle = false,
  showPassword = false,
  togglePassword,
  inputProps,
}: AuthFormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword && showPasswordToggle ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={
            "h-12 pr-10 bg-background border-border/60 focus:border-primary " +
            className
          }
          {...inputProps}
        />
        {showPasswordToggle && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
