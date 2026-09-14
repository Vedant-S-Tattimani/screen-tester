import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { ReactionTimePattern } from "@/components/tests/ReactionTimePattern";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestPages.reaction-time-test" });
  return generateSeoMetadata("/tests/reaction-time-test", t("metaTitle"), t("metaDescription"));
}

export default async function ReactionTimeTest({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TestPages.reaction-time-test" });

  return (
    <TestWrapper 
      testId="reaction-time-test"
      title={t("title")}
      description={
        <>
          <p>{t("description_p1")}</p>
        </>
      }
      instructions={
        <ul className="list-disc pl-5 space-y-1">
          {t.raw("instructions").map((item: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      }
    >
      <ReactionTimePattern testId="reaction-time-test" />
    </TestWrapper>
  );
}
