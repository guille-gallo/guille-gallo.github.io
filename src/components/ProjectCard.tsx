"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { FeaturedProject, getProjectDescription, toProjectId } from "@/lib/projects";

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

  const detailsHref = `/github-featured-projects/#${toProjectId(project.repoName)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-panel group relative flex h-full flex-col p-4"
    >
      {/* Header: title is the primary "view details" link; source + live links sit on the right. */}
      <div className="relative z-10 mb-1.5 flex items-start justify-between gap-2">
        <h3 className="min-w-0 text-base font-semibold text-slate-900">
          <Link
            href={detailsHref}
            aria-label={`View details for ${project.repoName}`}
            className="inline-flex max-w-full items-center gap-1 transition-colors hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="truncate">{project.repoName}</span>
            <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        </h3>

        {project.vercelUrl && (
          <a
            href={project.vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
          >
            <ExternalLink className="h-3 w-3" />
            Live Demo
          </a>
        )}
      </div>

      {/* Description */}
      <p className="relative z-10 mb-3 line-clamp-2 text-sm text-slate-500">
        {description}
      </p>

      {/* Footer: topics on the left, GitHub source link pinned to the bottom-right. */}
      <div className="relative z-10 mt-auto flex items-end gap-2 pt-1">
        {(githubData?.language || githubData?.topics?.length || extraPills.length > 0) && (
          <div className="flex flex-wrap gap-1.5">
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
            aria-label={`${project.repoName} source on GitHub`}
            title="View source on GitHub"
            className="ml-auto shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
