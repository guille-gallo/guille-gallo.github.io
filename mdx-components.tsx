import type { MDXComponents } from "mdx/types";
import { Feature } from "@/components/mdx/Feature";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components for MDX
    Feature,
    // Default element styling
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-lg font-semibold text-slate-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-base font-semibold text-slate-800">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-slate-600">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-800">
        {children}
      </strong>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-4 list-disc space-y-2 text-sm text-slate-600">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    ...components,
  };
}
