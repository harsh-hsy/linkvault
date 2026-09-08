import {
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  HardDrive,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { SkipLink } from "@/components/common/SkipLink";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import "./TermsPage.css";
const sections = [
  ["acceptance", "Acceptance"],
  ["service", "The service"],
  ["acceptable-use", "Acceptable use"],
  ["local-data", "Local data"],
  ["third-parties", "Third parties"],
  ["availability", "Availability"],
  ["intellectual-property", "Intellectual property"],
  ["disclaimers", "Disclaimers"],
  ["liability", "Liability"],
  ["changes", "Changes"],
  ["contact", "Contact"],
];
function TermsSection({ id, number, title, children }) {
  return (
    <section className="terms-section" id={id}>
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
export function TermsPage() {
  return (
    <div className="terms-page">
      <SkipLink targetId="terms-content" />
      <PublicHeader />

      <main id="terms-content">
        <section className="terms-hero">
          <div className="terms-kicker">
            <FileText aria-hidden="true" />
            Terms and conditions
          </div>
          <h1>Simple terms for using LinkVault.</h1>
          <p>
            These terms explain what LinkVault provides, what you are responsible for, and the
            limits of a free, local-first web application.
          </p>
          <p className="terms-effective">Effective: September 8, 2026</p>
        </section>

        <section className="terms-summary" aria-label="Terms summary">
          <div>
            <Check aria-hidden="true" />
            <strong>Free to use</strong>
            <span>No account or subscription</span>
          </div>
          <div>
            <HardDrive aria-hidden="true" />
            <strong>Locally stored</strong>
            <span>You control your browser data</span>
          </div>
          <div>
            <ExternalLink aria-hidden="true" />
            <strong>External links</strong>
            <span>Destination sites have their own terms</span>
          </div>
        </section>

        <div className="terms-layout">
          <aside className="terms-navigation">
            <p>On this page</p>
            <nav aria-label="Terms sections">
              {sections.map(([id, title], index) => (
                <a href={`#${id}`} key={id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="terms-document">
            <TermsSection id="acceptance" number="01" title="Acceptance of these terms">
              <p>
                By accessing or using LinkVault, you agree to these terms. If you do not agree,
                please do not use the application. These terms apply to the LinkVault website and
                its installable web-app experience.
              </p>
            </TermsSection>

            <TermsSection id="service" number="02" title="What LinkVault provides">
              <p>
                LinkVault is a browser-based tool for saving, organizing, searching, and opening
                links. It currently works without an account and stores the library in the user's
                browser rather than a LinkVault application database.
              </p>
              <p>
                Features may be added, changed, limited, or removed as the product develops. A
                particular feature or level of availability is not guaranteed indefinitely.
              </p>
            </TermsSection>

            <TermsSection id="acceptable-use" number="03" title="Acceptable use">
              <p>You may use LinkVault for lawful personal or professional link organization.</p>
              <p>You must not use the service to:</p>
              <ul>
                <li>Break applicable laws or knowingly facilitate unlawful activity.</li>
                <li>Interfere with the website, its hosting, security, or normal operation.</li>
                <li>Attempt to distribute malware or harmful code through the service.</li>
                <li>Misrepresent an association with LinkVault or its creator.</li>
              </ul>
            </TermsSection>

            <TermsSection id="local-data" number="04" title="Your local data and responsibilities">
              <p>
                Links, collections, tags, notes, favorites, and preferences are stored in your
                browser. You are responsible for maintaining access to that browser profile and for
                deciding what information you save.
              </p>
              <p>
                Clearing site data, resetting a browser, changing profiles, removing storage, or
                losing access to a device may remove the library. LinkVault does not currently
                provide automatic cloud sync or a completed backup-and-restore feature.
              </p>
              <div className="terms-notice">
                <ShieldCheck aria-hidden="true" />
                <p>
                  Do not store secrets, passwords, private keys, or other sensitive credentials in
                  link notes.
                </p>
              </div>
            </TermsSection>

            <TermsSection id="third-parties" number="05" title="Third-party websites and services">
              <p>
                LinkVault can display platform icons, request favicons, and open websites that are
                not operated or controlled by LinkVault. A saved link is not an endorsement of its
                content, security, availability, or accuracy.
              </p>
              <p>
                Third-party websites apply their own terms and privacy practices. You are
                responsible for reviewing them before using those services or sharing information
                with them.
              </p>
            </TermsSection>

            <TermsSection id="availability" number="06" title="Availability and updates">
              <p>
                LinkVault is provided as a developing web application. Access may be interrupted by
                maintenance, browser behavior, hosting problems, network issues, or product updates.
                The application may change without prior notice where advance notice is impractical.
              </p>
            </TermsSection>

            <TermsSection id="intellectual-property" number="07" title="Intellectual property">
              <p>
                The LinkVault name, branding, interface content, and original product materials are
                protected by applicable intellectual-property laws. These terms do not grant a right
                to use LinkVault branding or copy product content as your own.
              </p>
              <p>
                Third-party names, icons, and trademarks remain the property of their respective
                owners and are used only to identify supported destinations.
              </p>
            </TermsSection>

            <TermsSection id="disclaimers" number="08" title="Disclaimers">
              <p>
                To the extent permitted by applicable law, LinkVault is provided “as is” and “as
                available,” without warranties that it will always be uninterrupted, error-free,
                secure, or suitable for every purpose.
              </p>
              <p>
                LinkVault does not verify the accuracy, safety, legality, or continued availability
                of links saved by a user.
              </p>
            </TermsSection>

            <TermsSection id="liability" number="09" title="Limitation of liability">
              <p>
                To the extent permitted by applicable law, LinkVault and its creator will not be
                liable for indirect, incidental, or consequential loss arising from use of the app,
                loss of locally stored data, unavailable links, or third-party websites.
              </p>
              <p>
                Nothing in these terms excludes or limits rights or liability that cannot lawfully
                be excluded or limited.
              </p>
            </TermsSection>

            <TermsSection id="changes" number="10" title="Changes to these terms">
              <p>
                These terms may be updated as LinkVault changes. The effective date at the top of
                this page will be revised when material updates are published. Continuing to use
                LinkVault after an update means the revised terms apply from their effective date.
              </p>
            </TermsSection>

            <TermsSection id="contact" number="11" title="Questions and contact">
              <p>
                Questions about LinkVault or these terms can be directed to the creator through the
                portfolio linked below.
              </p>
              <a
                className="terms-contact-link"
                href="https://harsh-hsy.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Harsh Singh's portfolio
                <ExternalLink aria-hidden="true" />
              </a>
            </TermsSection>
          </article>
        </div>

        <section className="terms-cta">
          <Scale aria-hidden="true" />
          <h2>Use LinkVault with your local data in mind.</h2>
          <p>Review the Privacy page for a detailed explanation of browser storage and requests.</p>
          <div>
            <a className="button button-primary" href="/app">
              Open LinkVault
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="button terms-secondary-button" href="/privacy">
              Read Privacy
            </a>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
