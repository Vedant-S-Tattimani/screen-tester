import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { SolidPattern } from "@/components/tests/SolidPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.dead-pixel-test" });
  return generateSeoMetadata("/tests/dead-pixel-test", t("metaTitle"), t("metaDescription"), locale);
}

const COLORS = [
  "#000000", // Pure Black
  "#FFFFFF", // Pure White
  "#FF0000", // Pure Red
  "#00FF00", // Pure Green
  "#0000FF", // Pure Blue
  "#00FFFF", // Cyan
  "#FF00FF", // Magenta
  "#FFFF00", // Yellow
];

export default async function DeadPixelTest({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.dead-pixel-test" });
  const explainerData = getFeatureExplainer("dead-pixel-test", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper testId="dead-pixel-test"
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
    >
      <SolidPattern colors={COLORS} testId="dead-pixel-test" />
    </TestWrapper>
  );
}

