import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { cvData } from "@/lib/cv-data";

export function Footer() {
  return (
    <footer className="border-t border-border-on-sky bg-white/65 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="mt-1 text-xs text-on-sky-muted">
              Built with Next.js & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={cvData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-sky-muted transition-colors hover:text-on-sky"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            {cvData.linkedin && (
              <Link
                href={cvData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-sky-muted transition-colors hover:text-on-sky"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            <Link
              href={`mailto:${cvData.email}`}
              className="text-on-sky-muted transition-colors hover:text-on-sky"
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
