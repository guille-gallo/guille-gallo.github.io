import { Metadata } from "next";
import { Download } from "lucide-react";
import { SkillsSection, ExperienceTimeline } from "@/components";
import { cvData } from "@/lib/cv-data";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${cvData.name} - ${cvData.title}. Experience, skills, and background.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          About Me
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          {cvData.bio}
        </p>
        
        {/* Download Resume Button */}
        <div className="mt-6">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Experience
        </h2>
        <ExperienceTimeline experiences={cvData.experience} />
      </section>

      {/* Education Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>
        <div className="space-y-4">
          {cvData.education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {edu.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Skills
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <SkillsSection skills={cvData.skills} />
        </div>
      </section>
    </div>
  );
}
