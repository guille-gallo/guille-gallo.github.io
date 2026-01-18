import type { MDXComponents } from "mdx/types";
import { Feature } from "@/components/mdx/Feature";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components for MDX
    Feature,
    // Default element styling
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-base font-semibold text-gray-800 dark:text-gray-200">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-800 dark:text-gray-200">
        {children}
      </strong>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-4 list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    ...components,
  };
}
