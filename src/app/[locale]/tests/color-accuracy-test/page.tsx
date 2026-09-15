import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ColorAccuracyPattern } from "@/components/tests/ColorAccuracyPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/color-accuracy-test", t("colorAccuracy.title"), t("colorAccuracy.description"));
}

export default async function ColorAccuracyTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("color-accuracy-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("colorAccuracy.title")}
      description={t("colorAccuracy.description")}
      instructions={t("colorAccuracy.instructions")}
      testId="color-accuracy-test">
      <ColorAccuracyPattern />
    </TestWrapper>
  );
}
