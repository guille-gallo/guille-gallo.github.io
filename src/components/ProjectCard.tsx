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
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-glass)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground">
          {githubData?.html_url ? (
            <a
              href={githubData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
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
            className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
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
                className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] text-accent"
              >
                {githubData.language}
              </span>
            )}
            {githubData?.topics?.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] text-accent"
              >
                {topic}
              </span>
            ))}
            {extraPills.map((pill) => (
              <span
                key={pill}
                className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] text-accent"
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
            className="ml-auto shrink-0 self-end rounded-lg p-1 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
