import { useState } from "react";
import { Globe2 } from "lucide-react";
import { getWebsiteFaviconUrls } from "@/lib/url";
export function WebsiteFavicon({ url }) {
  const [faviconIndex, setFaviconIndex] = useState(0);
  const faviconUrls = getWebsiteFaviconUrls(url);
  const faviconUrl = faviconUrls[faviconIndex];
  if (!faviconUrl) return <Globe2 aria-hidden="true" />;
  return (
    <img
      src={faviconUrl}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFaviconIndex((index) => index + 1)}
    />
  );
}
