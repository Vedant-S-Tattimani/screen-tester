import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { MultiTouchPattern } from "@/components/tests/MultiTouchPattern";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldAlert } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.multi-touch-test" });
  return generateSeoMetadata("/tests/multi-touch-test", t("metaTitle"), t("metaDescription"));
}

export default async function MultiTouchTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.multi-touch-test" });

  return (
    <TestWrapper
      testId="multi-touch-test"
      title={t("title")}
      description={
        <>
          <p>{t("description_p1")}</p>
        </>
      }
      instructions={
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-1">
            {t.raw("instructions").map((item: string, i: number) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
          <div className="p-3.5 bg-slate-900/5 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2.5 mt-4">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-slate-200">Hardware Boundary Notice:</strong> This test observes pointer events exposed by your browser and operating system. It does not measure physical touchscreen hardware latency, pressure accuracy, or panel digitizer grid density. Browser-reported navigator.maxTouchPoints reflects what the browser interface reports and may differ from physical hardware limits. Browser touch gestures or palm rejection drivers can filter simultaneous touch contacts.
            </div>
          </div>
        </div>
      }
    >
      <MultiTouchPattern testId="multi-touch-test" />
    </TestWrapper>
  );
}
