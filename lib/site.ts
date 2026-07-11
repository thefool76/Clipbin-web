const DEFAULT_SITE_URL = "https://clipbin.xyz";

export function getSiteUrl() {
  const value = process.env.APP_URL?.trim() || DEFAULT_SITE_URL;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}
