import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ColorGamutPattern } from "@/components/tests/ColorGamutPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/color-gamut-test", t("colorGamut.title"), t("colorGamut.description"));
}

export default async function ColorGamutTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("colorGamut.title")}
      description={t("colorGamut.description")}
      instructions={t("colorGamut.instructions")}
      testId="color-gamut-test"
    >
      <ColorGamutPattern />
    </TestWrapper>
  );
}
