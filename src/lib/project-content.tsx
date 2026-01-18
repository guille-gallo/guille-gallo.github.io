import { ReactElement } from "react";

// Dynamic imports for MDX content
const projectContent: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  mapland: () => import("@/content/projects/mapland.mdx"),
  "user-lens": () => import("@/content/projects/user-lens.mdx"),
  films: () => import("@/content/projects/films.mdx"),
  flashmarket: () => import("@/content/projects/flashmarket.mdx"),
};

export async function getProjectContent(repoName: string): Promise<ReactElement | null> {
  const key = repoName.toLowerCase();
  const loader = projectContent[key];

  if (!loader) {
    return null;
  }

  try {
    const { default: Content } = await loader();
    return <Content />;
  } catch (error) {
    console.warn(`Failed to load MDX content for ${repoName}:`, error);
    return null;
  }
}

export function hasProjectContent(repoName: string): boolean {
  return repoName.toLowerCase() in projectContent;
}
