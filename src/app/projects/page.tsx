import { Metadata } from "next";
import { ProjectCard } from "@/components";
import { getEnrichedProjects } from "@/lib/projects";
import { getGitHubStats } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured projects and open source contributions by Guille Gallo.",
};

export default async function ProjectsPage() {
  const [projects, stats] = await Promise.all([
    getEnrichedProjects(),
    getGitHubStats(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A selection of projects I&apos;ve worked on. View all {stats.totalRepos} repositories
          on my{" "}
          <a
            href="https://github.com/guille-gallo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
          >
            GitHub profile
          </a>
          .
        </p>
      </section>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.repoName} project={project} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            No featured projects configured yet. Add projects to{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
              src/lib/projects.ts
            </code>
          </p>
        </div>
      )}
    </div>
  );
}
