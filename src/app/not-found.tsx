import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <h1 className="mb-4 text-6xl font-medium text-on-sky sm:text-8xl">
        404
      </h1>
      <p className="mb-8 text-xl text-on-sky-muted">
        Page not found. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-accent bg-transparent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
