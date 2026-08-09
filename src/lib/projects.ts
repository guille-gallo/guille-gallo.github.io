import { getRepoDetails, GitHubRepo } from "./github";

export interface FeaturedProject {
  // Manual configuration
  repoName: string;
  vercelUrl?: string; // Optional Vercel deployment URL
  customDescription?: string; // Override GitHub description
  mainDescription: string; // Primary description for details page
  demoVideoUrl?: string; // Optional demo video URL (embed or mp4)
  demoVideoPoster?: string; // Optional poster image shown before the video plays
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
    demoVideoUrl: "/videos/mapland-demo.mp4",
    demoVideoPoster: "/videos/mapland-demo-poster.webp",
    screenshotUrls: [
      "/projects/mapland/01-map-overview.webp",
      "/projects/mapland/02-zone-info-sheet.webp",
      "/projects/mapland/03-zone-editor.webp",
      "/projects/mapland/04-drawing-zone.webp",
    ],
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
    demoVideoUrl: "/videos/user-lens-demo.mp4",
    demoVideoPoster: "/videos/user-lens-demo-poster.webp",
    screenshotUrls: [
      "/projects/user-lens/01-dashboard.webp",
      "/projects/user-lens/02-search-results.webp",
      "/projects/user-lens/03-add-user-panel.webp",
      "/projects/user-lens/04-user-detail.webp",
    ],
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
    demoVideoUrl: "/videos/films-demo.mp4",
    demoVideoPoster: "/videos/films-demo-poster.webp",
    screenshotUrls: [
      "/projects/films/01-homepage.webp",
      "/projects/films/02-movie-detail.webp",
      "/projects/films/03-movie-info.webp",
      "/projects/films/04-wishlist.webp",
    ],
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
    demoVideoUrl: "/videos/flashmarket-demo.mp4",
    demoVideoPoster: "/videos/flashmarket-demo-poster.webp",
    screenshotUrls: [
      "/projects/flashmarket/01-dashboard.webp",
      "/projects/flashmarket/02-market-overview.webp",
      "/projects/flashmarket/03-pair-detail.webp",
      "/projects/flashmarket/04-negative-pair.webp",
    ],
    featured: true,
    order: 4,
    extraPills: ["Vue", "Pinia"],
  },
  {
    repoName: "chat-room-app",
    vercelUrl: "https://chat-room-app-theta.vercel.app",
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
  {
    repoName: "slidedude",
    vercelUrl: "https://slidedude.vercel.app/",
    customDescription:
      "Animated presentation builder for technical talks with syntax-highlighted code slides, smooth code transitions, content slides, and cloud-backed editing.",
    mainDescription:
      "Slidedude is a browser-based presentation app for technical talks, combining code editing, rich content slides, drag-and-drop deck management, and Shiki Magic Move transitions into a polished workflow for authoring and presenting live demos.",
    demoVideoUrl: "",
    screenshotUrls: [],
    featured: true,
    order: 7,
    extraPills: ["Shiki", "Shiki Magic Move", "Auth.js", "Upstash Redis", "Framer Motion", "dnd-kit"],
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

export function toProjectId(repoName: string): string {
  return `project-${repoName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}
