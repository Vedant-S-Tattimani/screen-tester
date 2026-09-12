import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { StuckPixelFixerPattern } from "@/components/tests/StuckPixelFixerPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "StuckPixelFixerTest" });
  return generateSeoMetadata("/tests/stuck-pixel-fixer", t("metaTitle"), t("metaDescription"), locale);
}

export default async function StuckPixelFixerPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "StuckPixelFixerTest" });
  const explainerData = getFeatureExplainer("stuck-pixel-fixer", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper
      title={t("title")}
      description={t("disclaimer")}
      instructions={t("instructions")}
      testId="stuck-pixel-fixer"
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    >
      <StuckPixelFixerPattern testId="stuck-pixel-fixer" />
    </TestWrapper>
  );
}

