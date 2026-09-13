"use client";

import { useWorkflowLauncher } from "@/components/test-runner/TestContext";
import { Monitor, Zap, ListChecks } from "lucide-react";
import { Link } from "@/i18n/routing";
import { normalizeWorkflowPath } from "@/lib/workflow";
import { useTranslations } from "next-intl";

interface DeviceGuideProps {
  title: string;
  description: string;
  workflowLink?: {
    href: string;
    title: string;
  };
  quickTestSequence: string[];
  fullTestSequence: string[];
  troubleshooting: {
    symptom: string;
    description: string;
    tests: { name: string, url: string }[];
  }[];
}

export function DeviceGuide({ title, description, workflowLink, quickTestSequence, fullTestSequence, troubleshooting }: DeviceGuideProps) {
  const { startWorkflow } = useWorkflowLauncher();
  const t = useTranslations("Guides.deviceGuide");

  // Create standardized /tests/ paths for the workflow
  const toPaths = (urls: string[]) => (urls || []).map(url => (
    typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(url) : url
  ));

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 w-full flex-1 flex flex-col">
      <div className="flex items-center gap-2 text-accent font-mono text-sm uppercase tracking-widest mb-6">
        <Monitor className="w-4 h-4" />
        <span>{t("inspectionGuide")}</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-foreground">{title}</h1>
      
      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
        {description}
      </p>

      {workflowLink && (
        <div className="mb-10 p-4 bg-muted/40 border border-border/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <div>
            <span className="font-semibold text-foreground">{t("workflowPrompt")} </span>
            <span className="text-muted-foreground">{t("workflowPref")}</span>
          </div>
          <Link
            href={workflowLink.href}
            className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:underline shrink-0"
          >
            <span>{t("launchWorkflow")} {workflowLink.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Quick Test Card */}
        <div className="bg-card border border-border p-6 rounded-sm shadow-sm flex flex-col items-start hover:border-foreground/30 transition-colors">
          <div className="w-10 h-10 bg-accent/10 text-accent flex items-center justify-center rounded-full mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t("quickCheckTitle")}</h2>
          <p className="text-muted-foreground text-sm mb-6 flex-1">
            {t("quickCheckDesc", { count: quickTestSequence.length })}
          </p>
          <button 
            onClick={() => startWorkflow(toPaths(quickTestSequence))}
            className="bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98] w-full cursor-pointer"
          >
            {t("startQuickCheck")}
          </button>
        </div>

        {/* Full Test Card */}
        <div className="bg-background border border-border p-6 rounded-sm shadow-sm flex flex-col items-start hover:border-foreground/30 transition-colors">
          <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center rounded-full mb-4">
            <ListChecks className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t("fullSuiteTitle")}</h2>
          <p className="text-muted-foreground text-sm mb-6 flex-1">
            {t("fullSuiteDesc", { count: fullTestSequence.length })}
          </p>
          <button 
            onClick={() => startWorkflow(toPaths(fullTestSequence))}
            className="border-2 border-foreground text-foreground px-6 py-2.5 rounded-full font-medium hover:bg-muted transition-transform hover:scale-[1.02] active:scale-[0.98] w-full cursor-pointer"
          >
            {t("startFullSuite")}
          </button>
        </div>
      </div>

      {troubleshooting.length > 0 && (
        <>
          <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground pt-8 border-t border-border">{t("commonIssuesTitle")}</h2>
          <div className="space-y-6">
            {troubleshooting.map((item, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-sm shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{item.symptom}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground py-1 mr-2">{t("testsLabel")}</span>
                  {item.tests.map(test => {
                    const testUrl = test.url.startsWith("/tests/") ? test.url : `/tests${test.url.startsWith("/") ? test.url : `/${test.url}`}`;
                    return (
                      <Link 
                        key={test.url} 
                        href={testUrl} 
                        className="text-xs font-medium bg-muted px-3 py-1 rounded hover:bg-accent hover:text-white transition-colors"
                      >
                        {test.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}