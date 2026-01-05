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

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
}

async function fetchWithAuth(url: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Use token if available (for higher rate limits)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers, next: { revalidate: false } });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getGitHubUser(): Promise<GitHubUser> {
  return fetchWithAuth(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
}

export async function getAllRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  // Paginate through all repos
  while (true) {
    const pageRepos: GitHubRepo[] = await fetchWithAuth(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated`
    );

    repos.push(...pageRepos);

    if (pageRepos.length < perPage) break;
    page++;
  }

  return repos;
}

export async function getRepoDetails(repoName: string): Promise<GitHubRepo> {
  return fetchWithAuth(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`);
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([getGitHubUser(), getAllRepos()]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Count languages
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalRepos: user.public_repos,
    totalStars,
    totalForks,
    followers: user.followers,
    topLanguages,
  };
}
