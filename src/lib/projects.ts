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
  {
    repoName: "chat-room-app",
    vercelUrl: "",
    customDescription: "Real-time chat rooms with Google sign-in, online presence, and ephemeral messages.",
    mainDescription:
      "Chat Room App delivers real-time group chat with Google OAuth sign-in, live online presence indicators, and ephemeral messaging — powered by Supabase Realtime broadcast and presence channels.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 5,
    extraPills: ["React", "TypeScript", "Supabase", "Vite"],
  },
  {
    repoName: "solid-dashboard",
    vercelUrl: "https://solid-dashboard-teal.vercel.app",
    customDescription:
      "A hands-on Solid.js learning lab exploring reactivity primitives, fine-grained DOM updates, and advanced patterns.",
    mainDescription:
      "Solid Dashboard is an interactive learning lab built with Solid.js, covering reactivity primitives, control flow components, state management with Context and createStore, code splitting, and the snapshot pattern for paginated data — all without a virtual DOM.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 6,
    extraPills: ["Solid.js", "TypeScript", "Kobalte", "Tailwind CSS", "Vite"],
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
