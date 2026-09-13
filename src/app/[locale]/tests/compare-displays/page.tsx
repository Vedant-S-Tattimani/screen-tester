import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CompareDisplaysClient } from "./CompareDisplaysClient";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CompareDisplays" });
  return generateSeoMetadata(
    "/tests/compare-displays",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function CompareDisplaysPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("compare-displays", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <CompareDisplaysClient
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    />
  );
}

