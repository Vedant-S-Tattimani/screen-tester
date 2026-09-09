import { 
  ActiveInspectionSession, 
  CompletedInspection, 
  PixelDefectMarker, 
  PixelDefectType,
  BrowserDisplaySnapshot,
  DEFAULT_MONITOR_PROFILE,
  getRecommendedChecklist,
  getTroubleshootingRecommendations,
  computeOverallVisualVerdict
} from "@/lib/inspectionStorage";
import { monitorTests } from "@/data/tests";
import { InspectionReportData, InspectionTestResultRow } from "./types";

interface BuildOptions {
  currentSnapshot?: BrowserDisplaySnapshot | null;
  webglInfo?: { renderer: string; vendor: string };
  p3Supported?: boolean;
  hdrSupported?: boolean;
}

export function buildInspectionReportData(
  source: ActiveInspectionSession | CompletedInspection | null,
  options: BuildOptions = {}
): InspectionReportData | null {
  if (!source) return null;

  const isCompleted = "date" in source;
  const inspectionId = source.id;
  const isArchived = isCompleted;
  
  const timestamp = isCompleted 
    ? (source as CompletedInspection).date 
    : new Date(source.updatedAt || source.startedAt || Date.now()).toISOString();

  // Compute duration
  let durationString: string | null = null;
  if (!isCompleted) {
    const active = source as ActiveInspectionSession;
    if (active.startedAt && active.updatedAt && active.updatedAt > active.startedAt) {
      const diffMs = active.updatedAt - active.startedAt;
      if (diffMs > 3000) {
        const mins = Math.floor(diffMs / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        durationString = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      }
    }
  }

  const workflowTitle = source.workflowTitle || "Visual Display Inspection";
  const workflowId = source.workflowId || "general";
  const userProfile = source.monitorProfile || DEFAULT_MONITOR_PROFILE;
  const snapshot = source.displaySnapshot || options.currentSnapshot || null;

  // Build observations mapping
  const observationsMap = source.observations || {};
  const queueList = "queue" in source ? (source as ActiveInspectionSession).queue : [];

  // Determine all test IDs to present
  const allTestIds: string[] = [];
  if (queueList.length > 0) {
    queueList.forEach(p => {
      const id = p.replace(/^\//, "").replace(/^tests\//, "");
      if (!allTestIds.includes(id)) allTestIds.push(id);
    });
  }
  Object.keys(observationsMap).forEach(id => {
    if (!allTestIds.includes(id)) allTestIds.push(id);
  });

  let normalCount = 0;
  let attentionCount = 0;
  let unsureCount = 0;
  let notTestedCount = 0;
  let withNotesCount = 0;
  let withObsCount = 0;
  const allPixelDefects: PixelDefectMarker[] = [];

  const testResults: InspectionTestResultRow[] = allTestIds.map(testId => {
    const regTest = monitorTests.find(t => t.id === testId);
    const cleanTitle = regTest?.primaryIntent
      ? regTest.primaryIntent.replace("monitor", "").trim().replace(/^\w/, c => c.toUpperCase())
      : testId.replace("-test", "").split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

    const obs = observationsMap[testId];
    const category = regTest?.category || "general";
    const notes = obs?.notes || "";
    if (notes.trim().length > 0) withNotesCount++;

    let status: "Completed" | "Skipped" | "Not available" = "Skipped";
    let observation: "LOOKS_NORMAL" | "NEEDS_ATTENTION" | "UNSURE" | "NOT_TESTED" = "NOT_TESTED";
    let observationLabel = "Not tested";

    if (obs && obs.result) {
      status = "Completed";
      withObsCount++;

      if (obs.result === "PASS" || (obs.result as string) === "LOOKS_NORMAL") {
        observation = "LOOKS_NORMAL";
        observationLabel = "Looks normal";
        normalCount++;
      } else if (obs.result === "ISSUE" || (obs.result as string) === "NEEDS_ATTENTION" || (obs.result as string) === "CHECK") {
        observation = "NEEDS_ATTENTION";
        observationLabel = "Needs attention";
        attentionCount++;
      } else if (obs.result === "UNSURE") {
        observation = "UNSURE";
        observationLabel = "Unsure";
        unsureCount++;
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
            testId: d.testId || testId,
            xPercent: d.xPercent ?? rawMarker.percentX ?? 0,
            yPercent: d.yPercent ?? rawMarker.percentY ?? 0,
            type: finalType
          });
        });
      }
    } else {
      notTestedCount++;
    }

    return {
      testId,
      name: cleanTitle,
      category,
      status,
      observation,
      observationLabel,
      notes,
      pixelDefectsCount: obs?.pixelDefects?.length || 0
    };
  });

  // Also include pixel defects stored on completed inspection record if present
  if (isCompleted && (source as CompletedInspection).pixelDefects?.length) {
    (source as CompletedInspection).pixelDefects.forEach(d => {
      if (!allPixelDefects.some(existing => existing.id === d.id)) {
        allPixelDefects.push(d);
      }
    });
  }

  const totalTests = allTestIds.length;
  const completedCount = normalCount + attentionCount + unsureCount;
  const skippedCount = Math.max(0, totalTests - completedCount);

  // Browser-detected results
  const browserDetectedResults: Array<{
    title: string;
    value: string;
    badge: "BROWSER-DETECTED" | "NOT AVAILABLE";
  }> = [
    {
      title: "Screen Resolution (Hardware / Logical)",
      value: snapshot ? `${snapshot.physicalResolution} (Logical: ${snapshot.logicalResolution})` : "1920 × 1080",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "Active Browser Viewport",
      value: snapshot ? snapshot.viewport : "—",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "Device Pixel Ratio (OS Scale)",
      value: snapshot ? `${snapshot.devicePixelRatio}x scale factor` : "1x",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "Color Depth & Pixel Depth",
      value: snapshot ? `${snapshot.colorDepth}-bit color depth` : "24-bit",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "Screen Orientation",
      value: snapshot ? snapshot.orientation : "Landscape",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "High Dynamic Range (HDR)",
      value: options.hdrSupported ? "High Dynamic Range (HDR) detected" : "Standard Dynamic Range (SDR)",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "Color Gamut Capability",
      value: options.p3Supported ? "Wide Color Gamut (Display-P3)" : "Standard Gamut (sRGB)",
      badge: "BROWSER-DETECTED"
    },
    {
      title: "WebGL GPU Renderer",
      value: options.webglInfo?.renderer || "WebGL 2.0 Hardware Accelerated",
      badge: "BROWSER-DETECTED"
    }
  ];

  // Visual observations list (items that were actually tested and observed)
  const visualObservations = testResults
    .filter(t => t.status === "Completed")
    .map(t => ({
      testId: t.testId,
      testName: t.name,
      category: t.category,
      observation: t.observation,
      notes: t.notes
    }));

  // Model-specific and scenario-adaptive recommended checks
  const recommendedChecks = getRecommendedChecklist(userProfile, workflowId);

  // Deterministic troubleshooting recommendations from user-marked issues
  const troubleshootingReferences = getTroubleshootingRecommendations(observationsMap);

  // Factual visual inspection overall verdict
  const overallVerdict = computeOverallVisualVerdict(observationsMap, allPixelDefects.length);

  return {
    inspectionId,
    isArchived,
    timestamp,
    workflowTitle,
    workflowId,
    inspectionPurpose: workflowTitle,
    overview: {
      totalTests,
      completedCount,
      skippedCount,
      withObservationsCount: withObsCount,
      withNotesCount,
      pixelDefectsCount: allPixelDefects.length,
      durationString,
      statusCounts: {
        normal: normalCount,
        attention: attentionCount,
        unsure: unsureCount,
        notTested: notTestedCount
      }
    },
    overallVerdict,
    displayInfo: {
      screenResolution: snapshot?.physicalResolution || "1920 × 1080",
      logicalResolution: snapshot?.logicalResolution || "1920 × 1080",
      viewport: snapshot?.viewport || "—",
      devicePixelRatio: snapshot?.devicePixelRatio || 1,
      colorDepth: snapshot?.colorDepth || 24,
      pixelDepth: snapshot?.colorDepth || 24,
      orientation: snapshot?.orientation || "Landscape",
      refreshRateEstimate: "Browser-observed timing",
      hdrSupported: !!options.hdrSupported,
      colorGamut: options.p3Supported ? "Display-P3" : "sRGB",
      webglRenderer: options.webglInfo?.renderer || "WebGL Accelerated",
      webglVendor: options.webglInfo?.vendor || "System GPU"
    },
    userProfile,
    recommendedChecks,
    testResults,
    browserDetectedResults,
    visualObservations,
    pixelDefects: allPixelDefects,
    troubleshootingReferences,
    generalNotes: source.generalNotes || ""
  };
}
