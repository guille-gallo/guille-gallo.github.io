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
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-800 sm:left-1/2 sm:-translate-x-0.5" />

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
            className={`absolute left-3 top-1 h-3 w-3 rounded-full border-2 border-white bg-gray-900 dark:border-gray-950 dark:bg-white sm:left-auto ${
              index % 2 === 0 ? "sm:-right-1.5" : "sm:-left-1.5"
            }`}
          />

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {exp.role}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
              </span>
            </div>

            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {exp.company} · {exp.location}
            </p>

            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {exp.description}
            </p>

            {exp.highlights.length > 0 && (
              <ul className="mb-3 space-y-1">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 before:mr-2 before:content-['•'] dark:text-gray-400"
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
                  className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
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
