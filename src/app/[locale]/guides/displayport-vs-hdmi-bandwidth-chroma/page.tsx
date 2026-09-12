import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { generateSeoMetadata, getBaseUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import { 
  ArrowRight, 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  Tv, 
  Monitor, 
  Cable, 
  Cpu, 
  Sliders, 
  Sparkles, 
  Layers, 
  Eye, 
  Info, 
  ListChecks,
  Split,
  Laptop
} from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.displayportVsHdmi" });
  return generateSeoMetadata(
    "/guides/displayport-vs-hdmi-bandwidth-chroma",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function DisplayPortVsHdmiGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.displayportVsHdmi" });
  const baseUrl = getBaseUrl();

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsDpHdmi"), href: "/guides/displayport-vs-hdmi-bandwidth-chroma" }
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: t("title"),
    description: t("metaDescription"),
    url: `${baseUrl}/${locale}/guides/displayport-vs-hdmi-bandwidth-chroma`,
    inLanguage: locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/guides/displayport-vs-hdmi-bandwidth-chroma`
    },
    publisher: {
      "@type": "Organization",
      name: "Screen Tester",
      url: baseUrl
    }
  };

  const honestyItems: Array<{ badge: string; title: string; desc: string }> = t.raw("honestyItems");
  const interfaceItems: Array<{ title: string; desc: string }> = t.raw("interfaceItems");
  const connectorItems: Array<{ title: string; desc: string }> = t.raw("connectorItems");
  const hdmiRevisionsItems: Array<{ title: string; desc: string }> = t.raw("hdmiRevisionsItems");
  const dpRevisionsItems: Array<{ title: string; desc: string }> = t.raw("dpRevisionsItems");
  const bandwidthItems: Array<{ title: string; desc: string }> = t.raw("bandwidthItems");
  const resRefreshItems: Array<{ combo: string; payload: string; notes: string }> = t.raw("resRefreshItems");
  const chromaItems: Array<{ title: string; desc: string }> = t.raw("chromaItems");
  const bitDepthItems: Array<{ title: string; desc: string }> = t.raw("bitDepthItems");
  const hdrChainItems: Array<{ step: string; desc: string }> = t.raw("hdrChainItems");
  const dscItems: Array<{ title: string; desc: string }> = t.raw("dscItems");
  const vrrItems: Array<{ title: string; desc: string }> = t.raw("vrrItems");
  const cableItems: Array<{ title: string; desc: string }> = t.raw("cableItems");
  const laptopDockItems: Array<{ title: string; desc: string }> = t.raw("laptopDockItems");
  const determineSteps: string[] = t.raw("determineSteps");
  const troubleshootScenarios: Array<{ title: string; symptom: string; cause: string; fix: string }> = t.raw("troubleshootScenarios");
  const decisionMatrix: Array<{ useCase: string; recommended: string; why: string }> = t.raw("decisionMatrix");

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
          <Cpu className="w-3.5 h-3.5" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {honestyItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/70 bg-card/80">
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
          ))}
        </div>
      </aside>

      {/* Section 1: What Each Interface Is */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Cable className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("interfaceTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("interfaceDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interfaceItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                {idx === 0 ? <Monitor className="w-4 h-4 text-blue-600 shrink-0" /> : <Tv className="w-4 h-4 text-amber-600 shrink-0" />}
                <span>{item.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Connector Alone Does NOT Determine Capability */}
      <section className="my-12 p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t("connectorTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("connectorDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectorItems.map((item, idx) => (
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

      {/* Section 3: HDMI Revisions */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Tv className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("hdmiRevisionsTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("hdmiRevisionsDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hdmiRevisionsItems.map((item, idx) => (
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

      {/* Section 4: DisplayPort Generations */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Monitor className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("dpRevisionsTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("dpRevisionsDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dpRevisionsItems.map((item, idx) => (
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

      {/* Section 5: Bandwidth: Raw vs. Usable Payload */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("bandwidthTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("bandwidthDesc")}
        </p>
        <div className="space-y-4">
          {bandwidthItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Resolution & Refresh Rate Combinations */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("resRefreshTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("resRefreshDesc")}
        </p>
        <div className="w-full overflow-x-auto rounded-xl border border-border/80 bg-card mb-6 min-w-0">
          <table className="min-w-[640px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/50 border-b border-border/80 text-foreground font-semibold">
              <tr>
                <th className="p-3.5">{t("tableResolution")}</th>
                <th className="p-3.5">{t("tablePayload")}</th>
                <th className="p-3.5">{t("tableLimits")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              {resRefreshItems.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-medium text-foreground whitespace-nowrap">{row.combo}</td>
                  <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">{row.payload}</td>
                  <td className="p-3.5 leading-relaxed">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("resRefreshLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/resolution-checker"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkResolutionChecker")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/refresh-rate-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkRefreshRateTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/scaling-aspect-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkScalingAspect")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Chroma Subsampling */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Eye className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("chromaTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("chromaDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {chromaItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
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
            {t("chromaLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/text-clarity-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkTextClarityTest")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/resolution-checker"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkResolutionChecker")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Bit Depth */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("bitDepthTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("bitDepthDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bitDepthItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: HDR Transport Chain */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("hdrTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("hdrDesc")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {hdrChainItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center mb-2.5">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-foreground mb-1.5">
                  {item.step}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("hdrLinksTitle")}
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

      {/* Section 10: Display Stream Compression (DSC) */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("dscTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("dscDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dscItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 11: Variable Refresh Rate (VRR) */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("vrrTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("vrrDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {vrrItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
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
            {t("vrrLinksTitle")}
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

      {/* Section 12: Cable Quality & Certifications */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Cable className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("cableTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("cableDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cableItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 13: Laptops, USB-C DP Alt Mode, Docks & Adapters */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Laptop className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("laptopDockTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("laptopDockDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {laptopDockItems.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-sm font-bold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 14: How to Determine What Your Setup Supports */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/20">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <ListChecks className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("determineTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("determineDesc")}
        </p>
        <ol className="space-y-3 mb-6">
          {determineSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("determineLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests/display-info"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkDisplayInfo")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/tests/scaling-aspect-test"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkScalingAspect")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
            <Link
              href="/knowledge-base/resolution-and-scaling"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkResolutionKb")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 15: Troubleshooting Bottlenecks */}
      <section className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t("troubleshootTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("troubleshootDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {troubleshootScenarios.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <div className="space-y-2 text-xs">
                  <p className="text-rose-600 dark:text-rose-400">
                    <strong className="font-semibold">{t("labelSymptom")}</strong> {item.symptom}
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">{t("labelCause")}</strong> {item.cause}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400">
                    <strong className="font-semibold">{t("labelRemedy")}</strong> {item.fix}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("troubleshootLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/knowledge-base/troubleshooting"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
            >
              <span>{t("linkTroubleshooting")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 16: Practical Decision Framework */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-center gap-2.5">
          <Split className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t("decisionTitle")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("decisionDesc")}
        </p>
        <div className="w-full overflow-x-auto rounded-xl border border-border/80 min-w-0">
          <table className="min-w-[640px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/50 border-b border-border/80 text-foreground font-semibold">
              <tr>
                <th className="p-3.5">{t("decisionColScenario")}</th>
                <th className="p-3.5">{t("decisionColRecommended")}</th>
                <th className="p-3.5">{t("decisionColRationale")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              {decisionMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-medium text-foreground whitespace-nowrap">{row.useCase}</td>
                  <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{row.recommended}</td>
                  <td className="p-3.5 leading-relaxed">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Tests */}
      <RelatedTests testId="refresh-rate-test" />
    </article>
  );
}
