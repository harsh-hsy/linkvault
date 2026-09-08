import { useEffect, useState } from "react";
const storageKey = "linkvault-collections";
const defaultsKey = "linkvault-default-collections-added";
const homeMigrationKey = "linkvault-home-collection-migrated";
const defaultCollections = ["Work", "Personal", "Learning", "Social", "Documents", "Shared"];

function readStoredCollections() {
  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    let savedCollections = Array.isArray(parsedValue)
      ? parsedValue.filter((value) => typeof value === "string" && Boolean(value))
      : [];

    if (!localStorage.getItem(homeMigrationKey)) {
      savedCollections = savedCollections.filter((name) => name.toLowerCase() !== "home");
      localStorage.setItem(homeMigrationKey, "true");
    }

    if (localStorage.getItem(defaultsKey)) return savedCollections;

    localStorage.setItem(defaultsKey, "true");
    return [
      ...new Map(
        [...savedCollections, ...defaultCollections].map((name) => [name.toLowerCase(), name]),
      ).values(),
    ];
  } catch {
    return defaultCollections;
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
