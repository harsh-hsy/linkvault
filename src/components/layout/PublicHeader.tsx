import { ThemeToggle } from "@/components/common/ThemeToggle";
import "./PublicHeader.css";

const navigation = [
  ["Features", "/#features"],
  ["How it works", "/#guide"],
  ["Privacy", "/#privacy"],
  ["FAQ", "/#faq"],
  ["Learn more", "/#learn-more"],
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
        {navigation.map(([label, href]) => (
          <a
            href={currentPath === "/features" && label === "Features" ? "/features" : href}
            key={label}
            aria-current={currentPath === "/features" && label === "Features" ? "page" : undefined}
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
