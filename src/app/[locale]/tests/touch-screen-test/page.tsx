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
  const t = await getTranslations({ locale, namespace: "TouchScreenTest" });
  return generateSeoMetadata("/tests/touch-screen-test", t("metaTitle"), t("metaDescription"));
}

export default async function TouchScreenTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TouchScreenTest" });
  
  return (
    <TestWrapper
      title={t("title")}
      description={<p>{t("description")}</p>}
      instructions={<p>{t("disclaimer")}</p>}
      testId="touch-screen-test"
    >
      <TouchScreenPattern testId="touch-screen-test" />
    </TestWrapper>
  );
}
