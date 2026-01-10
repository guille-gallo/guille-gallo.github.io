import Link from "next/link";
import { Download } from "lucide-react";
import { FeaturedProjectsCarousel } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";
import { cvData } from "@/lib/cv-data";

export default async function HomePage() {
  // Fetch data at build time
  const featuredProjects = await getFeaturedProjects();

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
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-Guillermo-Gallo.pdf`}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Github featured projects
            </h2>
          </div>
          <FeaturedProjectsCarousel projects={featuredProjects} />
        </section>
      )}
    </div>
  );
}
