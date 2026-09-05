import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { Show, Suspense } from "solid-js";
import { FeaturedProjectsDetails } from "~/components/FeaturedProjectsDetails";
import { getFeaturedProjects } from "~/lib/projects";
import { pageTitle } from "~/lib/site";

export const route = {
  preload: () => getFeaturedProjects(),
} satisfies RouteDefinition;

export default function GitHubFeaturedProjectsPage() {
  const featuredProjects = createAsync(() => getFeaturedProjects(), { deferStream: true });

  return (
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <Title>{pageTitle("Featured Projects")}</Title>
      <Meta
        name="description"
        content="Deep dives for each highlighted project, including activity, tech stack, and resources."
      />

      <section class="mb-10">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">GitHub featured projects</h1>
        <p class="mt-3 max-w-2xl text-slate-500">
          Browse deep dives for each highlighted project, including activity, tech stack, and resources.
        </p>
      </section>

      <Suspense>
        <Show
          when={(featuredProjects()?.length ?? 0) > 0}
          fallback={
            <div class="rounded-2xl bg-white p-8 text-center text-slate-500">No featured projects available yet.</div>
          }
        >
          <section id="featured-projects" class="scroll-mt-24">
            <FeaturedProjectsDetails projects={featuredProjects()!} />
          </section>
        </Show>
      </Suspense>
    </div>
  );
}
