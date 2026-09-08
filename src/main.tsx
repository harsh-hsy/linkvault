import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/controls.css";
import "./styles/dialogs.css";
import { AppShell } from "@/components/layout/AppShell";
import { FeaturesPage } from "@/pages/FeaturesPage";
import { LandingPage } from "@/pages/LandingPage";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const isAppRoute = currentPath === "/app";
const isFeaturesRoute = currentPath === "/features";

function updateMetadata(title: string, description: string, path: string) {
  const url = `https://getlinkvault.pages.dev${path}`;

  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
}

if (isAppRoute) {
  updateMetadata(
    "My Links — LinkVault",
    "Save, organize, search, and manage your private LinkVault library.",
    "/app",
  );
  document
    .querySelectorAll('meta[name="robots"], meta[name="googlebot"]')
    .forEach((tag) => tag.setAttribute("content", "noindex, nofollow"));
} else if (isFeaturesRoute) {
  updateMetadata(
    "LinkVault Features — Private Bookmark Manager",
    "Explore LinkVault features for organizing and finding bookmarks with collections, tags, favorites, instant search, custom favicons, and private local storage.",
    "/features",
  );
}

const currentPage = isAppRoute ? (
  <AppShell />
) : isFeaturesRoute ? (
  <FeaturesPage />
) : (
  <LandingPage />
);

createRoot(document.getElementById("root")!).render(<StrictMode>{currentPage}</StrictMode>);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
