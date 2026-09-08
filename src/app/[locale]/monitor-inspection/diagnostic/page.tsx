import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { DiagnosticClient } from "./DiagnosticClient";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params?: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = params ? (await params).locale : undefined;
  const t = await getTranslations({ locale: locale || "en", namespace: "Inspection.hub" });
  return generateSeoMetadata(
    "/monitor-inspection/diagnostic",
    t("diagnosticMetaTitle"),
    t("diagnosticMetaDesc"),
    locale
  );
}

export default async function DiagnosticPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DiagnosticClient />;
}
