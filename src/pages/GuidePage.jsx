import {
  ArrowRight,
  Check,
  Copy,
  FolderPlus,
  Globe2,
  HardDrive,
  Link2,
  MoreHorizontal,
  Pencil,
  Search,
  Star,
} from "lucide-react";
import { SkipLink } from "@/components/common/SkipLink";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import "./GuidePage.css";
const guideSteps = [
  ["01", "Choose a link type", "Start with a supported platform or any custom website."],
  ["02", "Add useful details", "Enter the URL, title, collection, tags, and an optional note."],
  ["03", "Organize your library", "Use collections and favorites to keep important links close."],
  ["04", "Search and manage", "Find links instantly, then open, copy, edit, or delete them."],
];
const linkDetails = [
  ["URL or username", "Paste a complete URL, or enter a username when the platform supports it."],
  ["Title", "Use a short, recognizable name that will be easy to search later."],
  ["Collection", "Place the link in the part of your library where it naturally belongs."],
  ["Tags", "Add a few specific labels, separated by commas, to improve future searches."],
  ["Note", "Record why the link matters or what you want to do with it."],
  ["Favorite", "Select the star when you expect to open the link frequently."],
];
const actions = [
  { icon: Link2, title: "Open", description: "Visit the saved destination in a new browser tab." },
  { icon: Copy, title: "Copy URL", description: "Copy the complete address to your clipboard." },
  { icon: Pencil, title: "Edit", description: "Update the title, URL, collection, tags, or note." },
  {
    icon: Star,
    title: "Favorite",
    description: "Add or remove the link from your favorites view.",
  },
];
export function GuidePage() {
  return (
    <div className="guide-page">
      <SkipLink targetId="guide-content" />
      <PublicHeader />

      <main id="guide-content">
        <section className="guide-hero">
          <p className="guide-eyebrow">LinkVault guide</p>
          <h1>Build a useful link library in four steps.</h1>
          <p>
            Learn the complete LinkVault workflow—from saving your first website to finding and
            managing it later.
          </p>
          <a className="button button-primary" href="/app">
            Open LinkVault
            <ArrowRight aria-hidden="true" />
          </a>
        </section>

        <nav className="guide-overview" aria-label="Guide steps">
          {guideSteps.map(([number, title], index) => (
            <a href={`#step-${index + 1}`} key={number}>
              <span>{number}</span>
              {title}
            </a>
          ))}
        </nav>

        <section className="guide-step" id="step-1">
          <span className="guide-step-number">01</span>
          <div className="guide-step-content">
            <p className="guide-eyebrow">Choose</p>
            <h2>Start with a platform or custom website.</h2>
            <p className="guide-step-intro">
              Select <strong>Add link</strong> to open the platform picker. Search for a supported
              service, choose one of the visible platforms, or continue with Custom.
            </p>

            <div className="guide-choice-grid">
              <article>
                <span>
                  <Globe2 aria-hidden="true" />
                </span>
                <h3>Supported platform</h3>
                <p>
                  Pick the platform to keep its familiar icon. Where supported, you can provide a
                  username instead of constructing the full profile URL.
                </p>
              </article>
              <article>
                <span>
                  <Link2 aria-hidden="true" />
                </span>
                <h3>Custom website</h3>
                <p>
                  Paste any complete website address. LinkVault will try to display that website's
                  favicon on the saved card.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="guide-step" id="step-2">
          <span className="guide-step-number">02</span>
          <div className="guide-step-content">
            <p className="guide-eyebrow">Describe</p>
            <h2>Add enough context to find it later.</h2>
            <p className="guide-step-intro">
              Only the link and title are essential. Collections, tags, notes, and favorites make
              the library more useful as it grows.
            </p>

            <dl className="detail-list">
              {linkDetails.map(([term, description]) => (
                <div key={term}>
                  <dt>
                    <Check aria-hidden="true" />
                    {term}
                  </dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="guide-step" id="step-3">
          <span className="guide-step-number">03</span>
          <div className="guide-step-content">
            <p className="guide-eyebrow">Organize</p>
            <h2>Create collections that match your routine.</h2>
            <p className="guide-step-intro">
              Use the plus button beside Collections to create a category. Keep names simple—such as
              Work, Learning, Development, or Personal—so every link has an obvious home.
            </p>

            <div className="collection-guide-panel">
              <span>
                <FolderPlus aria-hidden="true" />
              </span>
              <div>
                <h3>Manage collections from two places</h3>
                <p>
                  Edit or delete a collection from the sidebar, or use the management actions on an
                  open collection page. When a collection is deleted, its links remain saved and
                  become unassigned.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="guide-step" id="step-4">
          <span className="guide-step-number">04</span>
          <div className="guide-step-content">
            <p className="guide-eyebrow">Retrieve</p>
            <h2>Search once, then take action.</h2>
            <p className="guide-step-intro">
              Search checks titles, URLs, tags, and notes. You can also open a collection, view
              favorites, change the sort order, or switch between grid and list layouts.
            </p>

            <div className="search-guide-bar">
              <Search aria-hidden="true" />
              <span>Search links, tags and notes...</span>
            </div>

            <div className="action-guide-grid">
              {actions.map(({ icon: Icon, title, description }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <p className="menu-guide-note">
              <MoreHorizontal aria-hidden="true" />
              Open the card menu for secondary actions. Clicking outside the menu closes it.
            </p>
          </div>
        </section>

        <section className="guide-storage-note">
          <HardDrive aria-hidden="true" />
          <div>
            <p className="guide-eyebrow">Before you rely on your library</p>
            <h2>Remember that your data is browser-local.</h2>
            <p>
              Use LinkVault in the same browser and device to access the same library. Clearing site
              data may remove saved links, and libraries do not currently sync automatically between
              devices.
            </p>
          </div>
        </section>

        <section className="guide-cta">
          <h2>Save your first useful link.</h2>
          <p>You now know the complete workflow. No account is required.</p>
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
