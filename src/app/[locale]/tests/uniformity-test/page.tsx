import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { UniformityPattern, UniformityGuidance } from "@/components/tests/UniformityPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.uniformity-test" });
  return generateSeoMetadata("/tests/uniformity-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function UniformityTest({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.uniformity-test" });
  const explainerData = getFeatureExplainer("uniformity-test", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper testId="uniformity-test"
      title={t("title")}
      description={
        <>
          <p>{t("description_p1")}</p>
        </>
      }
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
      extraControls={<UniformityGuidance />}
    >
      <UniformityPattern testId="uniformity-test" />
    </TestWrapper>
  );
}

