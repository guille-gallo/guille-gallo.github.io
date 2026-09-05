import { A, createAsync, type RouteDefinition } from "@solidjs/router";
import ArrowUpRight from "lucide-solid/icons/arrow-up-right";
import Download from "lucide-solid/icons/download";
import { Show, Suspense } from "solid-js";
import { FeaturedProjectsCarousel } from "~/components/FeaturedProjectsCarousel";
import { cvData } from "~/lib/cv-data";
import { getFeaturedProjects } from "~/lib/projects";

export const route = {
  preload: () => getFeaturedProjects(),
} satisfies RouteDefinition;

export default function HomePage() {
  const featuredProjects = createAsync(() => getFeaturedProjects(), { deferStream: true });

  return (
    <div class="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-24">
      {/* Intro Section */}
      <section class="mb-12 px-6 pb-12 pt-4 text-center sm:px-10 sm:pb-16 sm:pt-6">
        <h1 class="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{cvData.name}</h1>
        <p class="mb-6 text-xl text-slate-600">{cvData.title}</p>
        <p class="mx-auto mb-8 max-w-2xl text-slate-500">{cvData.bio}</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/CV-Guillermo-Gallo.pdf"
            download=""
            class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <Download class="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <Suspense>
        <Show when={(featuredProjects()?.length ?? 0) > 0}>
          <section class="mx-auto max-w-3xl">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-slate-900">
                  <A
                    href="/github-featured-projects"
                    class="inline-flex items-center gap-1.5 transition-colors hover:text-slate-700"
                  >
                    Featured projects
                    <ArrowUpRight class="h-5 w-5" />
                  </A>
                </h2>
              </div>
            </div>
            <FeaturedProjectsCarousel projects={featuredProjects()!} />
          </section>
        </Show>
      </Suspense>
    </div>
  );
}
