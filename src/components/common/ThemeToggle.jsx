import { Moon, Sun } from "lucide-react";
import "./ThemeToggle.css";
export function ThemeToggle({ className = "" }) {
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
    <button
      className={`icon-button ${className}`.trim()}
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
    >
      <Moon className="moon-icon" aria-hidden="true" />
      <Sun className="sun-icon" aria-hidden="true" />
    </button>
  );
}
