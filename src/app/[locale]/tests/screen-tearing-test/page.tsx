import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ScreenTearingPattern } from "@/components/tests/ScreenTearingPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/screen-tearing-test", t("screenTearing.title"), t("screenTearing.description"), locale);
}

export default async function ScreenTearingTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("screen-tearing-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("screenTearing.title")}
      description={t("screenTearing.description")}
      instructions={t("screenTearing.instructions")}
      testId="screen-tearing-test">
      <ScreenTearingPattern testId="screen-tearing-test" />
    </TestWrapper>
  );
}
