export function normalizeUrl(value) {
  const input = value.trim();
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS links are supported.");
  }
  return url.toString();
}
export function buildProfileUrl(baseUrl, username) {
  const cleanUsername = username
    .trim()
    .replace(/^@/, "")
    .replace(/^\/+|\/+$/g, "");
  if (!cleanUsername) {
    throw new Error("Enter a username.");
  }
  return normalizeUrl(`${baseUrl}${cleanUsername}`);
}
export function getDisplayUrl(value) {
  const url = new URL(value);
  return `${url.hostname}${url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")}`;
}
export function getWebsiteFaviconUrls(value) {
  const url = new URL(value);
  const faviconPaths = [
    "/favicon.ico",
    "/favicon.svg",
    "/favicon.png",
    "/favicon-32.png",
    "/apple-touch-icon.png",
  ];
  return faviconPaths.map((path) => new URL(path, url.origin).toString());
}
