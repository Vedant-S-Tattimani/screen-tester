import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { SolidPattern } from "@/components/tests/SolidPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.backlight-bleed-test" });
  return generateSeoMetadata("/tests/backlight-bleed-test", t("metaTitle"), t("metaDescription"));
}

const BLACK = ["#000000"];

export default async function BacklightBleedTest({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.backlight-bleed-test" });

  return (
    <TestWrapper testId="backlight-bleed-test"
      title={t("title")}
      description={
        <>
          <p>{t("description_p1")}</p>
        </>
      }
      instructions={
        <ul className="list-disc pl-5 space-y-1">
          {t.raw("instructions").map((item: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      }
    >
      <SolidPattern colors={BLACK} testId="backlight-bleed-test" />
    </TestWrapper>
  );
}
