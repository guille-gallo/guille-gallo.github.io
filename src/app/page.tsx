import Link from "next/link";
import { ArrowRight, Download, Github } from "lucide-react";
import { FeaturedProjectsCarousel } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";
import { cvData } from "@/lib/cv-data";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Hero */}
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-4xl font-medium leading-none tracking-tight text-on-sky sm:text-6xl">
          <span className="block font-script text-5xl font-normal italic sm:text-7xl" style={{ fontFamily: "var(--font-script, ui-serif, Georgia, serif)" }}>
            {cvData.name}
          </span>
        </h1>
        <p className="mb-3 text-xl font-medium text-on-sky sm:text-2xl">
          {cvData.title}
        </p>
        <p className="mx-auto mb-10 max-w-2xl text-base text-on-sky-muted sm:text-lg">
          {cvData.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-Guillermo-Gallo.pdf`}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-transparent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>

      {/* Featured Projects — surface card over the sky canvas */}
      {featuredProjects.length > 0 && (
        <section className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-glass)] sm:p-8">
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-medium leading-tight text-foreground-strong">
              Featured projects
            </h2>
            <Link
              href="/github-featured-projects/#featured-projects"
              className="group inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              aria-label="Browse GitHub featured projects"
            >
              <Github className="h-4 w-4 transition-colors group-hover:text-white" />
              <span>View GitHub featured projects</span>
              <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          </div>
          <FeaturedProjectsCarousel projects={featuredProjects} />
        </section>
      )}
    </div>
  );
}
