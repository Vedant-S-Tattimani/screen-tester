import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { BurnInPattern } from "@/components/tests/BurnInPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/burn-in-test", t("burnIn.title"), t("burnIn.description"), locale);
}

export default async function BurnInTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("burn-in-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("burnIn.title")}
      description={t("burnIn.description")}
      instructions={t("burnIn.instructions")}
      testId="burn-in-test">
      <BurnInPattern testId="burn-in-test" />
    </TestWrapper>
  );
}
