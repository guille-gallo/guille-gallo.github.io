import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { FeaturedProjectsCarousel } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";
import { cvData } from "@/lib/cv-data";

export default async function HomePage() {
  // Fetch data at build time
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-24">
      {/* Intro Section */}
      <section className="mb-12 px-6 pb-12 pt-4 text-center sm:px-10 sm:pb-16 sm:pt-6">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {cvData.name}
        </h1>
        <p className="mb-6 text-xl text-slate-600">
          {cvData.title}
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-slate-500">
          {cvData.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-Guillermo-Gallo.pdf`}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900">
                <Link
                  href="/github-featured-projects/"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-700"
                >
                  GitHub featured projects
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </h2>
            </div>
          </div>
          <FeaturedProjectsCarousel projects={featuredProjects} />
        </section>
      )}
    </div>
  );
}
