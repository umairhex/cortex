import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AnimatedCharactersAuthPage } from "@/components/ui/animated-characters-login-page";
import { useAuth } from "../hooks/useAuth.tsx";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signup(data.email, data.password);
      if (result.success) {
        toast.success("Account created successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(result.error || "Failed to create account");
        toast.error(result.error || "Failed to create account");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedCharactersAuthPage
      heading="Create an account"
      subheading="Enter your details to get started"
      submitLabel="Sign Up"
      loadingLabel="Creating account..."
      isSubmitting={isLoading}
      error={error}
      onSubmit={handleSubmit}
      showConfirmPassword={true}
      bottomLinkText="Already have an account?"
      bottomLinkLabel="Sign In"
      bottomLinkHref="/signin"
      showRememberMe={false}
      showForgotPassword={false}
    />
  );
}
