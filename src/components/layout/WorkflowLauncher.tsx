"use client";

import { useWorkflowLauncher } from "@/components/test-runner/TestContext";
import { WorkflowStep } from "@/components/layout/WorkflowStep";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

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

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-border/60 pb-8">
        <h2 className="text-xl font-semibold text-foreground">Inspection Checklist</h2>
        <button 
          onClick={() => startWorkflow(sequence, workflowTitle, workflowId)}
          className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
