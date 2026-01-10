"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Github } from "lucide-react";
import { FeaturedProject, getProjectDescription } from "@/lib/projects";

interface ProjectCardProps {
  project: FeaturedProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const description = getProjectDescription(project);
  const githubData = project.githubData;
  const extraPills = project.extraPills ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {githubData?.html_url ? (
            <a
              href={githubData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              {project.repoName}
            </a>
          ) : (
            project.repoName
          )}
        </h3>
        {githubData?.language && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {githubData.language}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-3 flex-grow text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Topics & Link */}
      <div className="mt-auto flex items-start gap-2 pt-2">
        {(githubData?.topics?.length || extraPills.length) > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {githubData?.topics?.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {topic}
              </span>
            ))}
            {extraPills.map((pill) => (
              <span
                key={pill}
                className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        {githubData?.html_url && (
          <a
            href={githubData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 rounded-lg p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
