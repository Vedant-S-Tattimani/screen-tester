import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.mobile" });
  return generateSeoMetadata("/guides/mobile-screen-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function MobileGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.mobile" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
      quickTestSequence={[
        "/tests/dead-pixel-test",
        "/tests/touch-screen-test",
        "/tests/burn-in-test",
        "/tests/color-test"
      ]}
      fullTestSequence={[
        "/tests/resolution-checker",
        "/tests/touch-screen-test",
        "/tests/dead-pixel-test",
        "/tests/burn-in-test",
        "/tests/color-test",
        "/tests/uniformity-test",
        "/tests/refresh-rate-test",
        "/tests/sharpness-test"
      ]}
      troubleshooting={t.raw("troubleshooting")}
    />
  );
}