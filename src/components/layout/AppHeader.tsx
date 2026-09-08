import { Menu, Plus, Search } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import "./AppHeader.css";

type AppHeaderProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddLink: () => void;
  onMenuClick: () => void;
};

export function AppHeader({ searchQuery, onSearchChange, onAddLink, onMenuClick }: AppHeaderProps) {
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

      <ThemeToggle />

      <button className="button button-primary add-link-button" type="button" onClick={onAddLink}>
        <Plus aria-hidden="true" />
        <span>Add link</span>
      </button>
    </header>
  );
}
