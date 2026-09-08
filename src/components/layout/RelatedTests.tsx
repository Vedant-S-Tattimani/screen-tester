import { getRelatedTests, TEST_KEY_MAP } from "@/data/tests";
import { TestRow } from "@/components/layout/TestRow";
import { useTranslations } from "next-intl";

export function RelatedTests({ testId }: { testId: string }) {
  const tLib = useTranslations("TestLibrary");
  const tTests = useTranslations("Tests");
  
  const related = getRelatedTests(testId);
  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-border/50 w-full">
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
        {tLib("relatedTitle")}
      </h2>
      <div className="flex flex-col">
        {related.map(test => {
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

          return (
            <TestRow 
              key={test.id}
              href={`/tests/${test.id}`}
              title={title}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}
