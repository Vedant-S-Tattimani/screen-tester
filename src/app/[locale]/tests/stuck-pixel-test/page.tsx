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
  const t = await getTranslations({ locale, namespace: "TestPages.stuck-pixel-test" });
  return generateSeoMetadata("/tests/stuck-pixel-test", t("metaTitle"), t("metaDescription"));
}

const STROBE_COLORS = ["#FF0000", "#00FF00", "#0000FF"];

export default async function StuckPixelTest({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.stuck-pixel-test" });

  return (
    <TestWrapper testId="stuck-pixel-test"
      title={t("title")}
      description={
        <>
          <p dangerouslySetInnerHTML={{ __html: t.raw("description_p1") }} />
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
      <SolidPattern colors={STROBE_COLORS} autoCycleInterval={100} testId="stuck-pixel-test" />
    </TestWrapper>
  );
}
