import { ArrowRight, BookOpen, HelpCircle, ShieldCheck, Smartphone } from "lucide-react";
import { SkipLink } from "@/components/common/SkipLink";
import { AppFooter } from "@/components/layout/AppFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { faqCategories } from "@/data/faq";
import "./FaqPage.css";
const categoryIcons = [BookOpen, HelpCircle, ShieldCheck, Smartphone];
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  ),
};
export function FaqPage() {
  return (
    <div className="faq-page">
      <SkipLink targetId="faq-content" />
      <PublicHeader />

      <main id="faq-content">
        <section className="faq-hero">
          <div className="faq-kicker">
            <HelpCircle aria-hidden="true" />
            Common questions
          </div>
          <h1>Answers before you start saving.</h1>
          <p>
            Learn how LinkVault handles accounts, organization, local data, installation, and
            offline access.
          </p>
          <a className="button button-primary" href="/app">
            Open LinkVault
            <ArrowRight aria-hidden="true" />
          </a>
        </section>

        <nav className="faq-category-nav" aria-label="FAQ categories">
          {faqCategories.map(({ id, title }, index) => {
            const Icon = categoryIcons[index];
            return (
              <a href={`#${id}`} key={id}>
                <Icon aria-hidden="true" />
                <span>{title}</span>
                <small>{faqCategories[index].items.length} questions</small>
              </a>
            );
          })}
        </nav>

        <div className="faq-categories">
          {faqCategories.map(({ id, title, description, items }, categoryIndex) => (
            <section className="faq-category" id={id} key={id}>
              <div className="faq-category-heading">
                <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
                <div>
                  <p className="faq-eyebrow">FAQ category</p>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </div>

              <div className="faq-accordion">
                {items.map(({ question, answer }) => (
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
          ))}
        </div>

        <section className="faq-next-steps">
          <div>
            <p className="faq-eyebrow">Keep exploring</p>
            <h2>Need a little more detail?</h2>
            <p>The Guide covers the full workflow, while Privacy explains local data in depth.</p>
          </div>
          <div className="faq-next-links">
            <a href="/guide">
              Read the guide <ArrowRight aria-hidden="true" />
            </a>
            <a href="/privacy">
              Read about privacy <ArrowRight aria-hidden="true" />
            </a>
            <a href="/install">
              Installation help <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="faq-cta">
          <h2>Start building your link library.</h2>
          <p>No account or setup process is required.</p>
          <a className="button button-primary" href="/app">
            Open LinkVault
            <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </main>

      <AppFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
