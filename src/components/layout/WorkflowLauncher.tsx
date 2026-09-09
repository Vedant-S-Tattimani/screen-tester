"use client";

import { useState, useEffect } from "react";
import { useWorkflowLauncher } from "@/components/test-runner/TestContext";
import { WorkflowStep } from "@/components/layout/WorkflowStep";
import { Play, Monitor, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getSavedMonitorProfile, MonitorProfile } from "@/lib/inspectionStorage";

interface StepDefinition {
  title: string;
  description: string;
}

interface WorkflowLauncherProps {
  sequence: string[];
  steps: StepDefinition[];
  buttonLabel?: string;
  workflowTitle?: string;
  workflowId?: string;
}

export function WorkflowLauncher({ sequence, steps, buttonLabel, workflowTitle, workflowId }: WorkflowLauncherProps) {
  const { startWorkflow } = useWorkflowLauncher();
  const t = useTranslations("Inspection.hub");
  const [profile, setProfile] = useState<MonitorProfile | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setProfile(getSavedMonitorProfile());
    });
  }, []);

  const profileSummary = profile?.brand || profile?.model
    ? `${profile.brand} ${profile.model}`.trim()
    : null;

  return (
    <div className="space-y-10">
      {/* Display Profile Context Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700">
          <Monitor className="w-4 h-4 text-purple-600 shrink-0" />
          <span>
            {profileSummary ? (
              <>{t("profileLabel")} <strong className="text-slate-900">{profileSummary}</strong> {profile?.panelType ? `(${profile.panelType})` : ""}</>
            ) : (
              <>{t("profileLabel")} <span className="text-slate-500 italic">{t("unspecified")}</span></>
            )}
          </span>
        </div>
        <Link
          href="/monitor-inspection/summary"
          className="inline-flex items-center gap-1.5 text-purple-700 font-medium hover:underline hover:text-purple-800 shrink-0"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{t("editProfile")}</span>
        </Link>
      </div>

      <div className="flex items-center justify-between border-b border-border/60 pb-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{t("checklistTitle")}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {t("checklistDesc")}
          </p>
        </div>
        <button 
          onClick={() => startWorkflow(sequence, workflowTitle, workflowId)}
          className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Play className="w-4 h-4" />
          <span>{buttonLabel || t("startWorkflow")}</span>
        </button>
      </div>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const isQueueStep = index < sequence.length;
          return (
            <WorkflowStep
              key={index}
              stepNumber={String(index + 1).padStart(2, '0')}
              title={step.title}
              description={step.description}
              href={!isQueueStep ? "/monitor-inspection/summary" : undefined}
              onClick={isQueueStep ? () => {
                // Launch sequence starting from this step
                startWorkflow(sequence.slice(index), workflowTitle, workflowId);
              } : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
