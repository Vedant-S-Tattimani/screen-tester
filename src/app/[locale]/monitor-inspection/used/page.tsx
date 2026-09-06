import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { WorkflowLauncher } from "@/components/layout/WorkflowLauncher";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Inspection.hub" });
  
  return {
    title: `${t("usedMonitor")} | Monitor Tester`,
    description: t("usedMonitorDesc"),
    alternates: {
      canonical: "/monitor-inspection/used"
    }
  };
}

export default async function UsedMonitorInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHub = await getTranslations({ locale, namespace: "Inspection.hub" });
  const tSteps = await getTranslations({ locale, namespace: "Inspection.steps" });

  const sequence = [
    "/tests/resolution-checker",
    "/tests/dead-pixel-test",
    "/tests/stuck-pixel-test",
    "/tests/burn-in-test",
    "/tests/brightness-test",
    "/tests/black-level-test",
    "/tests/uniformity-test",
    "/tests/backlight-bleed-test",
    "/tests/ghosting-test",
    "/tests/refresh-rate-test",
    "/tests/color-banding-test"
  ];

  const steps = [
    { title: tSteps("resolutionChecker.title"), description: tSteps("resolutionChecker.what") },
    { title: tSteps("deadPixel.title"), description: tSteps("deadPixel.what") },
    { title: "Stuck Pixels", description: "Look for permanently bright subpixels that fail to turn off." },
    { title: tSteps("burnIn.title"), description: tSteps("burnIn.what") },
    { title: tSteps("brightness.title"), description: tSteps("brightness.what") },
    { title: tSteps("blackLevel.title"), description: tSteps("blackLevel.what") },
    { title: tSteps("uniformity.title"), description: tSteps("uniformity.what") },
    { title: tSteps("backlightBleed.title"), description: tSteps("backlightBleed.what") },
    { title: tSteps("ghosting.title"), description: tSteps("ghosting.what") },
    { title: tSteps("refreshRate.title"), description: tSteps("refreshRate.what") },
    { title: "Color Banding & Gradients", description: "Check for posterization or banding across smooth tone transitions." }
  ];

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          {tHub("usedMonitor")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {tHub("usedMonitorDesc")}
        </p>
        <div className="p-4 bg-muted/30 border border-border/50 rounded-lg text-sm text-muted-foreground">
          Inspection tip: When testing a pre-owned display, run solid color patterns on full brightness to expose burn-in, backlight unevenness, and stuck subpixels before finalizing purchase.
        </div>
      </div>

      <WorkflowLauncher sequence={sequence} steps={steps} />
    </div>
  );
}