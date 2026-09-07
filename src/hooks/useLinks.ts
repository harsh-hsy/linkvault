import { useEffect, useState } from "react";
import type { LinkDraft, SavedLink } from "@/types/link";

const storageKey = "linkvault-links";

function isSavedLink(value: unknown): value is SavedLink {
  if (!value || typeof value !== "object") return false;

  const link = value as Partial<SavedLink>;
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

function readStoredLinks(): SavedLink[] {
  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    return Array.isArray(parsedValue) ? parsedValue.filter(isSavedLink) : [];
  } catch {
    return [];
  }
}

export function useLinks() {
  const [links, setLinks] = useState<SavedLink[]>(readStoredLinks);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(links));
  }, [links]);

  function addLink(draft: LinkDraft) {
    const timestamp = new Date().toISOString();
    const link: SavedLink = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setLinks((currentLinks) => [link, ...currentLinks]);
  }

  function updateLink(linkId: string, draft: LinkDraft) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.id === linkId ? { ...link, ...draft, updatedAt: new Date().toISOString() } : link,
      ),
    );
  }

  function deleteLink(linkId: string) {
    setLinks((currentLinks) => currentLinks.filter((link) => link.id !== linkId));
  }

  function toggleFavorite(linkId: string) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.id === linkId
          ? { ...link, isFavorite: !link.isFavorite, updatedAt: new Date().toISOString() }
          : link,
      ),
    );
  }

  function renameCollection(currentName: string, nextName: string) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.collection === currentName
          ? { ...link, collection: nextName, updatedAt: new Date().toISOString() }
          : link,
      ),
    );
  }

  function clearCollection(name: string) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.collection === name
          ? { ...link, collection: "", updatedAt: new Date().toISOString() }
          : link,
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
  };
}
