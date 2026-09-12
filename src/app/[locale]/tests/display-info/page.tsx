import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { DisplayInfoClient } from "./DisplayInfoClient";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DisplayInfo" });
  return generateSeoMetadata(
    "/tests/display-info",
    t("header.title"),
    t("header.subtitle"),
    locale
  );
}

export default async function DisplayInfoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("display-info", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <DisplayInfoClient
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    />
  );
}


