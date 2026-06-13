"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { FeaturedProject, getProjectDescription } from "@/lib/projects";

interface ProjectCardProps {
  project: FeaturedProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const description = getProjectDescription(project);
  const githubData = project.githubData;
  const shownFromGitHub = new Set([
    ...(githubData?.language ? [githubData.language.toLowerCase()] : []),
    ...(githubData?.topics?.slice(0, 4).map((t) => t.toLowerCase()) ?? []),
  ]);
  const extraPills = (project.extraPills ?? []).filter(
    (pill) => !shownFromGitHub.has(pill.toLowerCase())
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-panel group relative flex h-full cursor-pointer flex-col p-4"
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          {githubData?.html_url ? (
            <a
              href={githubData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600"
            >
              {project.repoName}
            </a>
          ) : (
            project.repoName
          )}
        </h3>
        {project.vercelUrl && (
          <a
            href={project.vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-200"
          >
            <ExternalLink className="h-3 w-3" />
            Live Demo
          </a>
        )}
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-3 flex-grow text-sm text-slate-500">
        {description}
      </p>

      {/* Topics & Link */}
      <div className="mt-auto flex items-start gap-2 pt-2">
        {(githubData?.language || githubData?.topics?.length || extraPills.length > 0) && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {githubData?.language && (
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">
                {githubData.language}
              </span>
            )}
            {githubData?.topics?.slice(0, 4).map((topic) => (
              <span key={topic} className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">
                {topic}
              </span>
            ))}
            {extraPills.map((pill) => (
              <span key={pill} className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">
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
            className="ml-auto shrink-0 self-end rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
