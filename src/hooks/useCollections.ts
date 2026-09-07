import { useEffect, useState } from "react";

const storageKey = "linkvault-collections";

function readStoredCollections() {
  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(
      (value): value is string => typeof value === "string" && Boolean(value),
    );
  } catch {
    return [];
  }
}

export function useCollections() {
  const [savedCollections, setSavedCollections] = useState<string[]>(readStoredCollections);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(savedCollections));
  }, [savedCollections]);

  function addCollection(name: string) {
    const cleanName = name.trim();
    if (!cleanName) return;

    setSavedCollections((currentCollections) => {
      const alreadyExists = currentCollections.some(
        (collection) => collection.toLowerCase() === cleanName.toLowerCase(),
      );

      return alreadyExists ? currentCollections : [...currentCollections, cleanName];
    });
  }

  function renameCollection(currentName: string, nextName: string) {
    setSavedCollections((currentCollections) => [
      ...currentCollections.filter(
        (collection) => collection.toLowerCase() !== currentName.toLowerCase(),
      ),
      nextName.trim(),
    ]);
  }

  function deleteCollection(name: string) {
    setSavedCollections((currentCollections) =>
      currentCollections.filter((collection) => collection.toLowerCase() !== name.toLowerCase()),
    );
  }

  return { savedCollections, addCollection, renameCollection, deleteCollection };
}
