import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthFormField } from "./auth-form-field";
import whiteLogo from "@/assets/white-logo.svg";
import blackLogo from "@/assets/black-logo.svg";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AuthCharacters } from "@/components/ui/auth-characters";

export interface AnimatedCharactersAuthPageProps {
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  loadingLabel?: string;
  isSubmitting?: boolean;
  error?: string;
  onSubmit?: (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
  bottomLinkText?: string;
  bottomLinkLabel?: string;
  bottomLinkHref?: string;
  showConfirmPassword?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
}

function AnimatedCharactersAuthPage({
  heading = "Welcome back!",
  subheading = "Please enter your details",
  submitLabel = "Log in",
  loadingLabel = "Signing in...",
  isSubmitting = false,
  error: externalError,
  onSubmit,
  bottomLinkText = "Don't have an account?",
  bottomLinkLabel = "Sign Up",
  bottomLinkHref = "/signup",
  showConfirmPassword = false,
  showRememberMe = true,
  showForgotPassword = true,
}: AnimatedCharactersAuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [internalError, setInternalError] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const error = externalError || internalError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError("");

    if (showConfirmPassword && password !== confirmPassword) {
      setInternalError("Passwords don't match");
      return;
    }

    if (onSubmit) {
      onSubmit({
        email,
        password,
        ...(showConfirmPassword ? { confirmPassword } : {}),
      });
    }
  };

  return (
    <div className="min-h-screen relative grid lg:grid-cols-2">
      <div className="absolute top-6 right-6 z-50">
        <AnimatedThemeToggler />
      </div>
      <div className="relative hidden lg:flex flex-col justify-between bg-linear-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground">
        <div className="relative z-20">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold"
          >
            <img
              src={whiteLogo}
              alt="Cortex Logo"
              className="h-7 w-auto animate-spin"
            />
            <p className="text-white">Cortex</p>
          </Link>
        </div>

        <AuthCharacters
          isTyping={isTyping}
          passwordLength={password.length}
          showPassword={showPassword}
        />

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
          <a
            href="#"
            className="hover:text-primary-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-primary-foreground transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-primary-foreground transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-105">
          <div className="lg:hidden flex items-center justify-center gap-3 text-lg font-semibold mb-12">
            <img
              src={blackLogo}
              alt="Cortex Logo"
              className="h-7 w-auto dark:hidden"
            />
            <img
              src={whiteLogo}
              alt="Cortex Logo"
              className="h-7 w-auto hidden dark:block"
            />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {heading}
            </h1>
            <p className="text-muted-foreground text-sm">{subheading}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthFormField
              id="email"
              label="Email"
              type="email"
              placeholder="anna@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              inputProps={{
                onFocus: () => setIsTyping(true),
                onBlur: () => setIsTyping(false),
                autoComplete: "off",
              }}
            />

            <AuthFormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              showPasswordToggle
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            {showConfirmPassword && (
              <AuthFormField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                showPasswordToggle
                showPassword={showPassword}
              />
            )}

            {(showRememberMe || showForgotPassword) && (
              <div className="flex items-center justify-between">
                {showRememberMe && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Remember for 30 days
                    </Label>
                  </div>
                )}
                {showForgotPassword && (
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
            )}

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? loadingLabel : submitLabel}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground mt-8">
            {bottomLinkText}{" "}
            <Link
              to={bottomLinkHref}
              className="text-foreground font-medium hover:underline"
            >
              {bottomLinkLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedCharactersAuthPage };
