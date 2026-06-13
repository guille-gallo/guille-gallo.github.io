import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { cvData } from "@/lib/cv-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-4 mb-4 mt-auto px-4 py-6 sm:mx-6 lg:mx-auto lg:max-w-5xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-xs text-slate-500">
            Built with Next.js & Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={cvData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-slate-900"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          {cvData.linkedin && (
            <Link
              href={cvData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-slate-900"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}
          <Link
            href={`mailto:${cvData.email}`}
            className="text-slate-500 transition-colors hover:text-slate-900"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
