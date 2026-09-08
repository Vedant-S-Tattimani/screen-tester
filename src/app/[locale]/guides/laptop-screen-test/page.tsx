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
      troubleshooting={[
        {
          symptom: "Colors wash out when moving head",
          description: "The contrast drops and colors invert when you adjust the screen tilt.",
          tests: [
            { name: "Viewing Angle", url: "/tests/viewing-angle-test" },
            { name: "Contrast", url: "/tests/contrast-test" }
          ]
        },
        {
          symptom: "Text is blurry or soft",
          description: "Fonts don't look crisp despite a high resolution display.",
          tests: [
            { name: "Sharpness", url: "/tests/sharpness-test" },
            { name: "Display Info", url: "/tests/resolution-checker" }
          ]
        }
      ]}
    />
  );
}