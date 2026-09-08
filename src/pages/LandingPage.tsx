import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Check,
  Download,
  FileText,
  Folder,
  Globe2,
  HelpCircle,
  LayoutGrid,
  Search,
  ShieldCheck,
  Star,
  Tags,
  Zap,
} from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import "./LandingPage.css";

const benefits = [
  "Save everything in one place",
  "Find the right link instantly",
  "Keep your library private",
];

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Folder,
    title: "Collections",
    description: "Group related links into focused spaces for work, learning, or anything else.",
  },
  {
    icon: Tags,
    title: "Flexible tags",
    description: "Add lightweight labels that make every saved resource easier to find.",
  },
  {
    icon: Search,
    title: "Instant search",
    description: "Search titles, URLs, notes, and tags without digging through folders.",
  },
  {
    icon: Star,
    title: "Favorites",
    description: "Keep frequently used links one click away with a focused favorites view.",
  },
  {
    icon: LayoutGrid,
    title: "Platform picker",
    description: "Add profiles from popular platforms with familiar icons and simpler inputs.",
  },
  {
    icon: Globe2,
    title: "Website favicons",
    description: "Custom websites use their own favicon so your library stays easy to scan.",
  },
  {
    icon: Zap,
    title: "Light and dark",
    description: "A calm matte interface that follows your preferred light or dark appearance.",
  },
  {
    icon: Download,
    title: "Installable PWA",
    description: "Install LinkVault on supported mobile and desktop browsers for quick access.",
  },
];

const steps = [
  ["Add a link", "Start with a platform account or any custom website URL."],
  ["Add context", "Choose a collection, add tags, and leave a short note."],
  ["Keep it useful", "Favorite important links and update details whenever you need."],
  ["Find it instantly", "Search or filter your library and open the right link."],
];

const questions = [
  {
    question: "Is LinkVault free to use?",
    answer: "Yes. LinkVault is a free browser-based tool with no account or subscription.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You can start saving and organizing links immediately without signing in.",
  },
  {
    question: "Where are my links stored?",
    answer:
      "Your saved links and collections are stored in this browser using local storage. They are not saved to a LinkVault backend.",
  },
  {
    question: "Are my links synced between devices?",
    answer:
      "Not currently. Each browser keeps its own local library, so links do not automatically sync across devices.",
  },
  {
    question: "What happens if I clear browser data?",
    answer:
      "Clearing site data can remove your LinkVault library. A dedicated backup and restore flow is planned.",
  },
  {
    question: "Can I install LinkVault on my phone?",
    answer:
      "Yes. Supported browsers can install LinkVault to your home screen and open it like a standalone app.",
  },
];

const explorePages: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  {
    icon: LayoutGrid,
    title: "Features",
    description: "Explore every tool available for organizing and finding links.",
    href: "/features",
  },
  {
    icon: BookOpen,
    title: "Guide",
    description: "Learn how to build and manage your personal link library.",
    href: "/guide",
  },
  {
    icon: Download,
    title: "Installation",
    description: "Install LinkVault on supported mobile and desktop browsers.",
    href: "/install",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    description: "Understand how LinkVault keeps your saved library local.",
    href: "/privacy",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find answers about accounts, storage, privacy, and installation.",
    href: "/faq",
  },
  {
    icon: FileText,
    title: "Terms",
    description: "Read the terms and conditions for using LinkVault.",
    href: "/terms",
  },
];

export function LandingPage() {
  return (
    <div className="landing-page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <PublicHeader />

      <main id="main-content">
        <section className="landing-hero">
          <div className="landing-kicker">
            <ShieldCheck aria-hidden="true" />
            Private and local-first
          </div>
          <h1>Save it once. Find it instantly.</h1>
          <p className="landing-hero-copy">
            LinkVault is a private bookmark manager for saving, organizing, and finding important
            links with collections, tags, favorites, and instant search.
          </p>
          <div className="landing-hero-actions">
            <a className="button button-primary" href="/app">
              Open LinkVault
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="button landing-secondary-button" href="#features">
              View features
            </a>
          </div>
          <ul className="landing-trust-list" aria-label="LinkVault highlights">
            <li>No account</li>
            <li>No backend</li>
            <li>Stored in your browser</li>
            <li>Free to use</li>
          </ul>
        </section>

        <section className="benefit-grid" aria-label="Product benefits">
          {benefits.map((benefit) => (
            <div className="benefit-item" key={benefit}>
              <span>
                <Check aria-hidden="true" />
              </span>
              <p>{benefit}</p>
            </div>
          ))}
        </section>

        <section className="landing-section" id="features">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">Features</p>
            <h2>Everything useful. Nothing in the way.</h2>
            <p>A focused set of tools for building a link library you can actually use.</p>
          </div>

          <div className="feature-grid">
            {features.map(({ icon: Icon, title, description }) => (
              <article className="feature-card" key={title}>
                <span className="feature-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section" id="guide">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">How it works</p>
            <h2>From saved to searchable in four steps.</h2>
          </div>

          <ol className="step-grid">
            {steps.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="privacy-panel" id="privacy">
          <div className="privacy-panel-icon">
            <ShieldCheck aria-hidden="true" />
          </div>
          <div>
            <p className="landing-eyebrow">Private by design</p>
            <h2>Your links stay in your browser.</h2>
            <p>
              LinkVault does not require an account and does not send your saved library to a
              backend server. Your links, notes, tags, and collections remain in local browser
              storage.
            </p>
            <p className="privacy-warning">
              Clearing browser site data may remove your saved library.
            </p>
          </div>
        </section>

        <section className="landing-section install-section" id="install">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">Install as an app</p>
            <h2>Keep LinkVault close on mobile and desktop.</h2>
            <p>
              Install from a supported browser for a home-screen icon, a standalone window, and
              faster access to your local library.
            </p>
          </div>
          <div className="install-points">
            <span>Home-screen access</span>
            <span>Standalone interface</span>
            <span>Cached app shell</span>
          </div>
        </section>

        <section className="landing-section faq-section" id="faq">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">FAQ</p>
            <h2>Good to know before you start.</h2>
          </div>

          <div className="faq-list">
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="explore-section" id="learn-more">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">Explore LinkVault</p>
            <h2>Everything you need to know, in one place.</h2>
            <p>
              Read detailed guides for using LinkVault, understanding your privacy, and installing
              it anywhere.
            </p>
          </div>

          <div className="explore-grid">
            {explorePages.map(({ icon: Icon, title, description, href }) => (
              <a className="explore-card" href={href} key={title}>
                <span className="explore-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="explore-card-arrow">
                  <ArrowUpRight aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="landing-cta">
          <Bookmark aria-hidden="true" />
          <h2>Build a library you can actually find later.</h2>
          <p>Start saving useful links without creating an account.</p>
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
