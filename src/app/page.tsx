import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
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
        <h1 className="mb-4 text-5xl font-bold tracking-[-0.033em] text-heading sm:text-6xl">
          {cvData.name}
        </h1>
        <p className="mb-6 text-xl font-semibold text-muted">
          {cvData.title}
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-muted">
          {cvData.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-Guillermo-Gallo.pdf`}
            download
            className="inline-flex items-center gap-2 rounded-md bg-notion-blue px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-notion-blue-hover"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-heading">
                <Link
                  href="/github-featured-projects/"
                  className="hover:text-notion-blue"
                >
                  GitHub featured projects
                </Link>
              </h2>
              <Link
                href="/github-featured-projects/"
                className="inline-flex items-center rounded-full border border-whisper-border p-2 text-muted transition hover:border-notion-blue hover:text-notion-blue"
                aria-label="Browse GitHub featured projects"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <FeaturedProjectsCarousel projects={featuredProjects} />
        </section>
      )}
    </div>
  );
}
