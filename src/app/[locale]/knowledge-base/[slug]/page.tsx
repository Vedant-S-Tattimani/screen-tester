import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateSeoMetadata, getBaseUrl } from "@/lib/seo";
import { 
  getArticleBySlug, 
  getAllArticles, 
  getCategoryInfo 
} from "@/data/knowledgeBase";
import { monitorTests } from "@/data/tests";
import { TROUBLESHOOTING_TOPICS } from "@/data/troubleshooting";
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  HelpCircle, 
  Layers, 
  Wrench, 
  Play, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "KnowledgeBase" });
  // If translated title/desc exist in dictionary, use them; otherwise use article default
  const title = t.has(`articles.${slug}.title`) 
    ? t(`articles.${slug}.title`) 
    : article.title;
  const description = t.has(`articles.${slug}.description`) 
    ? t(`articles.${slug}.description`) 
    : article.description;
  const techRef = t.has("articleUi.technicalReference")
    ? t("articleUi.technicalReference")
    : "Technical Reference";

  return generateSeoMetadata(
    `/knowledge-base/${slug}`,
    `${title} — ${techRef}`,
    description,
    locale
  );
}

function renderRichText(text: string) {
  if (!text || typeof text !== "string") return text;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  if (!regex.test(text)) return text;
  regex.lastIndex = 0;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    parts.push(
      <Link
        key={match.index}
        href={href}
        className="text-blue-600 hover:text-blue-800 underline font-medium"
      >
        {label}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default async function KnowledgeArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "KnowledgeBase" });
  const tTestPages = await getTranslations({ locale, namespace: "TestPages" });
  const baseUrl = getBaseUrl();
  const categoryInfo = getCategoryInfo(article.category);

  // UI labels with translation lookup and English fallback
  const ui = {
    technicalReference: t.has("articleUi.technicalReference") ? t("articleUi.technicalReference") : "Technical Reference",
    directDefinition: t.has("articleUi.directDefinition") ? t("articleUi.directDefinition") : "Direct Technical Definition",
    whyItMatters: t.has("articleUi.whyItMatters") ? t("articleUi.whyItMatters") : "Why It Matters",
    whatToLookFor: t.has("articleUi.whatToLookFor") ? t("articleUi.whatToLookFor") : "What Users Should Look For",
    howToTest: t.has("articleUi.howToTest") ? t("articleUi.howToTest") : "How to Test This Parameter",
    boundariesTitle: t.has("articleUi.boundariesTitle") ? t("articleUi.boundariesTitle") : "Technical Testing Boundaries & Methodology",
    boundariesDesc: t.has("articleUi.boundariesDesc") ? t("articleUi.boundariesDesc") : "Screen Tester emphasizes transparency: we clearly delineate between what web browser engines can mathematically inspect versus what requires specialized physical laboratory probes.",
    canObserveTitle: t.has("articleUi.canObserveTitle") ? t("articleUi.canObserveTitle") : "What Screen Tester Can Observe",
    cannotDetermineTitle: t.has("articleUi.cannotDetermineTitle") ? t("articleUi.cannotDetermineTitle") : "Requires Physical Laboratory Equipment",
    commonCauses: t.has("articleUi.commonCauses") ? t("articleUi.commonCauses") : "Common Causes",
    whatToDoNext: t.has("articleUi.whatToDoNext") ? t("articleUi.whatToDoNext") : "Recommended Next Steps",
    faq: t.has("articleUi.faq") ? t("articleUi.faq") : "Frequently Asked Questions",
    interactiveTool: t.has("articleUi.interactiveTool") ? t("articleUi.interactiveTool") : "Interactive Test Tool",
    interactiveToolDesc: t.has("articleUi.interactiveToolDesc") ? t("articleUi.interactiveToolDesc") : "Run the dedicated online test pattern to visually evaluate this characteristic on your display.",
    launchTest: t.has("articleUi.launchTest") ? t("articleUi.launchTest") : "Launch interactive test pattern",
    troubleshooting: t.has("articleUi.troubleshooting") ? t("articleUi.troubleshooting") : "Troubleshooting Guide",
    troubleshootingDesc: t.has("articleUi.troubleshootingDesc") ? t("articleUi.troubleshootingDesc") : "Need step-by-step physical and software solutions? Consult the interactive troubleshooting topic.",
    inspectCauses: t.has("articleUi.inspectCauses") ? t("articleUi.inspectCauses") : "Inspect causes, checks & fixes",
    relatedArticles: t.has("articleUi.relatedArticles") ? t("articleUi.relatedArticles") : "Related Articles",
    backToIndex: t.has("articleUi.backToIndex") ? t("articleUi.backToIndex") : "← Back to Knowledge Base Index",
    minRead: t.has("articleUi.minRead") ? t("articleUi.minRead") : "min read",
    guide: t.has("articleUi.guide") ? t("articleUi.guide") : (categoryInfo?.shortTitle || "Technical Guide")
  };

  // Localized text overrides if available in messages dictionary
  const title: string = t.has(`articles.${slug}.title`) ? t(`articles.${slug}.title`) : article.title;
  const subtitle: string = t.has(`articles.${slug}.subtitle`) ? t(`articles.${slug}.subtitle`) : article.subtitle;
  const description: string = t.has(`articles.${slug}.description`) ? t(`articles.${slug}.description`) : article.description;
  const directAnswer: string = t.has(`articles.${slug}.directAnswer`) ? t(`articles.${slug}.directAnswer`) : article.directAnswer;
  const whyItMatters: string = t.has(`articles.${slug}.whyItMatters`) ? t(`articles.${slug}.whyItMatters`) : article.whyItMatters;
  const whatToLookFor: string[] = t.has(`articles.${slug}.whatToLookFor`) ? t.raw(`articles.${slug}.whatToLookFor`) : article.whatToLookFor;
  const howToTest: string[] = t.has(`articles.${slug}.howToTest`) ? t.raw(`articles.${slug}.howToTest`) : article.howToTest;
  const whatScreenTesterCanObserve: string[] = t.has(`articles.${slug}.whatScreenTesterCanObserve`) ? t.raw(`articles.${slug}.whatScreenTesterCanObserve`) : article.whatScreenTesterCanObserve;
  const whatScreenTesterCannotDetermine: string[] = t.has(`articles.${slug}.whatScreenTesterCannotDetermine`) ? t.raw(`articles.${slug}.whatScreenTesterCannotDetermine`) : article.whatScreenTesterCannotDetermine;
  const commonCauses: string[] = t.has(`articles.${slug}.commonCauses`) ? t.raw(`articles.${slug}.commonCauses`) : article.commonCauses;
  const whatToDoNext: string[] = t.has(`articles.${slug}.whatToDoNext`) ? t.raw(`articles.${slug}.whatToDoNext`) : article.whatToDoNext;
  const sections: Array<{ title: string; content: string[]; bullets?: string[] }> = t.has(`articles.${slug}.sections`) ? t.raw(`articles.${slug}.sections`) : (article.sections || []);
  const faq: Array<{ question: string; answer: string }> = t.has(`articles.${slug}.faq`) ? t.raw(`articles.${slug}.faq`) : (article.faq || []);

  const breadcrumbs = [
    { label: t("header.title"), href: "/knowledge-base" },
    { label: ui.guide, href: `/knowledge-base#${article.category}` },
    { label: title, href: `/knowledge-base/${article.slug}` }
  ];

  // Resolve related tests
  const relatedTests = article.relatedTestIds
    .map(id => monitorTests.find(item => item.id === id))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  // Resolve related troubleshooting topics
  const relatedTroubleshooting = article.relatedTroubleshootingIds
    .map(id => TROUBLESHOOTING_TOPICS.find(tp => tp.id === id))
    .filter((tp): tp is NonNullable<typeof tp> => tp !== undefined);

  // Resolve related knowledge articles
  const relatedArticles = article.relatedArticleSlugs
    .map(s => getArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  // Schema.org Structured Data: Article + BreadcrumbList + FAQPage
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/knowledge-base/${article.slug}`
    },
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "Screen Tester",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`
      }
    },
    dateModified: "2026-09-12T00:00:00Z"
  };

  const faqLd = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      }
    }))
  } : null;

  return (
    <div className="flex-1 bg-white text-gray-950 font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <article className="max-w-[1100px] mx-auto py-8 sm:py-14 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Article Header */}
        <header className="space-y-4 border-b border-gray-200/80 pb-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold uppercase tracking-wider">
              {ui.guide}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTimeMinutes} {ui.minRead}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">
              {ui.technicalReference}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-gray-950 leading-[1.15]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        </header>

        {/* Direct Technical Definition Callout */}
        <div className="border border-blue-200/90 rounded-2xl p-5 sm:p-6 bg-blue-50/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{ui.directDefinition}</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
            {renderRichText(directAnswer)}
          </p>
        </div>

        {/* Core Layout: Main Content + Sticky Context Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Prose (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Why It Matters */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight flex items-center gap-2">
                <span>{ui.whyItMatters}</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {renderRichText(whyItMatters)}
              </p>
            </section>

            {/* 2. What to Look For */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                {ui.whatToLookFor}
              </h2>
              <ul className="space-y-2.5">
                {whatToLookFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{renderRichText(item)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. How to Test */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                {ui.howToTest}
              </h2>
              <ol className="space-y-3">
                {howToTest.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5">{renderRichText(step)}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 4. Technical Honesty Comparison Panel */}
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                  {ui.boundariesTitle}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {ui.boundariesDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Column 1: Can Observe */}
                <div className="border border-emerald-200/80 rounded-xl p-4 bg-emerald-50/30 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-emerald-800 tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{ui.canObserveTitle}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {whatScreenTesterCanObserve.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{renderRichText(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Cannot Determine */}
                <div className="border border-amber-200/80 rounded-xl p-4 bg-amber-50/30 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-amber-800 tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{ui.cannotDetermineTitle}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {whatScreenTesterCannotDetermine.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-600 font-bold">✕</span>
                        <span>{renderRichText(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. In-Depth Sections */}
            {sections && sections.map((sec, idx) => (
              <section key={idx} className="space-y-3 pt-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                  {sec.title}
                </h2>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {renderRichText(p)}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-gray-400 font-bold">•</span>
                        <span>{renderRichText(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* 6. Common Causes & Next Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="border border-gray-200/80 rounded-xl p-4 bg-white space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900">
                  {ui.commonCauses}
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {commonCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{renderRichText(cause)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-200/80 rounded-xl p-4 bg-white space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900">
                  {ui.whatToDoNext}
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {whatToDoNext.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>{renderRichText(step)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7. Frequently Asked Questions */}
            {faq && faq.length > 0 && (
              <section className="space-y-4 pt-6 border-t border-gray-200/80">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gray-950" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                    {ui.faq}
                  </h2>
                </div>
                <div className="space-y-3">
                  {faq.map((f, idx) => (
                    <div key={idx} className="border border-gray-200/80 rounded-xl p-4 bg-gray-50/50 space-y-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-950">
                        {f.question}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                        {renderRichText(f.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sticky Context Rail: Interactive Integrations (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Action Box: Relevant Interactive Tests */}
            {relatedTests.length > 0 && (
              <div className="border border-gray-200/90 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-900">
                  <Play className="w-4 h-4 text-blue-600" />
                  <span>{ui.interactiveTool}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {ui.interactiveToolDesc}
                </p>

                <div className="space-y-2 pt-1">
                  {relatedTests.map((test) => {
                    const testTitle = tTestPages.has(`${test.id}.title`)
                      ? tTestPages(`${test.id}.title`)
                      : test.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    return (
                      <Link
                        key={test.id}
                        href={`/tests/${test.id}`}
                        className="group block border border-gray-200 rounded-xl p-3 hover:border-blue-500 hover:bg-blue-50/30 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {testTitle}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 block">
                          {ui.launchTest}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Box: Troubleshooting Guide */}
            {relatedTroubleshooting.length > 0 && (
              <div className="border border-gray-200/90 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-900">
                  <Wrench className="w-4 h-4 text-purple-600" />
                  <span>{ui.troubleshooting}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {ui.troubleshootingDesc}
                </p>

                <div className="space-y-2 pt-1">
                  {relatedTroubleshooting.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/knowledge-base/troubleshooting#${topic.id}`}
                      className="group block border border-gray-200 rounded-xl p-3 hover:border-purple-500 hover:bg-purple-50/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {topic.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 block">
                        {ui.inspectCauses}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Knowledge Articles */}
            {relatedArticles.length > 0 && (
              <div className="border border-gray-200/90 rounded-2xl p-5 bg-gray-50/50 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-900">
                  <Layers className="w-4 h-4 text-gray-600" />
                  <span>{ui.relatedArticles}</span>
                </div>
                <div className="space-y-2 pt-1">
                  {relatedArticles.map((rel) => {
                    const relTitle = t.has(`articles.${rel.slug}.title`)
                      ? t(`articles.${rel.slug}.title`)
                      : rel.title;
                    return (
                      <Link
                        key={rel.slug}
                        href={`/knowledge-base/${rel.slug}`}
                        className="block p-2.5 rounded-lg hover:bg-white transition-all text-xs font-medium text-gray-800 hover:text-blue-600 border border-transparent hover:border-gray-200"
                      >
                        <span className="line-clamp-2 leading-snug">{relTitle}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back to Index link */}
            <div className="pt-2">
              <Link
                href="/knowledge-base"
                className="text-xs font-semibold text-gray-600 hover:text-gray-950 flex items-center gap-1.5"
              >
                <span>{ui.backToIndex}</span>
              </Link>
            </div>

          </aside>

        </div>
      </article>
    </div>
  );
}
