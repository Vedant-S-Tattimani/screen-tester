import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CustomPatternClient } from "./CustomPatternClient";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata(
    "/tests/custom-pattern",
    "Custom Test Pattern | Precision Screen Grid & Pattern Generator",
    "Generate custom grid lines, checkerboard patterns, solid color fields, and crosshairs to test monitor alignment, geometry, and uniformity."
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
