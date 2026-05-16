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
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex h-full flex-col rounded-xl border border-whisper-border bg-surface p-5 shadow-notion transition-all hover:shadow-notion-deep"
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-base font-bold tracking-tight text-heading">
          {githubData?.html_url ? (
            <a
              href={githubData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-notion-blue"
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
            className="inline-flex items-center gap-1 rounded-full bg-notion-blue-tint px-2 py-0.5 text-[11px] font-semibold tracking-wide text-notion-blue-text transition-colors hover:bg-notion-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-notion-blue-focus"
          >
            <ExternalLink className="h-3 w-3" />
            Live Demo
          </a>
        )}
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-3 flex-grow text-sm text-muted">
        {description}
      </p>

      {/* Topics & Link */}
      <div className="mt-auto flex items-start gap-2 pt-2">
        {(githubData?.language || githubData?.topics?.length || extraPills.length > 0) && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {githubData?.language && (
              <span
                className="rounded-full bg-notion-blue-tint px-2 py-0.5 text-[11px] font-semibold tracking-wide text-notion-blue-text"
              >
                {githubData.language}
              </span>
            )}
            {githubData?.topics?.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-whisper-border bg-warm-white px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted"
              >
                {topic}
              </span>
            ))}
            {extraPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-whisper-border bg-warm-white px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted"
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
            className="ml-auto shrink-0 self-end rounded-md p-1 text-muted transition-colors hover:bg-warm-white hover:text-notion-blue"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
