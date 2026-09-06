import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  
  return {
    title: t("metaTitle"),
    alternates: {
      canonical: "/privacy"
    }
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });
  
  return (
    <div className="max-w-3xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
        {t("title")}
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          {t("intro")}
        </p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">{t("dataCollection")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("dataDesc")}
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">{t("analytics")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("analyticsDesc")}
        </p>
      </div>
    </div>
  );
}
