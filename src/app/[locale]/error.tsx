"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong!</h2>
      
      <p className="text-muted-foreground max-w-md text-center mb-8">
        We encountered an unexpected error while trying to load this page or run this test.
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-muted text-foreground px-6 py-3 rounded-full font-medium hover:bg-muted/80 transition-transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
