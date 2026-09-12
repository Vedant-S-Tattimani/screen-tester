import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { generateSeoMetadata, getBaseUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import { 
  Package, 
  ShieldAlert, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Eye, 
  Zap, 
  Grid, 
  Monitor, 
  Activity, 
  Sliders, 
  Cable, 
  Sparkles, 
  Camera, 
  ListChecks, 
  ArrowRight, 
  Clock, 
  FileCheck 
} from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.newMonitor" });
  return generateSeoMetadata(
    "/guides/new-monitor-inspection-return-window",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function NewMonitorInspectionGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.newMonitor" });
  const baseUrl = getBaseUrl();

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsNewMonitor"), href: "/guides/new-monitor-inspection-return-window" }
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: t("title"),
    description: t("metaDescription"),
    url: `${baseUrl}/${locale}/guides/new-monitor-inspection-return-window`,
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

  const policyItems = t.raw("policyItems") as Array<{ term: string; desc: string }>;
  const unboxingItems = t.raw("unboxingItems") as Array<{ title: string; desc: string }>;
  const physicalItems = t.raw("physicalItems") as Array<{ title: string; desc: string }>;
  const powerItems = t.raw("powerItems") as Array<{ title: string; desc: string }>;
  const pixelItems = t.raw("pixelItems") as Array<{ title: string; desc: string }>;
  const imageItems = t.raw("imageItems") as Array<{ title: string; desc: string }>;
  const motionItems = t.raw("motionItems") as Array<{ title: string; desc: string }>;
  const osdItems = t.raw("osdItems") as Array<{ title: string; desc: string }>;
  const portsItems = t.raw("portsItems") as Array<{ title: string; desc: string }>;
  const specialItems = t.raw("specialItems") as Array<{ title: string; desc: string }>;
  const evidenceItems = t.raw("evidenceItems") as Array<{ title: string; desc: string }>;
  const decisionCategories = t.raw("decisionCategories") as Array<{
    category: string;
    normal: string;
    attention: string;
    unsure: string;
  }>;
  const actionSteps = t.raw("actionSteps") as string[];
  const quickChecklist = t.raw("quickChecklist") as string[];

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-4">
          <Package className="w-3.5 h-3.5" />
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

      {/* Policy & Framework Distinction Card */}
      <div className="my-8 rounded-2xl p-6 sm:p-8 bg-blue-50/50 border border-blue-200/70 text-slate-900">
        <div className="flex items-center gap-2.5 mb-3">
          <Scale className="w-5 h-5 text-blue-700 shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-950">
            {t("policyNoticeTitle")}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
          {t("policyNoticeDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {policyItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-blue-200/60 shadow-sm">
              <strong className="text-sm font-semibold text-blue-950 block mb-1.5">
                {item.term}
              </strong>
              <p className="text-xs text-slate-700 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 italic border-t border-blue-200/60 pt-3">
          {t("policyDisclaimer")}
        </p>
      </div>

      {/* Section 1: Before Opening & Unboxing */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("unboxingTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("unboxingDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unboxingItems.map((item, idx) => (
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

      {/* Section 2: Physical & Mechanical Inspection */}
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

      {/* Section 3: First Power-On */}
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

      {/* Section 4: Pixel Defect Inspection */}
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

      {/* Section 5: Backlight & Uniformity */}
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
              href="/tests/hdr-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>HDR Test</span>
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

      {/* Section 6: Motion & Gaming */}
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

      {/* Section 7: OSD Baseline */}
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
        <div className="p-4 rounded-xl border border-border/70 bg-card mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("osdLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/hdr-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>HDR Test</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic px-1">
          {t("osdNote")}
        </p>
      </section>

      {/* Section 8: Ports & Accessories */}
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

      {/* Section 9: Panel Specifics (OLED vs LCD) */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("specialTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("specialDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialItems.map((item, idx) => (
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

      {/* Section 10: Saving Evidence */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Camera className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("evidenceTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("evidenceDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {evidenceItems.map((item, idx) => (
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
          {t("evidenceDisclaimer")}
        </p>
      </section>

      {/* Section 11: Return / Exchange Decision Framework */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("decisionTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("decisionDesc")}
        </p>

        <div className="space-y-4">
          {decisionCategories.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/70 bg-slate-50/50">
              <h3 className="text-sm font-bold text-foreground mb-3">
                {item.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-slate-800">
                  <div className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Looks Normal</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{item.normal}</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 text-slate-800">
                  <div className="font-semibold text-amber-800 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Needs Attention</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{item.attention}</p>
                </div>
                <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/60 text-slate-800">
                  <div className="font-semibold text-rose-800 flex items-center gap-1.5 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Unsure / Investigate</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{item.unsure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 12: What to Do If You Find a Problem */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-slate-50/70">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("actionTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("actionDesc")}
        </p>
        <ol className="space-y-3">
          {actionSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <span>Encountering unexpected display issues during initial setup?</span>
          <Link
            href="/knowledge-base/troubleshooting"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-900 hover:text-blue-600 transition-colors shrink-0"
          >
            <span>Display Troubleshooting Guide</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Section 13: Quick 10-Point Unboxing Checklist */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/40">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2.5">
          <ListChecks className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{t("quickChecklistTitle")}</span>
        </h2>
        <p className="text-sm text-slate-700 mb-6 leading-relaxed">
          {t("quickChecklistDesc")}
        </p>
        <ul className="space-y-3">
          {quickChecklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 14: Interactive Workflow CTA */}
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
          href="/monitor-inspection/new"
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
