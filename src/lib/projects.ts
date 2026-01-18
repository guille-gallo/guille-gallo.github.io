import { getRepoDetails, GitHubRepo } from "./github";

export interface FeaturedProject {
  // Manual configuration
  repoName: string;
  vercelUrl?: string; // Optional Vercel deployment URL
  customDescription?: string; // Override GitHub description
  mainDescription: string; // Primary description for details page
  demoVideoUrl?: string; // Optional demo video URL (embed or mp4)
  screenshotUrls?: string[]; // Optional screenshot gallery URLs
  featured?: boolean; // Highlight on homepage
  order?: number; // Display order
  extraPills?: string[]; // Custom tech pills to render in the card

  // Enriched from GitHub API (populated at build time)
  githubData?: GitHubRepo;

  // main description.
  // demo video.
  // screenshots gallery.
}

// ============================================
// CONFIGURE YOUR FEATURED PROJECTS HERE
// ============================================
// Add the repository names you want to showcase.
// The order in this array determines display order (or use the 'order' field).
// Add a customDescription to override the GitHub repo description.

export const featuredProjects: FeaturedProject[] = [
  {
    repoName: "mapland",
    vercelUrl: "https://mapland.vercel.app",
    customDescription: "Interactive map-based application with real-time features",
    mainDescription:
      "Mapland is a location-first experience that blends real-time collaboration with rich map interactions, optimized for both web and mobile use cases.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 1,
    extraPills: ["React", "Mapbox", "OpenGL", "React Native", "Supabase"],
  },
  {
    repoName: "user-lens",
    vercelUrl: "https://user-lens.vercel.app",
    customDescription: "User Management Dashboard built to demonstrate enterprise-grade frontend architecture.",
    mainDescription:
      "User Lens focuses on scalable UI patterns, robust data flows, and admin-friendly workflows tailored to enterprise user management.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 2,
    extraPills: ["React", "Zustand", "Redis", "Playwright"],
  },
  {
    repoName: "films",
    vercelUrl: "https://films-six-theta.vercel.app",
    customDescription: "Movie browsing application featuring TMDB integration, global wishlist state management, and comprehensive testing strategies.",
    mainDescription:
      "Films delivers a cinematic browsing experience with curated discovery flows, watchlist management, and performance-focused architecture.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 3,
    extraPills: ["React", "TanStack Query", "Zustand"],
  },
  {
    repoName: "flashmarket",
    vercelUrl: "https://flashmarket.vercel.app",
    customDescription: "Stock dashboard application with real-time data.",
    mainDescription:
      "Flashmarket surfaces live market signals through a fast, visual dashboard that prioritizes clarity and actionable insights.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 4,
    extraPills: ["Vue", "Pinia"],
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
