import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ResolutionCheckerClient } from "./ResolutionCheckerClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests.resolution-checker" });
  return generateSeoMetadata("/tests/resolution-checker", t("title"), t("description"));
}

export default function ResolutionCheckerPage() {
  return <ResolutionCheckerClient />;
}
