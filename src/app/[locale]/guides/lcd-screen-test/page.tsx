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
      troubleshooting={[
        {
          symptom: "White halos on edges",
          description: "Light leaking from the corners of the screen when viewing dark content.",
          tests: [
            { name: "Backlight Bleed", url: "/tests/backlight-bleed-test" },
            { name: "Uniformity", url: "/tests/uniformity-test" }
          ]
        },
        {
          symptom: "Smearing or trailing in motion",
          description: "Moving objects leave a trail or appear blurry.",
          tests: [
            { name: "Ghosting", url: "/tests/ghosting-test" },
            { name: "Motion Blur", url: "/tests/motion-blur-test" }
          ]
        }
      ]}
    />
  );
}