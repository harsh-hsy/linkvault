import { Archive, Link2, Star, X } from "lucide-react";
import type { SavedLink } from "@/types/link";

export type LibraryView =
  | { type: "all" }
  | { type: "favorites" }
  | { type: "collection"; name: string };

type AppSidebarProps = {
  links: SavedLink[];
  collections: string[];
  selectedView: LibraryView;
  isOpen: boolean;
  onSelect: (view: LibraryView) => void;
  onClose: () => void;
};

export function AppSidebar({
  links,
  collections,
  selectedView,
  isOpen,
  onSelect,
  onClose,
}: AppSidebarProps) {
  const favoriteCount = links.filter((link) => link.isFavorite).length;

  return (
    <>
      {isOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="brand-row">
          <div className="brand">
            <span className="brand-mark">
              <Link2 aria-hidden="true" />
            </span>
            <span>LinkVault</span>
          </div>
          <button
            className="icon-button sidebar-close"
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Link library">
          <SidebarItem
            icon={Archive}
            label="All links"
            count={links.length}
            active={selectedView.type === "all"}
            onClick={() => onSelect({ type: "all" })}
          />
          <SidebarItem
            icon={Star}
            label="Favorites"
            count={favoriteCount}
            active={selectedView.type === "favorites"}
            onClick={() => onSelect({ type: "favorites" })}
          />

          {collections.length > 0 && (
            <div className="collections">
              <p className="section-label">Collections</p>
              {collections.map((collection) => (
                <button
                  key={collection}
                  className={`sidebar-item ${
                    selectedView.type === "collection" && selectedView.name === collection
                      ? "is-active"
                      : ""
                  }`}
                  type="button"
                  onClick={() => onSelect({ type: "collection", name: collection })}
                >
                  <span className="collection-dot" />
                  <span>{collection}</span>
                  <small>{links.filter((link) => link.collection === collection).length}</small>
                </button>
              ))}
            </div>
          )}
        </nav>

        <div className="privacy-note">
          <strong>Private by design</strong>
          <span>Your links stay in this browser.</span>
        </div>
      </aside>
    </>
  );
}

type SidebarItemProps = {
  icon: typeof Archive;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

function SidebarItem({ icon: Icon, label, count, active, onClick }: SidebarItemProps) {
  return (
    <button className={`sidebar-item ${active ? "is-active" : ""}`} type="button" onClick={onClick}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
      <small>{count}</small>
    </button>
  );
}
