import Link from "next/link";
import { ArrowRight, Download, Github } from "lucide-react";
import { FeaturedProjectsCarousel } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";
import { cvData } from "@/lib/cv-data";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Intro Section */}
      <section className="mb-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {cvData.name}
        </h1>
        <p className="mb-6 text-xl text-muted">
          {cvData.title}
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-muted">
          {cvData.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-Guillermo-Gallo.pdf`}
            download
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Featured projects
            </h2>
            <Link
              href="/github-featured-projects/#featured-projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Browse GitHub featured projects"
            >
              <Github className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
              <span>View GitHub featured projects</span>
              <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          </div>
          <FeaturedProjectsCarousel projects={featuredProjects} />
        </section>
      )}
    </div>
  );
}
