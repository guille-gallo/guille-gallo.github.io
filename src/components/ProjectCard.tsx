"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { FeaturedProject, getProjectDescription } from "@/lib/projects";

interface ProjectCardProps {
  project: FeaturedProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const description = getProjectDescription(project);
  const githubData = project.githubData;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {project.repoName}
        </h3>
        {githubData?.language && (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {githubData.language}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 flex-grow text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Topics */}
      {githubData?.topics && githubData.topics.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {githubData.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Stats & Links */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {githubData && (
            <>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {githubData.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                {githubData.forks_count}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {githubData?.html_url && (
            <a
              href={githubData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {githubData?.homepage && (
            <a
              href={githubData.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="View live demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
