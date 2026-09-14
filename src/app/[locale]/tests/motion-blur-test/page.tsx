import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { MotionBlurPattern } from "@/components/tests/MotionBlurPattern";
import { Metadata } from "next";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.motion-blur-test" });
  return generateSeoMetadata("/tests/motion-blur-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function MotionBlurTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.motion-blur-test" });
  const explainerData = getFeatureExplainer("motion-blur-test", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper testId="motion-blur-test"
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
      <MotionBlurPattern testId="motion-blur-test" />
    </TestWrapper>
  );
}

