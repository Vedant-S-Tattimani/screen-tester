import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DisplayInfoClient } from "./DisplayInfoClient";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata(
    "/tests/display-info",
    "Display Information & Browser Capabilities | Monitor Tester",
    "Query legitimate browser-reported display parameters, viewport geometry, Device Pixel Ratio, WebGL 3D rendering, and multi-monitor topology."
  );
}

export default async function DisplayInfoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DisplayInfoClient />;
}

