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

  return generateSeoMetadata(
    `/knowledge-base/${slug}`,
    `${title} — Technical Reference`,
    description,
    locale
  );
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
  const baseUrl = getBaseUrl();
  const categoryInfo = getCategoryInfo(article.category);

  // Localized text overrides if available in messages dictionary
  const title = t.has(`articles.${slug}.title`) ? t(`articles.${slug}.title`) : article.title;
  const subtitle = t.has(`articles.${slug}.subtitle`) ? t(`articles.${slug}.subtitle`) : article.subtitle;
  const directAnswer = t.has(`articles.${slug}.directAnswer`) ? t(`articles.${slug}.directAnswer`) : article.directAnswer;

  const breadcrumbs = [
    { label: t("header.title"), href: "/knowledge-base" },
    { label: categoryInfo?.shortTitle || "Guide", href: `/knowledge-base#${article.category}` },
    { label: title, href: `/knowledge-base/${article.slug}` }
  ];

  // Resolve related tests
  const relatedTests = article.relatedTestIds
    .map(id => monitorTests.find(t => t.id === id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

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
    description: article.description,
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
    dateModified: "2026-09-09T00:00:00Z"
  };

  const faqLd = article.faq && article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer
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
              {categoryInfo?.shortTitle || "Technical Guide"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTimeMinutes} min read</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">
              Technical Reference
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
            <span>Direct Technical Definition</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
            {directAnswer}
          </p>
        </div>

        {/* Core Layout: Main Content + Sticky Context Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Prose (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Why It Matters */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight flex items-center gap-2">
                <span>Why It Matters</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {article.whyItMatters}
              </p>
            </section>

            {/* 2. What to Look For */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                What Users Should Look For
              </h2>
              <ul className="space-y-2.5">
                {article.whatToLookFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. How to Test */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                How to Test This Parameter
              </h2>
              <ol className="space-y-3">
                {article.howToTest.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 4. Technical Honesty Comparison Panel */}
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                  Technical Testing Boundaries & Methodology
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Screen Tester emphasizes transparency: we clearly delineate between what web browser engines can mathematically inspect versus what requires specialized physical laboratory probes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Column 1: Can Observe */}
                <div className="border border-emerald-200/80 rounded-xl p-4 bg-emerald-50/30 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-emerald-800 tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What Screen Tester Can Observe</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {article.whatScreenTesterCanObserve.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Cannot Determine */}
                <div className="border border-amber-200/80 rounded-xl p-4 bg-amber-50/30 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-amber-800 tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Requires Physical Laboratory Equipment</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {article.whatScreenTesterCannotDetermine.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-600 font-bold">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. In-Depth Sections */}
            {article.sections && article.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3 pt-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                  {sec.title}
                </h2>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-gray-400 font-bold">•</span>
                        <span>{b}</span>
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
                  Common Causes
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {article.commonCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-200/80 rounded-xl p-4 bg-white space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900">
                  Recommended Next Steps
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {article.whatToDoNext.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7. Frequently Asked Questions */}
            {article.faq && article.faq.length > 0 && (
              <section className="space-y-4 pt-6 border-t border-gray-200/80">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gray-900" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {article.faq.map((f, idx) => (
                    <div key={idx} className="border border-gray-200/80 rounded-xl p-4 bg-gray-50/50 space-y-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-950">
                        {f.question}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                        {f.answer}
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
                  <span>Interactive Test Tool</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Run the dedicated online test pattern to visually evaluate this characteristic on your display.
                </p>

                <div className="space-y-2 pt-1">
                  {relatedTests.map((test) => (
                    <Link
                      key={test.id}
                      href={`/tests/${test.id}`}
                      className="group block border border-gray-200 rounded-xl p-3 hover:border-blue-500 hover:bg-blue-50/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {test.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 block">
                        Launch interactive test pattern
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action Box: Troubleshooting Guide */}
            {relatedTroubleshooting.length > 0 && (
              <div className="border border-gray-200/90 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-900">
                  <Wrench className="w-4 h-4 text-purple-600" />
                  <span>Troubleshooting Guide</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Need step-by-step physical and software solutions? Consult the interactive troubleshooting topic.
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
                        Inspect causes, checks & fixes
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
                  <span>Related Articles</span>
                </div>
                <div className="space-y-2 pt-1">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/knowledge-base/${rel.slug}`}
                      className="block p-2.5 rounded-lg hover:bg-white transition-all text-xs font-medium text-gray-800 hover:text-blue-600 border border-transparent hover:border-gray-200"
                    >
                      <span className="line-clamp-2 leading-snug">{rel.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Index link */}
            <div className="pt-2">
              <Link
                href="/knowledge-base"
                className="text-xs font-semibold text-gray-600 hover:text-gray-950 flex items-center gap-1.5"
              >
                <span>← Back to Knowledge Base Index</span>
              </Link>
            </div>

          </aside>

        </div>
      </article>
    </div>
  );
}
