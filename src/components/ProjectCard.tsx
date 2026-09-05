import { A } from "@solidjs/router";
import { Motion } from "solid-motionone";
import ArrowRight from "lucide-solid/icons/arrow-right";
import ExternalLink from "lucide-solid/icons/external-link";
import { GithubIcon as Github } from "~/components/icons/BrandIcons";
import { For, Show } from "solid-js";
import { type FeaturedProject, getProjectDescription, toProjectId } from "~/lib/projects";

interface ProjectCardProps {
  project: FeaturedProject;
  index?: number;
}

export function ProjectCard(props: ProjectCardProps) {
  const description = () => getProjectDescription(props.project);
  const githubData = () => props.project.githubData;
  const topics = () => githubData()?.topics?.slice(0, 4) ?? [];
  const isShownFromGitHub = (pill: string) =>
    githubData()?.language?.toLowerCase() === pill || topics().some((t) => t.toLowerCase() === pill);
  const extraPills = () =>
    (props.project.extraPills ?? []).filter((pill) => !isShownFromGitHub(pill.toLowerCase()));
  const hasPills = () => Boolean(githubData()?.language || topics().length || extraPills().length > 0);

  const detailsHref = () => `/github-featured-projects#${toProjectId(props.project.repoName)}`;

  return (
    <Motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (props.index ?? 0) * 0.1 }}
      class="glass-panel group relative flex h-full flex-col p-4 transition-transform duration-200 ease-out hover:-translate-y-[3px] motion-reduce:transform-none"
    >
      {/* Header: title is the primary "view details" link; source + live links sit on the right. */}
      <div class="relative z-10 mb-1.5 flex items-start justify-between gap-2">
        <h3 class="min-w-0 text-base font-semibold text-slate-900">
          <A
            href={detailsHref()}
            aria-label={`View details for ${props.project.repoName}`}
            class="inline-flex max-w-full items-center gap-1 transition-colors hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span class="truncate">{props.project.repoName}</span>
            <ArrowRight class="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </A>
        </h3>

        <Show when={props.project.vercelUrl}>
          {(url) => (
            <a
              href={url()}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
            >
              <ExternalLink class="h-3 w-3" />
              Live Demo
            </a>
          )}
        </Show>
      </div>

      {/* Description */}
      <p class="relative z-10 mb-3 line-clamp-2 text-sm text-slate-500">{description()}</p>

      {/* Footer: topics on the left, GitHub source link pinned to the bottom-right. */}
      <div class="relative z-10 mt-auto flex items-end gap-2 pt-1">
        <Show when={hasPills()}>
          <div class="flex flex-wrap gap-1.5">
            <Show when={githubData()?.language}>
              {(language) => (
                <span class="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">{language()}</span>
              )}
            </Show>
            <For each={topics()}>
              {(topic) => <span class="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">{topic}</span>}
            </For>
            <For each={extraPills()}>
              {(pill) => <span class="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">{pill}</span>}
            </For>
          </div>
        </Show>

        <Show when={githubData()?.html_url}>
          {(url) => (
            <a
              href={url()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${props.project.repoName} source on GitHub`}
              title="View source on GitHub"
              class="ml-auto shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <Github class="h-4 w-4" />
            </a>
          )}
        </Show>
      </div>
    </Motion.article>
  );
}
