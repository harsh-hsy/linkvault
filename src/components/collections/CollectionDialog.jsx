import { useEffect, useState } from "react";
import { FolderPlus, X } from "lucide-react";
import "./CollectionDialog.css";
export function CollectionDialog({ currentName = "", error, onClose, onSave }) {
  const [name, setName] = useState(currentName);
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  function handleSubmit(event) {
    event.preventDefault();
    onSave(name);
  }
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="collection-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="collection-dialog-header">
          <span className="collection-dialog-icon">
            <FolderPlus aria-hidden="true" />
          </span>
          <div>
            <h2 id="collection-dialog-title">
              {currentName ? "Rename collection" : "New collection"}
            </h2>
            <p>Keep related links together.</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>

        <form className="collection-dialog-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Collection name</span>
            <input
              required
              autoFocus
              maxLength={40}
              value={name}
              placeholder="Development"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <footer className="form-footer">
            <button className="button button-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="button button-primary" type="submit">
              {currentName ? "Save name" : "Create collection"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
