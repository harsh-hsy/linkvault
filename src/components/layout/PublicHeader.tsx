import { ThemeToggle } from "@/components/common/ThemeToggle";
import "./PublicHeader.css";

const navigation = [
  { label: "Features", sectionHref: "/#features", pagePath: "/features" },
  { label: "How it works", sectionHref: "/#guide", pagePath: "/guide" },
  { label: "Privacy", sectionHref: "/#privacy", pagePath: "/privacy" },
  { label: "FAQ", sectionHref: "/#faq", pagePath: "/faq" },
  { label: "Learn more", sectionHref: "/#learn-more" },
];

export function PublicHeader() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="public-header">
      <a className="public-brand" href="/" aria-label="LinkVault home">
        <img src="/pwa-icon-512.png" width="34" height="34" alt="" />
        <span>LinkVault</span>
      </a>

      <nav className="public-nav" aria-label="Public pages">
        {navigation.map(({ label, sectionHref, pagePath }) => (
          <a
            href={currentPath === pagePath ? pagePath : sectionHref}
            key={label}
            aria-current={currentPath === pagePath ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="public-header-actions">
        <ThemeToggle className="public-theme-toggle" />
        <a className="button button-primary public-open-button" href="/app">
          Open LinkVault
        </a>
      </div>
    </header>
  );
}
