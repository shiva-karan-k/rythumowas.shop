"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Page not found</h1>
      <p className="text-gray-600">We couldn&apos;t find what you were looking for.</p>
      <div className="flex gap-3">
        <Link href="/" className="text-green-700 hover:text-green-800 underline">
          Go home
        </Link>
        <Link href="/shop" className="text-green-700 hover:text-green-800 underline">
          Shop
        </Link>
      </div>
    </div>
  );
}

