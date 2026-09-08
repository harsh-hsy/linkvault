import { useEffect, useRef } from "react";
import { Copy, ExternalLink, MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
import "./LinkActions.css";
export function LinkActions({ link, onCopy, onDelete, onEdit, onToggleFavorite }) {
  const menuRef = useRef(null);
  useEffect(() => {
    function closeMenu(event) {
      const menu = menuRef.current;
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
      }
    }
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, []);
  return (
    <div className="link-actions">
      <button
        className={`icon-button favorite-button ${link.isFavorite ? "is-favorite" : ""}`}
        type="button"
        aria-label={link.isFavorite ? "Remove from favorites" : "Add to favorites"}
        onClick={() => onToggleFavorite(link.id)}
      >
        <Star fill={link.isFavorite ? "currentColor" : "none"} aria-hidden="true" />
      </button>

      <details ref={menuRef} className="action-menu">
        <summary className="icon-button" aria-label={`Actions for ${link.title}`}>
          <MoreHorizontal aria-hidden="true" />
        </summary>
        <div>
          <a href={link.url} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden="true" />
            Open
          </a>
          <button type="button" onClick={() => onCopy(link)}>
            <Copy aria-hidden="true" />
            Copy URL
          </button>
          <button type="button" onClick={() => onEdit(link)}>
            <Pencil aria-hidden="true" />
            Edit
          </button>
          <button className="delete-action" type="button" onClick={() => onDelete(link)}>
            <Trash2 aria-hidden="true" />
            Delete
          </button>
        </div>
      </details>
    </div>
  );
}
