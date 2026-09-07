"use client";

import { safeStorageGet, safeStorageSet, safeSessionGet, safeSessionSet } from "./browserCapabilities";

export type ObservationResult = "PASS" | "ISSUE" | "UNSURE" | "LOOKS_NORMAL" | "NEEDS_ATTENTION" | null;

export type PixelDefectType = "dead" | "stuck" | "bright" | "unknown";

export interface PixelDefectMarker {
  id: string;
  x: number; // Viewport CSS X
  y: number; // Viewport CSS Y
  xPercent: number; // 0 to 100%
  yPercent: number; // 0 to 100%
  viewportWidth: number;
  viewportHeight: number;
  type: PixelDefectType;
  testId: string;
  colorAtMark?: string;
  createdAt: number;
  notes?: string;
}

export interface TestObservationItem {
  testId: string;
  result: ObservationResult;
  notes: string;
  pixelDefects?: PixelDefectMarker[];
  updatedAt: number;
}

export interface BrowserDisplaySnapshot {
  logicalResolution: string;
  physicalResolution: string;
  viewport: string;
  devicePixelRatio: number;
  colorDepth: number;
  orientation: string;
  capturedAt: number;
}

export interface MonitorProfile {
  id?: string;
  brand: string;
  model: string;
  size: string; // e.g. "27\""
  resolution: string; // e.g. "2560x1440"
  refreshRate: string; // e.g. "144Hz"
  panelType: string; // "IPS" | "VA" | "OLED" | "TN" | "Mini-LED" | "Other" | ""
  purchaseDate: string; // YYYY-MM-DD
  notes: string;
}

export interface ComparisonObservations {
  profileAId: string;
  profileBId: string;
  colorNotes: string;
  uniformityNotes: string;
  brightnessNotes: string;
  motionNotes: string;
  userConclusion: string;
  updatedAt: number;
}

export interface ActiveInspectionSession {
  id: string;
  workflowId?: string; // "general" | "used" | "gaming" | "oled" | "laptop" | "tv" | "diagnostic" | "custom"
  workflowTitle: string;
  queue: string[]; // List of test paths, e.g. ["/tests/dead-pixel-test", ...]
  currentIndex: number;
  startedAt: number;
  updatedAt: number;
  completedTestIds: string[];
  observations: Record<string, TestObservationItem>;
  generalNotes: string;
  monitorProfile: MonitorProfile;
  displaySnapshot?: BrowserDisplaySnapshot;
}

export interface CompletedInspection {
  id: string;
  date: string; // ISO string
  workflowTitle: string;
  workflowId?: string;
  monitorProfile: MonitorProfile;
  displaySnapshot?: BrowserDisplaySnapshot;
  totalTests: number;
  completedCount: number;
  passCount: number;
  issueCount: number;
  unsureCount: number;
  observations: Record<string, TestObservationItem>;
  pixelDefects: PixelDefectMarker[];
  generalNotes: string;
}

// Storage Keys
const KEY_ACTIVE_SESSION = "monitor_tester_active_session";
const KEY_MONITOR_PROFILE = "monitor_tester_monitor_profile";
const KEY_SAVED_PROFILES = "monitor_tester_saved_profiles";
const KEY_INSPECTION_HISTORY = "monitor_tester_inspection_history";
const KEY_COMPARISON_OBSERVATIONS = "monitor_tester_comparison_observations";

// Legacy keys for backward compatibility
const LEGACY_KEY_OBSERVATIONS = "monitor-tester-observations";
const LEGACY_KEY_WORKFLOW = "monitor-tester-workflow";

export const DEFAULT_MONITOR_PROFILE: MonitorProfile = {
  brand: "",
  model: "",
  size: "",
  resolution: "",
  refreshRate: "",
  panelType: "",
  purchaseDate: "",
  notes: ""
};

/**
 * Loads the active inspection session or initializes a clean default session.
 */
