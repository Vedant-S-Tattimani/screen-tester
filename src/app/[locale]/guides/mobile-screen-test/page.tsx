import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.mobile" });
  return { title: t("metaTitle"), description: t("metaDescription") };
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
      troubleshooting={[
        {
          symptom: "Dead spots on screen",
          description: "Taps or swipes aren't registering in specific areas.",
          tests: [
            { name: "Touch Screen", url: "/tests/touch-screen-test" }
          ]
        },
        {
          symptom: "Shadows of old apps",
          description: "Keyboard or status bar faintly visible on solid colors.",
          tests: [
            { name: "Burn-in", url: "/tests/burn-in-test" },
            { name: "Solid Colors", url: "/tests/solid-color-test" }
          ]
        }
      ]}
    />
  );
}