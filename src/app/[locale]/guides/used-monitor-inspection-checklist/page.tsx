import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { generateSeoMetadata, getBaseUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import { 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ShoppingBag, 
  Eye, 
  Zap, 
  Grid, 
  Monitor, 
  Activity, 
  Sliders, 
  Cable, 
  Clock, 
  FileCheck, 
  ListChecks 
} from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.usedMonitor" });
  return generateSeoMetadata(
    "/guides/used-monitor-inspection-checklist",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function UsedMonitorChecklistGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.usedMonitor" });
  const baseUrl = getBaseUrl();

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsUsedMonitor"), href: "/guides/used-monitor-inspection-checklist" }
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: t("title"),
    description: t("metaDescription"),
    url: `${baseUrl}/${locale}/guides/used-monitor-inspection-checklist`,
    publisher: {
      "@type": "Organization",
      name: "Screen Tester",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`
      }
    },
    inLanguage: locale,
    dateModified: "2026-09-12T00:00:00Z"
  };

  const beforeItems = t.raw("beforeItems") as Array<{ title: string; desc: string }>;
  const physicalItems = t.raw("physicalItems") as Array<{ title: string; desc: string }>;
  const powerItems = t.raw("powerItems") as Array<{ title: string; desc: string }>;
  const pixelItems = t.raw("pixelItems") as Array<{ title: string; desc: string }>;
  const imageItems = t.raw("imageItems") as Array<{ title: string; desc: string }>;
  const motionItems = t.raw("motionItems") as Array<{ title: string; desc: string }>;
  const osdItems = t.raw("osdItems") as Array<{ title: string; desc: string }>;
  const portsItems = t.raw("portsItems") as Array<{ title: string; desc: string }>;
  const wearItems = t.raw("wearItems") as Array<{ title: string; desc: string }>;
  const sellerItems = t.raw("sellerItems") as Array<{ title: string; desc: string }>;
  const checklist = t.raw("checklist") as string[];

  return (
    <article className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-6 lg:px-8 w-full flex-1 text-slate-900 font-sans">
      {/* TechArticle Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 mb-4">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      {/* Technical Honesty Banner */}
      <div className="my-8 rounded-2xl p-5 sm:p-6 bg-slate-50 border border-slate-200/80 text-slate-800 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="font-semibold block text-slate-900 mb-1">
            {t("noticeTitle")}
          </strong>
          <span>{t("noticeDesc")}</span>
        </div>
      </div>

      {/* Section 1: Before Meeting */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("beforeTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("beforeDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beforeItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Physical Inspection */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Eye className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("physicalTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("physicalDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {physicalItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Power-On Checks */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("powerTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("powerDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {powerItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Pixel Inspection */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-slate-50/50">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Grid className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("pixelTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("pixelDesc")}
        </p>
        <div className="space-y-4 mb-6">
          {pixelItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-border/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("pixelLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/dead-pixel-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Dead Pixel Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/stuck-pixel-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Stuck Pixel Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/knowledge-base/dead-pixel-vs-stuck-pixel"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Dead vs Stuck Pixels Explained</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Image Quality */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Monitor className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("imageTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("imageDesc")}
        </p>
        <div className="space-y-4 mb-6">
          {imageItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("imageLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/backlight-bleed-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Backlight Bleed Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/uniformity-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Uniformity Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/gradient-banding-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Gradient & Banding Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/text-clarity-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Text Clarity Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/knowledge-base/backlight-bleed-vs-ips-glow"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Backlight Bleed vs IPS Glow KB</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Motion & High-Refresh */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("motionTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("motionDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {motionItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("motionLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/refresh-rate-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Refresh Rate Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/ghosting-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Ghosting Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/motion-blur-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>Motion Blur Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/vrr-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>VRR Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: OSD Menu & Reset */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("osdTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("osdDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {osdItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic px-1">
          {t("osdNote")}
        </p>
      </section>

      {/* Section 8: Ports & Connectivity */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Cable className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("portsTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("portsDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portsItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Wear & Commercial Use */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t("wearTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("wearDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wearItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: Seller & Model Verification */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("sellerTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("sellerDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sellerItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 11: Final Checklist */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/40">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2.5">
          <ListChecks className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{t("checklistTitle")}</span>
        </h2>
        <p className="text-sm text-slate-700 mb-6 leading-relaxed">
          {t("checklistDesc")}
        </p>
        <ul className="space-y-3">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 12: Interactive Workflow CTA */}
      <div className="my-12 p-8 rounded-2xl bg-gray-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            {t("workflowCtaTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
            {t("workflowCtaDesc")}
          </p>
        </div>
        <Link
          href="/monitor-inspection/used"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-950 font-semibold text-sm hover:bg-gray-100 transition-all shrink-0 shadow-sm"
        >
          <span>{t("workflowCtaButton")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Tests */}
      <div className="mt-16">
        <h2 className="text-lg font-bold text-foreground mb-4">
          {t("relatedTestsHeading")}
        </h2>
        <RelatedTests testId="dead-pixel-test" />
      </div>
    </article>
  );
}
