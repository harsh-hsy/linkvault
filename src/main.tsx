import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/controls.css";
import "./styles/dialogs.css";
import { AppShell } from "@/components/layout/AppShell";
import { FeaturesPage } from "@/pages/FeaturesPage";
import { FaqPage } from "@/pages/FaqPage";
import { GuidePage } from "@/pages/GuidePage";
import { InstallPage } from "@/pages/InstallPage";
import { LandingPage } from "@/pages/LandingPage";
import { PrivacyPage } from "@/pages/PrivacyPage";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const isAppRoute = currentPath === "/app";
const isFeaturesRoute = currentPath === "/features";
const isGuideRoute = currentPath === "/guide";
const isInstallRoute = currentPath === "/install";
const isPrivacyRoute = currentPath === "/privacy";
const isFaqRoute = currentPath === "/faq";

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
} else if (isGuideRoute) {
  updateMetadata(
    "LinkVault Guide — Save and Organize Links",
    "Learn how to save, organize, search, and manage links in LinkVault using platforms, custom websites, collections, tags, notes, and favorites.",
    "/guide",
  );
} else if (isInstallRoute) {
  updateMetadata(
    "LinkVault Installation — Mobile and Desktop",
    "Install LinkVault on supported mobile and desktop browsers and learn how local storage, app updates, and cached access work.",
    "/install",
  );
} else if (isPrivacyRoute) {
  updateMetadata(
    "LinkVault Privacy — Your Links Stay Local",
    "Learn what LinkVault stores locally, when network requests occur, and how to control or delete your browser-based link library.",
    "/privacy",
  );
} else if (isFaqRoute) {
  updateMetadata(
    "LinkVault FAQ — Common Questions Answered",
    "Find answers about LinkVault accounts, collections, tags, local browser storage, privacy, installation, offline access, backup, and device sync.",
    "/faq",
  );
}

let currentPage = <LandingPage />;

if (isAppRoute) currentPage = <AppShell />;
if (isFeaturesRoute) currentPage = <FeaturesPage />;
if (isGuideRoute) currentPage = <GuidePage />;
if (isInstallRoute) currentPage = <InstallPage />;
if (isPrivacyRoute) currentPage = <PrivacyPage />;
if (isFaqRoute) currentPage = <FaqPage />;

createRoot(document.getElementById("root")!).render(<StrictMode>{currentPage}</StrictMode>);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
