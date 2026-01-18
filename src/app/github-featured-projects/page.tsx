import { FeaturedProjectsDetails } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";

export default async function GitHubFeaturedProjectsPage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          GitHub featured projects
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Browse deep dives for each highlighted project, including activity, tech stack, and resources.
        </p>
      </section>

      {featuredProjects.length > 0 ? (
        <section id="featured-projects" className="scroll-mt-24">
          <FeaturedProjectsDetails projects={featuredProjects} />
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          No featured projects available yet.
        </div>
      )}
    </div>
  );
}
