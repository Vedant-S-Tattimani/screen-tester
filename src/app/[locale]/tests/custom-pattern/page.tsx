import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CustomPatternClient } from "./CustomPatternClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSeoMetadata(
    "/tests/custom-pattern",
    "Custom Pattern Generator",
    "Generate custom grid lines, checkerboard patterns, solid color fields, and crosshairs to test monitor alignment, geometry, and uniformity.",
    locale
  );
}

export default async function CustomPatternPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CustomPatternClient />;
}
