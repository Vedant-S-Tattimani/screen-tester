"use client";

import { ArrowRight, Monitor, RefreshCw, Gamepad2, Tv, Laptop } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { inspectionWorkflows } from "@/data/workflows";

export function InspectionHub() {
  const tHome = useTranslations("Home");
  const tHub = useTranslations("Inspection.hub");

  const iconMap: Record<string, React.ReactNode> = {
    general: <Monitor className="w-5 h-5 text-indigo-600 stroke-[1.8]" />,
    new: <Monitor className="w-5 h-5 text-blue-600 stroke-[1.8]" />,
    used: <RefreshCw className="w-5 h-5 text-emerald-600 stroke-[1.8]" />,
    gaming: <Gamepad2 className="w-5 h-5 text-amber-700 stroke-[1.8]" />,
    oled: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-purple-600">
        <circle cx="3" cy="3" r="1.3" />
        <circle cx="7.6" cy="3" r="1.3" />
        <circle cx="12.3" cy="3" r="1.3" />
        <circle cx="17" cy="3" r="1.3" />
        <circle cx="3" cy="7.6" r="1.3" />
        <circle cx="7.6" cy="7.6" r="1.3" />
        <circle cx="12.3" cy="7.6" r="1.3" />
        <circle cx="17" cy="7.6" r="1.3" />
        <circle cx="3" cy="12.3" r="1.3" />
        <circle cx="7.6" cy="12.3" r="1.3" />
        <circle cx="12.3" cy="12.3" r="1.3" />
        <circle cx="17" cy="12.3" r="1.3" />
        <circle cx="3" cy="17" r="1.3" />
        <circle cx="7.6" cy="17" r="1.3" />
        <circle cx="12.3" cy="17" r="1.3" />
        <circle cx="17" cy="17" r="1.3" />
      </svg>
    ),
    laptop: <Laptop className="w-5 h-5 text-cyan-700 stroke-[1.8]" />,
    tv: <Tv className="w-5 h-5 text-rose-600 stroke-[1.8]" />
  };

  const getWorkflowTitle = (id: string, fallback: string) => {
    switch (id) {
      case "general": return tHub("wfGeneralTitle") || "General Display Checkup";
      case "new": return tHome("wfNewTitle") || fallback;
      case "used": return tHome("wfUsedTitle") || fallback;
      case "gaming": return tHome("wfGamingTitle") || fallback;
      case "oled": return tHome("wfOledTitle") || fallback;
      case "laptop": return tHome("wfLaptopTitle") || fallback;
      case "tv": return tHome("wfTvTitle") || fallback;
      default: return fallback;
    }
  };

  const getWorkflowDesc = (id: string, fallback: string) => {
    switch (id) {
      case "general": return tHub("wfGeneralDesc") || "Essential all-around visual checkup for dead pixels, color, and motion.";
      case "new": return tHome("wfNewDesc") || fallback;
      case "used": return tHome("wfUsedDesc") || fallback;
      case "gaming": return tHome("wfGamingDesc") || fallback;
      case "oled": return tHome("wfOledDesc") || fallback;
      case "laptop": return tHome("wfLaptopDesc") || fallback;
      case "tv": return tHome("wfTvDesc") || fallback;
      default: return fallback;
    }
  };

  // Filter out "new" in favor of "general" for clean visual flow
  const displayedWorkflows = inspectionWorkflows.filter(w => w.id !== "new");

  return (
    <div className="space-y-10">
      {/* "Something Looks Wrong" Diagnostic Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-gray-300 mb-1.5">
            {tHub("diagnosticEyebrow")}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
            {tHub("diagnosticTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
            {tHub("diagnosticDesc")}
          </p>
        </div>
        <Link
          href="/monitor-inspection/diagnostic"
          className="inline-flex items-center gap-2 bg-white text-gray-950 hover:bg-gray-100 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shrink-0 shadow-xs cursor-pointer"
        >
          <span>{tHub("diagnoseProblem")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedWorkflows.map((workflow) => (
          <Link
            key={workflow.id}
            href={workflow.route}
            className="flex flex-col justify-between p-6 border border-border/60 hover:border-foreground/30 rounded-2xl bg-card transition-all group hover:shadow-xs min-h-[160px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted/40">
                  {iconMap[workflow.id]}
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {tHub("testsCount", { count: workflow.sequence.length })}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {getWorkflowTitle(workflow.id, workflow.title)}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {getWorkflowDesc(workflow.id, workflow.shortDescription)}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-4 self-end">
              <span>{tHub("startWorkflow") || "Launch checklist"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-600">
        <div>
          <strong className="text-slate-900 block mb-0.5">{tHub("aboutWorkflowsTitle")}</strong>
          <span>{tHub("aboutWorkflowsDesc")}</span>
        </div>
        <Link
          href="/monitor-inspection/summary"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-medium text-xs shrink-0 shadow-2xs transition-colors"
        >
          <span>{tHub("savedReports")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}