export function getActiveInspectionSession(): ActiveInspectionSession | null {
  if (typeof window === "undefined") return null;

  const session = safeStorageGet<ActiveInspectionSession | null>(KEY_ACTIVE_SESSION, null);
  if (session && Array.isArray(session.queue) && session.queue.length > 0) {
    return session;
  }

  // Check legacy sessionStorage if active session key not found
  const legacyQueue = safeSessionGet<string[] | null>(LEGACY_KEY_WORKFLOW, null);
  if (legacyQueue && Array.isArray(legacyQueue) && legacyQueue.length > 0) {
    const legacyObs = safeStorageGet<Record<string, ObservationResult>>(LEGACY_KEY_OBSERVATIONS, {});
    const mappedObs: Record<string, TestObservationItem> = {};

    Object.entries(legacyObs).forEach(([testId, res]) => {
      mappedObs[testId] = {
        testId,
        result: res,
        notes: "",
        pixelDefects: [],
        updatedAt: Date.now()
      };
    });

    const converted: ActiveInspectionSession = {
      id: `session_${Date.now()}`,
      workflowTitle: "Display Checkup",
      queue: legacyQueue,
      currentIndex: 0,
      startedAt: Date.now(),
      updatedAt: Date.now(),
      completedTestIds: Object.keys(legacyObs),
      observations: mappedObs,
      generalNotes: "",
      monitorProfile: getSavedMonitorProfile()
    };

    saveActiveInspectionSession(converted);
    return converted;
  }

  return null;
}

/**
 * Saves the active session to localStorage and syncs with legacy keys.
 */
export function saveActiveInspectionSession(session: ActiveInspectionSession): void {
  if (typeof window === "undefined") return;

  safeStorageSet(KEY_ACTIVE_SESSION, session);

  // Sync with legacy sessionStorage for existing test wrappers
  safeSessionSet(LEGACY_KEY_WORKFLOW, session.queue);

  // Sync observations map
  const legacyObsMap: Record<string, string> = {};
  Object.entries(session.observations).forEach(([id, item]) => {
    if (item.result) {
      legacyObsMap[id] = item.result;
    }
  });
  safeStorageSet(LEGACY_KEY_OBSERVATIONS, legacyObsMap);
}

/**
 * Clears the active inspection session.
 */
export function clearActiveInspectionSession(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(KEY_ACTIVE_SESSION);
    localStorage.removeItem(LEGACY_KEY_OBSERVATIONS);
    sessionStorage.removeItem(LEGACY_KEY_WORKFLOW);
  } catch {}
}

/**
 * Starts a new inspection session with a defined queue.
 */
export function startNewInspectionSession(
  workflowTitle: string,
  queue: string[],
  workflowId?: string
): ActiveInspectionSession {
  const profile = getSavedMonitorProfile();
  const session: ActiveInspectionSession = {
    id: `session_${Date.now()}`,
    workflowId: workflowId || "custom",
    workflowTitle,
    queue,
    currentIndex: 0,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    completedTestIds: [],
    observations: {},
    generalNotes: "",
    monitorProfile: profile
  };

  saveActiveInspectionSession(session);
  return session;
}

/**
 * Updates or sets an observation for a specific test.
 */
