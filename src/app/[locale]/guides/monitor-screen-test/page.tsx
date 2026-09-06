import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.monitor" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function MonitorGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.monitor" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
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
      troubleshooting={[
        {
          symptom: "Screen Tearing in Games",
          description: "Horizontal lines splitting the image when moving the camera.",
          tests: [
            { name: "Screen Tearing", url: "/tests/screen-tearing-test" },
            { name: "Refresh Rate", url: "/tests/refresh-rate-test" }
          ]
        },
        {
          symptom: "Uneven Colors or Shadows",
          description: "Dark scenes look blotchy or colors shift across the screen.",
          tests: [
            { name: "Uniformity", url: "/tests/uniformity-test" },
            { name: "Backlight Bleed", url: "/tests/backlight-bleed-test" },
            { name: "Viewing Angle", url: "/tests/viewing-angle-test" }
          ]
        }
      ]}
    />
  );
}