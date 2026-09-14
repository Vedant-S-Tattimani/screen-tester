import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { DisplayCertificatePattern } from "@/components/tests/DisplayCertificatePattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.display-certificate" });
  return generateSeoMetadata("/tools/display-certificate", t("metaTitle"), t("metaDescription"), locale);
}

export default async function DisplayCertificatePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.display-certificate" });
  const explainerData = getFeatureExplainer("display-certificate", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <TestWrapper
      testId="display-certificate"
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
      <DisplayCertificatePattern testId="display-certificate" />
    </TestWrapper>
  );
}
