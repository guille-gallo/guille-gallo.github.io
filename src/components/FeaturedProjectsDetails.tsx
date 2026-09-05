"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { FeaturedProject, getProjectDescription, toProjectId } from "@/lib/projects";

interface FeaturedProjectsDetailsProps {
  projects: FeaturedProject[];
}

// Dynamic MDX content loaders
const projectContentLoaders: Record<string, React.ComponentType> = {
  economia4punto0: dynamic(() => import("@/content/projects/economia4punto0.mdx")),
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

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

interface LightboxProps {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function Lightbox({ images, index, alt, onClose, onNavigate }: LightboxProps) {
  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );
  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — enlarged screenshot`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <div className="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- full-size lightbox image, already unoptimized export */}
        <img
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          className="mx-auto max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <p className="mt-3 text-center text-xs text-slate-300">
          {index + 1} / {images.length}
        </p>
      </div>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
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
  // Keyed by project so switching projects implicitly closes the lightbox
  const [lightbox, setLightbox] = useState<{ projectId: string; index: number } | null>(null);

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
                  className={`block w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
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
                    isVideoFile(demoVideoUrl) ? (
                      <video
                        className="aspect-video w-full"
                        src={demoVideoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        poster={activeProject.demoVideoPoster}
                      />
                    ) : (
                      <div className="aspect-video w-full">
                        <iframe
                          className="h-full w-full"
                          src={demoVideoUrl}
                          title={`${activeProject.repoName} demo video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )
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
                    screenshots.map((src, index) => (
                      <button
                        key={`${activeProject.repoName}-shot-${index}`}
                        type="button"
                        onClick={() => setLightbox({ projectId, index })}
                        className="group relative h-40 w-full cursor-zoom-in overflow-hidden rounded-xl bg-white shadow-sm"
                        aria-label={`Enlarge ${activeProject.repoName} screenshot ${index + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${activeProject.repoName} screenshot ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      </button>
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

              {lightbox !== null && lightbox.projectId === projectId && screenshots.length > 0 && (
                <Lightbox
                  images={screenshots}
                  index={Math.min(lightbox.index, screenshots.length - 1)}
                  alt={`${activeProject.repoName} screenshot`}
                  onClose={() => setLightbox(null)}
                  onNavigate={(index) => setLightbox({ projectId, index })}
                />
              )}
            </article>
          );
        })()}
      </div>
    </div>
  );
}
