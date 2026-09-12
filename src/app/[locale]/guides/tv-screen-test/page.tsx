import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeviceGuide } from "@/components/DeviceGuide";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.tv" });
  return generateSeoMetadata("/guides/tv-screen-test", t("metaTitle"), t("metaDescription"), locale);
}

export default async function TvGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.tv" });
  
  return (
    <DeviceGuide
      title={t("title")}
      description={t("description")}
      workflowLink={{
        href: "/monitor-inspection/tv",
        title: "TV Inspection Wizard"
      }}
      quickTestSequence={[
        "/tests/dead-pixel-test",
        "/tests/blooming-test",
        "/tests/motion-blur-test",
        "/tests/color-test"
      ]}
      fullTestSequence={[
        "/tests/resolution-checker",
        "/tests/dead-pixel-test",
        "/tests/blooming-test",
        "/tests/black-level-test",
        "/tests/contrast-test",
        "/tests/color-test",
        "/tests/color-banding-test",
        "/tests/motion-blur-test",
        "/tests/screen-tearing-test",
        "/tests/viewing-angle-test"
      ]}
      troubleshooting={[
        {
          symptom: "Halos around subtitles",
          description: "Bright objects on a dark background have a glowing aura.",
          tests: [
            { name: "Blooming", url: "/tests/blooming-test" },
            { name: "Black Level", url: "/tests/black-level-test" }
          ]
        },
        {
          symptom: "Soap Opera Effect",
          description: "Movies look unnaturally smooth or artificial.",
          tests: [
            { name: "Motion Blur", url: "/tests/motion-blur-test" },
            { name: "Refresh Rate", url: "/tests/refresh-rate-test" }
          ]
        }
      ]}
    />
  );
}