import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { TestLibrary } from "@/components/layout/TestLibrary";
import { getTestsByCategory, type TestCategory } from "@/data/tests";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  
  return {
    title: t("browseTests"),
    alternates: {
      canonical: "/tests"
    }
  };
}

export default async function TestsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tLib = await getTranslations({ locale, namespace: "TestLibrary" });
  const tTests = await getTranslations({ locale, namespace: "Tests" });
  const tHome = await getTranslations({ locale, namespace: "Home" });

  const KEY_MAP: Record<string, { ns: "lib" | "tests", key: string }> = {
    "dead-pixel-test": { ns: "lib", key: "tests.deadPixel" },
    "stuck-pixel-test": { ns: "lib", key: "tests.stuckPixel" },
    "burn-in-test": { ns: "tests", key: "burnIn" },
    "color-test": { ns: "lib", key: "tests.colorTest" },
    "grayscale-test": { ns: "lib", key: "tests.grayscaleTest" },
    "saturation-test": { ns: "lib", key: "tests.saturationTest" },
    "color-banding-test": { ns: "lib", key: "tests.gradientTest" },
    "color-gamut-test": { ns: "tests", key: "colorGamut" },
    "color-accuracy-test": { ns: "tests", key: "colorAccuracy" },
    "brightness-test": { ns: "lib", key: "tests.brightnessTest" },
    "black-level-test": { ns: "lib", key: "tests.blackLevelTest" },
    "white-level-test": { ns: "lib", key: "tests.whiteLevelTest" },
    "gamma-test": { ns: "lib", key: "tests.gammaTest" },
    "solid-color-test": { ns: "tests", key: "solidColor" },
    "viewing-angle-test": { ns: "tests", key: "viewingAngle" },
    "uniformity-test": { ns: "lib", key: "tests.uniformityTest" },
    "backlight-bleed-test": { ns: "lib", key: "tests.backlightBleed" },
    "blooming-test": { ns: "tests", key: "blooming" },
    "ghosting-test": { ns: "lib", key: "tests.ghostingTest" },
    "motion-blur-test": { ns: "lib", key: "tests.ghostingTest" }, 
    "refresh-rate-test": { ns: "lib", key: "tests.refreshRate" },
    "screen-tearing-test": { ns: "tests", key: "screenTearing" },
    "screen-flicker-test": { ns: "tests", key: "flicker" },
    "resolution-checker": { ns: "lib", key: "tests.displayInfo" },
    "hdr-capability-test": { ns: "lib", key: "tests.hdrCapabilityTest" },
    "touch-screen-test": { ns: "tests", key: "touchScreen" },
    "sharpness-test": { ns: "tests", key: "sharpness" }
  };

  const mapTestsToI18n = (categoryId: string, translationCategory: string) => {
    const tests = getTestsByCategory(categoryId as TestCategory);
    return {
      id: categoryId,
      title: tLib(translationCategory),
      tests: tests.map(test => {
        let title = test.primaryIntent;
        let description = "";

        const mapping = KEY_MAP[test.id];
        if (mapping) {
          try {
            if (mapping.ns === "lib") {
              title = tLib(`${mapping.key}.title`) || title;
              description = tLib(`${mapping.key}.description`) || description;
            } else {
              title = tTests(`${mapping.key}.title`) || title;
              description = tTests(`${mapping.key}.description`) || description;
            }
          } catch {
            // fallback
          }
        }

        return {
          href: `/tests/${test.id}`,
          title,
          description
        };
      })
    };
  };

  const categories = [
    mapTestsToI18n("pixels", "categories.pixels"),
    mapTestsToI18n("color", "categories.colorSaturation"),
    mapTestsToI18n("luminance", "categories.luminanceContrast"),
    mapTestsToI18n("display", "categories.displayBacklight"),
    mapTestsToI18n("motion", "categories.motionPerformance"),
    mapTestsToI18n("capabilities", "categories.displayCapabilities")
  ];

  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-6">
          {tHome("browseTests")}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-16">
          Explore our complete library of monitor testing utilities. All tests run locally in your browser.
        </p>
        
        <TestLibrary categories={categories} searchPlaceholder="Search tests..." />
      </section>
    </div>
  );
}
