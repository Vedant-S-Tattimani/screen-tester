"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "@/i18n/routing";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  MinusCircle, 
  RefreshCw, 
  Trash2, 
  Printer, 
  Monitor, 
  Edit3, 
  Save, 
  History, 
  ArrowRight, 
  AlertTriangle, 
  X,
  Download,
  Upload,
  Info
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
  PixelDefectMarker, 
  PixelDefectType,
  BrowserDisplaySnapshot,
  DEFAULT_MONITOR_PROFILE 
} from "@/lib/inspectionStorage";
import { monitorTests } from "@/data/tests";
import { cn } from "@/lib/utils";

export function InspectionSummary() {
  const [session, setSession] = useState<ActiveInspectionSession | null>(null);
  const [profile, setProfile] = useState<MonitorProfile>(DEFAULT_MONITOR_PROFILE);
  const [displayInfo, setDisplayInfo] = useState<BrowserDisplaySnapshot | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState<MonitorProfile>(DEFAULT_MONITOR_PROFILE);
  const [historyList, setHistoryList] = useState<CompletedInspection[]>([]);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState<CompletedInspection | null>(null);
  const [generalNotes, setGeneralNotes] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load session, profile, and history on mount
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
      setProfile(savedProfile);
      setProfileDraft(savedProfile);
      setHistoryList(history);
      setIsLoaded(true);
    });
  }, []);

  const handleSaveProfile = () => {
    saveMonitorProfile(profileDraft);
    setProfile(profileDraft);
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
      setStatusMessage({ text: "Report archived to local history.", type: "success" });
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
    if (confirm("Are you sure you want to clear current active inspection observations?")) {
      clearActiveInspectionSession();
      setSession(null);
      setGeneralNotes("");
    }
  };

  const handleDeletePixelMarker = (testId: string, markerId: string) => {
    removePixelDefectMarker(testId, markerId);
    const updated = getActiveInspectionSession();
    if (updated) setSession(updated);
  };

  const handleExportJson = (target?: CompletedInspection | ActiveInspectionSession) => {
    const dataSource = target || session;
    if (!dataSource) {
      setStatusMessage({ text: "No active inspection session to export.", type: "error" });
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    const jsonStr = exportInspectionReportJson(dataSource);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateSlug = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `monitor-test-report-${dateSlug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage({ text: "Report exported successfully as JSON.", type: "success" });
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
        setStatusMessage({ text: "Inspection report imported successfully.", type: "success" });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ text: "Invalid report JSON format.", type: "error" });
        setTimeout(() => setStatusMessage(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const formatTestTitle = (slugOrPath?: string) => {
    if (!slugOrPath || typeof slugOrPath !== "string") return "Visual Inspection";
    const slug = slugOrPath.replace(/^\//, "").replace(/^tests\//, "");
    const test = monitorTests.find(t => t.id === slug);
    if (test && typeof test.primaryIntent === "string") {
      return test.primaryIntent.replace("monitor", "").trim().replace(/^\w/, c => c.toUpperCase());
    }
    return slug.replace("-test", "").split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  };

  if (!isLoaded) return null;

  // Compute test outcomes (strictly factual, ZERO simulated score)
  const observationsMap = session?.observations || {};
  const queueList = session?.queue || [];
  
  let observedCount = 0;
  let needsAttentionCount = 0;
  let unknownCount = 0;
  const allPixelDefects: PixelDefectMarker[] = [];

  // Group queue items with their status
  const checklistItems = queueList.map(testPath => {
    const cleanId = testPath.replace(/^\//, "").replace(/^tests\//, "");
    const obs = observationsMap[cleanId];
    let status: "Observed" | "Needs attention" | "Unknown" | "Not tested" = "Not tested";

    if (obs && obs.result) {
      if (obs.result === "PASS" || (obs.result as string) === "LOOKS_NORMAL") {
        status = "Observed";
        observedCount++;
      } else if (obs.result === "ISSUE" || (obs.result as string) === "NEEDS_ATTENTION" || (obs.result as string) === "CHECK") {
        status = "Needs attention";
        needsAttentionCount++;
      } else if (obs.result === "UNSURE") {
        status = "Unknown";
        unknownCount++;
      }

      if (Array.isArray(obs.pixelDefects)) {
        obs.pixelDefects.forEach(d => {
          const rawMarker = d as PixelDefectMarker & { percentX?: number; percentY?: number };
          const normalizedType = (d.type || "dead").toLowerCase();
          const validTypes: PixelDefectType[] = ["dead", "stuck", "bright", "unknown"];
          const finalType: PixelDefectType = validTypes.includes(normalizedType as PixelDefectType)
            ? (normalizedType as PixelDefectType)
            : "unknown";

          allPixelDefects.push({
            ...d,
            testId: d.testId || cleanId,
            xPercent: d.xPercent ?? rawMarker.percentX ?? 0,
            yPercent: d.yPercent ?? rawMarker.percentY ?? 0,
            type: finalType
          });
        });
      }

    }


    return {
      testPath,
      testId: cleanId,
      status,
      notes: obs?.notes || "",
      isCompleted: !!obs?.result
    };
  });

  const totalTests = queueList.length || Object.keys(observationsMap).length;
  const completedCount = observedCount + needsAttentionCount + unknownCount;
  const notTestedCount = Math.max(0, totalTests - completedCount);

  return (
    <div className="space-y-12 font-sans pb-16">
      
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

      {/* Primary Report Container */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden print:border-none print:shadow-none break-inside-avoid">
        
        {/* Report Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 bg-slate-50/50 print:bg-transparent print:p-0 print:border-b-2 print:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 mb-1 print:text-slate-700">
                <span>MONITOR TEST REPORT</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {session?.workflowTitle || "Visual Display Inspection"}
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-1">
                Workflow Type: <span className="font-semibold text-gray-700 uppercase">{session?.workflowId || "General Checkup"}</span>
              </p>
            </div>

            {/* Print & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={handleSaveToHistory}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors"
                title="Archive report locally for future reference"
              >
                <Save className="w-3.5 h-3.5 text-blue-600" />
                <span>Save to History</span>
              </button>
              <button
                type="button"
                onClick={() => handleExportJson()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors"
                title="Export report as structured JSON"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export JSON</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors"
                title="Load a previously exported JSON report"
              >
                <Upload className="w-3.5 h-3.5 text-indigo-600" />
                <span>Import JSON</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 shadow-2xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Factual Metrics Grid (Exact Requested Vocabulary) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            <div className="bg-white p-3.5 rounded-xl border border-gray-200/90 shadow-2xs print:border print:border-slate-300">
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
                Tests Completed
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">
                {completedCount} <span className="text-xs font-normal text-gray-400">/ {totalTests}</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-gray-200/90 shadow-2xs print:border print:border-slate-300">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Observed</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">
                {observedCount}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-gray-200/90 shadow-2xs print:border print:border-slate-300">
              <div className="text-[10px] font-mono uppercase tracking-wider text-red-600 font-semibold flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                <span>Needs attention</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">
                {needsAttentionCount}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-gray-200/90 shadow-2xs print:border print:border-slate-300">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>Unknown</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">
                {unknownCount}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-gray-200/90 shadow-2xs print:border print:border-slate-300">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <MinusCircle className="w-3 h-3" />
                <span>Not tested</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">
                {notTestedCount}
              </div>
            </div>
          </div>

          {/* Factual Integrity Banner */}
          <div className="mt-4 px-3.5 py-2 bg-slate-100/70 border border-slate-200/80 rounded-lg text-[11px] text-slate-600 font-mono flex items-center justify-between print:border print:border-slate-300 print:text-black">
            <span>Factual user-observed inspection record. Zero mathematically invented or synthetic health scores.</span>
            <span className="text-[10px] text-slate-400 print:hidden">100% Client-Side Local Storage</span>
          </div>
        </div>

        {/* Section 1: Display Information (Browser-Reported) */}
        <div className="p-6 sm:p-8 border-b border-gray-100 break-inside-avoid print:py-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">Display Information (Browser-Reported)</h3>
          </div>
          <p className="text-xs text-gray-500 font-mono mb-4 print:mb-2">
            Legitimate parameters reported by browser APIs. Browser reported metrics reflect OS compositor values, not direct hardware EEPROM telemetry.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border print:border-slate-300">
              <span className="text-gray-500 block text-[10px] font-mono uppercase">Screen Resolution</span>
              <span className="font-bold text-gray-900 text-sm font-mono mt-0.5 block">
                {displayInfo?.physicalResolution || "1920 × 1080"}
              </span>
              <span className="text-[10px] text-gray-400 font-mono block">Logical: {displayInfo?.logicalResolution || "1920 × 1080"}</span>
            </div>

            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border print:border-slate-300">
              <span className="text-gray-500 block text-[10px] font-mono uppercase">Active Viewport</span>
              <span className="font-bold text-gray-900 text-sm font-mono mt-0.5 block">
                {displayInfo?.viewport || "—"}
              </span>
              <span className="text-[10px] text-gray-400 font-mono block">CSS Layout area</span>
            </div>

            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border print:border-slate-300">
              <span className="text-gray-500 block text-[10px] font-mono uppercase">Device Pixel Ratio</span>
              <span className="font-bold text-gray-900 text-sm font-mono mt-0.5 block">
                {displayInfo?.devicePixelRatio || 1}x
              </span>
              <span className="text-[10px] text-gray-400 font-mono block">OS Scaling Factor</span>
            </div>

            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/80 print:bg-white print:border print:border-slate-300">
              <span className="text-gray-500 block text-[10px] font-mono uppercase">Color & Orientation</span>
              <span className="font-bold text-gray-900 text-sm font-mono mt-0.5 block">
                {displayInfo?.colorDepth || 24}-bit
              </span>
              <span className="text-[10px] text-gray-400 font-mono block capitalize">{displayInfo?.orientation || "Landscape"}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Monitor Hardware Profile */}
        <div className="p-6 sm:p-8 border-b border-gray-100 break-inside-avoid print:py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-gray-700" />
              <h3 className="text-base font-bold text-gray-900">Monitor Hardware Profile</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 print:hidden"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>

          {/* Profile Display / Edit */}
          {isEditingProfile ? (
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 print:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Brand:</label>
                  <input
                    type="text"
                    value={profileDraft.brand}
                    onChange={(e) => setProfileDraft({ ...profileDraft, brand: e.target.value })}
                    placeholder="e.g., Dell, LG, ASUS"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Model Name / Number:</label>
                  <input
                    type="text"
                    value={profileDraft.model}
                    onChange={(e) => setProfileDraft({ ...profileDraft, model: e.target.value })}
                    placeholder="e.g., UltraSharp U2723QE"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Display Size:</label>
                  <input
                    type="text"
                    value={profileDraft.size}
                    onChange={(e) => setProfileDraft({ ...profileDraft, size: e.target.value })}
                    placeholder="e.g., 27 inches"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Native Resolution:</label>
                  <input
                    type="text"
                    value={profileDraft.resolution}
                    onChange={(e) => setProfileDraft({ ...profileDraft, resolution: e.target.value })}
                    placeholder="e.g., 3840x2160 or 2560x1440"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Refresh Rate:</label>
                  <input
                    type="text"
                    value={profileDraft.refreshRate}
                    onChange={(e) => setProfileDraft({ ...profileDraft, refreshRate: e.target.value })}
                    placeholder="e.g., 60Hz, 144Hz, 240Hz"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Panel Type:</label>
                  <select
                    value={profileDraft.panelType}
                    onChange={(e) => setProfileDraft({ ...profileDraft, panelType: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="">Select panel type...</option>
                    <option value="IPS">IPS</option>
                    <option value="OLED">OLED (WOLED / QD-OLED)</option>
                    <option value="VA">VA</option>
                    <option value="TN">TN</option>
                    <option value="Mini-LED">Mini-LED</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Purchase Date:</label>
                  <input
                    type="date"
                    value={profileDraft.purchaseDate}
                    onChange={(e) => setProfileDraft({ ...profileDraft, purchaseDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Hardware / Port Notes:</label>
                  <input
                    type="text"
                    value={profileDraft.notes}
                    onChange={(e) => setProfileDraft({ ...profileDraft, notes: e.target.value })}
                    placeholder="e.g., DisplayPort 1.4, calibrated with D65 preset"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
                >
                  Save Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block">Brand & Model</span>
                <span className="font-semibold text-gray-900">
                  {profile.brand || profile.model ? `${profile.brand} ${profile.model}`.trim() : "Unspecified Monitor"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Panel Specs</span>
                <span className="font-semibold text-gray-900">
                  {profile.size ? `${profile.size}` : "—"} {profile.panelType ? `(${profile.panelType})` : ""}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Resolution & Refresh</span>
                <span className="font-semibold text-gray-900">
                  {profile.resolution || "—"} {profile.refreshRate ? `@ ${profile.refreshRate}` : ""}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Purchase Date</span>
                <span className="font-semibold text-gray-900">
                  {profile.purchaseDate || "—"}
                </span>
              </div>
              {profile.notes && (
                <div className="col-span-2 sm:col-span-4 mt-1 pt-2 border-t border-gray-100 text-gray-600 font-mono text-[11px]">
                  Hardware Notes: {profile.notes}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Tests Completed & Observed Results */}
        <div className="p-6 sm:p-8 border-b border-gray-100 break-inside-avoid print:py-4">
          <h3 className="text-base font-bold text-gray-900 mb-4">Inspection Checklist & Observed Results</h3>
          
          {checklistItems.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500">No test observations recorded in this session yet.</p>
              <Link
                href="/monitor-inspection"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                <span>Choose an inspection workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden print:border print:border-slate-300">
              {checklistItems.map((item) => {
                const isObserved = item.status === "Observed";
                const isNeedsAttention = item.status === "Needs attention";
                const isUnknown = item.status === "Unknown";
                const isNotTested = item.status === "Not tested";

                return (
                  <div key={item.testId} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:p-2.5">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        {isObserved && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {isNeedsAttention && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                        {isUnknown && <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                        {isNotTested && <MinusCircle className="w-4 h-4 text-gray-400 shrink-0" />}
                        
                        <span className="font-semibold text-gray-900 text-sm">
                          {formatTestTitle(item.testId)}
                        </span>
                      </div>

                      {item.notes && (
                        <div className="text-gray-600 pl-6 italic text-[11px]">
                          &ldquo;{item.notes}&rdquo;
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <span className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-medium font-mono uppercase tracking-wider",
                        isObserved && "bg-emerald-50 text-emerald-700 border border-emerald-200 print:bg-white print:text-black",
                        isNeedsAttention && "bg-red-50 text-red-700 border border-red-200 print:bg-white print:text-black",
                        isUnknown && "bg-amber-50 text-amber-700 border border-amber-200 print:bg-white print:text-black",
                        isNotTested && "bg-slate-100 text-slate-600 print:bg-white print:text-black"
                      )}>
                        {item.status}
                      </span>

                      <Link
                        href={item.testPath.startsWith("/") ? item.testPath as `/${string}` : `/${item.testPath}` as `/${string}`}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium underline print:hidden"
                      >
                        {item.isCompleted ? "Re-test" : "Run Test"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 4: Marked Pixel Defects */}
        {allPixelDefects.length > 0 && (
          <div className="p-6 sm:p-8 border-b border-gray-100 bg-amber-50/20 break-inside-avoid print:bg-transparent print:py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  USER-MARKED / OBSERVED
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Marked Pixel Flaws & Locations ({allPixelDefects.length})
                </h3>
              </div>
            </div>

            <div className="border border-amber-200/80 rounded-xl overflow-hidden bg-white print:border print:border-slate-300">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-50/60 border-b border-amber-200/80 text-[10px] font-mono text-amber-950 font-semibold uppercase print:bg-slate-100">
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Classification</th>
                    <th className="py-2.5 px-4">Coordinates (CSS X, Y)</th>
                    <th className="py-2.5 px-4">Screen Position</th>
                    <th className="py-2.5 px-4">Test Pattern</th>
                    <th className="py-2.5 px-4">Note</th>
                    <th className="py-2.5 px-4 text-right print:hidden">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allPixelDefects.map((defect, idx) => (
                    <tr key={defect.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-4 font-mono font-bold text-gray-900">#{idx + 1}</td>
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
                      <td className="py-2.5 px-4 font-mono text-gray-700">
                        {defect.x}px, {defect.y}px
                      </td>
                      <td className="py-2.5 px-4 font-mono text-gray-600">
                        {defect.xPercent}%, {defect.yPercent}%
                      </td>
                      <td className="py-2.5 px-4 text-gray-700">
                        {formatTestTitle(defect.testId)}
                      </td>
                      <td className="py-2.5 px-4 text-gray-500 italic">
                        {defect.notes || "—"}
                      </td>
                      <td className="py-2.5 px-4 text-right print:hidden">
                        <button
                          type="button"
                          onClick={() => handleDeletePixelMarker(defect.testId, defect.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete defect marker"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 5: Overall Inspection Notes */}
        <div className="p-6 sm:p-8 break-inside-avoid print:py-4">
          <h3 className="text-base font-bold text-gray-900 mb-2">Overall Inspection Notes</h3>
          <p className="text-xs text-gray-500 mb-3 print:hidden">
            Document room ambient lighting conditions, video cable type (DP/HDMI), and general observations. Autosaved to local storage.
          </p>
          <textarea
            value={generalNotes}
            onChange={(e) => handleGeneralNotesChange(e.target.value)}
            rows={3}
            placeholder="e.g., Inspected in a pitch-black room. No backlight bleed observed. Factory color profile appears balanced..."
            className="w-full p-3 text-xs border border-gray-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-gray-800 print:bg-white print:border-slate-300"
          />
        </div>

      </div>

      {/* Global Bottom Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/monitor-inspection"
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Start New Inspection</span>
          </Link>

          <button 
            type="button"
            onClick={handleClearActive}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Observations</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <button 
            type="button"
            onClick={() => handleExportJson()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 hover:bg-slate-50 transition-colors text-gray-700"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export JSON</span>
          </button>

          <button 
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Local Inspection History Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 print:hidden shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-gray-700" />
            <h3 className="text-lg font-bold text-gray-900">Local Inspection History</h3>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            {historyList.length} past {historyList.length === 1 ? "record" : "records"} stored
          </span>
        </div>

        {historyList.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-500">No past inspections archived yet.</p>
            <p className="text-[11px] text-gray-400 mt-1">Click &quot;Save to History&quot; above to archive the current inspection report.</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
            {historyList.map((record) => (
              <div key={record.id} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {record.monitorProfile?.brand || record.monitorProfile?.model 
                        ? `${record.monitorProfile.brand} ${record.monitorProfile.model}`.trim()
                        : record.workflowTitle}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 font-mono text-[11px]">
                      {new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600 font-mono">
                    <span>{record.completedCount} tests</span>
                    <span>•</span>
                    <span className="text-emerald-600">{record.passCount} Observed</span>
                    <span>•</span>
                    <span className="text-red-600">{record.issueCount} Needs attention</span>
                    {record.pixelDefects?.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-amber-600 font-bold">{record.pixelDefects.length} Flaws</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleExportJson(record)}
                    className="p-1.5 text-gray-500 hover:text-emerald-700 rounded-lg hover:bg-emerald-50"
                    title="Export this past record as JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingHistoryRecord(record)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-slate-50 text-xs font-medium"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteHistory(record.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History Record Details Modal */}
      {viewingHistoryRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-4 mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-semibold">
                  Archived Inspection Record
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  {viewingHistoryRecord.monitorProfile?.brand || viewingHistoryRecord.workflowTitle}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {new Date(viewingHistoryRecord.date).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => setViewingHistoryRecord(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px]">
                <div>
                  <span className="text-gray-500 block">Tests:</span>
                  <span className="font-bold text-gray-900">{viewingHistoryRecord.completedCount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Observed:</span>
                  <span className="font-bold text-emerald-600">{viewingHistoryRecord.passCount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Needs Attn:</span>
                  <span className="font-bold text-red-600">{viewingHistoryRecord.issueCount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Pixel Flaws:</span>
                  <span className="font-bold text-amber-600">{viewingHistoryRecord.pixelDefects?.length || 0}</span>
                </div>
              </div>

              {viewingHistoryRecord.displaySnapshot && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] grid grid-cols-2 gap-2">
                  <div>Screen: {viewingHistoryRecord.displaySnapshot.physicalResolution}</div>
                  <div>DPR: {viewingHistoryRecord.displaySnapshot.devicePixelRatio}x</div>
                  <div>Viewport: {viewingHistoryRecord.displaySnapshot.viewport}</div>
                  <div>Depth: {viewingHistoryRecord.displaySnapshot.colorDepth}-bit</div>
                </div>
              )}

              {viewingHistoryRecord.generalNotes && (
                <div className="p-3 bg-white border border-gray-200 rounded-xl">
                  <span className="font-semibold text-gray-700 block mb-1">Notes:</span>
                  <p className="text-gray-600 italic">{viewingHistoryRecord.generalNotes}</p>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Test Observations:</h4>
                <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 max-h-48 overflow-y-auto">
                  {Object.entries(viewingHistoryRecord.observations || {}).map(([id, item]) => (
                    <div key={id} className="p-2.5 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-gray-800">{formatTestTitle(id)}</span>
                      <span className={cn(
                        "font-mono text-xs font-semibold uppercase",
                        item.result === "PASS" && "text-emerald-600",
                        item.result === "ISSUE" && "text-red-600",
                        item.result === "UNSURE" && "text-amber-600"
                      )}>
                        {item.result === "PASS" ? "Observed" : item.result === "ISSUE" ? "Needs attention" : item.result || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <button
                  type="button"
                  onClick={() => handleExportJson(viewingHistoryRecord)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium hover:bg-emerald-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Record JSON</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingHistoryRecord(null)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
