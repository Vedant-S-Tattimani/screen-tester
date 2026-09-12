import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { WorkflowLauncher } from "@/components/layout/WorkflowLauncher";
import { getWorkflowById } from "@/data/workflows";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const workflow = getWorkflowById("new");
  if (!workflow) return {};
  
return generateSeoMetadata("/monitor-inspection/new", workflow.title, workflow.shortDescription, locale);

}

export default async function NewMonitorInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const workflow = getWorkflowById("new");
  if (!workflow) notFound();

  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-12">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          INSPECTION WORKFLOW
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          {workflow.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {workflow.longDescription}
        </p>
        
        {/* Inspection Tip Alert */}
        <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs sm:text-sm text-blue-950 mb-4 leading-relaxed">
          <strong className="font-semibold block mb-1">Inspection Tip:</strong>
          {workflow.inspectionTip}
        </div>

        {/* Browser Limitations Alert */}
        {workflow.browserLimitations && (
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-amber-950 leading-relaxed">
            <strong className="font-semibold block mb-1">Hardware / Physical Inspection Note:</strong>
            {workflow.browserLimitations}
          </div>
        )}

        {/* Guide Cross-Link */}
        <div className="p-4 bg-muted/30 border border-border/80 rounded-xl text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>Looking for unboxing guidelines and return policy inspection tips?</span>
          <Link href="/guides/monitor-screen-test" className="font-semibold text-foreground hover:text-blue-600 transition-colors shrink-0">
            Read Monitor Screen Test Guide →
          </Link>
        </div>
      </div>

      <WorkflowLauncher 
        sequence={workflow.sequence} 
        steps={workflow.steps} 
        buttonLabel="Start New Monitor Inspection"
        workflowTitle={workflow.title}
        workflowId={workflow.id}
      />
    </div>
  );
}
