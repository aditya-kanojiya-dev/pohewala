"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-black text-[#FCEE57] font-serif">
          Something went wrong
        </h2>
        <p className="text-sm text-[#BCBCBC]">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-[#FCEE57] hover:bg-black hover:text-[#FCEE57] text-black font-bold px-6 py-2.5 rounded-lg transition cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
