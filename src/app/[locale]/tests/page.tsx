import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { TestLibrary } from "@/components/layout/TestLibrary";
import { getTestsByCategory, type TestCategory, TEST_KEY_MAP } from "@/data/tests";

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

  const mapTestsToI18n = (categoryId: string, translationCategory: string) => {
    const tests = getTestsByCategory(categoryId as TestCategory);
    return {
      id: categoryId,
      title: tLib(translationCategory),
      tests: tests.map(test => {
        let title = test.primaryIntent;
        let description = "";

        const mapping = TEST_KEY_MAP[test.id];
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
          {tLib("subtitle")}
        </p>
        
        <TestLibrary categories={categories} searchPlaceholder={tLib("searchPlaceholder")} />
      </section>
    </div>
  );
}
