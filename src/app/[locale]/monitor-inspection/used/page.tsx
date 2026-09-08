import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { WorkflowLauncher } from "@/components/layout/WorkflowLauncher";
import { getWorkflowById } from "@/data/workflows";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Inspection.hub" });
  
  return generateSeoMetadata(
    "/monitor-inspection/used",
    t("usedMonitor"),
    t("usedMonitorDesc"),
    locale
  );
}

export default async function UsedMonitorInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHub = await getTranslations({ locale, namespace: "Inspection.hub" });
  const wf = getWorkflowById("used")!;

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          {tHub("usedMonitor")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {wf.longDescription || tHub("usedMonitorDesc")}
        </p>
        <div className="p-4 bg-muted/30 border border-border/50 rounded-lg text-sm text-muted-foreground">
          Inspection tip: {wf.inspectionTip}
        </div>
      </div>

      <WorkflowLauncher 
        sequence={wf.sequence} 
        steps={wf.steps} 
        workflowTitle={wf.title}
        workflowId={wf.id}
      />
    </div>
  );
}