import { GithubIcon as Github } from "~/components/icons/BrandIcons";
import { LinkedinIcon as Linkedin } from "~/components/icons/BrandIcons";
import Mail from "lucide-solid/icons/mail";
import { Show } from "solid-js";
import { cvData } from "~/lib/cv-data";

export function Footer() {
  return (
    <footer class="mx-4 mb-4 mt-auto px-4 py-6 sm:mx-6 lg:mx-auto lg:max-w-5xl">
      <div class="mx-auto flex max-w-5xl items-center justify-center gap-4">
        <div class="flex items-center gap-4">
          <a
            href={cvData.github}
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-500 transition-colors hover:text-slate-900"
            aria-label="GitHub"
          >
            <Github class="h-5 w-5" />
          </a>
          <Show when={cvData.linkedin}>
            {(linkedin) => (
              <a
                href={linkedin()}
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-500 transition-colors hover:text-slate-900"
                aria-label="LinkedIn"
              >
                <Linkedin class="h-5 w-5" />
              </a>
            )}
          </Show>
          <a
            href={`mailto:${cvData.email}`}
            class="text-slate-500 transition-colors hover:text-slate-900"
            aria-label="Email"
          >
            <Mail class="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
