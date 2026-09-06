import { setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { FlickerPattern } from "@/components/tests/FlickerPattern";


import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/screen-flicker-test", t("flicker.title"), t("flicker.description"));
}

export default async function FlickerTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("flicker.title")}
      description={t("flicker.description")}
      instructions={t("flicker.instructions")}
      testId="screen-flicker-test"
    >
      <FlickerPattern />
    </TestWrapper>
  );
}
