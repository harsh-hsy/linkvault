import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Star, X } from "lucide-react";
import { CollectionSelect } from "@/components/collections/CollectionSelect";
import { PlatformPicker } from "@/components/links/PlatformPicker";
import { getPlatform, type Platform } from "@/data/platforms";
import { buildProfileUrl, normalizeUrl } from "@/lib/url";
import type { LinkDraft, SavedLink } from "@/types/link";

type DialogStep = "platform" | "details";
type InputMode = "username" | "url";

type AddLinkDialogProps = {
  collections: string[];
  link?: SavedLink;
  onClose: () => void;
  onSave: (draft: LinkDraft) => void;
};

export function AddLinkDialog({ collections, link, onClose, onSave }: AddLinkDialogProps) {
  const initialPlatform = getPlatform(link?.platformId ?? "custom");
  const [step, setStep] = useState<DialogStep>(link ? "details" : "platform");
  const [platform, setPlatform] = useState(initialPlatform);
  const [inputMode, setInputMode] = useState<InputMode>("url");
  const [address, setAddress] = useState(link?.url ?? "");
  const [title, setTitle] = useState(link?.title ?? "");
  const [collection, setCollection] = useState(link?.collection ?? "");
  const [tags, setTags] = useState(link?.tags.join(", ") ?? "");
  const [note, setNote] = useState(link?.note ?? "");
  const [isFavorite, setIsFavorite] = useState(link?.isFavorite ?? false);
  const [error, setError] = useState("");
  const PlatformIcon = platform.icon;

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  function choosePlatform(selectedPlatform: Platform) {
    setPlatform(selectedPlatform);
    setInputMode(selectedPlatform.profileBaseUrl ? "username" : "url");
    if (!link) setAddress("");
    setError("");
    setStep("details");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const url =
        inputMode === "username" && platform.profileBaseUrl
          ? buildProfileUrl(platform.profileBaseUrl, address)
          : normalizeUrl(address);
      const normalizedTags = tags
        .split(",")
        .map((tag) => tag.trim().replace(/^#/, ""))
        .filter(Boolean);

      onSave({
        title: title.trim(),
        url,
        platformId: platform.id,
        collection: collection.trim(),
        tags: [...new Set(normalizedTags)],
        note: note.trim(),
        isFavorite,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Enter a valid link.");
    }
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="add-link-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-link-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="dialog-header">
          <div className="dialog-title-row">
            {step === "details" && !link && (
              <button
                className="icon-button"
                type="button"
                aria-label="Choose another platform"
                onClick={() => setStep("platform")}
              >
                <ArrowLeft aria-hidden="true" />
              </button>
            )}
            <div>
              {step === "platform" && <span>Choose where the link belongs</span>}
              <h2 id="add-link-title">{link ? "Edit link" : "Add a link"}</h2>
            </div>
          </div>
          <button className="icon-button" type="button" aria-label="Close" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>

        {step === "platform" ? (
          <PlatformPicker onSelect={choosePlatform} />
        ) : (
          <form className="link-details-form" onSubmit={handleSubmit}>
            <div className="selected-platform">
              <span className="selected-platform-icon">
                <PlatformIcon aria-hidden="true" />
              </span>
              <span>
                <strong>{platform.name}</strong>
                <small>
                  {platform.profileBaseUrl ? "Account or profile link" : "Full website URL"}
                </small>
              </span>
              {!link && (
                <button type="button" onClick={() => setStep("platform")}>
                  Change
                </button>
              )}
            </div>

            {platform.profileBaseUrl && (
              <div className="mode-switcher" aria-label="Link input type">
                <button
                  type="button"
                  className={inputMode === "username" ? "is-active" : ""}
                  onClick={() => {
                    setInputMode("username");
                    setAddress("");
                  }}
                >
                  Username
                </button>
                <button
                  type="button"
                  className={inputMode === "url" ? "is-active" : ""}
                  onClick={() => {
                    setInputMode("url");
                    setAddress("");
                  }}
                >
                  Full URL
                </button>
              </div>
            )}

            <label className="form-field">
              <span>
                {inputMode === "username" ? platform.usernameLabel : "Full URL"}
                <b>*</b>
              </span>
              <input
                required
                autoFocus
                value={address}
                placeholder={
                  inputMode === "username" ? platform.usernamePlaceholder : "https://example.com"
                }
                onChange={(event) => setAddress(event.target.value)}
              />
              {inputMode === "username" && address.trim() && (
                <small className="generated-link">
                  <Check aria-hidden="true" />
                  {platform.profileBaseUrl}
                  {address.trim().replace(/^@/, "")}
                </small>
              )}
            </label>

            <label className="form-field">
              <span>
                Title <b>*</b>
              </span>
              <input
                required
                value={title}
                placeholder="What do you want to call it?"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <div className="form-row">
              <div className="form-field collection-field">
                <span>Collection</span>
                <CollectionSelect
                  collections={collections}
                  value={collection}
                  onChange={setCollection}
                />
              </div>

              <label className="form-field">
                <span>Tags</span>
                <input
                  value={tags}
                  placeholder="design, react"
                  onChange={(event) => setTags(event.target.value)}
                />
              </label>
            </div>

            <label className="form-field">
              <span>Note</span>
              <textarea
                rows={3}
                value={note}
                placeholder="Why is this link worth keeping?"
                onChange={(event) => setNote(event.target.value)}
              />
            </label>

            <button
              className={`favorite-toggle ${isFavorite ? "is-selected" : ""}`}
              type="button"
              aria-pressed={isFavorite}
              onClick={() => setIsFavorite((currentValue) => !currentValue)}
            >
              <Star aria-hidden="true" />
              {isFavorite ? "Added to favorites" : "Add to favorites"}
            </button>

            {error && <p className="form-error">{error}</p>}

            <footer className="form-footer">
              <button className="button button-secondary" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="button button-primary" type="submit">
                {link ? "Save changes" : "Save link"}
              </button>
            </footer>
          </form>
        )}
      </section>
    </div>
  );
}
