"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components";
import { FeaturedProject } from "@/lib/projects";

interface FeaturedProjectsCarouselProps {
  projects: FeaturedProject[];
}

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 320; // px to move per arrow click

  const scrollBy = (delta: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]"
        aria-label="Featured projects carousel"
      >
        {projects.map((project, index) => (
          <div
            key={project.repoName}
            className="snap-start shrink-0 basis-72 sm:basis-80"
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-scrollAmount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-whisper-border bg-surface text-heading shadow-notion transition-all hover:-translate-y-0.5 hover:border-notion-blue hover:bg-notion-blue-tint hover:text-notion-blue-text active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-notion-blue-focus"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(scrollAmount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-whisper-border bg-surface text-heading shadow-notion transition-all hover:-translate-y-0.5 hover:border-notion-blue hover:bg-notion-blue-tint hover:text-notion-blue-text active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-notion-blue-focus"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
