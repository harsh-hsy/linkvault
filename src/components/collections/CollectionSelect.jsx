import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Folder, Plus } from "lucide-react";
import "./CollectionSelect.css";
export function CollectionSelect({ collections, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCollection, setNewCollection] = useState("");
  const containerRef = useRef(null);
  useEffect(() => {
    function closeMenu(event) {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  function selectCollection(name) {
    onChange(name);
    setIsOpen(false);
    setIsCreating(false);
    setNewCollection("");
  }
  function createCollection(event) {
    event.preventDefault();
    const cleanName = newCollection.trim();
    if (!cleanName) return;
    const existingCollection = collections.find(
      (name) => name.toLowerCase() === cleanName.toLowerCase(),
    );
    selectCollection(existingCollection ?? cleanName);
  }
  return (
    <div className="collection-select-control" ref={containerRef}>
      <button
        className="collection-select-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <Folder aria-hidden="true" />
        <span>{value || "All links"}</span>
        <ChevronDown aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="collection-options" role="listbox" aria-label="Collections">
          <button
            className={!value ? "is-selected" : ""}
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => selectCollection("")}
          >
            <span>All links</span>
            {!value && <Check aria-hidden="true" />}
          </button>
          {collections.map((name) => (
            <button
              className={value === name ? "is-selected" : ""}
              key={name}
              type="button"
              role="option"
              aria-selected={value === name}
              onClick={() => selectCollection(name)}
            >
              <span>{name}</span>
              {value === name && <Check aria-hidden="true" />}
            </button>
          ))}

          <div className="collection-create">
            {isCreating ? (
              <div className="collection-create-entry">
                <input
                  autoFocus
                  value={newCollection}
                  aria-label="New collection name"
                  placeholder="Collection name"
                  onChange={(event) => setNewCollection(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") createCollection(event);
                  }}
                />
                <button type="button" disabled={!newCollection.trim()} onClick={createCollection}>
                  Add
                </button>
              </div>
            ) : (
              <button
                className="collection-create-button"
                type="button"
                onClick={() => setIsCreating(true)}
              >
                <Plus aria-hidden="true" />
                <span>New collection</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
