import { BriefcaseBusiness, Code2, Link2, Play } from "lucide-react";
import { LinkActions } from "@/components/links/LinkActions";
import type { Link } from "@/types/link";

const platformIcons = {
  github: Code2,
  youtube: Play,
  linkedin: BriefcaseBusiness,
  custom: Link2,
};

type LinkCardProps = {
  link: Link;
};

export function LinkCard({ link }: LinkCardProps) {
  const PlatformIcon = platformIcons[link.platformId];

  return (
    <article className="link-card">
      <div className="link-card-header">
        <div className="platform-icon">
          <PlatformIcon aria-hidden="true" />
        </div>

        <div className="link-identity">
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.title}
          </a>
          <span>{link.hostname}</span>
        </div>

        <LinkActions link={link} />
      </div>

      <p className="link-note">{link.note}</p>

      <div className="link-meta">
        <span className="collection-name">
          <i style={{ backgroundColor: link.collectionColor }} />
          {link.collection}
        </span>
        {link.tags.map((tag) => (
          <span className="tag" key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
