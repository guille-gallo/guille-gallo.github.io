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
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Interested in working together or have a question? Feel free to reach out
          through any of the channels below.
        </p>
      </section>

      {/* Contact Links */}
      <div className="mx-auto max-w-xl space-y-4">
        {/* Email */}
        <a
          href={`mailto:${cvData.email}`}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Email</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {cvData.email}
            </p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={cvData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
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
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
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
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <MapPin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Location</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {cvData.location}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
