import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
        404
      </h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
        Page not found. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
