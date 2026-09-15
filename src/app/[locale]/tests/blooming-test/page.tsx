import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { BloomingPattern } from "@/components/tests/BloomingPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/blooming-test", t("blooming.title"), t("blooming.description"));
}

export default async function BloomingTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("blooming-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("blooming.title")}
      description={t("blooming.description")}
      instructions={t("blooming.instructions")}
      testId="blooming-test">
      <BloomingPattern />
    </TestWrapper>
  );
}
