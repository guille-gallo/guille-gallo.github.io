/// <reference types="@solidjs/start/env" />

declare module "*.mdx" {
  import type { Component } from "solid-js";
  const MDXContent: Component;
  export default MDXContent;
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
}

declare module "solid-mdx" {
  import type { JSX, ParentProps } from "solid-js";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type MDXComponents = Record<string, (props: any) => JSX.Element>;
  export const MDXProvider: (props: ParentProps<{ components: MDXComponents }>) => JSX.Element;
  export const useMDXComponents: () => MDXComponents;
}
