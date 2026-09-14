export const BASE_URL = import.meta.env.BASE_URL;

export function pageUrl(path = "/") {
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  if (!path || path === "/") return base;
  return `${base}${String(path).replace(/^\//, "")}`;
}

export function pagePath() {
  const base = BASE_URL.replace(/\/$/, "");
  let path = window.location.pathname;
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  return path.replace(/\/+$/, "") || "/";
}
