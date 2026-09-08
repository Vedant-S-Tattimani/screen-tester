import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { BrightnessPattern } from "@/components/tests/BrightnessPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BrightnessTest" });
  return generateSeoMetadata("/tests/brightness-test", t("metaTitle"), t("metaDescription"));
}

export default async function BrightnessTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "BrightnessTest" });

  return (
    <TestWrapper 
      testId="brightness-test"
      title={t("title")}
      description={<p>{t("description")}</p>}
      instructions={<p>{t("disclaimer")}</p>}
    >
      <BrightnessPattern testId="brightness-test" />
    </TestWrapper>
  );
}
