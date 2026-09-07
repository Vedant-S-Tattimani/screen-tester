import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { SolidColorPattern } from "@/components/tests/SolidColorPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/solid-color-test", t("solidColor.title"), t("solidColor.description"));
}

export default async function SolidColorTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("solidColor.title")}
      description={t("solidColor.description")}
      instructions={t("solidColor.instructions")}
      testId="solid-color-test"
    >
      <SolidColorPattern testId="solid-color-test" />
    </TestWrapper>
  );
}
