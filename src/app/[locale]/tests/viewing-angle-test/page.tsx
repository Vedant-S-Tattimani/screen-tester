import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ViewingAnglePattern } from "@/components/tests/ViewingAnglePattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ViewingAngleTest" });
  return generateSeoMetadata("/tests/viewing-angle-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function ViewingAngleTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("viewing-angle-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "ViewingAngleTest" });
  
  return (
    <TestWrapper
      title={t("title")}
      description={t("description")}
      instructions={t("instructions")}
      testId="viewing-angle-test">
      <ViewingAnglePattern testId="viewing-angle-test" />
    </TestWrapper>
  );
}
