import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.monitor" });
  return generateSeoMetadata("/guides/monitor-screen-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function MonitorGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.monitor" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
      workflowLink={{
        href: "/monitor-inspection/general",
        title: t("workflowTitle")
      }}
      quickTestSequence={[
        "/tests/dead-pixel-test",
        "/tests/backlight-bleed-test",
        "/tests/color-test",
        "/tests/uniformity-test",
        "/tests/refresh-rate-test"
      ]}
      fullTestSequence={[
        "/tests/resolution-checker",
        "/tests/dead-pixel-test",
        "/tests/stuck-pixel-test",
        "/tests/color-test",
        "/tests/grayscale-test",
        "/tests/contrast-test",
        "/tests/uniformity-test",
        "/tests/backlight-bleed-test",
        "/tests/motion-blur-test",
        "/tests/refresh-rate-test",
        "/tests/hdr-capability-test"
      ]}
      troubleshooting={t.raw("troubleshooting")}
    />
  );
}