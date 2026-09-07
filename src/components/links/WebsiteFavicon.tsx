import { useState } from "react";
import { Globe2 } from "lucide-react";
import { getWebsiteFaviconUrl } from "@/lib/url";

type WebsiteFaviconProps = {
  url: string;
};

export function WebsiteFavicon({ url }: WebsiteFaviconProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return <Globe2 aria-hidden="true" />;

  return (
    <img
      src={getWebsiteFaviconUrl(url)}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
}
