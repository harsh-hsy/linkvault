import { useEffect, useState } from "react";
import { Archive, Info, MoreHorizontal, Pencil, Plus, Star, Trash2, X } from "lucide-react";
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
  const [openCollectionMenu, setOpenCollectionMenu] = useState("");
  const favoriteCount = links.filter((link) => link.isFavorite).length;

  useEffect(() => {
    function closeCollectionMenu(event) {
      if (!event.target.closest(".collection-actions-menu")) setOpenCollectionMenu("");
    }

    document.addEventListener("pointerdown", closeCollectionMenu);
    return () => document.removeEventListener("pointerdown", closeCollectionMenu);
  }, []);
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
                  <div className="collection-actions-menu">
                    <button
                      className="collection-menu-trigger"
                      type="button"
                      aria-label={`Manage ${collection}`}
                      aria-expanded={openCollectionMenu === collection}
                      onClick={() =>
                        setOpenCollectionMenu((currentMenu) =>
                          currentMenu === collection ? "" : collection,
                        )
                      }
                    >
                      <MoreHorizontal aria-hidden="true" />
                    </button>
                    {openCollectionMenu === collection && (
                      <div className="collection-menu-popover">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenCollectionMenu("");
                            onEditCollection(collection);
                          }}
                        >
                          <Pencil aria-hidden="true" />
                          Edit
                        </button>
                        <button
                          className="delete-action"
                          type="button"
                          onClick={() => {
                            setOpenCollectionMenu("");
                            onDeleteCollection(collection);
                          }}
                        >
                          <Trash2 aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    )}
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
