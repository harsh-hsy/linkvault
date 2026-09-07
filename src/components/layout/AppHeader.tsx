import { Menu, Moon, Plus, Search, Sun } from "lucide-react";

type AppHeaderProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddLink: () => void;
  onMenuClick: () => void;
};

export function AppHeader({ searchQuery, onSearchChange, onAddLink, onMenuClick }: AppHeaderProps) {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", nextTheme === "dark" ? "#0a0a0a" : "#fafafa");
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
        <input
          type="search"
          value={searchQuery}
          placeholder="Search links, tags and notes..."
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <button
        className="icon-button"
        type="button"
        aria-label="Toggle color theme"
        onClick={toggleTheme}
      >
        <Moon className="moon-icon" aria-hidden="true" />
        <Sun className="sun-icon" aria-hidden="true" />
      </button>

      <button className="button button-primary add-link-button" type="button" onClick={onAddLink}>
        <Plus aria-hidden="true" />
        <span>Add link</span>
      </button>
    </header>
  );
}
