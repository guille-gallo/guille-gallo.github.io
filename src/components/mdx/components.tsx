import type { ParentProps } from "solid-js";
import { Feature } from "./Feature";

/** Component map passed to solid-mdx's MDXProvider (mirrors the former mdx-components.tsx). */
export const mdxComponents = {
  Feature,
  h2: (props: ParentProps) => <h2 class="mt-8 mb-4 text-lg font-semibold text-slate-900">{props.children}</h2>,
  h3: (props: ParentProps) => <h3 class="mt-6 mb-3 text-base font-semibold text-slate-800">{props.children}</h3>,
  p: (props: ParentProps) => <p class="mb-4 text-sm leading-relaxed text-slate-600">{props.children}</p>,
  strong: (props: ParentProps) => <strong class="font-semibold text-slate-800">{props.children}</strong>,
  ul: (props: ParentProps) => <ul class="mb-4 ml-4 list-disc space-y-2 text-sm text-slate-600">{props.children}</ul>,
  li: (props: ParentProps) => <li class="leading-relaxed">{props.children}</li>,
};
