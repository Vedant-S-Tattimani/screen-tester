import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { InspectionSummary } from "./InspectionSummary";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Inspection.summary" });
  
  return {
    title: t("metaTitle"),
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function SummaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Inspection.summary" });
  
  return (
    <div className="max-w-3xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <InspectionSummary />
    </div>
  );
}
