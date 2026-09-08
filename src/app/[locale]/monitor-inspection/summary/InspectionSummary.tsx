"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  RefreshCw,
  Trash2,
  Printer,
  Monitor,
  Edit3,
  Save,
  History,
  ArrowRight,
  X,
  Download,
  Upload,
  Info,
  RotateCcw
} from "lucide-react";
import {
  getActiveInspectionSession,
  saveActiveInspectionSession,
  clearActiveInspectionSession,
  getSavedMonitorProfile,
  saveMonitorProfile,
  archiveCurrentInspection,
  getInspectionHistory,
  deleteInspectionHistoryRecord,
  removePixelDefectMarker,
  updateGeneralNotes,
  getCurrentBrowserDisplaySnapshot,
  exportInspectionReportJson,
  importInspectionReportJson,
  ActiveInspectionSession,
  MonitorProfile,
  CompletedInspection,
  BrowserDisplaySnapshot,
  DEFAULT_MONITOR_PROFILE
} from "@/lib/inspectionStorage";
import { 
  getWebGLDiagnostics, 
  supportsHDR, 
  supportsP3 
} from "@/lib/browserCapabilities";
import { buildInspectionReportData } from "@/components/inspection-report/buildReportData";
import { InspectionReport } from "@/components/inspection-report/InspectionReport";
import { cn } from "@/lib/utils";

