export const SITE_NAME = "Guille Gallo Portfolio";
export const SITE_TITLE = "Guille Gallo - Senior Developer";
export const SITE_DESCRIPTION =
  "Senior Developer portfolio showcasing projects, skills, and experience in web development.";

/** Public origin, no trailing slash. Configure SITE_URL on Vercel once the domain is final. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://guille-gallo-github-io.vercel.app").replace(/\/$/, "");

export function pageTitle(section?: string): string {
  return section ? `${section} | ${SITE_TITLE}` : SITE_TITLE;
}
