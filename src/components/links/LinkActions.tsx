import { MoreHorizontal, Star } from "lucide-react";
import type { Link } from "@/types/link";

type LinkActionsProps = {
  link: Link;
};

export function LinkActions({ link }: LinkActionsProps) {
  return (
    <div className="link-actions">
      <button
        className={`icon-button favorite-button ${link.isFavorite ? "is-favorite" : ""}`}
        type="button"
        aria-label={link.isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star fill={link.isFavorite ? "currentColor" : "none"} aria-hidden="true" />
      </button>
      <button className="icon-button" type="button" aria-label={`More actions for ${link.title}`}>
        <MoreHorizontal aria-hidden="true" />
      </button>
    </div>
  );
}
