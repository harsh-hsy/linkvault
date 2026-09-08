import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Clipboard,
  CloudOff,
  Cookie,
  Database,
  ExternalLink,
  Globe2,
  HardDrive,
  Palette,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { SkipLink } from "@/components/common/SkipLink";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import "./PrivacyPage.css";

type LocalItem = {
  icon: LucideIcon;
  title: string;
  storageKey: string;
  description: string;
};

const localItems: LocalItem[] = [
  {
    icon: Database,
    title: "Saved links",
    storageKey: "linkvault-links",
    description: "URLs, titles, platform type, tags, notes, favorites, and timestamps.",
  },
  {
    icon: HardDrive,
    title: "Collections",
    storageKey: "linkvault-collections",
    description: "The collection names you create to organize your library.",
  },
  {
    icon: Palette,
    title: "Theme preference",
    storageKey: "linkvault-theme",
    description: "Your selected light or dark appearance.",
  },
];

const networkEvents = [
  {
    icon: Globe2,
    title: "Custom website favicons",
    description:
      "For custom links, your browser may request common favicon files directly from the saved website's origin. LinkVault uses a no-referrer policy for those image requests.",
  },
  {
    icon: ExternalLink,
    title: "Opening a saved link",
    description:
      "Selecting a saved link opens the destination website directly. That website then applies its own privacy practices and policies.",
  },
  {
    icon: Clipboard,
    title: "Copying a URL",
    description:
      "LinkVault writes a saved URL to your clipboard only after you choose Copy URL. It does not read clipboard contents.",
  },
];

export function PrivacyPage() {
  return (
    <div className="privacy-page">
      <SkipLink targetId="privacy-content" />
      <PublicHeader />

      <main id="privacy-content">
        <section className="privacy-hero">
          <div className="privacy-kicker">
            <ShieldCheck aria-hidden="true" />
            Private by design
          </div>
          <h1>Your links stay in your browser.</h1>
          <p>
            LinkVault works without an account or application backend. Your saved library is kept in
            local browser storage under your control.
          </p>
          <p className="privacy-updated">Last updated: September 8, 2026</p>
        </section>

        <section className="privacy-summary" aria-label="Privacy summary">
          <div>
            <CloudOff aria-hidden="true" />
            <strong>No account</strong>
            <span>No sign-up or profile</span>
          </div>
          <div>
            <Database aria-hidden="true" />
            <strong>No library backend</strong>
            <span>No LinkVault cloud database</span>
          </div>
          <div>
            <Cookie aria-hidden="true" />
            <strong>No app cookies</strong>
            <span>No login or tracking cookies set by the app</span>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-heading">
            <span>01</span>
            <div>
              <p className="privacy-eyebrow">Stored locally</p>
              <h2>What LinkVault keeps in your browser.</h2>
              <p>
                The app uses localStorage so your library remains available after refreshing or
                reopening the same browser profile.
              </p>
            </div>
          </div>

          <div className="local-data-grid">
            {localItems.map(({ icon: Icon, title, storageKey, description }) => (
              <article key={storageKey}>
                <span className="local-data-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <code>{storageKey}</code>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-heading">
            <span>02</span>
            <div>
              <p className="privacy-eyebrow">Network activity</p>
              <h2>When your browser communicates elsewhere.</h2>
              <p>
                Your library is local, but a web app still makes normal network requests in a few
                specific situations.
              </p>
            </div>
          </div>

          <div className="network-list">
            {networkEvents.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="font-disclosure">
            <Globe2 aria-hidden="true" />
            <p>
              <strong>Interface font:</strong> LinkVault currently loads the Geist font through
              Google Fonts. Your browser may connect to Google's font service to download it.
            </p>
          </div>
        </section>

        <section className="privacy-control-panel">
          <div className="privacy-control-icon">
            <Trash2 aria-hidden="true" />
          </div>
          <div>
            <p className="privacy-eyebrow">Your controls</p>
            <h2>Edit, delete, or clear your local library.</h2>
            <p>
              You can edit and delete individual links or collections inside LinkVault. To remove
              all locally stored LinkVault data, clear the site's storage through your browser
              settings.
            </p>
          </div>
          <ul>
            <li>
              <Check aria-hidden="true" />
              Edit saved details
            </li>
            <li>
              <Check aria-hidden="true" />
              Delete links or collections
            </li>
            <li>
              <Check aria-hidden="true" />
              Clear all site storage
            </li>
          </ul>
        </section>

        <section className="privacy-section privacy-limitations">
          <div className="privacy-section-heading">
            <span>03</span>
            <div>
              <p className="privacy-eyebrow">Important limitations</p>
              <h2>Local storage is private, but it needs care.</h2>
            </div>
          </div>

          <div className="limitation-grid">
            <article>
              <h3>No automatic sync</h3>
              <p>Different devices, browsers, and browser profiles keep separate libraries.</p>
            </article>
            <article>
              <h3>Browser data can be cleared</h3>
              <p>Removing site data may permanently remove your saved links and collections.</p>
            </article>
            <article>
              <h3>Device access still matters</h3>
              <p>
                Anyone with access to your unlocked browser profile may be able to view the library.
              </p>
            </article>
          </div>
        </section>

        <section className="privacy-hosting-note">
          <h2>Hosting and third-party services</h2>
          <p>
            LinkVault is delivered as a website through Cloudflare Pages. Hosting infrastructure and
            third-party websites may process standard technical request information according to
            their own policies. LinkVault does not control the privacy practices of websites you
            save or open.
          </p>
        </section>

        <section className="privacy-cta">
          <h2>Organize links without creating an account.</h2>
          <p>Open LinkVault and keep your library in this browser.</p>
          <a className="button button-primary" href="/app">
            Open LinkVault
            <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
