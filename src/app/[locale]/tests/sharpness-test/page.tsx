import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { SharpnessPattern } from "@/components/tests/SharpnessPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/sharpness-test", t("sharpness.title"), t("sharpness.description"));
}

export default async function SharpnessTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("sharpness.title")}
      description={t("sharpness.description")}
      instructions={t("sharpness.instructions")}
      testId="sharpness-test"
    >
      <SharpnessPattern testId="sharpness-test" />
    </TestWrapper>
  );
}
