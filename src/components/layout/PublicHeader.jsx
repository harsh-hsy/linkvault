import { ThemeToggle } from "@/components/common/ThemeToggle";
import "./PublicHeader.css";
const landingNavigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#guide" },
  { label: "Privacy", href: "#privacy" },
  { label: "FAQ", href: "#faq" },
  { label: "Learn more", href: "#learn-more" },
];
const pageNavigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Guide", href: "/guide" },
  { label: "Installation", href: "/install" },
  { label: "Privacy", href: "/privacy" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms", href: "/terms" },
];
export function PublicHeader() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isLandingPage = currentPath === "/";
  const navigation = isLandingPage ? landingNavigation : pageNavigation;
  return (
    <header className={`public-header ${isLandingPage ? "landing-public-header" : "page-header"}`}>
      <a className="public-brand" href="/" aria-label="LinkVault home">
        <img src="/pwa-icon-512.png" width="34" height="34" alt="" />
        <span>LinkVault</span>
      </a>

      <nav
        className="public-nav"
        aria-label={isLandingPage ? "Landing page sections" : "Information pages"}
      >
        {navigation.map(({ label, href }) => (
          <a
            href={href}
            key={label}
            aria-current={
              (isLandingPage && label === "Home") || (!isLandingPage && currentPath === href)
                ? "page"
                : undefined
            }
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
