import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { cvData } from "@/lib/cv-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-whisper-border bg-warm-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="mt-1 text-xs text-muted">
              Built with Next.js & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={cvData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-notion-blue"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            {cvData.linkedin && (
              <Link
                href={cvData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-notion-blue"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            <Link
              href={`mailto:${cvData.email}`}
              className="text-muted transition-colors hover:text-notion-blue"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
