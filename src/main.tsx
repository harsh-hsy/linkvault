import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppShell } from "@/components/layout/AppShell";
import { LandingPage } from "@/pages/LandingPage";
import "./styles/globals.css";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const isAppRoute = currentPath === "/app";

if (isAppRoute) {
  document.title = "My Links — LinkVault";
  document
    .querySelectorAll('meta[name="robots"], meta[name="googlebot"]')
    .forEach((tag) => tag.setAttribute("content", "noindex, nofollow"));
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", "https://getlinkvault.pages.dev/app");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isAppRoute ? <AppShell /> : <LandingPage />}</StrictMode>,
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
