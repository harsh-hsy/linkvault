import { useState } from "react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { LinkCard } from "@/components/links/LinkCard";
import { sampleLinks } from "@/data/sampleLinks";

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="app-main">
        <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Library</p>
              <h1>All links</h1>
              <p className="page-description">Everything worth keeping, in one place.</p>
            </div>

            <div className="view-actions">
              <button className="button button-secondary" type="button">
                <SlidersHorizontal aria-hidden="true" />
                Filters
              </button>
              <div className="view-switcher" aria-label="Choose link view">
                <button className="icon-button is-active" type="button" aria-label="Grid view">
                  <Grid2X2 aria-hidden="true" />
                </button>
                <button className="icon-button" type="button" aria-label="List view">
                  <List aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          <div className="results-bar">
            <p>
              <strong>3 links</strong> in your library
            </p>
            <button type="button">Recently added</button>
          </div>

          <section className="link-grid" aria-label="Saved links">
            {sampleLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
