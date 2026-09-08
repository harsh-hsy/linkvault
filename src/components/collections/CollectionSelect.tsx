import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Folder } from "lucide-react";
import "./CollectionSelect.css";

type CollectionSelectProps = {
  collections: string[];
  value: string;
  onChange: (value: string) => void;
};

export function CollectionSelect({ collections, value, onChange }: CollectionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeMenu(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function selectCollection(name: string) {
    onChange(name);
    setIsOpen(false);
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
        <span className={value ? "" : "is-placeholder"}>{value || "Choose a collection"}</span>
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
            <span>No collection</span>
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
        </div>
      )}
    </div>
  );
}
