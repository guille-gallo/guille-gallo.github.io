import { A } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import Check from "lucide-solid/icons/check";
import Copy from "lucide-solid/icons/copy";
import ExternalLink from "lucide-solid/icons/external-link";
import { createSignal, Show } from "solid-js";
import { GithubIcon as Github } from "~/components/icons/BrandIcons";
import { pageTitle } from "~/lib/site";

const css = `.glass-card {
  width: 240px;
  height: 360px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 4px 2px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}

.glass-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.3)
  );
}`;

export default function GlassmorphismGeneratorPage() {
  const [copied, setCopied] = createSignal(false);

  const copyCss = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <Title>{pageTitle("Glassmorphism Reference")}</Title>
      <Meta name="description" content="Exact glassmorphism CSS from the Hype4 generator, kept here for reference." />

      <div class="mb-8">
        <A
          href="/"
          class="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
        >
          <ArrowLeft class="h-4 w-4" />
          Back home
        </A>
      </div>

      <section class="mb-10 text-center">
        <h1 class="mb-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Glassmorphism Reference</h1>
        <p class="mx-auto max-w-2xl text-lg text-slate-500">Exact CSS from the Hype4 generator, kept here for reference.</p>
      </section>

      <div class="grid gap-8 lg:grid-cols-2">
        <section class="flex min-h-[380px] items-center justify-center rounded-2xl bg-white p-8 shadow-sm">
          <div
            class="flex flex-col items-center justify-center text-center text-white"
            style={{
              width: "240px",
              "min-height": "360px",
              background: "rgba(255, 255, 255, 0.08)",
              "backdrop-filter": "blur(5px)",
              "-webkit-backdrop-filter": "blur(5px)",
              "border-radius": "20px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              "box-shadow":
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 4px 2px rgba(255, 255, 255, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              class="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)" }}
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 z-10 w-px"
              style={{
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))",
              }}
            />
            <div class="relative z-20 px-6">
              <h3 class="mb-2 text-xl font-semibold">Glass Card</h3>
              <p class="text-sm text-white/80">Hype4 generator style.</p>
            </div>
          </div>
        </section>

        <section class="flex min-h-[380px] flex-col items-start justify-center rounded-2xl bg-white p-8 shadow-sm">
          <h2 class="mb-4 text-lg font-semibold text-slate-900">On a project card</h2>
          <article class="glass-panel glass-panel-hover flex h-auto w-full max-w-sm flex-col p-5">
            <div class="mb-2 flex items-start justify-between">
              <h3 class="text-base font-semibold text-slate-900">
                <a
                  href="https://github.com/guille-gallo/guille-gallo.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition-colors hover:text-blue-600"
                >
                  portfolio
                </a>
              </h3>
              <a
                href="https://guille-gallo-github-io.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-200"
              >
                <ExternalLink class="h-3 w-3" />
                Live
              </a>
            </div>
            <p class="mb-3 line-clamp-3 flex-grow text-sm text-slate-500">
              A live preview of how your project cards will look once the new glassmorphism style is applied across
              the site.
            </p>
            <div class="mt-auto flex items-start gap-2 pt-2">
              <div class="flex flex-wrap gap-1.5 pt-0.5">
                <span class="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">TypeScript</span>
                <span class="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">solidjs</span>
                <span class="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">solidstart</span>
              </div>
              <a
                href="https://github.com/guille-gallo/guille-gallo.github.io"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-auto shrink-0 self-end rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="View on GitHub"
              >
                <Github class="h-4 w-4" />
              </a>
            </div>
          </article>
        </section>
      </div>

      <section class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="mb-3 text-xl font-semibold text-slate-900">CSS</h2>
          <button
            type="button"
            onClick={copyCss}
            class="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            <Show when={copied()} fallback={<Copy class="h-4 w-4" />}>
              <Check class="h-4 w-4" />
            </Show>
            {copied() ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <pre class="overflow-x-auto rounded-xl bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm">
          <code>{css}</code>
        </pre>
      </section>
    </div>
  );
}
