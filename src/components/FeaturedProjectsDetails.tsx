"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import dynamic from "next/dynamic";
import { ExternalLink, Github } from "lucide-react";
import { FeaturedProject, getProjectDescription } from "@/lib/projects";

interface FeaturedProjectsDetailsProps {
  projects: FeaturedProject[];
}

// Dynamic MDX content loaders
const projectContentLoaders: Record<string, React.ComponentType> = {
  mapland: dynamic(() => import("@/content/projects/mapland.mdx")),
  "user-lens": dynamic(() => import("@/content/projects/user-lens.mdx")),
  films: dynamic(() => import("@/content/projects/films.mdx")),
  flashmarket: dynamic(() => import("@/content/projects/flashmarket.mdx")),
};

function getProjectContentComponent(repoName: string): React.ComponentType | null {
  const key = repoName.toLowerCase();
  return projectContentLoaders[key] || null;
}


function toProjectId(repoName: string): string {
  return `project-${repoName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export function FeaturedProjectsDetails({ projects }: FeaturedProjectsDetailsProps) {
  if (projects.length === 0) return null;

  const initialProjectId = useMemo(() => {
    const mapland = projects.find((project) => project.repoName.toLowerCase() === "mapland");
    const initial = mapland ?? projects[0];
    return initial ? toProjectId(initial.repoName) : "";
  }, [projects]);

  const [activeProjectId, setActiveProjectId] = useState(initialProjectId);

  useEffect(() => {
    setActiveProjectId(initialProjectId);
  }, [initialProjectId]);

  const activeProject = useMemo(
    () => projects.find((project) => toProjectId(project.repoName) === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  return (
    <div className="mt-10 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="md:sticky md:top-24 md:self-start">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Browse projects
          </h3>
          <nav className="space-y-2">
            {projects.map((project) => {
              const projectId = toProjectId(project.repoName);
              const isActive = projectId === activeProjectId;
              return (
                <button
                  key={project.repoName}
                  type="button"
                  onClick={() => setActiveProjectId(projectId)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {project.repoName}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="space-y-10">
        {activeProject && (() => {
          const githubData = activeProject.githubData;
          const fallbackDescription = activeProject.mainDescription || getProjectDescription(activeProject);
          const projectId = toProjectId(activeProject.repoName);
          const liveUrl = activeProject.vercelUrl || githubData?.homepage || undefined;
          const demoVideoUrl = activeProject.demoVideoUrl?.trim();
          const screenshots = activeProject.screenshotUrls ?? [];
          const ContentComponent = getProjectContentComponent(activeProject.repoName);

          return (
            <article
              key={activeProject.repoName}
              id={projectId}
              className="relative scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {githubData?.html_url ? (
                      <a
                        href={githubData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {activeProject.repoName}
                        <Github className="h-4 w-4" />
                      </a>
                    ) : (
                      activeProject.repoName
                    )}
                  </h3>
                  
                  {/* MDX Content or fallback description */}
                  <div className="mt-4">
                    {ContentComponent ? (
                      <ContentComponent />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {fallbackDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {liveUrl && (
                <div className="absolute right-6 top-6">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live demo
                  </a>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Demo video
                </h4>
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
                  {demoVideoUrl ? (
                    <div className="aspect-video w-full">
                      <iframe
                        className="h-full w-full"
                        src={demoVideoUrl}
                        title={`${activeProject.repoName} demo video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                      Demo video coming soon
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Screenshot gallery
                </h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {screenshots.length > 0 ? (
                    screenshots.slice(0, 4).map((src, index) => (
                      <div
                        key={`${activeProject.repoName}-shot-${index}`}
                        className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
                      >
                        <img
                          src={src}
                          alt={`${activeProject.repoName} screenshot ${index + 1}`}
                          className="h-40 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))
                  ) : (
                    <>
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={`${activeProject.repoName}-placeholder-${index}`}
                          className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500"
                        >
                          Screenshot placeholder
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })()}
      </div>
    </div>
  );
}
