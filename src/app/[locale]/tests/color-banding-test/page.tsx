import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ColorBandingPattern } from "@/components/tests/ColorBandingPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/color-banding-test", t("colorBanding.title"), t("colorBanding.description"));
}

export default async function ColorBandingTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("color-banding-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("colorBanding.title")}
      description={t("colorBanding.description")}
      instructions={t("colorBanding.instructions")}
      testId="color-banding-test">
      <ColorBandingPattern testId="color-banding-test" />
    </TestWrapper>
  );
}
