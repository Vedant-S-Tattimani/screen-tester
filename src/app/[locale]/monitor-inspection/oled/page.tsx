import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { WorkflowLauncher } from "@/components/layout/WorkflowLauncher";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Inspection.oled" });
  
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/monitor-inspection/oled"
    }
  };
}

export default async function OledInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: "Inspection.oled" });
  const tSteps = await getTranslations({ locale, namespace: "Inspection.steps" });

  const sequence = [
    "/tests/resolution-checker",
    "/tests/dead-pixel-test",
    "/tests/stuck-pixel-test",
    "/tests/burn-in-test",
    "/tests/black-level-test",
    "/tests/grayscale-test",
    "/tests/color-test",
    "/tests/uniformity-test",
    "/tests/hdr-capability-test"
  ];

  const steps = [
    { title: tSteps("resolutionChecker.title"), description: tSteps("resolutionChecker.what") },
    { title: tSteps("deadPixel.title"), description: tSteps("deadPixel.what") },
    { title: "Stuck Pixels", description: "Look for permanently lit subpixels." },
    { title: tSteps("burnIn.title"), description: tSteps("burnIn.what") },
    { title: tSteps("blackLevel.title"), description: tSteps("blackLevel.what") },
    { title: tSteps("grayscale.title"), description: tSteps("grayscale.what") },
    { title: tSteps("color.title"), description: tSteps("color.what") },
    { title: tSteps("uniformity.title"), description: tSteps("uniformity.what") },
    { title: tSteps("hdr.title"), description: tSteps("hdr.what") }
  ];

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {t("description")}
        </p>
        <div className="p-4 bg-muted/30 border border-border/50 rounded-lg text-sm text-muted-foreground">
          {t("oledWarning")}
        </div>
      </div>

      <WorkflowLauncher sequence={sequence} steps={steps} />
    </div>
  );
}