export function InspectionSummary() {
  const t = useTranslations("InspectionSummary");
  const router = useRouter();

  const [session, setSession] = useState<ActiveInspectionSession | null>(null);
  const [displayInfo, setDisplayInfo] = useState<BrowserDisplaySnapshot | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState<MonitorProfile>(DEFAULT_MONITOR_PROFILE);
  const [historyList, setHistoryList] = useState<CompletedInspection[]>([]);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState<CompletedInspection | null>(null);
  const [generalNotes, setGeneralNotes] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Browser telemetry capabilities
  const [browserCapabilities, setBrowserCapabilities] = useState<{
    webglInfo?: { renderer: string; vendor: string };
    p3Supported?: boolean;
    hdrSupported?: boolean;
  }>({});

  // Load session, profile, history, and browser telemetry on mount
  useEffect(() => {
    queueMicrotask(() => {
      const activeSession = getActiveInspectionSession();
      const savedProfile = getSavedMonitorProfile();
      const history = getInspectionHistory();
      const snapshot = getCurrentBrowserDisplaySnapshot();

      if (activeSession) {
        setSession(activeSession);
        setGeneralNotes(activeSession.generalNotes || "");
        setDisplayInfo(activeSession.displaySnapshot || snapshot);
      } else {
        setDisplayInfo(snapshot);
      }
      setProfileDraft(savedProfile);
      setHistoryList(history);

      // Detect hardware / browser capabilities
      try {
        const webgl = getWebGLDiagnostics();
        const p3 = supportsP3();
        const hdr = supportsHDR();
        setBrowserCapabilities({
          webglInfo: webgl ? { renderer: webgl.renderer, vendor: webgl.vendor } : undefined,
          p3Supported: p3,
          hdrSupported: hdr
        });
      } catch {}

      setIsLoaded(true);
    });
  }, []);

  const handleSaveProfile = () => {
    saveMonitorProfile(profileDraft);
    setIsEditingProfile(false);
    if (session) {
      const updatedSession = { ...session, monitorProfile: profileDraft };
      setSession(updatedSession);
      saveActiveInspectionSession(updatedSession);
    }
  };

  const handleGeneralNotesChange = (text: string) => {
    setGeneralNotes(text);
    updateGeneralNotes(text);
    if (session) {
      setSession({ ...session, generalNotes: text });
    }
  };

  const handleSaveToHistory = () => {
    const record = archiveCurrentInspection();
    if (record) {
      setHistoryList(getInspectionHistory());
      setStatusMessage({ text: t("toasts.archived"), type: "success" });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleDeleteHistory = (id: string) => {
    deleteInspectionHistoryRecord(id);
    setHistoryList(getInspectionHistory());
    if (viewingHistoryRecord?.id === id) {
      setViewingHistoryRecord(null);
    }
  };

  const handleClearActive = () => {
    if (confirm(t("confirmClear"))) {
      clearActiveInspectionSession();
      setSession(null);
      setGeneralNotes("");
    }
  };

  const handleStartNewInspection = () => {
    if (session && ((session.queue && session.queue.length > 0) || (session.observations && Object.keys(session.observations).length > 0))) {
      if (!confirm(t("confirmStartNew"))) {
        return;
      }
    }
    clearActiveInspectionSession();
    setSession(null);
    setGeneralNotes("");
    router.push("/monitor-inspection");
  };

  const handleDeletePixelMarker = (testId: string, markerId: string) => {
    removePixelDefectMarker(testId, markerId);
    const updated = getActiveInspectionSession();
    if (updated) setSession(updated);
  };

  const handleExportJson = (target?: CompletedInspection | ActiveInspectionSession) => {
    const dataSource = target || session;
    if (!dataSource) {
      setStatusMessage({ text: t("toasts.noSession"), type: "error" });
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    const jsonStr = exportInspectionReportJson(dataSource);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateSlug = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `display-inspection-report-${dateSlug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage({ text: t("toasts.exported"), type: "success" });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const importedRecord = importInspectionReportJson(content);
      if (importedRecord) {
        setHistoryList(getInspectionHistory());
        setViewingHistoryRecord(importedRecord);
        setStatusMessage({ text: t("toasts.imported"), type: "success" });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ text: t("toasts.importInvalid"), type: "error" });
        setTimeout(() => setStatusMessage(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Build report data for either viewing an archive record or active session
  const activeReportData = useMemo(() => {
    if (!session) return null;
    return buildInspectionReportData(session, {
      currentSnapshot: displayInfo,
      ...browserCapabilities
    });
  }, [session, displayInfo, browserCapabilities]);

  const archiveReportData = useMemo(() => {
    if (!viewingHistoryRecord) return null;
    return buildInspectionReportData(viewingHistoryRecord, {
      currentSnapshot: viewingHistoryRecord.displaySnapshot || displayInfo,
      ...browserCapabilities
    });
  }, [viewingHistoryRecord, displayInfo, browserCapabilities]);

  const currentDisplayReport = viewingHistoryRecord ? archiveReportData : activeReportData;

  if (!isLoaded) return null;

  const isEmpty = !viewingHistoryRecord && (!session || (
    (!session.queue || session.queue.length === 0) &&
    (!session.observations || Object.keys(session.observations).length === 0)
  ));

  return (
    <div className="space-y-8 font-sans pb-16">

      {/* Hidden JSON File Input for Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJson}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Notification Toast */}
      {statusMessage && (
        <div className={cn(
          "px-4 py-3 rounded-xl text-xs font-medium flex items-center justify-between animate-in fade-in duration-150 print:hidden",
          statusMessage.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-900" : "bg-red-50 border border-red-200 text-red-900"
        )}>
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Viewing Archive Context Banner */}
      {viewingHistoryRecord && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 print:hidden shadow-xs">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {t("viewContext.viewingArchiveNotice", { id: viewingHistoryRecord.id })}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setViewingHistoryRecord(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-medium hover:bg-amber-100/60 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t("viewContext.returnToActive")}</span>
          </button>
        </div>
      )}

      {/* Top Action Toolbar (when report data is present) */}
      {!isEmpty && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            {!viewingHistoryRecord && (
              <>
                <button
                  type="button"
                  onClick={handleSaveToHistory}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
                  title={t("tooltipSaveHistory")}
                >
                  <Save className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t("saveToHistory")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-600" />
                  <span>{isEditingProfile ? t("profile.cancel") : t("profile.edit")}</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => handleExportJson(viewingHistoryRecord || session || undefined)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
              title={t("tooltipExportJson")}
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t("exportJson")}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
              title={t("tooltipImportJson")}
            >
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t("importJson")}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-black shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t("printPdf")}</span>
          </button>
        </div>
      )}

      {/* Monitor Profile Editor Drawer (Active Session only) */}
      {!viewingHistoryRecord && isEditingProfile && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 print:hidden shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-600" />
              <span>{t("profile.title")}</span>
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-mono uppercase font-semibold">
                {t("badges.userProvided")}
              </span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              {t("userProvidedNote")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.brand")}</label>
              <input
                type="text"
                value={profileDraft.brand}
                onChange={(e) => setProfileDraft({ ...profileDraft, brand: e.target.value })}
                placeholder="e.g., Dell, LG, ASUS"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.model")}</label>
              <input
                type="text"
                value={profileDraft.model}
                onChange={(e) => setProfileDraft({ ...profileDraft, model: e.target.value })}
                placeholder="e.g., UltraSharp U2723QE"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.size")}</label>
              <input
                type="text"
                value={profileDraft.size}
                onChange={(e) => setProfileDraft({ ...profileDraft, size: e.target.value })}
                placeholder="e.g., 27 inches"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.resolution")}</label>
              <input
                type="text"
                value={profileDraft.resolution}
                onChange={(e) => setProfileDraft({ ...profileDraft, resolution: e.target.value })}
                placeholder="e.g., 3840x2160 or 2560x1440"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.refreshRate")}</label>
              <input
                type="text"
                value={profileDraft.refreshRate}
                onChange={(e) => setProfileDraft({ ...profileDraft, refreshRate: e.target.value })}
                placeholder="e.g., 60Hz, 144Hz, 240Hz"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.panelType")}</label>
              <select
                value={profileDraft.panelType}
                onChange={(e) => setProfileDraft({ ...profileDraft, panelType: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              >
                <option value="">{t("profile.selectPanel")}</option>
                <option value="IPS">IPS</option>
                <option value="OLED">OLED (WOLED / QD-OLED)</option>
                <option value="VA">VA</option>
                <option value="TN">TN</option>
                <option value="Mini-LED">Mini-LED</option>
                <option value="Other">{t("profile.panelOther")}</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.ratedBrightness")}</label>
              <input
                type="text"
                value={profileDraft.ratedBrightness || ""}
                onChange={(e) => setProfileDraft({ ...profileDraft, ratedBrightness: e.target.value })}
                placeholder="e.g., 400 cd/m²"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.ratedContrast")}</label>
              <input
                type="text"
                value={profileDraft.ratedContrast || ""}
                onChange={(e) => setProfileDraft({ ...profileDraft, ratedContrast: e.target.value })}
                placeholder="e.g., 1000:1 or 1,000,000:1"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.serialNumber")}</label>
              <input
                type="text"
                value={profileDraft.serialNumber || ""}
                onChange={(e) => setProfileDraft({ ...profileDraft, serialNumber: e.target.value })}
                placeholder="e.g., CN-0G1234..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">{t("profile.purchaseDate")}</label>
              <input
                type="date"
                value={profileDraft.purchaseDate}
                onChange={(e) => setProfileDraft({ ...profileDraft, purchaseDate: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">{t("profile.notes")}</label>
              <input
                type="text"
                value={profileDraft.notes}
                onChange={(e) => setProfileDraft({ ...profileDraft, notes: e.target.value })}
                placeholder="e.g., DisplayPort 1.4, calibrated with sRGB preset"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white"
            >
              {t("profile.cancel")}
            </button>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
            >
              {t("profile.save")}
            </button>
          </div>
        </div>
      )}

      {/* Main Report Render OR Empty State */}
      {isEmpty ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Monitor className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            {t("empty.title")}
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto mb-6 leading-relaxed">
            {t("empty.description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/monitor-inspection"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
            >
              <span>{t("empty.cta")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>{t("empty.runTests")}</span>
            </Link>
            <Link
              href="/tests/display-info"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>{t("empty.viewDisplayInfo")}</span>
            </Link>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t("importJson")}</span>
            </button>
          </div>
        </div>
      ) : currentDisplayReport ? (
        <InspectionReport 
          data={currentDisplayReport}
          onDeletePixelMarker={!viewingHistoryRecord ? handleDeletePixelMarker : undefined}
        />
      ) : null}

      {/* Active Session Notes Editor (when viewing active session) */}
      {!viewingHistoryRecord && !isEmpty && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 print:hidden shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-bold text-slate-900">{t("notes.title")}</h3>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            {t("notes.desc")}
          </p>
          <textarea
            value={generalNotes}
            onChange={(e) => handleGeneralNotesChange(e.target.value)}
            rows={3}
            placeholder={t("notes.placeholder")}
            className="w-full p-3 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>
      )}

      {/* Bottom Global Actions (Active Session only) */}
      {!viewingHistoryRecord && !isEmpty && (
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleStartNewInspection}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-black transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t("actions.startNew")}</span>
            </button>

            <button
              type="button"
              onClick={handleClearActive}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t("actions.clearObservations")}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => handleExportJson()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t("actions.exportJson")}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-black transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t("actions.printPdf")}</span>
            </button>
          </div>
        </div>
      )}

      {/* Local Inspection History Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 print:hidden shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">{t("history.title")}</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {t("history.count", { count: historyList.length })}
          </span>
        </div>

        {historyList.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-500">{t("history.emptyTitle")}</p>
            <p className="text-[11px] text-slate-400 mt-1">{t("history.emptyDesc")}</p>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
            {historyList.map((record) => {
              const isSelected = viewingHistoryRecord?.id === record.id;
              return (
                <div 
                  key={record.id} 
                  className={cn(
                    "p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors",
                    isSelected && "bg-amber-50/50"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">
                        {record.monitorProfile?.brand || record.monitorProfile?.model
                          ? `${record.monitorProfile.brand} ${record.monitorProfile.model}`.trim()
                          : record.workflowTitle}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-mono font-bold uppercase">
                          Viewing
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-mono">
                      <span>{t("history.testsCount", { count: record.completedCount })}</span>
                      <span>•</span>
                      <span className="text-emerald-600">{record.passCount} {t("metrics.observed")}</span>
                      <span>•</span>
                      <span className="text-red-600">{record.issueCount} {t("metrics.needsAttention")}</span>
                      {record.pixelDefects?.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-amber-600 font-bold">{t("history.flawsCount", { count: record.pixelDefects.length })}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleExportJson(record)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded-lg hover:bg-emerald-50"
                      title={t("history.exportTitle")}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewingHistoryRecord(isSelected ? null : record)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                        isSelected 
                          ? "bg-amber-100 border-amber-300 text-amber-900" 
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {isSelected ? t("viewContext.returnToActive") : t("history.viewDetails")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteHistory(record.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      title={t("history.deleteTitle")}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
