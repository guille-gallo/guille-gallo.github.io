import { getRepoDetails, GitHubRepo } from "./github";

export interface FeaturedProject {
  // Manual configuration
  repoName: string;
  customDescription?: string; // Override GitHub description
  featured?: boolean; // Highlight on homepage
  order?: number; // Display order
  extraPills?: string[]; // Custom tech pills to render in the card

  // Enriched from GitHub API (populated at build time)
  githubData?: GitHubRepo;
}

// ============================================
// CONFIGURE YOUR FEATURED PROJECTS HERE
// ============================================
// Add the repository names you want to showcase.
// The order in this array determines display order (or use the 'order' field).
// Add a customDescription to override the GitHub repo description.

export const featuredProjects: FeaturedProject[] = [
  {
    repoName: "mapland", // Example - replace with your actual repos
    customDescription: "Interactive map-based application with real-time features",
    featured: true,
    order: 1,
    extraPills: ["React", "Mapbox", "OpenGL"],
  },
  {
    repoName: "user-lens",
    customDescription: "description",
    featured: true,
    order: 2,
    extraPills: ["React"],
  },
  {
    repoName: "films",
    customDescription: "description",
    featured: true,
    order: 3,
    extraPills: ["React"],
  },
  {
    repoName: "crypto-dashboard",
    customDescription: "description",
    featured: true,
    order: 4,
    extraPills: ["Angular"],
  },

  // Add more projects here:
  // {
  //   repoName: "your-repo-name",
  //   customDescription: "Optional custom description",
  //   featured: false,
  //   order: 2,
  // },
];

// ============================================
// Project fetching utilities
// ============================================

export async function getEnrichedProjects(): Promise<FeaturedProject[]> {
  const enrichedProjects = await Promise.all(
    featuredProjects.map(async (project) => {
      try {
        const githubData = await getRepoDetails(project.repoName);
        return { ...project, githubData };
      } catch (error) {
        console.warn(`Failed to fetch data for ${project.repoName}:`, error);
        return project;
      }
    })
  );

  // Sort by order field, then by stars
  return enrichedProjects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return (b.githubData?.stargazers_count || 0) - (a.githubData?.stargazers_count || 0);
  });
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const projects = await getEnrichedProjects();
  return projects.filter((p) => p.featured);
}

export function getProjectDescription(project: FeaturedProject): string {
  return project.customDescription || project.githubData?.description || "No description available";
}
