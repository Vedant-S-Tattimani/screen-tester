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

export type DisplayType = "Monitor" | "TV" | "Laptop" | "Gaming" | "Other" | "";
export type HdrSupportOption = "Yes" | "No" | "Unspecified" | "";
export type VrrSupportOption = "G-Sync" | "FreeSync" | "Adaptive-Sync" | "None" | "Unspecified" | "";

export interface MonitorProfile {
  id?: string;
  brand: string;
  model: string;
  displayType?: DisplayType;
  size: string; // e.g. "27\""
  resolution: string; // e.g. "2560x1440"
  refreshRate: string; // e.g. "144Hz"
  panelType: string; // "IPS" | "VA" | "OLED" | "TN" | "Mini-LED" | "Other" | ""
  ratedBrightness?: string; // e.g. "400 cd/m²"
  ratedContrast?: string; // e.g. "1000:1"
  hdrSupport?: HdrSupportOption;
  vrrSupport?: VrrSupportOption;
  serialNumber?: string; // optional reference
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
  displayType: "",
  size: "",
  resolution: "",
  refreshRate: "",
  panelType: "",
  ratedBrightness: "",
  ratedContrast: "",
  hdrSupport: "",
  vrrSupport: "",
  serialNumber: "",
  purchaseDate: "",
  notes: ""
};

export interface RecommendedCheckItem {
  id: string;
  title: string;
  reason: string;
  relevantTestId?: string;
  category: "panel" | "usage" | "general";
}

/**
 * Returns model-specific and scenario-adaptive recommended checks.
 * STRICT PRINCIPLE: Uses pure recommendation language ("Relevant checks for OLED displays"),
 * NEVER defect-assumption or diagnosis language ("Your OLED has burn-in").
 */
