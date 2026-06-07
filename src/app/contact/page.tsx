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
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          Interested in working together or have a question? Feel free to reach out
          through any of the channels below.
        </p>
      </section>

      {/* Contact Links */}
      <div className="mx-auto max-w-xl space-y-4">
        {/* Email */}
        <a
          href={`mailto:${cvData.email}`}
          className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-elevated)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium text-foreground">Email</p>
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
          className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-elevated)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <Github className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium text-foreground">GitHub</p>
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
            className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <Linkedin className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-foreground">LinkedIn</p>
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
          className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-elevated)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium text-foreground">Location</p>
            <p className="text-sm text-muted">
              {cvData.location}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
