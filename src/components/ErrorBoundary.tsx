import { AlertTriangle, Copy, RefreshCw } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleCopyError = () => {
    if (this.state.error) {
      navigator.clipboard.writeText(
        `${this.state.error.toString()}\n${this.state.error.stack || ""}`,
      );
      toast.success("Error details copied to clipboard!");
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-center p-6 bg-background">
          <Card className="w-full max-w-md border-destructive/30 shadow-sm animate-in fade-in duration-300 zoom-in-95">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">Something went wrong</CardTitle>
              <CardDescription className="text-sm">
                We encountered an unexpected error. Please try refreshing the
                page or contact support if the problem persists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {this.state.error && (
                <div className="relative group p-4 bg-muted/50 rounded-lg border text-sm font-mono overflow-auto max-h-75 text-muted-foreground">
                  <span className="block mb-2 font-semibold text-foreground break-all">
                    {this.state.error.name}: {this.state.error.message}
                  </span>
                  {this.state.error.stack && (
                    <span className="whitespace-pre-wrap text-xs opacity-80 break-all">
                      {this.state.error.stack}
                    </span>
                  )}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 focus:opacity-100 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background border shadow-sm backdrop-blur-sm"
                    onClick={this.handleCopyError}
                    title="Copy Error"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center gap-2 pb-6">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
