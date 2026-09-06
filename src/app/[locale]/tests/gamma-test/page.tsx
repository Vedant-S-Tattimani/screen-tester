import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { GammaPattern } from "@/components/tests/GammaPattern";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.gamma-test" });
  return generateSeoMetadata("/tests/gamma-test", t("metaTitle"), t("metaDescription"));
}

export default async function GammaTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.gamma-test" });

  return (
    <TestWrapper testId="gamma-test"
      title={t("title")}
      description={t("description_p1")}
      instructions={
        <ol className="list-decimal pl-5 space-y-2">
          <li>{t("inst1")}</li>
          <li>{t("inst2")}</li>
          <li>{t("inst3")}</li>
          <li dangerouslySetInnerHTML={{ __html: t.raw("inst4") }} />
        </ol>
      }
    >
      <GammaPattern />
    </TestWrapper>
  );
}
