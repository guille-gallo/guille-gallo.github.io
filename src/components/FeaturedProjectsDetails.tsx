"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { FeaturedProject, getProjectDescription, toProjectId } from "@/lib/projects";

interface FeaturedProjectsDetailsProps {
  projects: FeaturedProject[];
}

// Dynamic MDX content loaders
const projectContentLoaders: Record<string, React.ComponentType> = {
  mapland: dynamic(() => import("@/content/projects/mapland.mdx")),
  "user-lens": dynamic(() => import("@/content/projects/user-lens.mdx")),
  films: dynamic(() => import("@/content/projects/films.mdx")),
  flashmarket: dynamic(() => import("@/content/projects/flashmarket.mdx")),
  "chat-room-app": dynamic(() => import("@/content/projects/chat-room-app.mdx")),
  slidedude: dynamic(() => import("@/content/projects/slidedude.mdx")),
};

function getProjectContentComponent(repoName: string): React.ComponentType | null {
  const key = repoName.toLowerCase();
  return projectContentLoaders[key] || null;
}

function getProjectIdFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  return hash.length > 0 ? hash : null;
}

export function FeaturedProjectsDetails({ projects }: FeaturedProjectsDetailsProps) {
  const fallbackProjectId = useMemo(() => {
    if (projects.length === 0) return "";
    return toProjectId(projects[0].repoName);
  }, [projects]);

  const [activeProjectId, setActiveProjectId] = useState(fallbackProjectId);

  // Sync to URL hash on mount and whenever the hash changes
  useEffect(() => {
    if (projects.length === 0) return;

    const applyHash = () => {
      const hashId = getProjectIdFromHash();
      const matches = hashId
        ? projects.find((p) => toProjectId(p.repoName) === hashId)
        : undefined;
      const nextId = matches ? toProjectId(matches.repoName) : fallbackProjectId;
      setActiveProjectId(nextId);

      if (matches) {
        // Ensure the target article is in view (native anchor jump can race with state updates)
        requestAnimationFrame(() => {
          document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [projects, fallbackProjectId]);

  const activeProject = useMemo(
    () => projects.find((project) => toProjectId(project.repoName) === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  if (projects.length === 0) return null;

  return (
    <div className="mt-10 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="md:sticky md:top-24 md:self-start">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                  className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
              className="relative scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {githubData?.html_url ? (
                      <a
                        href={githubData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-blue-600"
                      >
                        {activeProject.repoName}
                        <Github className="h-4 w-4" />
                      </a>
                    ) : (
                      activeProject.repoName
                    )}
                  </h3>

                  {/* MDX Content or fallback description */}
                  <div className="mt-4 text-slate-600">
                    {ContentComponent ? (
                      <ContentComponent />
                    ) : (
                      <p className="text-sm">
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
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live demo
                  </a>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Demo video
                </h4>
                <div className="mt-3 overflow-hidden rounded-xl bg-white shadow-sm">
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
                    <div className="flex aspect-video items-center justify-center text-sm text-slate-500">
                      Demo video coming soon
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Screenshot gallery
                </h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {screenshots.length > 0 ? (
                    screenshots.slice(0, 4).map((src, index) => (
                      <div
                        key={`${activeProject.repoName}-shot-${index}`}
                        className="relative h-40 w-full overflow-hidden rounded-xl bg-white shadow-sm"
                      >
                        <Image
                          src={src}
                          alt={`${activeProject.repoName} screenshot ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <>
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={`${activeProject.repoName}-placeholder-${index}`}
                          className="flex h-40 items-center justify-center rounded-xl bg-white text-xs uppercase tracking-wide text-slate-400 shadow-sm"
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
