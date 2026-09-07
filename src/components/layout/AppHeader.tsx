import { Menu, Moon, Plus, Search, Sun } from "lucide-react";

type AppHeaderProps = {
  onMenuClick: () => void;
};

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    localStorage.setItem("linkvault-theme", nextTheme);
  }

  return (
    <header className="app-header">
      <button
        className="icon-button mobile-menu"
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
      >
        <Menu aria-hidden="true" />
      </button>

      <label className="search-field">
        <span className="sr-only">Search saved links</span>
        <Search aria-hidden="true" />
        <input type="search" placeholder="Search links, tags and notes..." />
        <kbd>/</kbd>
      </label>

      <button
        className="icon-button theme-toggle"
        type="button"
        aria-label="Toggle color theme"
        onClick={toggleTheme}
      >
        <Moon className="moon-icon" aria-hidden="true" />
        <Sun className="sun-icon" aria-hidden="true" />
      </button>

      <button className="button button-primary add-link-button" type="button">
        <Plus aria-hidden="true" />
        <span>Add link</span>
      </button>
    </header>
  );
}
