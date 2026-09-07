import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { WorkflowLauncher } from "@/components/layout/WorkflowLauncher";
import { getWorkflowById } from "@/data/workflows";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;
  const workflow = getWorkflowById("laptop");
  if (!workflow) return {};
  
  return {
    title: `${workflow.title} | Monitor Tester`,
    description: workflow.shortDescription,
    alternates: {
      canonical: "/monitor-inspection/laptop"
    }
  };
}

export default async function LaptopDisplayInspectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const workflow = getWorkflowById("laptop");
  if (!workflow) notFound();

  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-12">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-600 mb-3">
          INSPECTION WORKFLOW
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          {workflow.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {workflow.longDescription}
        </p>
        
        {/* Inspection Tip Alert */}
        <div className="p-4 bg-cyan-50/70 border border-cyan-200/80 rounded-xl text-xs sm:text-sm text-cyan-950 mb-4 leading-relaxed">
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
      </div>

      <WorkflowLauncher sequence={workflow.sequence} steps={workflow.steps} buttonLabel="Start Laptop Inspection" />
    </div>
  );
}
