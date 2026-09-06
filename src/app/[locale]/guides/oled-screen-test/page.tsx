import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.oled" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function OledGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.oled" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
      quickTestSequence={[
        "/tests/burn-in-test",
        "/tests/black-level-test",
        "/tests/uniformity-test",
        "/tests/brightness-test",
        "/tests/color-test"
      ]}
      fullTestSequence={[
        "/tests/resolution-checker",
        "/tests/burn-in-test",
        "/tests/black-level-test",
        "/tests/white-level-test",
        "/tests/uniformity-test",
        "/tests/color-accuracy-test",
        "/tests/color-gamut-test",
        "/tests/hdr-capability-test",
        "/tests/refresh-rate-test"
      ]}
      troubleshooting={[
        {
          symptom: "Image Retention",
          description: "Faint outlines of static UI elements remaining on screen.",
          tests: [
            { name: "Burn-in Test", url: "/tests/burn-in-test" },
            { name: "Solid Colors", url: "/tests/solid-color-test" }
          ]
        },
        {
          symptom: "Near-Black Banding",
          description: "Dark gray scenes appear noisy, banded, or blocky.",
          tests: [
            { name: "Black Level", url: "/tests/black-level-test" },
            { name: "Color Banding", url: "/tests/color-banding-test" }
          ]
        }
      ]}
    />
  );
}