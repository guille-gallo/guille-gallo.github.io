import { FeaturedProjectsDetails } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";

export default async function GitHubFeaturedProjectsPage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <section className="mb-10">
        <h1 className="text-3xl font-medium tracking-tight text-on-sky sm:text-5xl">
          GitHub featured projects
        </h1>
        <p className="mt-3 max-w-2xl text-on-sky-muted">
          Browse deep dives for each highlighted project, including activity, tech stack, and resources.
        </p>
      </section>

      {featuredProjects.length > 0 ? (
        <section id="featured-projects" className="scroll-mt-24">
          <FeaturedProjectsDetails projects={featuredProjects} />
        </section>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
          No featured projects available yet.
        </div>
      )}
    </div>
  );
}
