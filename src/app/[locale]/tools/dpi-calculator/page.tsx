import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { DpiCalculatorPattern } from "@/components/tests/DpiCalculatorPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.dpi-calculator" });
  return generateSeoMetadata("/tools/dpi-calculator", t("metaTitle"), t("metaDescription"), locale);
}

export default async function DpiCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.dpi-calculator" });
  const explainerData = getFeatureExplainer("dpi-calculator", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper
      testId="dpi-calculator"
      title={t("title")}
      description={<p>{t("description")}</p>}
      instructions={
        <ul className="list-disc pl-5 space-y-1">
          {t.raw("instructions").map((item: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      }
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    >
      <DpiCalculatorPattern testId="dpi-calculator" />
    </TestWrapper>
  );
}
