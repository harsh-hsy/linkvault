import { LinkActions } from "@/components/links/LinkActions";
import { WebsiteFavicon } from "@/components/links/WebsiteFavicon";
import { getPlatform } from "@/data/platforms";
import { getDisplayUrl } from "@/lib/url";
import type { SavedLink } from "@/types/link";
import "./LinkCard.css";

type LinkCardProps = {
  link: SavedLink;
  onCopy: (link: SavedLink) => void;
  onDelete: (link: SavedLink) => void;
  onEdit: (link: SavedLink) => void;
  onToggleFavorite: (linkId: string) => void;
};

export function LinkCard({ link, onCopy, onDelete, onEdit, onToggleFavorite }: LinkCardProps) {
  const platform = getPlatform(link.platformId);
  const PlatformIcon = platform.icon;

  return (
    <article className="link-card">
      <div className="link-card-header">
        <div className="platform-icon" title={platform.name}>
          {link.platformId === "custom" ? (
            <WebsiteFavicon key={link.url} url={link.url} />
          ) : (
            <PlatformIcon aria-hidden="true" />
          )}
        </div>

        <div className="link-identity">
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.title}
          </a>
          <span>{getDisplayUrl(link.url)}</span>
        </div>

        <LinkActions
          link={link}
          onCopy={onCopy}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleFavorite={onToggleFavorite}
        />
      </div>

      {link.note && <p className="link-note">{link.note}</p>}

      {(link.collection || link.tags.length > 0) && (
        <div className="link-meta">
          {link.collection && (
            <span className="collection-name">
              <i />
              {link.collection}
            </span>
          )}
          {link.tags.map((tag) => (
            <span className="tag" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
