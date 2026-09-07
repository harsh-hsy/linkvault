export function normalizeUrl(value: string) {
  const input = value.trim();
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  const url = new URL(withProtocol);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS links are supported.");
  }

  return url.toString();
}

export function buildProfileUrl(baseUrl: string, username: string) {
  const cleanUsername = username
    .trim()
    .replace(/^@/, "")
    .replace(/^\/+|\/+$/g, "");

  if (!cleanUsername) {
    throw new Error("Enter a username.");
  }

  return normalizeUrl(`${baseUrl}${cleanUsername}`);
}

export function getDisplayUrl(value: string) {
  const url = new URL(value);
  return `${url.hostname}${url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")}`;
}
