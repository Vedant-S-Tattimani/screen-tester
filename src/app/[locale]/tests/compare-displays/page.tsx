import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CompareDisplaysClient } from "./CompareDisplaysClient";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata(
    "/tests/compare-displays",
    "Compare Displays | Size, Resolution & PPI Calculator",
    "Compare physical dimensions, pixel density (PPI), aspect ratios, and retina viewing distance between any monitor, TV, or laptop display."
  );
}

export default async function CompareDisplaysPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CompareDisplaysClient />;
}
