"use client";

import { motion } from "framer-motion";
import { Experience } from "@/lib/cv-data";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative space-y-8">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-border-on-sky sm:left-1/2 sm:-translate-x-0.5" />

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
            index % 2 === 0 ? "sm:pr-12" : "sm:ml-auto sm:pl-12"
          }`}
        >
          {/* Timeline dot */}
          <div
            className={`absolute left-3 top-1 h-3 w-3 rounded-full border-2 border-surface bg-accent sm:left-auto ${
              index % 2 === 0 ? "sm:-right-1.5" : "sm:-left-1.5"
            }`}
          />

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-glass)]">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-medium text-foreground-strong">
                {exp.role}
              </h3>
              <span className="text-xs text-muted">
                {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
              </span>
            </div>

            <p className="mb-2 text-sm text-muted">
              {exp.company} · {exp.location}
            </p>

            <p className="mb-3 text-sm text-muted">
              {exp.description}
            </p>

            {exp.highlights.length > 0 && (
              <ul className="mb-3 space-y-1">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted before:mr-2 before:content-['•']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
