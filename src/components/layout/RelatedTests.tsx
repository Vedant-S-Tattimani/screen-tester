import { getRelatedTests, TEST_KEY_MAP } from "@/data/tests";
import { TestRow } from "@/components/layout/TestRow";
import { useTranslations } from "next-intl";

export function RelatedTests({ testId }: { testId: string }) {
  const tLib = useTranslations("TestLibrary");
  const tTests = useTranslations("Tests");
  const tTools = useTranslations("Tools");
  
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
                if (tLib.has(`${mapping.key}.title`)) {
                  title = tLib(`${mapping.key}.title`) || title;
                }
                if (tLib.has(`${mapping.key}.description`)) {
                  description = tLib(`${mapping.key}.description`) || description;
                }
              } else if (mapping.ns === "tools") {
                if (tTools.has(`items.${mapping.key}.title`)) {
                  title = tTools(`items.${mapping.key}.title`) || title;
                }
                if (tTools.has(`items.${mapping.key}.description`)) {
                  description = tTools(`items.${mapping.key}.description`) || description;
                }
              } else {
                if (tTests.has(`${mapping.key}.title`)) {
                  title = tTests(`${mapping.key}.title`) || title;
                } else if (tTests.has(mapping.key)) {
                  try {
                    const directVal = tTests(mapping.key);
                    if (typeof directVal === "string") {
                      title = directVal || title;
                    }
                  } catch {}
                }
                if (tTests.has(`${mapping.key}.description`)) {
                  description = tTests(`${mapping.key}.description`) || description;
                } else if (tTests.has(`${mapping.key}.metaDescription`)) {
                  description = tTests(`${mapping.key}.metaDescription`) || description;
                }
              }
            } catch {
              // fallback
            }
          }

          const toolIds = [
            "screen-recorder",
            "dpi-calculator",
            "display-bandwidth-calculator",
            "viewing-distance-calculator",
            "dual-monitor-matcher",
            "browser-compatibility",
            "voice-recorder",
            "dead-pixel-mapper",
            "oled-burn-in-calculator",
            "display-certificate",
            "osd-calibration-guide"
          ];
          const href = toolIds.includes(test.id) ? `/tools/${test.id}` : `/tests/${test.id}`;

          return (
            <TestRow 
              key={test.id}
              href={href}
              title={title}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}
