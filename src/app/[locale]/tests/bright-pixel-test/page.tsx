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
  const t = await getTranslations({ locale, namespace: "TestPages.bright-pixel-test" });
  return generateSeoMetadata("/tests/bright-pixel-test", t("metaTitle"), t("metaDescription"));
}

// Dark backgrounds and subpixel color isolation masks for locating hot/bright subpixels
const BRIGHT_PIXEL_COLORS = [
  "#000000", // Reference pitch black
  "#0a0a0a", // Near black 4%
  "#141414", // Near black 8%
  "#FF0000", // Red isolation mask
  "#00FF00", // Green isolation mask
  "#0000FF", // Blue isolation mask
  "#FFFFFF"  // Peak white check
];

export default async function BrightPixelTest({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.bright-pixel-test" });

  return (
    <TestWrapper 
      testId="bright-pixel-test"
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
      <SolidPattern colors={BRIGHT_PIXEL_COLORS} testId="bright-pixel-test" />
    </TestWrapper>
  );
}
