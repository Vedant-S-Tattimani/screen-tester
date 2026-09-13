import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { WorkflowLauncher } from "@/components/layout/WorkflowLauncher";
import { getWorkflowById } from "@/data/workflows";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import { ArrowRight, BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params?: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = params ? (await params).locale : undefined;
  const workflow = getWorkflowById("used", locale);
  if (!workflow) return {};
  return generateSeoMetadata("/monitor-inspection/used", workflow.title, workflow.shortDescription, locale);
}

export default async function UsedMonitorInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHub = await getTranslations({ locale, namespace: "Inspection.hub" });
  const tUi = await getTranslations({ locale, namespace: "Inspection.workflowUi" });
  const wf = getWorkflowById("used", locale);
  if (!wf) notFound();

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          {wf.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {wf.longDescription}
        </p>
        <div className="p-4 bg-muted/30 border border-border/50 rounded-lg text-sm text-muted-foreground mb-6">
          <strong className="font-semibold text-foreground">{tUi("tipLabel")}</strong> {wf.inspectionTip}
        </div>

        <div className="p-5 rounded-xl border border-blue-200/80 bg-blue-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-slate-900">
                {tHub("usedGuidePromoTitle")}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {tHub("usedGuidePromoDesc")}
              </p>
            </div>
          </div>
          <Link
            href="/guides/used-monitor-inspection-checklist"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors shrink-0 shadow-sm"
          >
            <span>{tHub("usedGuidePromoBtn")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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