export function getRecommendedChecklist(
  profile?: MonitorProfile,
  workflowId?: string
): RecommendedCheckItem[] {
  const checks: RecommendedCheckItem[] = [];
  const panel = (profile?.panelType || "").toUpperCase();
  const displayType = (profile?.displayType || "").toLowerCase();
  const isOled = panel.includes("OLED");
  const isLcd = panel.includes("IPS") || panel.includes("VA") || panel.includes("TN") || panel.includes("MINI-LED") || (!isOled && panel.length > 0);
  const isTv = displayType === "tv" || workflowId === "tv";
  const isGaming = displayType === "gaming" || workflowId === "gaming" || (profile?.vrrSupport && profile.vrrSupport !== "None");
  const isLaptop = displayType === "laptop" || workflowId === "laptop";

  if (isOled) {
    checks.push(
      {
        id: "oled-near-black",
        title: "Near-Black Transition Behavior",
        reason: "Self-emissive subpixels switch entirely off for true black; evaluate whether subtle shadow detail steps cleanly without crushing.",
        relevantTestId: "black-level-test",
        category: "panel"
      },
      {
        id: "oled-uniformity",
        title: "Low-Luminance Gray Uniformity",
        reason: "Self-emissive panels may show subtle vertical banding on 5% to 20% dark gray fields.",
        relevantTestId: "uniformity-test",
        category: "panel"
      },
      {
        id: "oled-pixels",
        title: "Subpixel Dropout & Pixel Integrity",
        reason: "Inspect solid primary color fields (Red, Green, Blue, White) for inactive subpixels.",
        relevantTestId: "dead-pixel-test",
        category: "panel"
      },
      {
        id: "oled-hdr-abl",
        title: "HDR Headroom & Brightness Limiting (ABL)",
        reason: "Assess panel brightness behavior when transitioning between small specular highlights and full-screen bright scenes.",
        relevantTestId: "hdr-capability-test",
        category: "panel"
      },
      {
        id: "oled-subpixel-text",
        title: "Subpixel Layout & Text Rendering",
        reason: "Triangular or non-standard subpixel layouts may produce subtle color fringing on high-contrast text edges.",
        relevantTestId: "sharpness-test",
        category: "panel"
      },
      {
        id: "oled-motion",
        title: "Motion Clarity & Persistence",
        reason: "Instantaneous physical pixel transition times make sample-and-hold eye tracking persistence the primary factor in motion perception.",
        relevantTestId: "ghosting-test",
        category: "panel"
      }
    );
  } else if (isLcd) {
    checks.push(
      {
        id: "lcd-bleed",
        title: "Backlight Uniformity & Bezel Pinch",
        reason: "LCD panels rely on external LED backlights; check in a darkened room for edge pinching or uneven corner light leakage.",
        relevantTestId: "backlight-bleed-test",
        category: "panel"
      },
      {
        id: "lcd-uniformity",
        title: "Screen Surface Uniformity",
        reason: "Check neutral 50% gray fields for corner vignetting, diffuser clouding, or color tint shifts across the panel area.",
        relevantTestId: "uniformity-test",
        category: "panel"
      },
      {
        id: "lcd-viewing-angle",
        title: "Off-Axis Viewing Angle Stability",
        reason: "Examine whether contrast diminishes or colors shift when viewing the panel from horizontal or vertical angles.",
        relevantTestId: "viewing-angle-test",
        category: "panel"
      },
      {
        id: "lcd-contrast-black",
        title: "Black-Level Separation & Contrast",
        reason: "Verify separation between deepest black and the lowest visible grayscale steps without crushing shadows.",
        relevantTestId: "contrast-test",
        category: "panel"
      },
      {
        id: "lcd-pixel-defects",
        title: "Dead & Stuck Subpixel Check",
        reason: "Check light backgrounds for dark dead pixels and dark backgrounds for bright stuck subpixels.",
        relevantTestId: "dead-pixel-test",
        category: "panel"
      },
      {
        id: "lcd-motion-ghosting",
        title: "Liquid Crystal Response & Ghosting",
        reason: "Evaluate crystal transition speed and overdrive tuning to ensure neither dark smearing nor bright overshoot halos appear.",
        relevantTestId: "ghosting-test",
        category: "panel"
      }
    );
  }

  if (isTv) {
    checks.push(
      {
        id: "tv-overscan",
        title: "Overscan & 1:1 Pixel Mapping",
        reason: "Ensure the television picture mode is set to 'Just Scan' or 'Fit to Screen' so edges are not cropped.",
        relevantTestId: "resolution-checker",
        category: "usage"
      },
      {
        id: "tv-aspect-ratio",
        title: "Aspect Ratio & Geometric Proportions",
        reason: "Verify circular and square test patterns retain mathematically correct aspect ratios without vertical stretching.",
        relevantTestId: "resolution-checker",
        category: "usage"
      },
      {
        id: "tv-viewing-angle",
        title: "Living Room Viewing Angles",
        reason: "Confirm consistent color and contrast from off-center seating positions.",
        relevantTestId: "viewing-angle-test",
        category: "usage"
      }
    );
  }

  if (isGaming) {
    checks.push(
      {
        id: "gaming-refresh-sync",
        title: "Operating Refresh Rate Synchronization",
        reason: "Confirm that browser animation timing and OS display output match the panel's rated high-refresh capability.",
        relevantTestId: "refresh-rate-test",
        category: "usage"
      },
      {
        id: "gaming-tearing",
        title: "Screen Tearing & Frame Pacing",
        reason: "Observe moving contrast bars across refresh cycles to inspect V-Sync alignment and tearing behavior.",
        relevantTestId: "screen-tearing-test",
        category: "usage"
      },
      {
        id: "gaming-overdrive",
        title: "Overdrive Tuning & Inverse Ghosting (Overshoot)",
        reason: "Ensure monitor overdrive voltage is balanced to prevent bright trailing halos around moving objects.",
        relevantTestId: "ghosting-test",
        category: "usage"
      },
      {
        id: "gaming-flicker",
        title: "Flicker & Backlight Strobing Stability",
        reason: "Inspect for high-frequency strobing or backlight modulation that could cause visual fatigue during long gaming sessions.",
        relevantTestId: "screen-flicker-test",
        category: "usage"
      }
    );
  }

  if (isLaptop) {
    checks.push(
      {
        id: "laptop-scaling",
        title: "HiDPI OS Scaling & Viewport Rendering",
        reason: "Verify logical layout dimensions align with OS scale factor for crisp application rendering.",
        relevantTestId: "resolution-checker",
        category: "usage"
      },
      {
        id: "laptop-color-balance",
        title: "Color Primaries & White Point Balance",
        reason: "Check RGB reproduction and neutral white consistency across the integrated display panel.",
        relevantTestId: "color-test",
        category: "usage"
      }
    );
  }

  // If no specific panel or usage provided, provide balanced general checks
  if (checks.length === 0) {
    checks.push(
      {
        id: "gen-resolution",
        title: "Native Resolution & Scaling Verification",
        reason: "Verify active browser layout area matches recommended operating system display settings.",
        relevantTestId: "resolution-checker",
        category: "general"
      },
      {
        id: "gen-pixels",
        title: "Pixel Flaw Inspection",
        reason: "Scan primary and monochrome fields for inactive or stuck subpixels.",
        relevantTestId: "dead-pixel-test",
        category: "general"
      },
      {
        id: "gen-luminance",
        title: "Luminance Steps & Shadow Separation",
        reason: "Confirm highlight and shadow detail steps are distinctly separated.",
        relevantTestId: "brightness-test",
        category: "general"
      },
      {
        id: "gen-uniformity",
        title: "Panel Uniformity Check",
        reason: "Evaluate screen surface for luminance or tint variations across the viewing area.",
        relevantTestId: "uniformity-test",
        category: "general"
      },
      {
        id: "gen-motion",
        title: "Motion Clarity & Trail Inspection",
        reason: "Observe animated elements to evaluate liquid crystal transition response.",
        relevantTestId: "ghosting-test",
        category: "general"
      }
    );
  }

  return checks;
}

