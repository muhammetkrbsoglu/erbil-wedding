'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary/20 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Bir şeyler yanlış gitti!
        </h2>
          <p className="text-neutral mb-6">
          {error.message || 'Beklenmeyen bir hata oluştu.'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Tekrar Dene
          </button>
          <a
            href="/"
            className="bg-neutral text-white px-4 py-2 rounded hover:opacity-90 transition-colors"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
