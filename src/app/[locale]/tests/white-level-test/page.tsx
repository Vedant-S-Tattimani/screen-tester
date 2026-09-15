import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { LevelPattern } from "@/components/tests/LevelPattern";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.white-level-test" });
  return generateSeoMetadata("/tests/white-level-test", t("metaTitle"), t("metaDescription"));
}

export default async function WhiteLevelTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("white-level-test", locale);
  const explainerLabels = getExplainerLabels(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.white-level-test" });

  return (
    <TestWrapper testId="white-level-test"
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
      <LevelPattern type="white" />
    </TestWrapper>
  );
}
