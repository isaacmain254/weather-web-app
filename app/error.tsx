"use client";

import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const handleTryAgain = () => {
    router.push("/");
    reset();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* RippleUI Alert Component */}
        <div className="alert alert-error">
          <div className="flex justify-start gap-4">
            <div>
              <h3 className="text-xl font-semibold">Something went wrong!</h3>
              <p className="mt-2 text-sm">
                {error?.message ||
                  "Failed to fetch weather data. Please try again."}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button onClick={handleTryAgain} className="btn btn-error btn-block">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
