import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { DeadPixelMapperPattern } from "@/components/tests/DeadPixelMapperPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.dead-pixel-mapper" });
  return generateSeoMetadata("/tools/dead-pixel-mapper", t("metaTitle"), t("metaDescription"), locale);
}

export default async function DeadPixelMapperPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.dead-pixel-mapper" });
  const explainerData = getFeatureExplainer("dead-pixel-mapper", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper
      testId="dead-pixel-mapper"
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
      <DeadPixelMapperPattern testId="dead-pixel-mapper" />
    </TestWrapper>
  );
}
