import { Archive, Info, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import "./AppSidebar.css";
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
}) {
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
          <a className="brand" href="/">
            <span className="brand-mark">
              <img src="/pwa-icon-512.png" width="32" height="32" alt="" />
            </span>
            <span>LinkVault</span>
          </a>
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

        <a className="sidebar-about-link" href="/">
          <Info aria-hidden="true" />
          About LinkVault
        </a>

        <div className="privacy-note">
          <strong>Private by design</strong>
          <span>Your links stay in this browser.</span>
        </div>
      </aside>
    </>
  );
}
function SidebarItem({ icon: Icon, label, count, active, onClick }) {
  return (
    <button className={`sidebar-item ${active ? "is-active" : ""}`} type="button" onClick={onClick}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
      <small>{count}</small>
    </button>
  );
}
