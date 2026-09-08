import {
  ArrowRight,
  Check,
  Download,
  HardDrive,
  Laptop,
  Menu,
  MonitorSmartphone,
  RefreshCw,
  Share2,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { SkipLink } from "@/components/common/SkipLink";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import "./InstallPage.css";
const installMethods = [
  {
    icon: Smartphone,
    platform: "Android",
    title: "Install from a supported browser",
    steps: [
      "Open getlinkvault.pages.dev in your browser.",
      "Open the browser menu.",
      "Choose Install app or Add to Home screen.",
      "Confirm the installation when prompted.",
    ],
    note: "The exact menu label can vary by browser and Android version.",
  },
  {
    icon: Share2,
    platform: "iPhone and iPad",
    title: "Add LinkVault from Safari",
    steps: [
      "Open getlinkvault.pages.dev in Safari.",
      "Select the Share button.",
      "Choose Add to Home Screen.",
      "Keep the name LinkVault and select Add.",
    ],
    note: "If the option is not visible, scroll through the available Share actions.",
  },
  {
    icon: Laptop,
    platform: "Desktop",
    title: "Install from Chrome or Edge",
    steps: [
      "Open LinkVault in a supported desktop browser.",
      "Select the install icon in the address bar, when available.",
      "You can also look for the install option in the browser menu.",
      "Confirm to open LinkVault in its own window.",
    ],
    note: "Browser support and the placement of the install action can differ.",
  },
];
const installedBenefits = [
  "A LinkVault icon on your home screen or app launcher",
  "A focused standalone window without regular browser tabs",
  "Direct access to the same local library in that browser profile",
  "A cached interface for quicker repeat visits",
];
const troubleshooting = [
  {
    icon: Menu,
    title: "Install option is missing",
    description:
      "Make sure you are using a supported browser, the site has fully loaded, and LinkVault is not already installed.",
  },
  {
    icon: HardDrive,
    title: "My saved links are not visible",
    description:
      "Libraries are browser-local. A different browser, profile, or device has separate LinkVault data.",
  },
  {
    icon: RefreshCw,
    title: "The installed app looks outdated",
    description:
      "Connect to the internet, reopen LinkVault, and refresh it so the latest app files can load.",
  },
];
export function InstallPage() {
  return (
    <div className="install-page">
      <SkipLink targetId="install-content" />
      <PublicHeader />

      <main id="install-content">
        <section className="install-hero">
          <div className="install-kicker">
            <Download aria-hidden="true" />
            Installable web app
          </div>
          <h1>Keep LinkVault one tap away.</h1>
          <p>
            Install LinkVault on a supported mobile or desktop browser for a home-screen icon and a
            focused app window—without creating an account.
          </p>
          <a className="button button-primary" href="/app">
            Open LinkVault
            <ArrowRight aria-hidden="true" />
          </a>
        </section>

        <section className="install-methods" aria-labelledby="install-methods-title">
          <div className="install-section-heading">
            <p className="install-eyebrow">Choose your device</p>
            <h2 id="install-methods-title">Install in a few browser steps.</h2>
            <p>Use the instructions that match the device where you want to keep your library.</p>
          </div>

          <div className="install-method-grid">
            {installMethods.map(({ icon: Icon, platform, title, steps, note }) => (
              <article className="install-method-card" key={platform}>
                <div className="install-method-label">
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  {platform}
                </div>
                <h3>{title}</h3>
                <ol>
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="install-method-note">{note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="installed-result">
          <div>
            <MonitorSmartphone aria-hidden="true" />
            <p className="install-eyebrow">After installation</p>
            <h2>A cleaner way to open your library.</h2>
          </div>
          <ul>
            {installedBenefits.map((benefit) => (
              <li key={benefit}>
                <Check aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="install-data-panel">
          <div className="install-data-icon">
            <ShieldCheck aria-hidden="true" />
          </div>
          <div>
            <p className="install-eyebrow">Your data stays local</p>
            <h2>Installation does not create an account or enable sync.</h2>
            <p>
              Your links remain in the browser profile used to install LinkVault. Installing it on
              another device creates a separate local library; existing links are not transferred
              automatically.
            </p>
          </div>
        </section>

        <section className="offline-section">
          <div className="offline-section-heading">
            <WifiOff aria-hidden="true" />
            <div>
              <p className="install-eyebrow">Offline expectations</p>
              <h2>The interface can be cached. The web still needs a connection.</h2>
            </div>
          </div>
          <p>
            After LinkVault has loaded successfully, its app shell may remain available during a
            temporary connection loss. Saved links point to external websites, so opening those
            destinations still requires internet access.
          </p>
        </section>

        <section className="troubleshooting-section">
          <div className="install-section-heading">
            <p className="install-eyebrow">Troubleshooting</p>
            <h2>When installation does not look right.</h2>
          </div>

          <div className="troubleshooting-grid">
            {troubleshooting.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="install-cta">
          <h2>Open LinkVault before installing.</h2>
          <p>Load the app once, then use your browser's installation option.</p>
          <a className="button button-primary" href="/app">
            Open LinkVault
            <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
