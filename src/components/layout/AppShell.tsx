import { useState } from "react";
import { Grid2X2, Link2, List, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { CollectionDialog } from "@/components/collections/CollectionDialog";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar, type LibraryView } from "@/components/layout/AppSidebar";
import { AddLinkDialog } from "@/components/links/AddLinkDialog";
import { LinkCard } from "@/components/links/LinkCard";
import { useCollections } from "@/hooks/useCollections";
import { useLinks } from "@/hooks/useLinks";
import type { LinkDraft, SavedLink } from "@/types/link";

type CardView = "grid" | "list";
type SortOrder = "newest" | "title";
type PendingDelete =
  | { type: "link"; link: SavedLink }
  | { type: "collection"; name: string; linkCount: number };

export function AppShell() {
  const {
    links,
    addLink,
    updateLink,
    deleteLink,
    toggleFavorite,
    renameCollection: renameLinksCollection,
    clearCollection,
  } = useLinks();
  const {
    savedCollections,
    addCollection,
    renameCollection: renameSavedCollection,
    deleteCollection: deleteSavedCollection,
  } = useCollections();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SavedLink>();
  const [collectionDialog, setCollectionDialog] = useState<{ currentName?: string }>();
  const [collectionError, setCollectionError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>();
  const [libraryView, setLibraryView] = useState<LibraryView>({ type: "all" });
  const [cardView, setCardView] = useState<CardView>("grid");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const linkedCollections = links.map((link) => link.collection).filter(Boolean);
  const collections = [
    ...new Map(
      [...savedCollections, ...linkedCollections].map((name) => [name.toLowerCase(), name]),
    ).values(),
  ].sort((firstName, secondName) => firstName.localeCompare(secondName));
  const visibleLinks = links
    .filter((link) => {
      if (libraryView.type === "favorites" && !link.isFavorite) return false;
      if (libraryView.type === "collection" && link.collection !== libraryView.name) return false;

      const searchableText = [link.title, link.url, link.note, link.collection, ...link.tags]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchQuery.trim().toLowerCase());
    })
    .sort((firstLink, secondLink) => {
      if (sortOrder === "title") return firstLink.title.localeCompare(secondLink.title);
      return Date.parse(secondLink.createdAt) - Date.parse(firstLink.createdAt);
    });

  const pageTitle =
    libraryView.type === "favorites"
      ? "Favorites"
      : libraryView.type === "collection"
        ? libraryView.name
        : "All links";

  function openAddForm() {
    setEditingLink(undefined);
    setIsFormOpen(true);
  }

  function openEditForm(link: SavedLink) {
    setEditingLink(link);
    setIsFormOpen(true);
  }

  function saveLink(draft: LinkDraft) {
    addCollection(draft.collection);

    if (editingLink) {
      updateLink(editingLink.id, draft);
      showMessage("Link updated");
    } else {
      addLink(draft);
      showMessage("Link saved");
    }

    setIsFormOpen(false);
    setEditingLink(undefined);
  }

  function openCollectionDialog(currentName?: string) {
    setCollectionError("");
    setCollectionDialog({ currentName });
  }

  function closeCollectionDialog() {
    setCollectionDialog(undefined);
    setCollectionError("");
  }

  function saveCollection(name: string) {
    const cleanName = name.trim();
    const currentName = collectionDialog?.currentName;

    if (!cleanName) {
      setCollectionError("Enter a collection name.");
      return;
    }

    const duplicateExists = collections.some(
      (collection) =>
        collection.toLowerCase() === cleanName.toLowerCase() && collection !== currentName,
    );

    if (duplicateExists) {
      setCollectionError("A collection with this name already exists.");
      return;
    }

    if (currentName) {
      renameSavedCollection(currentName, cleanName);
      renameLinksCollection(currentName, cleanName);
      if (libraryView.type === "collection" && libraryView.name === currentName) {
        setLibraryView({ type: "collection", name: cleanName });
      }
      showMessage("Collection renamed");
    } else {
      addCollection(cleanName);
      showMessage("Collection created");
    }

    closeCollectionDialog();
  }

  function requestCollectionDelete(name: string) {
    const linkCount = links.filter((link) => link.collection === name).length;
    setPendingDelete({ type: "collection", name, linkCount });
  }

  function requestLinkDelete(link: SavedLink) {
    setPendingDelete({ type: "link", link });
  }

  function confirmDelete() {
    if (!pendingDelete) return;

    if (pendingDelete.type === "link") {
      deleteLink(pendingDelete.link.id);
      showMessage("Link deleted");
    } else {
      deleteSavedCollection(pendingDelete.name);
      clearCollection(pendingDelete.name);
      if (libraryView.type === "collection" && libraryView.name === pendingDelete.name) {
        setLibraryView({ type: "all" });
      }
      showMessage("Collection deleted");
    }

    setPendingDelete(undefined);
  }

  async function copyLink(link: SavedLink) {
    try {
      await navigator.clipboard.writeText(link.url);
      showMessage("URL copied");
    } catch {
      showMessage("Could not copy URL");
    }
  }

  function showMessage(nextMessage: string) {
    setMessage(nextMessage);
    window.setTimeout(() => setMessage(""), 2200);
  }

  return (
    <div className="app-shell">
      <AppSidebar
        links={links}
        collections={collections}
        selectedView={libraryView}
        isOpen={isSidebarOpen}
        onSelect={(view) => {
          setLibraryView(view);
          setIsSidebarOpen(false);
        }}
        onCreateCollection={() => openCollectionDialog()}
        onEditCollection={openCollectionDialog}
        onDeleteCollection={requestCollectionDelete}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="app-main">
        <AppHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddLink={openAddForm}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Library</p>
              <h1>{pageTitle}</h1>
              <p className="page-description">
                {links.length === 0
                  ? "Start building a library you can actually find later."
                  : "Everything worth keeping, in one place."}
              </p>
            </div>

            <div className="page-heading-actions">
              {libraryView.type === "collection" && (
                <div className="collection-page-actions" aria-label="Manage collection">
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Rename ${libraryView.name}`}
                    title="Rename collection"
                    onClick={() => openCollectionDialog(libraryView.name)}
                  >
                    <Pencil aria-hidden="true" />
                  </button>
                  <button
                    className="icon-button delete-button"
                    type="button"
                    aria-label={`Delete ${libraryView.name}`}
                    title="Delete collection"
                    onClick={() => requestCollectionDelete(libraryView.name)}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>
              )}

              <div className="view-switcher" aria-label="Choose link view">
                <button
                  className={`icon-button ${cardView === "grid" ? "is-active" : ""}`}
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setCardView("grid")}
                >
                  <Grid2X2 aria-hidden="true" />
                </button>
                <button
                  className={`icon-button ${cardView === "list" ? "is-active" : ""}`}
                  type="button"
                  aria-label="List view"
                  onClick={() => setCardView("list")}
                >
                  <List aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          <div className="results-bar">
            <p>
              <strong>{visibleLinks.length}</strong> {visibleLinks.length === 1 ? "link" : "links"}
            </p>
            <select
              aria-label="Sort links"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            >
              <option value="newest">Recently added</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>

          {visibleLinks.length > 0 ? (
            <section className={`link-grid ${cardView === "list" ? "is-list" : ""}`}>
              {visibleLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onCopy={copyLink}
                  onDelete={requestLinkDelete}
                  onEdit={openEditForm}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </section>
          ) : (
            <section className="empty-state">
              <span>
                <Link2 aria-hidden="true" />
              </span>
              <h2>{links.length === 0 ? "No links yet" : "No matching links"}</h2>
              <p>
                {links.length === 0
                  ? "Save your first useful link to get started."
                  : "Try another search or choose a different collection."}
              </p>
              {links.length === 0 && (
                <button className="button button-primary" type="button" onClick={openAddForm}>
                  Add your first link
                </button>
              )}
            </section>
          )}
        </main>
      </div>

      {isFormOpen && (
        <AddLinkDialog
          key={editingLink?.id ?? "new-link"}
          link={editingLink}
          collections={collections}
          onClose={() => setIsFormOpen(false)}
          onSave={saveLink}
        />
      )}

      {collectionDialog && (
        <CollectionDialog
          currentName={collectionDialog.currentName}
          error={collectionError}
          onClose={closeCollectionDialog}
          onSave={saveCollection}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={pendingDelete.type === "link" ? "Delete this link?" : "Delete this collection?"}
          description={
            pendingDelete.type === "link"
              ? `“${pendingDelete.link.title}” will be permanently removed from this browser.`
              : pendingDelete.linkCount > 0
                ? `“${pendingDelete.name}” will be removed. Its ${pendingDelete.linkCount} ${
                    pendingDelete.linkCount === 1 ? "link" : "links"
                  } will stay saved without a collection.`
                : `“${pendingDelete.name}” will be permanently removed.`
          }
          confirmLabel={pendingDelete.type === "link" ? "Delete link" : "Delete collection"}
          onCancel={() => setPendingDelete(undefined)}
          onConfirm={confirmDelete}
        />
      )}

      {message && <output className="toast">{message}</output>}
    </div>
  );
}
