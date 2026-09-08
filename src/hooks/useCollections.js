import { useEffect, useState } from "react";
const storageKey = "linkvault-collections";
function readStoredCollections() {
  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    if (!Array.isArray(parsedValue)) return [];
    return parsedValue.filter((value) => typeof value === "string" && Boolean(value));
  } catch {
    return [];
  }
}
export function useCollections() {
  const [savedCollections, setSavedCollections] = useState(readStoredCollections);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(savedCollections));
  }, [savedCollections]);
  function addCollection(name) {
    const cleanName = name.trim();
    if (!cleanName) return;
    setSavedCollections((currentCollections) => {
      const alreadyExists = currentCollections.some(
        (collection) => collection.toLowerCase() === cleanName.toLowerCase(),
      );
      return alreadyExists ? currentCollections : [...currentCollections, cleanName];
    });
  }
  function renameCollection(currentName, nextName) {
    setSavedCollections((currentCollections) => [
      ...currentCollections.filter(
        (collection) => collection.toLowerCase() !== currentName.toLowerCase(),
      ),
      nextName.trim(),
    ]);
  }
  function deleteCollection(name) {
    setSavedCollections((currentCollections) =>
      currentCollections.filter((collection) => collection.toLowerCase() !== name.toLowerCase()),
    );
  }
  return { savedCollections, addCollection, renameCollection, deleteCollection };
}
