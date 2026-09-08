import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import "./ConfirmDialog.css";
export function ConfirmDialog({ title, description, confirmLabel, onCancel, onConfirm }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onCancel]);
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <span className="confirm-dialog-icon">
          <AlertTriangle aria-hidden="true" />
        </span>
        <div className="confirm-dialog-copy">
          <h2 id="confirm-dialog-title">{title}</h2>
          <p id="confirm-dialog-description">{description}</p>
        </div>
        <footer className="confirm-dialog-actions">
          <button className="button button-secondary" type="button" autoFocus onClick={onCancel}>
            Cancel
          </button>
          <button className="button button-danger" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </footer>
      </section>
    </div>
  );
}
