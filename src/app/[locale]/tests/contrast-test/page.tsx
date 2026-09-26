import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ContrastPattern, ContrastGuidance } from "@/components/tests/ContrastPattern";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContrastTest" });
  return generateSeoMetadata("/tests/contrast-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function ContrastTestPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("contrast-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "ContrastTest" });

  return (
    <TestWrapper
      testId="contrast-test"
      title={t("title")}
      description={<p>{t("description")}</p>}
      instructions={<p>{t("disclaimer")}</p>}
      extraControls={<ContrastGuidance />}
    
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    >
      <ContrastPattern testId="contrast-test" />
    </TestWrapper>
  );
}
