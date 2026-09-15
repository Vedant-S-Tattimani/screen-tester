import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { TestRow } from "@/components/layout/TestRow";
import { getGuidesByCategory } from "@/data/guides";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tGuides = await getTranslations({ locale, namespace: "Guides" });
  return generateSeoMetadata(
    "/guides",
    tGuides("pageTitle") || "Display Testing Guides & Concepts",
    tGuides("pageSubtitle") || "Comprehensive technical guides and testing walkthroughs for monitors, laptop displays, TVs, and mobile screens.",
    locale
  );
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tGuides = await getTranslations({ locale, namespace: "Guides" });

  const deviceGuides = getGuidesByCategory("device");
  const conceptGuides = getGuidesByCategory("concept");

  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-6">
          {tGuides("pageTitle")}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-16">
          {tGuides("pageSubtitle")}
        </p>
        
        <div className="space-y-24">
          {/* Device Guides */}
          <div>
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-[0.2em] text-foreground whitespace-nowrap">
                {tGuides("deviceGuidesHeading")}
              </h2>
              <div className="h-px w-full bg-border/60"></div>
            </div>
            <div className="flex flex-col">
              {deviceGuides.map(guide => {
                const keyMap: Record<string, string> = {
                  "used-monitor-inspection-checklist": "usedMonitor",
                  "new-monitor-inspection-return-window": "newMonitor",
                };
                const camelId = keyMap[guide.id] || guide.id.replace("-screen-test", "").replace(/-([a-z])/g, g => g[1].toUpperCase());
                let title = guide.primaryIntent;
                let description = "";

                if (tGuides.has(`${camelId}.title`)) {
                  title = tGuides(`${camelId}.title`);
                }

                if (tGuides.has(`${camelId}.description`)) {
                  description = tGuides(`${camelId}.description`);
                } else if (tGuides.has(`${camelId}.subtitle`)) {
                  description = tGuides(`${camelId}.subtitle`);
                } else if (tGuides.has(`${camelId}.metaDescription`)) {
                  description = tGuides(`${camelId}.metaDescription`);
                }

                return (
                  <TestRow 
                    key={guide.id}
                    href={`/guides/${guide.id}`}
                    title={title}
                    description={description}
                  />
                );
              })}
            </div>
          </div>

          {/* Concepts */}
          <div>
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-[0.2em] text-foreground whitespace-nowrap">
                {tGuides("conceptGuidesHeading")}
              </h2>
              <div className="h-px w-full bg-border/60"></div>
            </div>
            <div className="flex flex-col">
              {conceptGuides.map(guide => {
                let title = guide.primaryIntent.replace(/\b\w/g, l => l.toUpperCase());
                let description = tGuides.has("learnAbout")
                  ? tGuides("learnAbout", { topic: guide.primaryIntent })
                  : `Learn about ${guide.primaryIntent} and how to test for it.`;

                if (guide.id === "monitor-viewing-angles-explained") {
                  if (tGuides.has("viewingAngles.title")) title = tGuides("viewingAngles.title");
                  if (tGuides.has("viewingAngles.metaDescription")) description = tGuides("viewingAngles.metaDescription");
                } else if (guide.id === "displayport-vs-hdmi-bandwidth-chroma") {
                  if (tGuides.has("displayportVsHdmi.title")) title = tGuides("displayportVsHdmi.title");
                  if (tGuides.has("displayportVsHdmi.metaDescription")) description = tGuides("displayportVsHdmi.metaDescription");
                } else if (guide.id === "monitor-osd-settings-explained") {
                  if (tGuides.has("monitorOsdSettings.title")) title = tGuides("monitorOsdSettings.title");
                  if (tGuides.has("monitorOsdSettings.metaDescription")) description = tGuides("monitorOsdSettings.metaDescription");
                }

                return (
                  <TestRow 
                    key={guide.id}
                    href={`/guides/${guide.id}`}
                    title={title}
                    description={description}
                  />
                );
              })}
            </div>
          </div>

          {/* Knowledge Base Callout */}
          <div className="p-6 bg-blue-50/50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
            <div>
              <h3 className="font-bold text-blue-950 mb-1">{tGuides("kbCallout.title")}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {tGuides("kbCallout.description")}
              </p>
            </div>
            <Link
              href="/knowledge-base"
              className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
            >
              <span>{tGuides("kbCallout.action")}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
