import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { SaturationPattern } from "@/components/tests/SaturationPattern";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.saturation-test" });
  return generateSeoMetadata("/tests/saturation-test", t("metaTitle"), t("metaDescription"));
}

export default async function SaturationTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("saturation-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.saturation-test" });

  return (
    <TestWrapper testId="saturation-test"
      title={t("title")}
      description={t("description_p1")}
      instructions={
        <ol className="list-decimal pl-5 space-y-2">
          <li>{t("inst1")}</li>
          <li>{t("inst2")}</li>
          <li>{t("inst3")}</li>
        </ol>
      }
    
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    >
      <SaturationPattern />
    </TestWrapper>
  );
}
