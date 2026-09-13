import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.lcd" });
  return generateSeoMetadata("/guides/lcd-screen-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function LcdGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.lcd" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
      quickTestSequence={[
        "/tests/dead-pixel-test",
        "/tests/backlight-bleed-test",
        "/tests/ghosting-test",
        "/tests/uniformity-test"
      ]}
      fullTestSequence={[
        "/tests/resolution-checker",
        "/tests/dead-pixel-test",
        "/tests/backlight-bleed-test",
        "/tests/uniformity-test",
        "/tests/ghosting-test",
        "/tests/motion-blur-test",
        "/tests/contrast-test",
        "/tests/viewing-angle-test",
        "/tests/color-test"
      ]}
      troubleshooting={t.raw("troubleshooting")}
    />
  );
}