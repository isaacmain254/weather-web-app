/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
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
          {/* TODO: Why Link does not reload a server page?? but <a></a> does */}
          <a className="link link-primary" href="/">
            Try Again
          </a>
        </div>
      </div>
    </div>
  );
}
