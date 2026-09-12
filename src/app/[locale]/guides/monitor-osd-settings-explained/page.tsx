import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { generateSeoMetadata, getBaseUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import {
  Sliders,
  Monitor,
  Info,
  Sparkles,
  Activity,
  Sun,
  Contrast,
  Eye,
  Layers,
  ShieldAlert,
  RotateCcw,
  Maximize,
  AlertTriangle,
  ListChecks,
  Table,
  ArrowRight,
  HelpCircle,
  Zap,
  Wrench
} from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.monitorOsdSettings" });
  return generateSeoMetadata(
    "/guides/monitor-osd-settings-explained",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function MonitorOsdSettingsGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.monitorOsdSettings" });
  const baseUrl = getBaseUrl();

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsOsd"), href: "/guides/monitor-osd-settings-explained" }
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: t("title"),
    description: t("metaDescription"),
    url: `${baseUrl}/${locale}/guides/monitor-osd-settings-explained`,
    inLanguage: locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/guides/monitor-osd-settings-explained`
    },
    publisher: {
      "@type": "Organization",
      name: "Screen Tester",
      url: baseUrl
    }
  };

  const honestyItems: Array<{ badge: string; title: string; desc: string }> = t.raw("honestyItems");
  const whatIsOsdItems: Array<{ title: string; desc: string }> = t.raw("whatIsOsdItems");
  const brightnessContrastItems: Array<{ title: string; desc: string }> = t.raw("brightnessContrastItems");
  const overdriveItems: Array<{ title: string; desc: string }> = t.raw("overdriveItems");
  const mbrItems: Array<{ title: string; desc: string }> = t.raw("mbrItems");
  const vrrItems: Array<{ title: string; desc: string }> = t.raw("vrrItems");
  const hdrItems: Array<{ title: string; desc: string }> = t.raw("hdrItems");
  const gammaItems: Array<{ title: string; desc: string }> = t.raw("gammaItems");
  const colorTempItems: Array<{ title: string; desc: string }> = t.raw("colorTempItems");
  const sharpnessItems: Array<{ title: string; desc: string }> = t.raw("sharpnessItems");
  const localDimmingItems: Array<{ title: string; desc: string }> = t.raw("localDimmingItems");
  const blackEqualizerItems: Array<{ title: string; desc: string }> = t.raw("blackEqualizerItems");
  const refreshRateItems: Array<{ title: string; desc: string }> = t.raw("refreshRateItems");
  const aspectRatioItems: Array<{ title: string; desc: string }> = t.raw("aspectRatioItems");
  const factoryResetItems: Array<{ title: string; desc: string }> = t.raw("factoryResetItems");
  const baselineSteps: string[] = t.raw("baselineSteps");
  const testingMatrixRows: Array<{ setting: string; toolName: string; toolHref: string; goal: string }> = t.raw("testingMatrixRows");
  const mistakesItems: Array<{ title: string; desc: string }> = t.raw("mistakesItems");
  const limitationsItems: Array<{ title: string; desc: string }> = t.raw("limitationsItems");

  return (
    <article className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-foreground min-w-0">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="my-8 pb-8 border-b border-border/70">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 border border-blue-500/20">
          <Sliders className="w-3.5 h-3.5" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      {/* Technical Honesty & Verification Scope */}
      <aside className="my-10 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
        <div className="flex items-start gap-3.5 mb-4">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-foreground mb-1">
              {t("honestyTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("honestyDesc")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {honestyItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/70 bg-card/80 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground mb-1.5">
                  {item.badge}
                </span>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Section 1: What is a Monitor OSD? */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Monitor className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("whatIsOsdTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("whatIsOsdDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {whatIsOsdItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{item.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Brightness and Contrast */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Sun className="w-5 h-5 text-amber-500 shrink-0" />
          <span>{t("brightnessContrastTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("brightnessContrastDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {brightnessContrastItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/gradient-banding-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkGradientBandingTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/near-black-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkNearBlackTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Overdrive / Response-Time Settings */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-blue-500/30 bg-blue-500/5">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("overdriveTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("overdriveDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {overdriveItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/70 bg-card">
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
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/ghosting-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkGhostingTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/motion-blur-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkMotionBlurTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Motion Blur Reduction / MBR (Strobing) */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Eye className="w-5 h-5 text-purple-600 shrink-0" />
          <span>{t("mbrTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("mbrDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {mbrItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/motion-blur-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkMotionBlurTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/ghosting-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkGhostingTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Adaptive Sync / VRR */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{t("vrrTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("vrrDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {vrrItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/vrr-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkVrrTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/refresh-rate-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkRefreshRateTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: HDR Mode */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
          <span>{t("hdrTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("hdrDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {hdrItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/hdr-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkHdrTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Gamma Settings */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Contrast className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("gammaTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("gammaDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {gammaItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/gradient-banding-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkGradientBandingTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/near-black-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkNearBlackTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Color Temperature and RGB Gain Controls */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{t("colorTempTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("colorTempDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {colorTempItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/uniformity-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkUniformityTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Sharpness Control */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("sharpnessTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("sharpnessDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sharpnessItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/text-clarity-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkTextClarityTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 10: Local Dimming */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>{t("localDimmingTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("localDimmingDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {localDimmingItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/near-black-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkNearBlackTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/uniformity-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkUniformityTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 11: Black Equalizer / Shadow Boost */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Contrast className="w-5 h-5 text-zinc-600 dark:text-zinc-400 shrink-0" />
          <span>{t("blackEqualizerTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("blackEqualizerDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {blackEqualizerItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/near-black-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkNearBlackTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 12: Refresh-Rate Selection & OSD Overclocking */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("refreshRateTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("refreshRateDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {refreshRateItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/refresh-rate-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkRefreshRateTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/motion-blur-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkMotionBlurTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 13: Aspect Ratio and Scaling Modes in OSD */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Maximize className="w-5 h-5 text-cyan-600 shrink-0" />
          <span>{t("aspectRatioTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("aspectRatioDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {aspectRatioItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("toolsHeading")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/scaling-aspect-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkScalingAspect")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/display-info"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkDisplayInfo")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 14: Factory Reset */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/20">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <RotateCcw className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("factoryResetTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("factoryResetDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {factoryResetItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 15: Practical Baseline */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <ListChecks className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("baselineTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("baselineDesc")}
        </p>
        <ol className="space-y-3.5">
          {baselineSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 16: How to Test Changes Methodically (Matrix Table) */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Table className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("testingMatrixTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("testingMatrixDesc")}
        </p>
        <div className="w-full overflow-x-auto rounded-xl border border-border/80 bg-card mb-6 min-w-0">
          <table className="min-w-[640px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/50 border-b border-border/80 text-foreground font-semibold">
              <tr>
                <th className="p-3.5">{t("tableHeaderSetting")}</th>
                <th className="p-3.5">{t("tableHeaderTool")}</th>
                <th className="p-3.5">{t("tableHeaderGoal")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              {testingMatrixRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-medium text-foreground whitespace-nowrap">{row.setting}</td>
                  <td className="p-3.5 whitespace-nowrap">
                    <Link
                      href={row.toolHref}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>{row.toolName}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                  <td className="p-3.5 leading-relaxed">{row.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 17: Common OSD Mistakes to Avoid */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t("mistakesTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("mistakesDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mistakesItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 18: Technical Limitations */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/20">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("limitationsTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("limitationsDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {limitationsItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/70 bg-card">
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

      {/* Section 19: Related Screen Tester Tools */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Wrench className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("toolsHeading")}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          <Link
            href="/tests/ghosting-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkGhostingTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/motion-blur-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkMotionBlurTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/vrr-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkVrrTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/hdr-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkHdrTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/refresh-rate-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkRefreshRateTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/text-clarity-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkTextClarityTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/gradient-banding-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkGradientBandingTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/near-black-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkNearBlackTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/uniformity-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkUniformityTest")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/display-info"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkDisplayInfo")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/tests/scaling-aspect-test"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkScalingAspect")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
          <Link
            href="/knowledge-base/troubleshooting"
            className="p-3 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors flex items-center justify-between"
          >
            <span>{t("linkTroubleshooting")}</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </Link>
        </div>
      </section>

      {/* Section 20: Troubleshooting & Next Steps */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("troubleshootHeading")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("troubleshootDesc")}
        </p>
        <Link
          href="/knowledge-base/troubleshooting"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <span>{t("linkTroubleshooting")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Related Tests */}
      <RelatedTests testId="refresh-rate-test" />
    </article>
  );
}
