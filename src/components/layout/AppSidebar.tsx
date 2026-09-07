import { Archive, Pencil, Plus, Star, Trash2, X } from "lucide-react";
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
  onCreateCollection: () => void;
  onEditCollection: (name: string) => void;
  onDeleteCollection: (name: string) => void;
  onClose: () => void;
};

export function AppSidebar({
  links,
  collections,
  selectedView,
  isOpen,
  onSelect,
  onCreateCollection,
  onEditCollection,
  onDeleteCollection,
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
              <img
                src="/pwa-icon-512.png"
                width="32"
                height="32"
                alt=""
              />
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

          <div className="collections">
            <div className="collections-heading">
              <p className="section-label">Collections</p>
              <button
                className="collection-add-button"
                type="button"
                aria-label="Create collection"
                title="Create collection"
                onClick={onCreateCollection}
              >
                <Plus aria-hidden="true" />
              </button>
            </div>

            {collections.length > 0 ? (
              collections.map((collection) => (
                <div className="collection-row" key={collection}>
                  <button
                    className={`collection-select ${
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
                  <div className="collection-actions">
                    <button
                      type="button"
                      aria-label={`Rename ${collection}`}
                      title="Rename collection"
                      onClick={() => onEditCollection(collection)}
                    >
                      <Pencil aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${collection}`}
                      title="Delete collection"
                      onClick={() => onDeleteCollection(collection)}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="collections-empty">No collections yet</p>
            )}
          </div>
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
