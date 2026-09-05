import { createEffect, createMemo, createSignal, For, lazy, Match, on, onCleanup, onMount, Show, Suspense, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import { MDXProvider } from "solid-mdx";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import ExternalLink from "lucide-solid/icons/external-link";
import { GithubIcon as Github } from "~/components/icons/BrandIcons";
import X from "lucide-solid/icons/x";
import { Motion, Presence } from "solid-motionone";
import { mdxComponents } from "~/components/mdx/components";
import { type FeaturedProject, getProjectDescription, toProjectId } from "~/lib/projects";

interface FeaturedProjectsDetailsProps {
  projects: FeaturedProject[];
}

// Lazy MDX content loaders (one chunk per project)
const projectContentLoaders = {
  economia4punto0: lazy(() => import("~/content/projects/economia4punto0.mdx")),
  mapland: lazy(() => import("~/content/projects/mapland.mdx")),
  "user-lens": lazy(() => import("~/content/projects/user-lens.mdx")),
  films: lazy(() => import("~/content/projects/films.mdx")),
  flashmarket: lazy(() => import("~/content/projects/flashmarket.mdx")),
  "chat-room-app": lazy(() => import("~/content/projects/chat-room-app.mdx")),
  slidedude: lazy(() => import("~/content/projects/slidedude.mdx")),
} as const;

function getProjectContentComponent(repoName: string) {
  const key = repoName.toLowerCase() as keyof typeof projectContentLoaders;
  return projectContentLoaders[key] ?? null;
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

function Lightbox(props: LightboxProps) {
  const prev = () => props.onNavigate((props.index - 1 + props.images.length) % props.images.length);
  const next = () => props.onNavigate((props.index + 1) % props.images.length);

  onMount(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") props.onClose();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    });
  });

  return (
    <Motion.div
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => props.onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${props.alt} — enlarged screenshot`}
    >
      <button
        type="button"
        onClick={() => props.onClose()}
        class="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <X class="h-5 w-5" />
      </button>

      <Show when={props.images.length > 1}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Previous screenshot"
        >
          <ChevronLeft class="h-6 w-6" />
        </button>
      </Show>

      <div class="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={props.images[props.index]}
          alt={`${props.alt} ${props.index + 1}`}
          class="mx-auto max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <p class="mt-3 text-center text-xs text-slate-300">
          {props.index + 1} / {props.images.length}
        </p>
      </div>

      <Show when={props.images.length > 1}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Next screenshot"
        >
          <ChevronRight class="h-6 w-6" />
        </button>
      </Show>
    </Motion.div>
  );
}

function getProjectIdFromHash(): string | null {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.length > 0 ? hash : null;
}

export function FeaturedProjectsDetails(props: FeaturedProjectsDetailsProps) {
  const fallbackProjectId = createMemo(() =>
    props.projects.length === 0 ? "" : toProjectId(props.projects[0].repoName)
  );

  const [activeProjectId, setActiveProjectId] = createSignal(fallbackProjectId());
  // Keyed by project so switching projects implicitly closes the lightbox
  const [lightbox, setLightbox] = createSignal<{ projectId: string; index: number } | null>(null);

  // Sync to URL hash on mount and whenever the hash changes
  onMount(() => {
    const applyHash = () => {
      if (props.projects.length === 0) return;
      const hashId = getProjectIdFromHash();
      const matches = hashId ? props.projects.find((p) => toProjectId(p.repoName) === hashId) : undefined;
      if (!matches) {
        setActiveProjectId(fallbackProjectId());
        return;
      }
      const staticNextId = toProjectId(matches.repoName);
      setActiveProjectId(staticNextId);
      // Ensure the target article is in view (native anchor jump can race with state updates)
      requestAnimationFrame(() => {
        document.getElementById(staticNextId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    onCleanup(() => window.removeEventListener("hashchange", applyHash));
  });

  // Keep the selection valid if the project list changes
  createEffect(
    on(fallbackProjectId, (fallback) => {
      if (!props.projects.some((p) => toProjectId(p.repoName) === activeProjectId())) {
        setActiveProjectId(fallback);
      }
    }, { defer: true })
  );

  const activeProject = createMemo(
    () => props.projects.find((project) => toProjectId(project.repoName) === activeProjectId()) ?? props.projects[0]
  );

  return (
    <Show when={props.projects.length > 0}>
      <div class="mt-10 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside class="md:sticky md:top-24 md:self-start">
          <div class="rounded-xl bg-white p-4 shadow-sm">
            <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Browse projects</h3>
            <nav class="space-y-2">
              <For each={props.projects}>
                {(project) => {
                  const projectId = toProjectId(project.repoName);
                  const isActive = () => projectId === activeProjectId();
                  return (
                    <button
                      type="button"
                      onClick={() => setActiveProjectId(projectId)}
                      aria-current={isActive() ? "true" : undefined}
                      class={`block w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                        isActive()
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {project.repoName}
                    </button>
                  );
                }}
              </For>
            </nav>
          </div>
        </aside>

        <div class="space-y-10">
          <Show when={activeProject()} keyed>
            {(project) => {
              const githubData = project.githubData;
              const fallbackDescription = project.mainDescription || getProjectDescription(project);
              const projectId = toProjectId(project.repoName);
              const liveUrl = project.vercelUrl || githubData?.homepage || undefined;
              const demoVideoUrl = project.demoVideoUrl?.trim();
              const screenshots = project.screenshotUrls ?? [];
              const ContentComponent = getProjectContentComponent(project.repoName);

              return (
                <article id={projectId} class="relative scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm">
                  <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div class="flex-1">
                      <h3 class="text-xl font-semibold text-slate-900">
                        <Show when={githubData?.html_url} fallback={project.repoName}>
                          {(url) => (
                            <a
                              href={url()}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center gap-2 hover:text-blue-600"
                            >
                              {project.repoName}
                              <Github class="h-4 w-4" />
                            </a>
                          )}
                        </Show>
                      </h3>

                      {/* MDX Content or fallback description */}
                      <div class="mt-4 text-slate-600">
                        <Show when={ContentComponent} fallback={<p class="text-sm">{fallbackDescription}</p>}>
                          {(Content) => (
                            <MDXProvider components={mdxComponents}>
                              <Suspense fallback={<p class="text-sm text-slate-400">Loading…</p>}>
                                <Dynamic component={Content()} />
                              </Suspense>
                            </MDXProvider>
                          )}
                        </Show>
                      </div>
                    </div>
                  </div>

                  <Show when={liveUrl}>
                    {(url) => (
                      <div class="absolute right-6 top-6">
                        <a
                          href={url()}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                        >
                          <ExternalLink class="h-3.5 w-3.5" />
                          Live demo
                        </a>
                      </div>
                    )}
                  </Show>

                  <div class="mt-6">
                    <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Demo video</h4>
                    <div class="mt-3 overflow-hidden rounded-xl bg-white shadow-sm">
                      <Switch
                        fallback={
                          <div class="flex aspect-video items-center justify-center text-sm text-slate-500">
                            Demo video coming soon
                          </div>
                        }
                      >
                        <Match when={demoVideoUrl && isVideoFile(demoVideoUrl)}>
                          <video
                            class="aspect-video w-full"
                            src={demoVideoUrl}
                            controls
                            playsinline
                            preload="metadata"
                            poster={project.demoVideoPoster}
                          />
                        </Match>
                        <Match when={demoVideoUrl}>
                          <div class="aspect-video w-full">
                            <iframe
                              class="h-full w-full"
                              src={demoVideoUrl}
                              title={`${project.repoName} demo video`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            />
                          </div>
                        </Match>
                      </Switch>
                    </div>
                  </div>

                  <div class="mt-6">
                    <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Screenshot gallery</h4>
                    <div class="mt-3 grid gap-3 sm:grid-cols-2">
                      <Show
                        when={screenshots.length > 0}
                        fallback={
                          <For each={[0, 1]}>
                            {() => (
                              <div class="flex h-40 items-center justify-center rounded-xl bg-white text-xs uppercase tracking-wide text-slate-400 shadow-sm">
                                Screenshot placeholder
                              </div>
                            )}
                          </For>
                        }
                      >
                        <For each={screenshots}>
                          {(src, index) => (
                            <button
                              type="button"
                              onClick={() => setLightbox({ projectId, index: index() })}
                              class="group relative h-40 w-full cursor-zoom-in overflow-hidden rounded-xl bg-white shadow-sm"
                              aria-label={`Enlarge ${project.repoName} screenshot ${index() + 1}`}
                            >
                              <img
                                src={src}
                                alt={`${project.repoName} screenshot ${index() + 1}`}
                                loading="lazy"
                                decoding="async"
                                sizes="(max-width: 640px) 100vw, 50vw"
                                class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              />
                            </button>
                          )}
                        </For>
                      </Show>
                    </div>
                  </div>

                  <Presence>
                    <Show when={lightbox()?.projectId === projectId && screenshots.length > 0 && lightbox()}>
                      {(state) => (
                        <Lightbox
                          images={screenshots}
                          index={Math.min(state().index, screenshots.length - 1)}
                          alt={`${project.repoName} screenshot`}
                          onClose={() => setLightbox(null)}
                          onNavigate={(index) => setLightbox({ projectId, index })}
                        />
                      )}
                    </Show>
                  </Presence>
                </article>
              );
            }}
          </Show>
        </div>
      </div>
    </Show>
  );
}