export interface TroubleshootingReferenceItem {
  symptomId: string;
  title: string;
  triggerTestId: string;
  triggerTestName: string;
  summary: string;
}

/**
 * Deterministically maps test observations marked with NEEDS_ATTENTION (or ISSUE)
 * to relevant troubleshooting guides.
 * STRICT PRINCIPLE: Deterministic mapping only, zero AI inference or guessing.
 */
export function getTroubleshootingRecommendations(
  observations: Record<string, TestObservationItem>
): TroubleshootingReferenceItem[] {
  const results: TroubleshootingReferenceItem[] = [];
  const seenSymptomIds = new Set<string>();

  const mapping: Record<string, { symptomId: string; title: string; summary: string }> = {
    "refresh-rate-test": {
      symptomId: "wrong-refresh-rate",
      title: "Wrong Refresh Rate Troubleshooting",
      summary: "Troubleshoot display refresh rate settings, cable bandwidth limits, and browser animation timing mismatches."
    },
    "frame-rate-test": {
      symptomId: "wrong-refresh-rate",
      title: "Wrong Refresh Rate Troubleshooting",
      summary: "Diagnose frame pacing mismatches, GPU compositor drops, and display output configuration."
    },
    "screen-tearing-test": {
      symptomId: "screen-tearing",
      title: "Screen Tearing Troubleshooting",
      summary: "Diagnose V-Sync mismatches, VRR/Adaptive-Sync configurations, and browser compositor pacing."
    },
    "screen-flicker-test": {
      symptomId: "flickering",
      title: "Display Flickering Troubleshooting",
      summary: "Troubleshoot PWM backlight modulation, VRR brightness fluctuation, and video cable signal integrity."
    },
    "flicker-test": {
      symptomId: "flickering",
      title: "Display Flickering Troubleshooting",
      summary: "Diagnose high-frequency backlight flicker and refresh rate instability."
    },
    "dead-pixel-test": {
      symptomId: "dead-stuck-bright-pixel",
      title: "Dead, Stuck & Bright Pixel Guide",
      summary: "Understand the physical difference between dead and stuck subpixels, manufacturer warranty tolerances, and localized exercising."
    },
    "stuck-pixel-test": {
      symptomId: "dead-stuck-bright-pixel",
      title: "Dead, Stuck & Bright Pixel Guide",
      summary: "Identify stuck energized subpixels and safe visual stimulation techniques."
    },
    "bright-pixel-test": {
      symptomId: "dead-stuck-bright-pixel",
      title: "Dead, Stuck & Bright Pixel Guide",
      summary: "Inspect for hot or permanently energized subpixel flaws on dark backgrounds."
    },
    "stuck-pixel-fixer": {
      symptomId: "dead-stuck-bright-pixel",
      title: "Dead, Stuck & Bright Pixel Guide",
      summary: "Review stuck pixel characteristics, stimulation safety, and return thresholds."
    },
    "backlight-bleed-test": {
      symptomId: "backlight-bleed-ips-glow",
      title: "Backlight Bleed vs. IPS Glow Guide",
      summary: "Distinguish fixed bezel mechanical pinch from angle-dependent IPS optical glow."
    },
    "viewing-angle-test": {
      symptomId: "backlight-bleed-ips-glow",
      title: "Backlight Bleed vs. IPS Glow Guide",
      summary: "Analyze viewing angle optical shifts, IPS glow behavior, and contrast degradation off-axis."
    },
    "black-level-test": {
      symptomId: "backlight-bleed-ips-glow",
      title: "Backlight Bleed & Black Level Guide",
      summary: "Investigate elevated black floors, backlight light leakage, and dynamic contrast settings."
    },
    "brightness-test": {
      symptomId: "uneven-brightness",
      title: "Uneven Brightness & Uniformity Guide",
      summary: "Address edge vignetting, diffuser clouding, ambient light interference, and shadow crushing."
    },
    "uniformity-test": {
      symptomId: "uneven-brightness",
      title: "Uneven Brightness & Uniformity Guide",
      summary: "Diagnose dirty screen effect (DSE), edge falloff, and color tint variations across the panel."
    },
    "contrast-test": {
      symptomId: "washed-out-colors",
      title: "Washed Out Colors & Contrast Guide",
      summary: "Troubleshoot RGB full vs. limited range mismatches, color bit depth, and HDR tone mapping issues."
    },
    "color-test": {
      symptomId: "washed-out-colors",
      title: "Washed Out Colors & Contrast Guide",
      summary: "Diagnose color tinting, incorrect ICC profiles, and wide color gamut clamping."
    },
    "color-banding-test": {
      symptomId: "washed-out-colors",
      title: "Color Banding & Gradient Steps Guide",
      summary: "Troubleshoot 6-bit vs 8-bit color depth, GPU quantization, and gradient banding."
    },
    "gamma-test": {
      symptomId: "washed-out-colors",
      title: "Washed Out Colors & Gamma Guide",
      summary: "Address washed-out midtones or crushed darks caused by mismatched gamma curves (sRGB vs 2.2)."
    },
    "sharpness-test": {
      symptomId: "blurry-text",
      title: "Blurry Text & Scaling Troubleshooting",
      summary: "Resolve OS scaling artifacts, non-native resolution blur, and subpixel font rendering fringing."
    },
    "resolution-checker": {
      symptomId: "wrong-resolution",
      title: "Wrong Resolution & Scaling Troubleshooting",
      summary: "Align operating system desktop resolution and scaling with the display's physical panel grid."
    },
    "display-info": {
      symptomId: "wrong-resolution",
      title: "Wrong Resolution & Display Settings Guide",
      summary: "Understand browser-reported viewport vs. physical hardware resolution."
    },
    "hdr-capability-test": {
      symptomId: "hdr-not-working",
      title: "HDR Not Working Troubleshooting",
      summary: "Step-by-step resolution for Windows/macOS HDR toggles, washed-out SDR content, and cable limitations."
    }
  };

  Object.entries(observations).forEach(([rawTestId, obs]) => {
    if (obs.result === "ISSUE" || (obs.result as string) === "NEEDS_ATTENTION") {
      const cleanId = rawTestId.replace(/^\//, "").replace(/^tests\//, "");
      const entry = mapping[cleanId] || mapping[`${cleanId}-test`] || mapping[cleanId.replace(/-test$/, "")];
      if (entry && !seenSymptomIds.has(entry.symptomId)) {
        seenSymptomIds.add(entry.symptomId);
        const testTitle = cleanId
          .replace("-test", "")
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        results.push({
          symptomId: entry.symptomId,
          title: entry.title,
          triggerTestId: cleanId,
          triggerTestName: testTitle,
          summary: entry.summary
        });
      }
    }
  });

  return results;
}

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

