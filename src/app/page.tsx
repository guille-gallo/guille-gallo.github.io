import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { ProjectCard, GitHubStatsDisplay } from "@/components";
import { getGitHubStats } from "@/lib/github";
import { getFeaturedProjects } from "@/lib/projects";
import { cvData } from "@/lib/cv-data";

export default async function HomePage() {
  // Fetch data at build time
  const [stats, featuredProjects] = await Promise.all([
    getGitHubStats(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Intro Section */}
      <section className="mb-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {cvData.name}
        </h1>
        <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
          {cvData.title}
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
          {cvData.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects/"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={cvData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Github className="h-4 w-4" />
            GitHub Profile
          </Link>
        </div>
      </section>

      {/* GitHub Stats */}
      <section className="mb-20">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          GitHub Activity
        </h2>
        <GitHubStatsDisplay stats={stats} />

        {stats.topLanguages.length > 0 && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Most used languages
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {stats.topLanguages.map((lang) => (
                <span
                  key={lang.name}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {lang.name} ({lang.count})
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.repoName} project={project} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
