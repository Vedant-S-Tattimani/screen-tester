import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
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
                const camelId = guide.id.replace("-screen-test", "").replace(/-([a-z])/g, g => g[1].toUpperCase());
                let title = guide.primaryIntent;
                let description = "";
                try {
                  title = tGuides(`${camelId}.title`) || title;
                  description = tGuides(`${camelId}.description`) || description;
                } catch {}

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
              {conceptGuides.map(guide => (
                <TestRow 
                  key={guide.id}
                  href={`/guides/${guide.id}`}
                  title={guide.primaryIntent.replace(/\b\w/g, l => l.toUpperCase())}
                  description={tGuides("learnAbout", { topic: guide.primaryIntent })}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
