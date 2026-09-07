import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppShell } from "@/components/layout/AppShell";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppShell />
  </StrictMode>,
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
