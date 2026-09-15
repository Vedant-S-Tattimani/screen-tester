import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ColorGamutPattern } from "@/components/tests/ColorGamutPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/color-gamut-test", t("colorGamut.title"), t("colorGamut.description"));
}

export default async function ColorGamutTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("color-gamut-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  const instructions = t.has("colorGamut.instructions")
    ? t("colorGamut.instructions")
    : "Visually observe whether the wide-gamut pattern is distinguishable from the surrounding background.";
  
  return (
    <TestWrapper
      title={t("colorGamut.title")}
      description={t("colorGamut.description")}
      instructions={instructions}
      testId="color-gamut-test">
      <ColorGamutPattern />
    </TestWrapper>
  );
}
