import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/terms"
    }
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Terms" });
  
  return (
    <div className="max-w-3xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-8">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          LEGAL & TERMS
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t("intro")}
        </p>
      </div>
      
      <div className="space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <section className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">{t("useLicense")}</h2>
          <p>{t("useLicenseDesc")}</p>
        </section>

        <section className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">{t("disclaimer")}</h2>
          <p>{t("disclaimerDesc")}</p>
        </section>

        <section className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">{t("limitations")}</h2>
          <p>{t("limitationsDesc")}</p>
        </section>

        <section className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">{t("localExecution")}</h2>
          <p>{t("localExecutionDesc")}</p>
        </section>
      </div>
    </div>
  );
}
