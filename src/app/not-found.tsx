import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <h1 className="mb-4 text-6xl font-bold text-heading">
        404
      </h1>
      <p className="mb-8 text-xl text-muted">
        Page not found. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-notion-blue px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-notion-blue-hover"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
