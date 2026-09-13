import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.laptop" });
  return generateSeoMetadata("/guides/laptop-screen-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function LaptopGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.laptop" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
      workflowLink={{
        href: "/monitor-inspection/laptop",
        title: t("workflowTitle")
      }}
      quickTestSequence={[
        "/tests/dead-pixel-test",
        "/tests/backlight-bleed-test",
        "/tests/viewing-angle-test",
        "/tests/color-test"
      ]}
      fullTestSequence={[
        "/tests/resolution-checker",
        "/tests/dead-pixel-test",
        "/tests/backlight-bleed-test",
        "/tests/uniformity-test",
        "/tests/viewing-angle-test",
        "/tests/color-test",
        "/tests/gamma-test",
        "/tests/sharpness-test"
      ]}
      troubleshooting={t.raw("troubleshooting")}
    />
  );
}