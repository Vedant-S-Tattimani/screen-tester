import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { TouchScreenPattern } from "@/components/tests/TouchScreenPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/touch-screen-test", t("touchScreen.title"), t("touchScreen.description"));
}

export default async function TouchScreenTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("touchScreen.title")}
      description={t("touchScreen.description")}
      instructions={t("touchScreen.instructions")}
      testId="touch-screen-test"
    >
      <TouchScreenPattern />
    </TestWrapper>
  );
}
