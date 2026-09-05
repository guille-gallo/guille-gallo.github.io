import ChevronLeft from "lucide-solid/icons/chevron-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { For } from "solid-js";
import { ProjectCard } from "~/components/ProjectCard";
import type { FeaturedProject } from "~/lib/projects";

interface FeaturedProjectsCarouselProps {
  projects: FeaturedProject[];
}

export function FeaturedProjectsCarousel(props: FeaturedProjectsCarouselProps) {
  let scrollRef: HTMLDivElement | undefined;
  const scrollAmount = 320; // px to move per arrow click

  const scrollBy = (delta: number) => {
    scrollRef?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div class="relative z-10">
      <div
        ref={scrollRef}
        class="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pt-2 pb-4 [-webkit-overflow-scrolling:touch]"
        aria-label="Featured projects carousel"
      >
        <For each={props.projects}>
          {(project, index) => (
            <div class="snap-start shrink-0 basis-72 sm:basis-80">
              <ProjectCard project={project} index={index()} />
            </div>
          )}
        </For>
      </div>

      <div class="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-scrollAmount)}
          class="glass-panel cursor-pointer rounded-full p-3 text-slate-700 transition"
          aria-label="Scroll left"
        >
          <ChevronLeft class="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(scrollAmount)}
          class="glass-panel cursor-pointer rounded-full p-3 text-slate-700 transition"
          aria-label="Scroll right"
        >
          <ChevronRight class="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
