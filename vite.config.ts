import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
    },
    tailwindcss(),
    solidStart({ extensions: ["mdx", "md"] }),
    nitro(),
  ],
  nitro: {
    // Preset is auto-detected on Vercel. Set NITRO_PRESET=vercel to reproduce locally.
    routeRules: {
      // Legacy URL from the Next.js site.
      "/projects": { redirect: { to: "/github-featured-projects", status: 301 } },
      "/projects/": { redirect: { to: "/github-featured-projects", status: 301 } },
      // Pages backed by the GitHub API: serve cached HTML, regenerate at most hourly.
      "/": { isr: 3600 },
      "/github-featured-projects": { isr: 3600 },
    },
  },
});
