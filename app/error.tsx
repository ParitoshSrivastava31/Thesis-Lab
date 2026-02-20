"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] h-full bg-bg-void text-text-primary p-6">
        <AlertTriangle className="w-12 h-12 text-negative mb-4 opacity-80" />
        <h2 className="text-xl font-syne font-bold mb-2">Simulation Engine Stalled</h2>
        <p className="text-text-secondary text-sm mb-6 max-w-md text-center">
            The constellation encountered an unexpected anomaly. Data propagation has been halted to prevent corruption.
        </p>
        <Button onClick={() => reset()} className="bg-brand-primary">
            Restart Engine
        </Button>
    </div>
  );
}
