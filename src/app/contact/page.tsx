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
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Interested in working together or have a question? Feel free to reach out
          through any of the channels below.
        </p>
      </section>

      {/* Contact Links */}
      <div className="mx-auto max-w-xl space-y-4">
        {/* Email */}
        <a
          href={`mailto:${cvData.email}`}
          className="flex items-center gap-4 rounded-xl bg-white p-5 transition-all hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <Mail className="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Email</p>
            <p className="text-sm text-slate-500">
              {cvData.email}
            </p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={cvData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl bg-white p-5 transition-all hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <Github className="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <p className="font-medium text-slate-900">GitHub</p>
            <p className="text-sm text-slate-500">
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
            className="flex items-center gap-4 rounded-xl bg-white p-5 transition-all hover:shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Linkedin className="h-6 w-6 text-slate-700" />
            </div>
            <div>
              <p className="font-medium text-slate-900">LinkedIn</p>
              <p className="text-sm text-slate-500">
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
          className="flex items-center gap-4 rounded-xl bg-white p-5 transition-all hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <MapPin className="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Location</p>
            <p className="text-sm text-slate-500">
              {cvData.location}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
