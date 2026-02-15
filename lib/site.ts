const DEFAULT_SITE_URL = "https://clipbin.app";

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_SITE_URL;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}
