import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AnimatedCharactersAuthPage } from "@/components/ui/animated-characters-login-page";
import { useAuth } from "../hooks/useAuth.tsx";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success("Signed in successfully!");
        navigate(from, { replace: true });
      } else {
        setError(result.error || "Invalid email or password");
        toast.error(result.error || "Invalid email or password");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedCharactersAuthPage
      heading="Welcome back!"
      subheading="Please enter your details to sign in"
      submitLabel="Sign In"
      loadingLabel="Signing in..."
      isSubmitting={isLoading}
      error={error}
      onSubmit={handleSubmit}
      bottomLinkText="Don't have an account?"
      bottomLinkLabel="Sign Up"
      bottomLinkHref="/signup"
      showRememberMe={true}
      showForgotPassword={true}
    />
  );
}
