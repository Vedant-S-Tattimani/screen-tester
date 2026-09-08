import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { InspectionHub } from "./InspectionHub";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Inspection.hub" });
return generateSeoMetadata("/monitor-inspection", t("metaTitle"), t("metaDescription"), locale);

}

export default async function MonitorInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Inspection.hub" });
  
  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {t("description")}
        </p>
      </div>

      <InspectionHub />
    </div>
  );
}
