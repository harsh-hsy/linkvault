import {
  ArrowRight,
  Download,
  Folder,
  Globe2,
  Heart,
  LayoutGrid,
  MoonStar,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
} from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { SkipLink } from "@/components/common/SkipLink";
import "./FeaturesPage.css";
const organizeFeatures = [
  {
    icon: Folder,
    title: "Collections",
    description: "Keep work, learning, personal, and project links in their own focused spaces.",
  },
  {
    icon: Tags,
    title: "Flexible tags",
    description:
      "Add multiple labels to create context without forcing every link into one folder.",
  },
  {
    icon: Heart,
    title: "Favorites",
    description: "Mark frequently used resources and reach them from a dedicated favorites view.",
  },
];
const findFeatures = [
  {
    icon: Search,
    title: "Instant search",
    description: "Search across titles, URLs, notes, and tags as your personal library grows.",
  },
  {
    icon: LayoutGrid,
    title: "Grid and list views",
    description: "Switch between a visual overview and a compact list based on how you browse.",
  },
  {
    icon: Sparkles,
    title: "Useful link details",
    description: "Store a short note with every link so you remember why it was worth saving.",
  },
];
const platformFeatures = [
  {
    icon: Globe2,
    title: "Platform picker",
    description: "Choose from popular services and add profiles using a username or complete URL.",
  },
  {
    icon: Globe2,
    title: "Automatic favicons",
    description:
      "Custom websites fetch their own favicon while selected platforms keep familiar icons.",
  },
  {
    icon: MoonStar,
    title: "Light and dark themes",
    description: "Use the same calm matte interface in the appearance that feels most comfortable.",
  },
];
function FeatureGroup({ number, eyebrow, title, description, features }) {
  return (
    <section className="feature-group">
      <div className="feature-group-heading">
        <span>{number}</span>
        <div>
          <p>{eyebrow}</p>
          <h2>{title}</h2>
          <p className="feature-group-copy">{description}</p>
        </div>
      </div>

      <div className="feature-detail-grid">
        {features.map(({ icon: Icon, title: featureTitle, description: featureDescription }) => (
          <article className="feature-detail-card" key={featureTitle}>
            <span className="feature-detail-icon">
              <Icon aria-hidden="true" />
            </span>
            <h3>{featureTitle}</h3>
            <p>{featureDescription}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FeaturesPage() {
  return (
    <div className="features-page">
      <SkipLink targetId="features-content" />
      <PublicHeader />

      <main id="features-content">
        <section className="features-hero">
          <p className="features-eyebrow">LinkVault features</p>
          <h1>A focused toolkit for every link worth keeping.</h1>
          <p>
            Organize scattered bookmarks into a private, searchable library that stays in your
            browser and remains easy to use as it grows.
          </p>
          <div className="features-hero-actions">
            <a className="button button-primary" href="/app">
              Open LinkVault
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="button features-secondary-button" href="#all-features">
              Explore features
            </a>
          </div>
        </section>

        <div id="all-features">
          <FeatureGroup
            number="01"
            eyebrow="Organize"
            title="Give every saved link a place."
            description="Collections, tags, notes, and favorites add just enough structure without making saving feel like work."
            features={organizeFeatures}
          />
          <FeatureGroup
            number="02"
            eyebrow="Find"
            title="Reach the right resource quickly."
            description="Searchable details and flexible views make a growing library easier to scan and retrieve."
            features={findFeatures}
          />
          <FeatureGroup
            number="03"
            eyebrow="Recognize"
            title="A familiar icon for every destination."
            description="Platform-aware inputs and favicons make links easier to add and identify at a glance."
            features={platformFeatures}
          />
        </div>

        <section className="local-feature-panel">
          <div className="local-feature-icon">
            <ShieldCheck aria-hidden="true" />
          </div>
          <div>
            <p className="features-eyebrow">Local-first by design</p>
            <h2>Your library stays on your device.</h2>
            <p>
              LinkVault stores links, collections, tags, notes, and preferences in your browser.
              There is no account to create and no LinkVault backend receiving your saved library.
            </p>
          </div>
          <ul>
            <li>No sign-up</li>
            <li>No backend</li>
            <li>No automatic cloud sync</li>
          </ul>
        </section>

        <section className="install-feature-row">
          <div>
            <Download aria-hidden="true" />
            <p className="features-eyebrow">Installable PWA</p>
            <h2>Use LinkVault like an app.</h2>
          </div>
          <p>
            Install it from a supported mobile or desktop browser for home-screen access and a
            focused standalone window.
          </p>
        </section>

        <section className="features-cta">
          <h2>Build a library you can find later.</h2>
          <p>Start with one useful link. No account required.</p>
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
