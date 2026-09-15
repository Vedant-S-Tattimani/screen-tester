import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { EinkRefreshPattern } from "@/components/tests/EinkRefreshPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.eink-refresh-tool" });
  return generateSeoMetadata("/tools/eink-refresh-tool", t("metaTitle"), t("metaDescription"), locale);
}

export default async function EinkRefreshToolPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.eink-refresh-tool" });
  const explainerData = getFeatureExplainer("eink-refresh-tool", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper
      testId="eink-refresh-tool"
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
      <EinkRefreshPattern testId="eink-refresh-tool" />
    </TestWrapper>
  );
}
