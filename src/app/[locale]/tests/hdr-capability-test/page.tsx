import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { HdrPattern } from "@/components/tests/HdrPattern";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.hdr-capability-test" });
  return generateSeoMetadata("/tests/hdr-capability-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function HdrCapabilityTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.hdr-capability-test" });
  const explainerData = getFeatureExplainer("hdr-capability-test", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper
      testId="hdr-capability-test"
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
      <HdrPattern testId="hdr-capability-test" />
    </TestWrapper>
  );
}
