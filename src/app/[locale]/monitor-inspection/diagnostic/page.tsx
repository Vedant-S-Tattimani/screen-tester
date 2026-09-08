import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { DiagnosticClient } from "./DiagnosticClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Display Diagnostic Wizard",
    description: "Symptom-based display diagnostic guide. Select visual defects to get targeted test recommendations.",
    alternates: {
      canonical: "/monitor-inspection/diagnostic"
    }
  };
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
