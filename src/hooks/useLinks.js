import { useEffect, useState } from "react";
const storageKey = "linkvault-links";
const homeMigrationKey = "linkvault-home-links-migrated";
function isSavedLink(value) {
  if (!value || typeof value !== "object") return false;
  const link = value;
  return (
    typeof link.id === "string" &&
    typeof link.title === "string" &&
    typeof link.url === "string" &&
    typeof link.platformId === "string" &&
    typeof link.collection === "string" &&
    Array.isArray(link.tags) &&
    link.tags.every((tag) => typeof tag === "string") &&
    typeof link.note === "string" &&
    typeof link.isFavorite === "boolean" &&
    typeof link.createdAt === "string" &&
    typeof link.updatedAt === "string"
  );
}
function readStoredLinks() {
  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    const savedLinks = Array.isArray(parsedValue) ? parsedValue.filter(isSavedLink) : [];

    if (localStorage.getItem(homeMigrationKey)) return savedLinks;

    localStorage.setItem(homeMigrationKey, "true");
    return savedLinks.map((link) =>
      link.collection.toLowerCase() === "home" ? { ...link, collection: "" } : link,
    );
  } catch {
    return [];
  }
}
export function useLinks() {
  const [links, setLinks] = useState(readStoredLinks);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(links));
  }, [links]);
  function addLink(draft) {
    const timestamp = new Date().toISOString();
    const link = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    setLinks((currentLinks) => [link, ...currentLinks]);
  }
  function updateLink(linkId, draft) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.id === linkId ? { ...link, ...draft, updatedAt: new Date().toISOString() } : link,
      ),
    );
  }
  function deleteLink(linkId) {
    setLinks((currentLinks) => currentLinks.filter((link) => link.id !== linkId));
  }
  function toggleFavorite(linkId) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.id === linkId
          ? { ...link, isFavorite: !link.isFavorite, updatedAt: new Date().toISOString() }
          : link,
      ),
    );
  }
  function renameCollection(currentName, nextName) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.collection === currentName
          ? { ...link, collection: nextName, updatedAt: new Date().toISOString() }
          : link,
      ),
    );
  }
  function clearCollection(name) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.collection === name
          ? { ...link, collection: "", updatedAt: new Date().toISOString() }
          : link,
      ),
    );
  }
  function moveLink(linkId, collection) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.id === linkId ? { ...link, collection, updatedAt: new Date().toISOString() } : link,
      ),
    );
  }
  return {
    links,
    addLink,
    updateLink,
    deleteLink,
    toggleFavorite,
    renameCollection,
    clearCollection,
    moveLink,
  };
}
