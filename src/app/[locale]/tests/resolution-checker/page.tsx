import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { ResolutionCheckerClient } from "./ResolutionCheckerClient";
import { FeatureExplainer } from "@/components/test-runner/FeatureExplainer";
import { getFeatureExplainer, getExplainerLabels } from "@/data/explainers";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests.resolution-checker" });
  return generateSeoMetadata("/tests/resolution-checker", t("title"), t("description"), locale);
}

export default async function ResolutionCheckerPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const explainerData = getFeatureExplainer("resolution-checker", locale);
  const explainerLabels = getExplainerLabels(locale);

  return (
    <ResolutionCheckerClient
      educationalContent={
        explainerData ? (
          <FeatureExplainer data={explainerData} labels={explainerLabels} />
        ) : undefined
      }
    />
  );
}

