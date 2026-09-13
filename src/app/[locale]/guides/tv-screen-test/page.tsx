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
        title: t("workflowTitle")
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
      troubleshooting={t.raw("troubleshooting")}
    />
  );
}