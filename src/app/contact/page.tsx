import { Metadata } from "next";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { cvData } from "@/lib/cv-data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${cvData.name}. Available for new opportunities and collaborations.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-medium tracking-tight text-on-sky sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-on-sky-muted">
          Interested in working together or have a question? Feel free to reach out
          through any of the channels below.
        </p>
      </section>

      {/* Contact Links — surface panel over the sky canvas */}
      <div className="mx-auto max-w-xl space-y-3 rounded-2xl bg-surface p-6 shadow-[var(--shadow-glass)]">
        {/* Email */}
        <a
          href={`mailto:${cvData.email}`}
          className="flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors group-hover:text-accent">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-foreground-strong">Email</p>
            <p className="text-sm text-muted">
              {cvData.email}
            </p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={cvData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-foreground">
            <Github className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-foreground-strong">GitHub</p>
            <p className="text-sm text-muted">
              github.com/guille-gallo
            </p>
          </div>
        </a>

        {/* LinkedIn */}
        {cvData.linkedin && (
          <a
            href={cvData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-foreground">
              <Linkedin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-foreground-strong">LinkedIn</p>
              <p className="text-sm text-muted">
                Connect on LinkedIn
              </p>
            </div>
          </a>
        )}

        {/* Location */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cvData.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-foreground-strong">Location</p>
            <p className="text-sm text-muted">
              {cvData.location}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
