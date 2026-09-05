const GITHUB_USERNAME = "guille-gallo";
const GITHUB_API_BASE = "https://api.github.com";

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
}

async function fetchWithAuth<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "guille-gallo-portfolio",
  };

  // Use token if available (for higher rate limits)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getRepoDetails(repoName: string): Promise<GitHubRepo> {
  return fetchWithAuth<GitHubRepo>(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`);
}