export function recordTestObservation(
  testId: string,
  result: ObservationResult,
  notes?: string
): void {
  const session = getActiveInspectionSession();
  if (!session) return;

  const cleanId = testId.replace(/^\//, "").replace(/^tests\//, "");
  const existing = session.observations[cleanId] || {
    testId: cleanId,
    result: null,
    notes: "",
    pixelDefects: [],
    updatedAt: Date.now()
  };

  existing.result = result;
  if (typeof notes === "string") {
    existing.notes = notes;
  }
  existing.updatedAt = Date.now();

  session.observations[cleanId] = existing;
  if (!session.completedTestIds.includes(cleanId) && result !== null) {
    session.completedTestIds.push(cleanId);
  }
  session.updatedAt = Date.now();

  saveActiveInspectionSession(session);
}

/**
 * Adds a test to the active queue if not already present.
 */
export function addTestToQueue(testPath: string): void {
  const session = getActiveInspectionSession();
  if (!session) return;
  if (!session.queue.includes(testPath)) {
    session.queue.push(testPath);
    session.updatedAt = Date.now();
    saveActiveInspectionSession(session);
  }
}

/**
 * Removes a test from the active queue.
 */
export function removeTestFromQueue(testPath: string): void {
  const session = getActiveInspectionSession();
  if (!session) return;
  session.queue = session.queue.filter(p => p !== testPath);
  session.updatedAt = Date.now();
  saveActiveInspectionSession(session);
}

/**
 * Updates the entire queue order.
 */
export function reorderQueue(newQueue: string[]): void {
  const session = getActiveInspectionSession();
  if (!session) return;
  session.queue = [...newQueue];
  session.updatedAt = Date.now();
  saveActiveInspectionSession(session);
}

/**
 * Updates the general notes for the active session.
 */
export function updateGeneralNotes(notes: string): void {
  const session = getActiveInspectionSession();
  if (!session) return;
  session.generalNotes = notes;
  session.updatedAt = Date.now();
  saveActiveInspectionSession(session);
}

/**
 * Gets a specific test observation item.
 */
export function getTestObservation(testId: string): TestObservationItem | null {
  const session = getActiveInspectionSession();
  if (!session) return null;
  const cleanId = testId.replace(/^\//, "").replace(/^tests\//, "");
  return session.observations[cleanId] || null;
}

/**
 * Adds a user-marked pixel defect to the active test observation.
 */
export function addPixelDefectMarker(
  testId: string,
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number,
  type: PixelDefectType = "dead",
  colorAtMark?: string
): PixelDefectMarker {
  const cleanId = testId.replace(/^\//, "").replace(/^tests\//, "");
  const session = getActiveInspectionSession() || startNewInspectionSession("Custom Pixel Check", [testId]);

  const marker: PixelDefectMarker = {
    id: `defect_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    x: Math.round(x),
    y: Math.round(y),
    xPercent: Number(((x / Math.max(1, viewportWidth)) * 100).toFixed(2)),
    yPercent: Number(((y / Math.max(1, viewportHeight)) * 100).toFixed(2)),
    viewportWidth,
    viewportHeight,
    type,
    testId: cleanId,
    colorAtMark,
    createdAt: Date.now()
  };

  const existing = session.observations[cleanId] || {
    testId: cleanId,
    result: "ISSUE",
    notes: "",
    pixelDefects: [],
    updatedAt: Date.now()
  };

  existing.pixelDefects = [...(existing.pixelDefects || []), marker];
  existing.result = "ISSUE"; // Automatically flag issue if pixel defects are marked
  existing.updatedAt = Date.now();

  session.observations[cleanId] = existing;
  session.updatedAt = Date.now();

  saveActiveInspectionSession(session);
  return marker;
}

/**
 * Removes a pixel defect marker by ID.
 */
export function removePixelDefectMarker(testId: string, markerId: string): void {
  const cleanId = testId.replace(/^\//, "").replace(/^tests\//, "");
  const session = getActiveInspectionSession();
  if (!session || !session.observations[cleanId]) return;

  const obs = session.observations[cleanId];
  obs.pixelDefects = (obs.pixelDefects || []).filter(m => m.id !== markerId);
  obs.updatedAt = Date.now();

  session.updatedAt = Date.now();
  saveActiveInspectionSession(session);
}

/**
 * Updates a pixel defect marker type or notes.
 */
export function updatePixelDefectMarker(
  testId: string,
  markerId: string,
  updates: Partial<Pick<PixelDefectMarker, "type" | "notes">>
): void {
  const cleanId = testId.replace(/^\//, "").replace(/^tests\//, "");
  const session = getActiveInspectionSession();
  if (!session || !session.observations[cleanId]) return;

  const obs = session.observations[cleanId];
  obs.pixelDefects = (obs.pixelDefects || []).map(m => {
    if (m.id === markerId) {
      return { ...m, ...updates };
    }
    return m;
  });
  obs.updatedAt = Date.now();

  session.updatedAt = Date.now();
  saveActiveInspectionSession(session);
}

/**
 * Gets all pixel defect markers for the active session.
 */
export function getAllActivePixelDefects(): PixelDefectMarker[] {
  const session = getActiveInspectionSession();
  if (!session) return [];

  const markers: PixelDefectMarker[] = [];
  Object.values(session.observations).forEach(obs => {
    if (Array.isArray(obs.pixelDefects)) {
      markers.push(...obs.pixelDefects);
    }
  });
  return markers;
}

/**
 * Monitor Profile CRUD
 */
export function getSavedMonitorProfile(): MonitorProfile {
  if (typeof window === "undefined") return DEFAULT_MONITOR_PROFILE;
  return safeStorageGet<MonitorProfile>(KEY_MONITOR_PROFILE, DEFAULT_MONITOR_PROFILE);
}

export function saveMonitorProfile(profile: MonitorProfile): void {
  if (typeof window === "undefined") return;
  safeStorageSet(KEY_MONITOR_PROFILE, profile);

  // Update active session profile if one is running
  const session = getActiveInspectionSession();
  if (session) {
    session.monitorProfile = profile;
    saveActiveInspectionSession(session);
  }
}

/**
 * Saves current active inspection session to completed history and clears active.
 */
export function archiveCurrentInspection(): CompletedInspection | null {
  const session = getActiveInspectionSession();
  if (!session) return null;

  let passCount = 0;
  let issueCount = 0;
  let unsureCount = 0;
  const allDefects: PixelDefectMarker[] = [];

  Object.values(session.observations).forEach(obs => {
    if (obs.result === "PASS") passCount++;
    else if (obs.result === "ISSUE") issueCount++;
    else if (obs.result === "UNSURE") unsureCount++;

    if (Array.isArray(obs.pixelDefects)) {
      allDefects.push(...obs.pixelDefects);
    }
  });

  const record: CompletedInspection = {
    id: session.id,
    date: new Date().toISOString(),
    workflowTitle: session.workflowTitle,
    workflowId: session.workflowId,
    monitorProfile: session.monitorProfile || getSavedMonitorProfile(),
    displaySnapshot: session.displaySnapshot || getCurrentBrowserDisplaySnapshot(),
    totalTests: session.queue.length,
    completedCount: session.completedTestIds.length,
    passCount,
    issueCount,
    unsureCount,
    observations: session.observations,
    pixelDefects: allDefects,
    generalNotes: session.generalNotes
  };

  const history = getInspectionHistory();
  const updatedHistory = [record, ...history.filter(h => h.id !== record.id)].slice(0, 50); // Keep last 50
  safeStorageSet(KEY_INSPECTION_HISTORY, updatedHistory);

  return record;
}

/**
 * Inspection History CRUD
 */
export function getInspectionHistory(): CompletedInspection[] {
  if (typeof window === "undefined") return [];
  return safeStorageGet<CompletedInspection[]>(KEY_INSPECTION_HISTORY, []);
}

export function deleteInspectionHistoryRecord(id: string): void {
  if (typeof window === "undefined") return;
  const history = getInspectionHistory();
  const filtered = history.filter(h => h.id !== id);
  safeStorageSet(KEY_INSPECTION_HISTORY, filtered);
}

export function clearAllInspectionHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY_INSPECTION_HISTORY);
  } catch {}
}

/**
 * Captures legitimate browser-reported display parameters snapshot
 */
export function getCurrentBrowserDisplaySnapshot(): BrowserDisplaySnapshot {
  if (typeof window === "undefined") {
    return {
      logicalResolution: "1920x1080",
      physicalResolution: "1920x1080",
      viewport: "1920x1080",
      devicePixelRatio: 1,
      colorDepth: 24,
      orientation: "landscape-primary",
      capturedAt: Date.now()
    };
  }

  const dpr = window.devicePixelRatio || 1;
  const sw = window.screen.width;
  const sh = window.screen.height;
  const pw = Math.round(sw * dpr);
  const ph = Math.round(sh * dpr);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const depth = window.screen.colorDepth || 24;
  const orientation = window.screen.orientation?.type || "unknown";

  return {
    logicalResolution: `${sw} × ${sh}`,
    physicalResolution: `${pw} × ${ph}`,
    viewport: `${vw} × ${vh}`,
    devicePixelRatio: Number(dpr.toFixed(2)),
    colorDepth: depth,
    orientation,
    capturedAt: Date.now()
  };
}

/**
 * Saved Monitor Profiles (Multiple profiles for comparison & inventory)
 */
export function getSavedMonitorProfiles(): MonitorProfile[] {
  if (typeof window === "undefined") return [];
  const list = safeStorageGet<MonitorProfile[]>(KEY_SAVED_PROFILES, []);
  if (list.length > 0) return list;

  // Fallback to active single profile if exists
  const single = getSavedMonitorProfile();
  if (single.brand || single.model || single.size) {
    const initialized = [{ ...single, id: single.id || "profile_default" }];
    safeStorageSet(KEY_SAVED_PROFILES, initialized);
    return initialized;
  }
  return [];
}

export function saveNamedMonitorProfile(profile: MonitorProfile): MonitorProfile {
  if (typeof window === "undefined") return profile;

  const currentList = getSavedMonitorProfiles();
  const id = profile.id || `profile_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const prepared: MonitorProfile = { ...profile, id };

  const existingIdx = currentList.findIndex(p => p.id === id);
  let updatedList: MonitorProfile[];
  if (existingIdx >= 0) {
    updatedList = [...currentList];
    updatedList[existingIdx] = prepared;
  } else {
    updatedList = [prepared, ...currentList];
  }

  safeStorageSet(KEY_SAVED_PROFILES, updatedList);
  saveMonitorProfile(prepared);
  return prepared;
}

export function deleteSavedMonitorProfile(id: string): void {
  if (typeof window === "undefined") return;
  const currentList = getSavedMonitorProfiles();
  const updated = currentList.filter(p => p.id !== id);
  safeStorageSet(KEY_SAVED_PROFILES, updated);
}

/**
 * Comparison Observations CRUD
 */
export function getComparisonObservations(): ComparisonObservations | null {
  if (typeof window === "undefined") return null;
  return safeStorageGet<ComparisonObservations | null>(KEY_COMPARISON_OBSERVATIONS, null);
}

export function saveComparisonObservations(obs: ComparisonObservations): void {
  if (typeof window === "undefined") return;
  safeStorageSet(KEY_COMPARISON_OBSERVATIONS, obs);
}

/**
 * JSON Report Export & Import
 */
export function exportInspectionReportJson(
  source: CompletedInspection | ActiveInspectionSession
): string {
  const isCompleted = "date" in source;
  const report = {
    reportTitle: "MONITOR TEST REPORT",
    version: "1.0",
    generatedAt: isCompleted ? (source as CompletedInspection).date : new Date().toISOString(),
    workflowType: source.workflowId || "custom",
    workflowTitle: source.workflowTitle,
    displayInformation: source.displaySnapshot || getCurrentBrowserDisplaySnapshot(),
    monitorProfile: source.monitorProfile,
    summaryMetrics: {
      totalTests: "totalTests" in source ? (source as CompletedInspection).totalTests : source.queue.length,
      completedCount: "completedCount" in source ? (source as CompletedInspection).completedCount : source.completedTestIds.length,
      observed: "passCount" in source ? (source as CompletedInspection).passCount : Object.values(source.observations).filter(o => o.result === "PASS").length,
      needsAttention: "issueCount" in source ? (source as CompletedInspection).issueCount : Object.values(source.observations).filter(o => o.result === "ISSUE").length,
      unknown: "unsureCount" in source ? (source as CompletedInspection).unsureCount : Object.values(source.observations).filter(o => o.result === "UNSURE").length,
      pixelDefectsCount: "pixelDefects" in source 
        ? (source as CompletedInspection).pixelDefects?.length || 0 
        : Object.values(source.observations).reduce((acc, o) => acc + (o.pixelDefects?.length || 0), 0)
    },
    observations: source.observations,
    pixelDefects: "pixelDefects" in source 
      ? (source as CompletedInspection).pixelDefects 
      : Object.values(source.observations).flatMap(o => o.pixelDefects || []),
    generalNotes: source.generalNotes
  };

  return JSON.stringify(report, null, 2);
}

export function importInspectionReportJson(jsonString: string): CompletedInspection | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object" || !parsed.reportTitle) {
      return null;
    }

    const record: CompletedInspection = {
      id: `import_${Date.now()}`,
      date: parsed.generatedAt || new Date().toISOString(),
      workflowTitle: parsed.workflowTitle || "Imported Display Inspection",
      workflowId: parsed.workflowType || "imported",
      monitorProfile: parsed.monitorProfile || DEFAULT_MONITOR_PROFILE,
      displaySnapshot: parsed.displayInformation,
      totalTests: parsed.summaryMetrics?.totalTests || Object.keys(parsed.observations || {}).length,
      completedCount: parsed.summaryMetrics?.completedCount || Object.keys(parsed.observations || {}).length,
      passCount: parsed.summaryMetrics?.observed || 0,
      issueCount: parsed.summaryMetrics?.needsAttention || 0,
      unsureCount: parsed.summaryMetrics?.unknown || 0,
      observations: parsed.observations || {},
      pixelDefects: Array.isArray(parsed.pixelDefects) ? parsed.pixelDefects : [],
      generalNotes: parsed.generalNotes || ""
    };

    // Save into history
    const history = getInspectionHistory();
    safeStorageSet(KEY_INSPECTION_HISTORY, [record, ...history].slice(0, 50));
    return record;
  } catch {
    return null;
  }
}

