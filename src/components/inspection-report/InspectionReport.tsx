"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  MinusCircle, 
  AlertTriangle, 
  Monitor, 
  Info, 
  Cpu, 
  FileText,
  Clock,
  Layers,
  Sparkles,
  Wrench,
  ArrowRight,
  Printer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InspectionReportData } from "./types";

interface InspectionReportProps {
  data: InspectionReportData;
  onDeletePixelMarker?: (testId: string, markerId: string) => void;
  className?: string;
}

export function InspectionReport({
  data,
  onDeletePixelMarker,
  className
}: InspectionReportProps) {
  const t = useTranslations("InspectionSummary");

  const formattedDate = React.useMemo(() => {
    try {
      return new Date(data.timestamp).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return data.timestamp;
    }
  }, [data.timestamp]);

  return (
    <article 
      className={cn(
        "bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden print:border-none print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans break-inside-avoid",
        className
      )}
      data-print-block
    >
      {/* =========================================================================
          REPORT HEADER: Brand, Title, Metadata, Distinction Legend
          ========================================================================= */}
      <header className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 print:bg-transparent print:p-0 print:pb-4 print:border-b-2 print:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-blue-600 uppercase print:text-slate-800">
              <span>{t("reportBrand")}</span>
              <span>•</span>
              <span>{t("reportTitle")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-1">
              {data.workflowTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono text-slate-500">
              <span>ID: <strong className="text-slate-700 font-semibold">{data.inspectionId}</strong></span>
              <span>•</span>
              <time dateTime={data.timestamp}>{formattedDate}</time>
              <span>•</span>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
                data.isArchived 
                  ? "bg-amber-100 text-amber-800 border border-amber-200 print:border-slate-400 print:text-black" 
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200 print:border-slate-400 print:text-black"
              )}>
                {data.isArchived ? t("overview.archivedReport") : t("overview.activeSession")}
              </span>
            </div>
          </div>

          {/* Classification Distinction Badges & Print / Export Action */}
          <div className="flex flex-col sm:items-end gap-2 self-start print:mt-1">
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-sky-50 border border-sky-200 text-sky-700 rounded text-[10px] font-mono font-semibold uppercase tracking-wider print:bg-white print:border-slate-400 print:text-black">
                {t("badges.browserDetected")}
              </span>
              <span className="px-2 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded text-[10px] font-mono font-semibold uppercase tracking-wider print:bg-white print:border-slate-400 print:text-black">
                {t("badges.userProvided")}
              </span>
              <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[10px] font-mono font-semibold uppercase tracking-wider print:bg-white print:border-slate-400 print:text-black">
                {t("badges.userObserved")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="print:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t("exportCertificate")}</span>
            </button>
          </div>
        </div>

        {/* Factual Integrity Banner: No Synthetic Score */}
        <div className="mt-4 px-3.5 py-2 bg-slate-100/80 border border-slate-200/80 rounded-lg text-[11px] text-slate-600 font-mono flex items-center justify-between print:border-slate-300 print:text-black">
          <span>{t("integrityBanner")}</span>
          <span className="text-[10px] text-slate-400 print:hidden">{t("clientStorageBadge")}</span>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: Inspection Overview
          ========================================================================= */}
      <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">{t("sections.overview")}</h2>
          </div>
          {data.overview.durationString && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 print:border-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t("overview.inspectionDuration")}: <strong>{data.overview.durationString}</strong></span>
            </div>
          )}
        </div>

        {/* Overall Visual Check Verdict Banner */}
        {data.overallVerdict && (
          <div className={cn(
            "mb-6 p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 shadow-2xs break-inside-avoid",
            data.overallVerdict.status === "NO_ISSUES" && "bg-emerald-50/90 border-emerald-300 text-emerald-950",
            data.overallVerdict.status === "POSSIBLE_PIXEL_ISSUE" && "bg-red-50/90 border-red-300 text-red-950",
            data.overallVerdict.status === "NEEDS_ATTENTION" && "bg-red-50/90 border-red-300 text-red-950",
            data.overallVerdict.status === "MULTIPLE_AREAS_NEED_ATTENTION" && "bg-red-50/90 border-red-300 text-red-950",
            data.overallVerdict.status === "UNSURE" && "bg-amber-50/90 border-amber-300 text-amber-950"
          )}>
            {data.overallVerdict.status === "NO_ISSUES" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
            {(data.overallVerdict.status === "POSSIBLE_PIXEL_ISSUE" || data.overallVerdict.status === "MULTIPLE_AREAS_NEED_ATTENTION") && (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            {data.overallVerdict.status === "NEEDS_ATTENTION" && <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
            {data.overallVerdict.status === "UNSURE" && <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}

            <div className="flex-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-75">
                Overall Visual Inspection Result
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight font-mono mt-0.5">
                {data.overallVerdict.headline}
              </h2>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                {data.overallVerdict.description}
              </p>
            </div>
          </div>
        )}

        {/* Dedicated Dead / Stuck Pixel Inspection Card */}
        {(() => {
          const deadPixelResult = data.testResults.find(
            (t) => t.testId === "dead-pixel-test" || t.testId === "solid-color-test"
          );
          const hasPixelDefects = data.pixelDefects && data.pixelDefects.length > 0;
          const isPixelIssueReported = 
            deadPixelResult?.observation === "NEEDS_ATTENTION" || 
            hasPixelDefects || 
            data.overallVerdict?.status === "POSSIBLE_PIXEL_ISSUE";
          const isPixelCleanReported = 
            deadPixelResult?.observation === "LOOKS_NORMAL" && !hasPixelDefects && !isPixelIssueReported;

          if (isPixelIssueReported) {
            return (
              <div className="mb-6 p-5 sm:p-6 rounded-2xl border-2 border-red-500/80 bg-red-50/80 text-red-950 shadow-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-red-200/80 text-red-900 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                            PIXEL INSPECTION
                          </span>
                          <span className="text-xs font-mono text-red-700 font-bold uppercase">
                            STATUS: NEEDS FURTHER INSPECTION
                          </span>
                        </div>
                        <h3 className="text-lg font-bold tracking-tight text-red-950 mt-1">
                          ⚠ POSSIBLE DEAD/STUCK PIXEL
                        </h3>
                        <p className="text-xs sm:text-sm text-red-900 mt-1 leading-relaxed">
                          A possible pixel issue was reported during the visual inspection. Inspect the indicated area again using the individual color tests.
                        </p>
                      </div>

                      <div className="bg-white/95 p-3.5 rounded-xl border border-red-200 text-xs text-slate-800 space-y-2 font-mono">
                        {deadPixelResult?.notes && (
                          <div className="text-[11px]">
                            <span className="text-slate-500">Observed during: </span>
                            <strong className="text-red-700 font-bold">{deadPixelResult.notes}</strong>
                          </div>
                        )}

                        {data.pixelDefects.length > 0 && (
                          <div className="space-y-1 pt-1 border-t border-red-100">
                            <span className="text-[11px] font-bold text-slate-700 uppercase block">
                              User-Reported Pixel Locations ({data.pixelDefects.length}):
                            </span>
                            <ul className="space-y-1 text-[11px] text-slate-700">
                              {data.pixelDefects.map((defect, idx) => (
                                <li key={defect.id} className="flex flex-wrap items-center gap-2">
                                  <span className="text-red-600 font-bold">#{idx + 1}</span>
                                  <span>Location: approximately {defect.xPercent}% from left, {defect.yPercent}% from top</span>
                                  {defect.colorAtMark && (
                                    <span className="text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 text-[10px]">
                                      Observed during: {defect.colorAtMark} test
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-2 border-t border-red-100 text-[11px] text-slate-600 leading-relaxed font-sans">
                          <span className="font-semibold text-slate-800">Dead vs Stuck Differentiation:</span> A pixel that remains black may be a possible <em>dead pixel</em>. A pixel that remains a fixed color during different test colors may be a possible <em>stuck pixel</em>. Browser software cannot directly access physical display subpixels; careful visual inspection confirms the finding.
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/tests/dead-pixel-test"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-xs self-start sm:self-center"
                    title="Inspect Pixel Again"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Inspect Pixel Again</span>
                  </Link>
                </div>
              </div>
            );
          }

          if (isPixelCleanReported) {
            return (
              <div className="mb-6 p-4 rounded-xl border border-emerald-300 bg-emerald-50/80 text-emerald-950 flex items-center justify-between gap-3 break-inside-avoid">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                      ✓ PIXEL INSPECTION
                    </h3>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      No pixel issues were reported during the visual inspection across solid-color test fields.
                    </p>
                  </div>
                </div>
                <Link
                  href="/tests/dead-pixel-test"
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline shrink-0"
                >
                  Re-test Pixels
                </Link>
              </div>
            );
          }

          return null;
        })()}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold">{t("overview.testsCount")}</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">{data.overview.totalTests}</span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold">{t("overview.completedCount")}</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">{data.overview.completedCount}</span>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/70 print:bg-white print:border-slate-300">
            <span className="text-[10px] font-mono uppercase text-emerald-700 block font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{t("statusBuckets.normalObservations")}</span>
            </span>
            <span className="text-xl font-bold font-mono text-emerald-900 mt-0.5 block">{data.overview.statusCounts.normal}</span>
          </div>

          <div className="bg-red-50/50 p-3 rounded-xl border border-red-200/70 print:bg-white print:border-slate-300">
            <span className="text-[10px] font-mono uppercase text-red-700 block font-semibold flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              <span>{t("statusBuckets.attentionNeeded")}</span>
            </span>
            <span className="text-xl font-bold font-mono text-red-900 mt-0.5 block">{data.overview.statusCounts.attention}</span>
          </div>

          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/70 print:bg-white print:border-slate-300">
            <span className="text-[10px] font-mono uppercase text-amber-700 block font-semibold flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>{t("statusBuckets.unsureObservations")}</span>
            </span>
            <span className="text-xl font-bold font-mono text-amber-900 mt-0.5 block">{data.overview.statusCounts.unsure}</span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold flex items-center gap-1">
              <MinusCircle className="w-3 h-3" />
              <span>{t("statusBuckets.notTested")}</span>
            </span>
            <span className="text-xl font-bold font-mono text-slate-700 mt-0.5 block">{data.overview.statusCounts.notTested}</span>
          </div>
        </div>

        {/* Secondary Overview Stats */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 print:border-slate-200">
          <span>{t("overview.observationsCount")}: <strong>{data.overview.withObservationsCount}</strong></span>
          <span>•</span>
          <span>{t("overview.notesCount")}: <strong>{data.overview.withNotesCount}</strong></span>
          <span>•</span>
          <span>{t("overview.defectsCount")}: <strong className={data.overview.pixelDefectsCount > 0 ? "text-amber-600 font-bold" : ""}>{data.overview.pixelDefectsCount}</strong></span>
          <span className="ml-auto text-[10px] text-slate-400 italic print:text-slate-600">{t("overview.noScoreNote")}</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Display Information (BROWSER-DETECTED)
          ========================================================================= */}
      <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">{t("sections.displayInfo")}</h2>
          </div>
          <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-700 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
            {t("badges.browserDetected")}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-mono mb-4 print:mb-2">
          {t("browserDetectedNote")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("displayInfo.resolution")}</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              {data.displayInfo.screenResolution}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {t("displayInfo.logical", { val: data.displayInfo.logicalResolution })}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("displayInfo.viewport")}</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              {data.displayInfo.viewport}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">{t("displayInfo.viewportDesc")}</span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("displayInfo.dpr")}</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              {data.displayInfo.devicePixelRatio}x
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">{t("displayInfo.dprDesc")}</span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("displayInfo.colorDepth")}</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              {data.displayInfo.colorDepth}-bit
            </span>
            <span className="text-[10px] text-slate-400 font-mono block capitalize">{data.displayInfo.orientation}</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: User-Provided Display Information (USER-PROVIDED)
          ========================================================================= */}
      <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-purple-600" />
            <h2 className="text-base font-bold text-slate-900">{t("sections.userProfile")}</h2>
          </div>
          <span className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
            {t("badges.userProvided")}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-mono mb-4 print:mb-2">
          {t("userProvidedNote")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.brandModel")}</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">
              {data.userProfile.brand || data.userProfile.model 
                ? `${data.userProfile.brand} ${data.userProfile.model}`.trim() 
                : <em className="text-slate-400 font-normal">{t("profile.unspecified")}</em>}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.specs")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.size || "—"} {data.userProfile.panelType ? `(${data.userProfile.panelType})` : ""}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.resRefresh")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.resolution || "—"} {data.userProfile.refreshRate ? `@ ${data.userProfile.refreshRate}` : ""}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.ratedBrightness")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.ratedBrightness || "—"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.ratedContrast")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.ratedContrast || "—"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.displayType")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.displayType || "Standard Monitor"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.hdrSupport")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.hdrSupport || "—"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.vrrSupport")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.vrrSupport || "—"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.serialNumber")}</span>
            <span className="font-semibold text-slate-900 text-xs font-mono mt-0.5 block">
              {data.userProfile.serialNumber || "—"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.purchaseDate")}</span>
            <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
              {data.userProfile.purchaseDate || "—"}
            </span>
          </div>

          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 print:bg-white print:border-slate-300 sm:col-span-2">
            <span className="text-slate-500 block text-[10px] font-mono uppercase">{t("profile.notes")}</span>
            <span className="text-slate-700 text-xs mt-0.5 block truncate" title={data.userProfile.notes}>
              {data.userProfile.notes || "—"}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3B: Model-Specific Recommended Checks (RECOMMENDATION ONLY)
          ========================================================================= */}
      {data.recommendedChecks && data.recommendedChecks.length > 0 && (
        <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid bg-slate-50/40">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">{t("sections.recommendedChecks")}</h2>
            </div>
            <span className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
              {t("badges.relevantChecks")}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mb-4 print:mb-2">
            {t("recommendedChecksNote")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {data.recommendedChecks.map((check) => (
              <div 
                key={check.id}
                className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between gap-2 print:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-slate-900 text-xs font-semibold">{check.title}</strong>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase shrink-0",
                      check.category === "panel" && "bg-blue-50 text-blue-700 border border-blue-200",
                      check.category === "usage" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                      check.category === "general" && "bg-slate-100 text-slate-700 border border-slate-200"
                    )}>
                      {check.category === "panel" ? "Panel Target" : check.category === "usage" ? "Usage Target" : "Standard"}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {check.reason}
                  </p>
                </div>
                {check.relevantTestId && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Target test pattern:</span>
                    <span className="text-blue-600 font-medium capitalize">
                      {check.relevantTestId.replace("-test", "").replace(/-/g, " ")}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4: Test Results (All Tests, Status, Observation, Notes)
          ========================================================================= */}
      <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">{t("sections.testResults")}</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {data.testResults.length} tests recorded
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden print:border-slate-300">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono text-slate-600 font-semibold uppercase print:bg-slate-100">
              <tr>
                <th className="py-2.5 px-4">Test Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Observation</th>
                <th className="py-2.5 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {data.testResults.map((item) => (
                <tr key={item.testId} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 uppercase">
                    {item.category}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider",
                      item.status === "Completed" && "bg-slate-100 text-slate-800",
                      item.status === "Skipped" && "bg-slate-50 text-slate-500 italic",
                      item.status === "Not available" && "bg-slate-50 text-slate-400"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium",
                      item.observation === "LOOKS_NORMAL" && "text-emerald-700 bg-emerald-50 print:bg-white print:text-black",
                      item.observation === "NEEDS_ATTENTION" && "text-red-700 bg-red-50 font-semibold print:bg-white print:text-black",
                      item.observation === "UNSURE" && "text-amber-700 bg-amber-50 print:bg-white print:text-black",
                      item.observation === "NOT_TESTED" && "text-slate-400 font-mono text-[10px]"
                    )}>
                      {item.observation === "LOOKS_NORMAL" && <CheckCircle2 className="w-3 h-3" />}
                      {item.observation === "NEEDS_ATTENTION" && <XCircle className="w-3 h-3" />}
                      {item.observation === "UNSURE" && <HelpCircle className="w-3 h-3" />}
                      {item.observation === "NOT_TESTED" && <MinusCircle className="w-3 h-3" />}
                      <span>
                        {item.observation === "LOOKS_NORMAL" ? t("observationLabels.looksNormal") :
                         item.observation === "NEEDS_ATTENTION" ? t("observationLabels.needsAttention") :
                         item.observation === "UNSURE" ? t("observationLabels.unsure") :
                         t("observationLabels.notTested")}
                      </span>
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 italic text-[11px] max-w-xs">
                    {item.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Browser-Detected Results (Objective browser detection)
          ========================================================================= */}
      <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">{t("sections.browserDetected")}</h2>
          </div>
          <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-700 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
            {t("badges.browserDetected")}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-mono mb-4 print:mb-2">
          {t("browserDetectedLabels.sectionDesc")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {data.browserDetectedResults.map((item, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 flex items-start justify-between gap-3 print:bg-white print:border-slate-300"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">
                  {item.title}
                </span>
                <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
                  {item.value}
                </span>
              </div>
              <span className="px-1.5 py-0.5 bg-sky-100/60 text-sky-800 rounded text-[9px] font-mono uppercase font-bold shrink-0 print:border print:border-slate-300 print:text-black">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: Visual Observations (USER OBSERVATIONS)
          ========================================================================= */}
      <section className="p-6 sm:p-8 border-b border-slate-100 print:py-4 break-inside-avoid">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">{t("sections.visualObservations")}</h2>
          </div>
          <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
            {t("badges.userObserved")}
          </span>
        </div>

        {data.visualObservations.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-3">
            No visual observations recorded yet. Run tests to record visual observations.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {data.visualObservations.map((obs) => (
              <div 
                key={obs.testId}
                className={cn(
                  "p-3.5 rounded-xl border text-xs flex flex-col justify-between gap-2",
                  obs.observation === "LOOKS_NORMAL" && "bg-emerald-50/40 border-emerald-200/70 print:bg-white print:border-slate-300",
                  obs.observation === "NEEDS_ATTENTION" && "bg-red-50/40 border-red-200/70 print:bg-white print:border-slate-300",
                  obs.observation === "UNSURE" && "bg-amber-50/40 border-amber-200/70 print:bg-white print:border-slate-300",
                  obs.observation === "NOT_TESTED" && "bg-slate-50 border-slate-200 print:bg-white print:border-slate-300"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 block">{obs.testName}</span>
                    <span className="text-[10px] font-mono uppercase text-slate-500">{obs.category}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0",
                    obs.observation === "LOOKS_NORMAL" && "bg-emerald-100 text-emerald-800",
                    obs.observation === "NEEDS_ATTENTION" && "bg-red-100 text-red-800",
                    obs.observation === "UNSURE" && "bg-amber-100 text-amber-800"
                  )}>
                    {obs.observation === "LOOKS_NORMAL" ? t("observationLabels.looksNormal") :
                     obs.observation === "NEEDS_ATTENTION" ? t("observationLabels.needsAttention") :
                     obs.observation === "UNSURE" ? t("observationLabels.unsure") :
                     t("observationLabels.notTested")}
                  </span>
                </div>

                {obs.notes && (
                  <p className="text-slate-600 italic text-[11px] border-t border-slate-200/60 pt-1.5 mt-1">
                    &ldquo;{obs.notes}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 7: Pixel Defects (User-Marked Observations)
          ========================================================================= */}
      {data.pixelDefects.length > 0 && (
        <section className="p-6 sm:p-8 border-b border-slate-100 bg-amber-50/20 print:bg-transparent print:py-4 break-inside-avoid">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">
                {t("sections.pixelDefects")} ({data.pixelDefects.length})
              </h2>
            </div>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
              {t("defects.badge")}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mb-4 print:mb-2">
            {t("pixelDefectsNote")}
          </p>

          <div className="border border-amber-200/80 rounded-xl overflow-hidden bg-white print:border-slate-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/60 border-b border-amber-200/80 text-[10px] font-mono text-amber-950 font-semibold uppercase print:bg-slate-100">
                <tr>
                  <th className="py-2.5 px-4">{t("defects.colIndex")}</th>
                  <th className="py-2.5 px-4">{t("defects.colClass")}</th>
                  <th className="py-2.5 px-4">{t("defects.colCoords")}</th>
                  <th className="py-2.5 px-4">{t("defects.colPosition")}</th>
                  <th className="py-2.5 px-4">{t("defects.colPattern")}</th>
                  <th className="py-2.5 px-4">{t("defects.colNote")}</th>
                  {onDeletePixelMarker && !data.isArchived && (
                    <th className="py-2.5 px-4 text-right print:hidden">{t("defects.colAction")}</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.pixelDefects.map((defect, idx) => (
                  <tr key={defect.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">#{idx + 1}</td>
                    <td className="py-2.5 px-4 font-medium capitalize">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase",
                        defect.type === "dead" && "bg-red-100 text-red-800",
                        defect.type === "stuck" && "bg-emerald-100 text-emerald-800",
                        defect.type === "bright" && "bg-amber-100 text-amber-800",
                        defect.type === "unknown" && "bg-slate-100 text-slate-800"
                      )}>
                        {defect.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-700">
                      {defect.x}px, {defect.y}px
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-600">
                      {defect.xPercent}%, {defect.yPercent}%
                    </td>
                    <td className="py-2.5 px-4 text-slate-700 capitalize">
                      {defect.testId.replace("-test", "").replace(/-/g, " ")}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 italic">
                      {defect.notes || "—"}
                    </td>
                    {onDeletePixelMarker && !data.isArchived && (
                      <td className="py-2.5 px-4 text-right print:hidden">
                        <button
                          type="button"
                          onClick={() => onDeletePixelMarker(defect.testId, defect.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title={t("defects.deleteTitle")}
                        >
                          ✕
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 7B: Troubleshooting References (Deterministic mapping from Needs Attention)
          ========================================================================= */}
      {data.troubleshootingReferences && data.troubleshootingReferences.length > 0 && (
        <section className="p-6 sm:p-8 border-b border-slate-100 bg-red-50/20 print:bg-transparent print:py-4 break-inside-avoid">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-red-600" />
              <h2 className="text-base font-bold text-slate-900">
                {t("sections.troubleshooting")} ({data.troubleshootingReferences.length})
              </h2>
            </div>
            <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-[10px] font-mono font-bold uppercase print:border-slate-400 print:text-black">
              {t("badges.observedIssueGuides")}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mb-4 print:mb-2">
            {t("troubleshootingNote")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {data.troubleshootingReferences.map((ref) => (
              <div
                key={ref.symptomId}
                className="p-4 bg-white rounded-xl border border-red-200/80 shadow-2xs flex flex-col justify-between gap-3 print:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      Issue Observed in {ref.triggerTestName}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{ref.title}</h3>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                    {ref.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 print:hidden">
                  <a
                    href={`/knowledge-base/troubleshooting#${ref.symptomId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <span>{t("viewTroubleshootingAction")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 8: Inspection Notes (Preserves line breaks, no truncation)
          ========================================================================= */}
      <section className="p-6 sm:p-8 print:py-4 break-inside-avoid">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">{t("sections.notes")}</h2>
        </div>
        {data.generalNotes ? (
          <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans print:bg-white print:border-slate-300">
            {data.generalNotes}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            No overall notes recorded for this inspection session.
          </p>
        )}
      </section>

      {/* =========================================================================
          REPORT FOOTER: Client-side disclaimer for print/PDF
          ========================================================================= */}
      <footer className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 text-center text-[10px] font-mono text-slate-500 print:bg-white print:border-t-2 print:border-slate-800 print:text-black">
        {t("print.disclaimer")}
      </footer>
    </article>
  );
}
