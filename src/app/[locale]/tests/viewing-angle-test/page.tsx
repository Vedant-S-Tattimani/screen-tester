import { generateSeoMetadata } from "@/lib/seo";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ViewingAnglePattern } from "@/components/tests/ViewingAnglePattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tests" });
  return generateSeoMetadata("/tests/viewing-angle-test", t("viewingAngle.title"), t("viewingAngle.description"));
}

export default async function ViewingAngleTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tests" });
  
  return (
    <TestWrapper
      title={t("viewingAngle.title")}
      description={t("viewingAngle.description")}
      instructions={t("viewingAngle.instructions")}
      testId="viewing-angle-test"
    >
      <ViewingAnglePattern />
    </TestWrapper>
  );
}
