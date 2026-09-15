"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ArrowLeft, Ruler, Calculator, Monitor, Compass, Info, Save, ShieldCheck
} from "lucide-react";
import {
  getSavedMonitorProfiles,
  getComparisonObservations,
  saveComparisonObservations,
  MonitorProfile,
  ComparisonObservations
} from "@/lib/inspectionStorage";
import { KnowledgeBaseCallout } from "@/components/layout/KnowledgeBaseCallout";

interface DisplayPreset {
  name: string;
  inches: number;
  width: number;
  height: number;
  aspect: string;
  refreshRate?: string;
  panelType?: string;
}

const PRESETS: DisplayPreset[] = [
  { name: "24\" Full HD (1080p)", inches: 24, width: 1920, height: 1080, aspect: "16:9", refreshRate: "60Hz", panelType: "IPS" },
  { name: "27\" Quad HD (1440p)", inches: 27, width: 2560, height: 1440, aspect: "16:9", refreshRate: "144Hz", panelType: "IPS" },
  { name: "27\" 4K Ultra HD", inches: 27, width: 3840, height: 2160, aspect: "16:9", refreshRate: "60Hz", panelType: "IPS" },
  { name: "27\" OLED 240Hz Gaming", inches: 26.5, width: 2560, height: 1440, aspect: "16:9", refreshRate: "240Hz", panelType: "OLED" },
  { name: "32\" 4K Ultra HD", inches: 32, width: 3840, height: 2160, aspect: "16:9", refreshRate: "144Hz", panelType: "Fast IPS" },
  { name: "34\" Ultrawide (UWQHD)", inches: 34, width: 3440, height: 1440, aspect: "21:9", refreshRate: "144Hz", panelType: "VA Curved" },
  { name: "49\" Super Ultrawide", inches: 49, width: 5120, height: 1440, aspect: "32:9", refreshRate: "240Hz", panelType: "OLED" },
  { name: "14\" Laptop (Retina)", inches: 14.2, width: 3024, height: 1964, aspect: "16:10", refreshRate: "120Hz ProMotion", panelType: "Mini-LED" },
  { name: "16\" Laptop (Retina)", inches: 16.2, width: 3456, height: 2234, aspect: "16:10", refreshRate: "120Hz ProMotion", panelType: "Mini-LED" },
  { name: "55\" 4K Living Room TV", inches: 55, width: 3840, height: 2160, aspect: "16:9", refreshRate: "120Hz", panelType: "OLED" },
  { name: "65\" 4K Living Room TV", inches: 65, width: 3840, height: 2160, aspect: "16:9", refreshRate: "120Hz", panelType: "Mini-LED" },
];

const STANDARD_RATIOS = [
  { label: "16:9 (Standard Widescreen)", rw: 16, rh: 9 },
  { label: "16:10 (Productivity & Laptops)", rw: 16, rh: 10 },
  { label: "21:9 (Ultrawide Cinematic)", rw: 21, rh: 9 },
  { label: "32:9 (Super Ultrawide)", rw: 32, rh: 9 },
  { label: "4:3 (Legacy / Retro)", rw: 4, rh: 3 },
  { label: "5:4 (Classic Workstation)", rw: 5, rh: 4 },
  { label: "3:2 (Modern Tablets & Laptops)", rw: 3, rh: 2 },
  { label: "1:1 (Square)", rw: 1, rh: 1 },
];

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  return b === 0 ? a : gcd(b, a % b);
}

function safeParsePositive(val: string): number {
  if (!val || typeof val !== "string") return 0;
  const cleaned = val.trim();
  const num = parseFloat(cleaned);
  if (isNaN(num) || !isFinite(num) || num <= 0) return 0;
  return Math.min(num, 500000); // Cap at realistic maximum to prevent overflows
}

function parseProfileToDisplay(profile: MonitorProfile, fallbackIndex: number): DisplayPreset {
  const sizeMatch = profile.size?.match(/([\d.]+)/);
  const inches = sizeMatch ? parseFloat(sizeMatch[1]) : (PRESETS[fallbackIndex]?.inches || 27);

  const resMatch = profile.resolution?.match(/(\d+)\s*[x×*]\s*(\d+)/i);
  const width = resMatch ? parseInt(resMatch[1], 10) : (PRESETS[fallbackIndex]?.width || 2560);
  const height = resMatch ? parseInt(resMatch[2], 10) : (PRESETS[fallbackIndex]?.height || 1440);

  const div = gcd(width, height);
  const aspect = div > 0 ? `${Math.round(width / div)}:${Math.round(height / div)}` : "16:9";

  return {
    name: `${profile.brand || ""} ${profile.model || "Saved Profile"}`.trim() || `Saved Display #${profile.id?.slice(-4) || "1"}`,
    inches,
    width,
    height,
    aspect,
    refreshRate: profile.refreshRate || "60Hz",
    panelType: profile.panelType || "IPS",
  };
}

export function CompareDisplaysClient({ educationalContent }: { educationalContent?: React.ReactNode } = {}) {
  const t = useTranslations("CompareDisplays");

  const [activeTab, setActiveTab] = useState<"comparator" | "ppi" | "resolution" | "aspect">("comparator");

  // --- Tab 1: Comparator State ---
  const [sourceModeA, setSourceModeA] = useState<"preset" | "saved">("preset");
  const [sourceModeB, setSourceModeB] = useState<"preset" | "saved">("preset");
  const [selectedA, setSelectedA] = useState<number>(1); // 27" 1440p
  const [selectedB, setSelectedB] = useState<number>(2); // 27" 4K
  const [savedProfiles, setSavedProfiles] = useState<MonitorProfile[]>([]);
  const [selectedSavedA, setSelectedSavedA] = useState<string>("");
  const [selectedSavedB, setSelectedSavedB] = useState<string>("");

  // User Observations State
  const [colorNotesA, setColorNotesA] = useState("");
  const [colorNotesB, setColorNotesB] = useState("");
  const [uniformityNotesA, setUniformityNotesA] = useState("");
  const [uniformityNotesB, setUniformityNotesB] = useState("");
  const [brightnessNotesA, setBrightnessNotesA] = useState("");
  const [brightnessNotesB, setBrightnessNotesB] = useState("");
  const [motionNotesA, setMotionNotesA] = useState("");
  const [motionNotesB, setMotionNotesB] = useState("");
  const [userConclusion, setUserConclusion] = useState("");
  const [savedObsSuccess, setSavedObsSuccess] = useState<string | null>(null);

  // Load saved monitor profiles and comparison observations
  useEffect(() => {
    queueMicrotask(() => {
      const profiles = getSavedMonitorProfiles();
      setSavedProfiles(profiles);
      if (profiles.length > 0) {
        setSelectedSavedA(profiles[0].id || "");
        if (profiles.length > 1) {
          setSelectedSavedB(profiles[1].id || "");
        } else {
          setSelectedSavedB(profiles[0].id || "");
        }
      }

      const existingObs = getComparisonObservations();
      if (existingObs) {
        setColorNotesA(existingObs.colorNotes || "");
        setUniformityNotesA(existingObs.uniformityNotes || "");
        setBrightnessNotesA(existingObs.brightnessNotes || "");
        setMotionNotesA(existingObs.motionNotes || "");
        setUserConclusion(existingObs.userConclusion || "");
      }
    });
  }, []);

  const handleSaveObservations = () => {
    const obs: ComparisonObservations = {
      profileAId: sourceModeA === "saved" ? selectedSavedA : `preset_${selectedA}`,
      profileBId: sourceModeB === "saved" ? selectedSavedB : `preset_${selectedB}`,
      colorNotes: colorNotesA,
      uniformityNotes: uniformityNotesA,
      brightnessNotes: brightnessNotesA,
      motionNotes: motionNotesA,
      userConclusion,
      updatedAt: Date.now()
    };
    saveComparisonObservations(obs);
    setSavedObsSuccess(t("comparator.obsSavedSuccess"));
    setTimeout(() => setSavedObsSuccess(null), 4000);
  };

  // --- Tab 2: PPI & Viewing Distance State ---
  const [ppiSizeStr, setPpiSizeStr] = useState<string>("27");
  const [ppiWidthStr, setPpiWidthStr] = useState<string>("2560");
  const [ppiHeightStr, setPpiHeightStr] = useState<string>("1440");
  const [distanceStr, setDistanceStr] = useState<string>("26"); // 26 inches
  const [distanceUnit, setDistanceUnit] = useState<"in" | "cm">("in");

  // --- Tab 3: Resolution & Missing Dimension State ---
  const [resWStr, setResWStr] = useState<string>("1920");
  const [resHStr, setResHStr] = useState<string>("1080");
  const [targetRatioIndex, setTargetRatioIndex] = useState<number>(0); // 16:9
  const [knownDimension, setKnownDimension] = useState<"width" | "height">("width");
  const [knownValueStr, setKnownValueStr] = useState<string>("3840");

  // --- Tab 4: Aspect Ratio State ---
  const [arWidthStr, setArWidthStr] = useState<string>("2560");
  const [arHeightStr, setArHeightStr] = useState<string>("1080");

  // -------------------------------------------------------------
  // CALCULATIONS WITH EXTREME VALUE & INVALID INPUT SAFETY
  // (Formulas completely unchanged per specifications)
  // -------------------------------------------------------------

  // Display A & B Specs for Comparator
  const displayA: DisplayPreset = useMemo(() => {
    if (sourceModeA === "saved" && savedProfiles.length > 0) {
      const found = savedProfiles.find(p => p.id === selectedSavedA);
      if (found) return parseProfileToDisplay(found, selectedA);
    }
    return PRESETS[selectedA] || PRESETS[0];
  }, [sourceModeA, selectedSavedA, savedProfiles, selectedA]);

  const displayB: DisplayPreset = useMemo(() => {
    if (sourceModeB === "saved" && savedProfiles.length > 0) {
      const found = savedProfiles.find(p => p.id === selectedSavedB);
      if (found) return parseProfileToDisplay(found, selectedB);
    }
    return PRESETS[selectedB] || PRESETS[1];
  }, [sourceModeB, selectedSavedB, savedProfiles, selectedB]);

  const specsA = useMemo(() => {
    const ppi = displayA.inches > 0 ? Math.sqrt(displayA.width ** 2 + displayA.height ** 2) / displayA.inches : 0;
    const theta = Math.atan(displayA.height / displayA.width);
    const pwIn = displayA.inches * Math.cos(theta);
    const phIn = displayA.inches * Math.sin(theta);
    const retinaIn = ppi > 0 ? Math.round(3438 / ppi) : 0;
    return {
      ppi: Math.round(ppi),
      pwIn: pwIn.toFixed(1),
      phIn: phIn.toFixed(1),
      pwCm: (pwIn * 2.54).toFixed(1),
      phCm: (phIn * 2.54).toFixed(1),
      mp: ((displayA.width * displayA.height) / 1000000).toFixed(2),
      retinaIn,
      retinaCm: Math.round(retinaIn * 2.54),
      aspect: `${displayA.width / gcd(displayA.width, displayA.height)}:${displayA.height / gcd(displayA.width, displayA.height)}`,
    };
  }, [displayA]);

  const specsB = useMemo(() => {
    const ppi = displayB.inches > 0 ? Math.sqrt(displayB.width ** 2 + displayB.height ** 2) / displayB.inches : 0;
    const theta = Math.atan(displayB.height / displayB.width);
    const pwIn = displayB.inches * Math.cos(theta);
    const phIn = displayB.inches * Math.sin(theta);
    const retinaIn = ppi > 0 ? Math.round(3438 / ppi) : 0;
    return {
      ppi: Math.round(ppi),
      pwIn: pwIn.toFixed(1),
      phIn: phIn.toFixed(1),
      pwCm: (pwIn * 2.54).toFixed(1),
      phCm: (phIn * 2.54).toFixed(1),
      mp: ((displayB.width * displayB.height) / 1000000).toFixed(2),
      retinaIn,
      retinaCm: Math.round(retinaIn * 2.54),
      aspect: `${displayB.width / gcd(displayB.width, displayB.height)}:${displayB.height / gcd(displayB.width, displayB.height)}`,
    };
  }, [displayB]);

  // Tab 2: PPI & Viewing Distance Results
  const ppiResults = useMemo(() => {
    const size = safeParsePositive(ppiSizeStr);
    const w = safeParsePositive(ppiWidthStr);
    const h = safeParsePositive(ppiHeightStr);
    const distRaw = safeParsePositive(distanceStr);
    const distInches = distanceUnit === "cm" ? distRaw / 2.54 : distRaw;

    if (size <= 0 || w <= 0 || h <= 0) {
      return {
        isValid: false,
        ppi: 0,
        megapixels: "0",
        pixelPitchMm: "0",
        pwIn: "0",
        phIn: "0",
        pwCm: "0",
        phCm: "0",
        areaSqIn: "0",
        retinaIn: 0,
        retinaCm: 0,
        fovDeg: 0,
        aspectRatio: "--",
      };
    }

    const diagPixels = Math.sqrt(w ** 2 + h ** 2);
    const ppi = diagPixels / size;
    const theta = Math.atan(h / w);
    const pwIn = size * Math.cos(theta);
    const phIn = size * Math.sin(theta);
    const areaSqIn = pwIn * phIn;
    const pixelPitchMm = ppi > 0 ? (25.4 / ppi).toFixed(3) : "0";
    const retinaIn = ppi > 0 ? Math.round(3438 / ppi) : 0;
    const retinaCm = Math.round(retinaIn * 2.54);

    // FOV: 2 * arctan((pw / 2) / distance)
    let fovDeg = 0;
    if (distInches > 0 && pwIn > 0) {
      fovDeg = Math.round(2 * Math.atan((pwIn / 2) / distInches) * (180 / Math.PI));
    }

    const div = gcd(w, h);
    return {
      isValid: true,
      ppi: Math.round(ppi * 10) / 10,
      megapixels: ((w * h) / 1000000).toFixed(2),
      pixelPitchMm,
      pwIn: pwIn.toFixed(1),
      phIn: phIn.toFixed(1),
      pwCm: (pwIn * 2.54).toFixed(1),
      phCm: (phIn * 2.54).toFixed(1),
      areaSqIn: Math.round(areaSqIn).toString(),
      retinaIn,
      retinaCm,
      fovDeg,
      aspectRatio: `${Math.round(w / div)}:${Math.round(h / div)}`,
    };
  }, [ppiSizeStr, ppiWidthStr, ppiHeightStr, distanceStr, distanceUnit]);

  // Tab 3: Resolution & Missing Dimension Results
  const resResults = useMemo(() => {
    const w = safeParsePositive(resWStr);
    const h = safeParsePositive(resHStr);

    let classification = "Custom";
    const totalPixels = w * h;
    if (w === 1920 && h === 1080) classification = "1080p Full HD (FHD)";
    else if (w === 2560 && h === 1440) classification = "1440p Quad HD (QHD)";
    else if (w === 3840 && h === 2160) classification = "4K Ultra HD (UHD)";
    else if (w === 3440 && h === 1440) classification = "UWQHD Ultrawide";
    else if (w === 5120 && h === 2880) classification = "5K Studio Display";
    else if (w === 7680 && h === 4320) classification = "8K Ultra HD";
    else if (w === 1280 && h === 720) classification = "720p Standard HD";

    const div = gcd(w, h);
    const aspect = w > 0 && h > 0 ? `${Math.round(w / div)}:${Math.round(h / div)}` : "--";

    // Missing dimension solver
    const targetRatio = STANDARD_RATIOS[targetRatioIndex] || STANDARD_RATIOS[0];
    const knownVal = safeParsePositive(knownValueStr);
    let solvedDimension = 0;
    let solvedTotalPixels = 0;

    if (knownVal > 0) {
      if (knownDimension === "width") {
        solvedDimension = Math.round((knownVal * targetRatio.rh) / targetRatio.rw);
        // Round to even integer
        solvedDimension = solvedDimension % 2 === 0 ? solvedDimension : solvedDimension + 1;
        solvedTotalPixels = knownVal * solvedDimension;
      } else {
        solvedDimension = Math.round((knownVal * targetRatio.rw) / targetRatio.rh);
        solvedDimension = solvedDimension % 2 === 0 ? solvedDimension : solvedDimension + 1;
        solvedTotalPixels = solvedDimension * knownVal;
      }
    }

    return {
      isValid: w > 0 && h > 0,
      aspect,
      totalPixels: totalPixels.toLocaleString(),
      megapixels: (totalPixels / 1000000).toFixed(2),
      classification,
      solvedDimension,
      solvedTotalPixels: solvedTotalPixels.toLocaleString(),
      solvedMegapixels: (solvedTotalPixels / 1000000).toFixed(2),
    };
  }, [resWStr, resHStr, targetRatioIndex, knownDimension, knownValueStr]);

  // Tab 4: Aspect Ratio Results
  const arResults = useMemo(() => {
    const w = safeParsePositive(arWidthStr);
    const h = safeParsePositive(arHeightStr);

    if (w <= 0 || h <= 0) {
      return {
        isValid: false,
        simplified: "--",
        decimal: "0.00:1",
        closestStandard: "--",
        deviationPercent: "0",
      };
    }

    const div = gcd(w, h);
    const rw = Math.round(w / div);
    const rh = Math.round(h / div);
    const decimalVal = w / h;

    // Find nearest standard ratio
    let closest = STANDARD_RATIOS[0];
    let minDiff = Infinity;
    for (const r of STANDARD_RATIOS) {
      const diff = Math.abs(decimalVal - (r.rw / r.rh));
      if (diff < minDiff) {
        minDiff = diff;
        closest = r;
      }
    }

    const standardDecimal = closest.rw / closest.rh;
    const deviation = ((decimalVal - standardDecimal) / standardDecimal) * 100;

    return {
      isValid: true,
      simplified: `${rw}:${rh}`,
      decimal: `${decimalVal.toFixed(2)}:1`,
      closestStandard: closest.label,
      deviationPercent: Math.abs(deviation) < 0.1 ? "0%" : `${deviation > 0 ? "+" : ""}${deviation.toFixed(1)}%`,
    };
  }, [arWidthStr, arHeightStr]);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-500 mb-6">
          <Link href="/tests" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("breadcrumbAll")}</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{t("breadcrumbTitle")}</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-600 mb-2">
            {t("eyebrow")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
            {t("title")}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("comparator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "comparator"
                ? "bg-gray-950 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:text-gray-950"
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>{t("tabs.comparator")}</span>
          </button>

          <button
            onClick={() => setActiveTab("ppi")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "ppi"
                ? "bg-gray-950 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:text-gray-950"
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>{t("tabs.ppi")}</span>
          </button>

          <button
            onClick={() => setActiveTab("resolution")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "resolution"
                ? "bg-gray-950 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:text-gray-950"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t("tabs.resolution")}</span>
          </button>

          <button
            onClick={() => setActiveTab("aspect")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "aspect"
                ? "bg-gray-950 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:text-gray-950"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t("tabs.aspect")}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: DISPLAY COMPARATOR                                 */}
        {/* ========================================================= */}
        {activeTab === "comparator" && (
          <div>
            {/* Notification Toast */}
            {savedObsSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between mb-6">
                <span>{savedObsSuccess}</span>
              </div>
            )}

            {/* Selectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Selector A */}
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase text-gray-500">{t("comparator.displayA")}</span>
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setSourceModeA("preset")}
                      className={`px-2 py-0.5 rounded-md ${sourceModeA === "preset" ? "bg-blue-600 text-white font-semibold" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      {t("comparator.modePreset")}
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => setSourceModeA("saved")}
                      className={`px-2 py-0.5 rounded-md ${sourceModeA === "saved" ? "bg-blue-600 text-white font-semibold" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      {t("comparator.modeSaved")} ({savedProfiles.length})
                    </button>
                  </div>
                </div>

                {sourceModeA === "preset" ? (
                  <select
                    value={selectedA}
                    onChange={(e) => setSelectedA(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium text-gray-900"
                  >
                    {PRESETS.map((p, idx) => (
                      <option key={idx} value={idx}>{p.name}</option>
                    ))}
                  </select>
                ) : (
                  <div>
                    {savedProfiles.length === 0 ? (
                      <div className="text-xs text-gray-500 p-2 bg-white rounded-xl border border-gray-200">
                        {t("comparator.noSaved")} <Link href="/monitor-inspection/summary" className="text-blue-600 underline">{t("comparator.summaryLink")}</Link>.
                      </div>
                    ) : (
                      <select
                        value={selectedSavedA}
                        onChange={(e) => setSelectedSavedA(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium text-gray-900"
                      >
                        {savedProfiles.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.brand || p.model ? `${p.brand} ${p.model}`.trim() : "Custom Profile"} {p.size ? `(${p.size})` : ""}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              {/* Selector B */}
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase text-gray-500">{t("comparator.displayB")}</span>
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setSourceModeB("preset")}
                      className={`px-2 py-0.5 rounded-md ${sourceModeB === "preset" ? "bg-purple-600 text-white font-semibold" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      {t("comparator.modePreset")}
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => setSourceModeB("saved")}
                      className={`px-2 py-0.5 rounded-md ${sourceModeB === "saved" ? "bg-purple-600 text-white font-semibold" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      {t("comparator.modeSaved")} ({savedProfiles.length})
                    </button>
                  </div>
                </div>

                {sourceModeB === "preset" ? (
                  <select
                    value={selectedB}
                    onChange={(e) => setSelectedB(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium text-gray-900"
                  >
                    {PRESETS.map((p, idx) => (
                      <option key={idx} value={idx}>{p.name}</option>
                    ))}
                  </select>
                ) : (
                  <div>
                    {savedProfiles.length === 0 ? (
                      <div className="text-xs text-gray-500 p-2 bg-white rounded-xl border border-gray-200">
                        {t("comparator.noSaved")} <Link href="/monitor-inspection/summary" className="text-blue-600 underline">{t("comparator.summaryLink")}</Link>.
                      </div>
                    ) : (
                      <select
                        value={selectedSavedB}
                        onChange={(e) => setSelectedSavedB(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium text-gray-900"
                      >
                        {savedProfiles.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.brand || p.model ? `${p.brand} ${p.model}`.trim() : "Custom Profile"} {p.size ? `(${p.size})` : ""}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Side-by-side Technical Metrics Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-10 shadow-2xs">
              <div className="bg-slate-50 px-5 py-3 border-b border-gray-200 font-mono text-xs uppercase font-semibold text-gray-600 flex items-center justify-between">
                <span>{t("hardwareComparison")}</span>
                <span className="text-[10px] text-gray-600">{t("benchmarks")}</span>
              </div>
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="py-3 px-5 font-mono text-xs font-semibold text-gray-500 uppercase">{t("parameter")}</th>
                    <th className="py-3 px-5 font-mono text-xs font-semibold text-blue-600 uppercase">{displayA.name}</th>
                    <th className="py-3 px-5 font-mono text-xs font-semibold text-purple-600 uppercase">{displayB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono text-xs sm:text-sm">
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.ppi")}</td>
                    <td className="py-3 px-5 font-bold text-gray-950">{specsA.ppi} PPI</td>
                    <td className="py-3 px-5 font-bold text-gray-950">{specsB.ppi} PPI</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.nativeRes")}</td>
                    <td className="py-3 px-5 text-gray-900">{displayA.width} × {displayA.height}</td>
                    <td className="py-3 px-5 text-gray-900">{displayB.width} × {displayB.height}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.refreshRate")}</td>
                    <td className="py-3 px-5 text-gray-900 font-semibold">{displayA.refreshRate || "60Hz"}</td>
                    <td className="py-3 px-5 text-gray-900 font-semibold">{displayB.refreshRate || "60Hz"}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.panelType")}</td>
                    <td className="py-3 px-5 text-gray-900">{displayA.panelType || "IPS"}</td>
                    <td className="py-3 px-5 text-gray-900">{displayB.panelType || "IPS"}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.megapixels")}</td>
                    <td className="py-3 px-5 text-gray-900">{specsA.mp} MP</td>
                    <td className="py-3 px-5 text-gray-900">{specsB.mp} MP</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.widthHeight")}</td>
                    <td className="py-3 px-5 text-gray-900">{specsA.pwIn}&quot; × {specsA.phIn}&quot; ({specsA.pwCm} × {specsA.phCm} cm)</td>
                    <td className="py-3 px-5 text-gray-900">{specsB.pwIn}&quot; × {specsB.phIn}&quot; ({specsB.pwCm} × {specsB.phCm} cm)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.retinaDist")}</td>
                    <td className="py-3 px-5 text-gray-900">≥ {specsA.retinaIn}&quot; ({specsA.retinaCm} cm)</td>
                    <td className="py-3 px-5 text-gray-900">≥ {specsB.retinaIn}&quot; ({specsB.retinaCm} cm)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-sans font-medium text-gray-700">{t("comparator.aspectRatio")}</td>
                    <td className="py-3 px-5 text-gray-900">{specsA.aspect}</td>
                    <td className="py-3 px-5 text-gray-900">{specsB.aspect}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Strict Neutral Evaluation Guarantee Banner */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 mb-10 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                <span>{t("neutralPolicyTitle")}</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-sans">
                {t("neutralPolicyDesc")}
              </p>
            </div>

            {/* User Observations & Subjective Comparison Section */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-2xs mb-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-950">{t("journalTitle")}</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    {t("journalSubtitle")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveObservations}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 shadow-2xs transition-colors shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t("comparator.saveObs")}</span>
                </button>
              </div>

              {/* 1. Color Rendition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-blue-700 mb-1">
                    {displayA.name} — {t("comparator.obsColor")}:
                  </label>
                  <textarea
                    rows={2}
                    value={colorNotesA}
                    onChange={(e) => setColorNotesA(e.target.value)}
                    placeholder={t("comparator.obsColorPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-purple-700 mb-1">
                    {displayB.name} — {t("comparator.obsColor")}:
                  </label>
                  <textarea
                    rows={2}
                    value={colorNotesB}
                    onChange={(e) => setColorNotesB(e.target.value)}
                    placeholder={t("comparator.obsColorPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
              </div>

              {/* 2. Screen Uniformity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-blue-700 mb-1">
                    {displayA.name} — {t("comparator.obsUniformity")}:
                  </label>
                  <textarea
                    rows={2}
                    value={uniformityNotesA}
                    onChange={(e) => setUniformityNotesA(e.target.value)}
                    placeholder={t("comparator.obsUniformityPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-purple-700 mb-1">
                    {displayB.name} — {t("comparator.obsUniformity")}:
                  </label>
                  <textarea
                    rows={2}
                    value={uniformityNotesB}
                    onChange={(e) => setUniformityNotesB(e.target.value)}
                    placeholder={t("comparator.obsUniformityPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
              </div>

              {/* 3. Brightness & Contrast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-blue-700 mb-1">
                    {displayA.name} — {t("comparator.obsBrightness")}:
                  </label>
                  <textarea
                    rows={2}
                    value={brightnessNotesA}
                    onChange={(e) => setBrightnessNotesA(e.target.value)}
                    placeholder={t("comparator.obsBrightnessPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-purple-700 mb-1">
                    {displayB.name} — {t("comparator.obsBrightness")}:
                  </label>
                  <textarea
                    rows={2}
                    value={brightnessNotesB}
                    onChange={(e) => setBrightnessNotesB(e.target.value)}
                    placeholder={t("comparator.obsBrightnessPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
              </div>

              {/* 4. Motion & Response */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-blue-700 mb-1">
                    {displayA.name} — {t("comparator.obsMotion")}:
                  </label>
                  <textarea
                    rows={2}
                    value={motionNotesA}
                    onChange={(e) => setMotionNotesA(e.target.value)}
                    placeholder={t("comparator.obsMotionPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold text-purple-700 mb-1">
                    {displayB.name} — {t("comparator.obsMotion")}:
                  </label>
                  <textarea
                    rows={2}
                    value={motionNotesB}
                    onChange={(e) => setMotionNotesB(e.target.value)}
                    placeholder={t("comparator.obsMotionPlaceholder")}
                    className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                </div>
              </div>

              {/* Overall Personal Verdict */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  {t("verdictLabel")}
                </label>
                <textarea
                  rows={2}
                  value={userConclusion}
                  onChange={(e) => setUserConclusion(e.target.value)}
                  placeholder={t("verdictPlaceholder")}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PPI & VIEWING DISTANCE CALCULATOR                  */}
        {/* ========================================================= */}
        {activeTab === "ppi" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              {/* Inputs Form */}
              <div className="lg:col-span-5 border border-gray-200 rounded-2xl p-6 bg-gray-50/70 space-y-4">
                <h3 className="text-sm font-semibold text-gray-950 uppercase tracking-wider font-mono">
                  {t("ppi.title")}
                </h3>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("ppi.screenDiagonal")}</label>
                  <input
                    type="number"
                    step="0.1"
                    value={ppiSizeStr}
                    onChange={(e) => setPpiSizeStr(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                    placeholder="e.g. 27"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{t("ppi.resWidth")}</label>
                    <input
                      type="number"
                      step="1"
                      value={ppiWidthStr}
                      onChange={(e) => setPpiWidthStr(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                      placeholder="e.g. 2560"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{t("ppi.resHeight")}</label>
                    <input
                      type="number"
                      step="1"
                      value={ppiHeightStr}
                      onChange={(e) => setPpiHeightStr(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                      placeholder="e.g. 1440"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-700">{t("ppi.viewingDist")}</label>
                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      <button
                        onClick={() => setDistanceUnit("in")}
                        className={`px-2 py-0.5 rounded ${distanceUnit === "in" ? "bg-gray-950 text-white" : "text-gray-500"}`}
                      >
                        {t("ppi.unitInches")}
                      </button>
                      <button
                        onClick={() => setDistanceUnit("cm")}
                        className={`px-2 py-0.5 rounded ${distanceUnit === "cm" ? "bg-gray-950 text-white" : "text-gray-500"}`}
                      >
                        {t("ppi.unitCm")}
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    value={distanceStr}
                    onChange={(e) => setDistanceStr(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                    placeholder="e.g. 26"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase text-gray-600 block mb-2">{t("quickSizes")}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { s: "24", w: "1920", h: "1080", label: "24\" 1080p" },
                      { s: "27", w: "2560", h: "1440", label: "27\" 1440p" },
                      { s: "27", w: "3840", h: "2160", label: "27\" 4K" },
                      { s: "32", w: "3840", h: "2160", label: "32\" 4K" },
                      { s: "34", w: "3440", h: "1440", label: "34\" UW" },
                      { s: "16", w: "3456", h: "2234", label: "16\" Retina" },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => {
                          setPpiSizeStr(btn.s);
                          setPpiWidthStr(btn.w);
                          setPpiHeightStr(btn.h);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white border border-gray-200 hover:border-gray-400 font-mono text-gray-700 transition-colors"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Results */}
              <div className="lg:col-span-7 border border-gray-200 rounded-2xl p-6 bg-white flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-950 uppercase tracking-wider font-mono mb-4">
                    {t("ppi.specTitle")}
                  </h3>

                  {ppiResults.isValid ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("ppi.cardDensity")}</span>
                        <span className="text-2xl font-bold font-mono text-gray-950 tabular-nums">
                          {ppiResults.ppi} <span className="text-xs font-normal">PPI</span>
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("ppi.cardRetina")}</span>
                        <span className="text-2xl font-bold font-mono text-blue-600 tabular-nums">
                          {ppiResults.retinaIn}&quot; <span className="text-xs font-normal text-gray-500">({ppiResults.retinaCm}cm)</span>
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("ppi.cardFov")}</span>
                        <span className="text-2xl font-bold font-mono text-emerald-600 tabular-nums">
                          {ppiResults.fovDeg > 0 ? `${ppiResults.fovDeg}°` : "--"}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("ppi.cardPitch")}</span>
                        <span className="text-lg font-bold font-mono text-gray-900 tabular-nums">
                          {ppiResults.pixelPitchMm} mm
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("ppi.specDimensions")}</span>
                        <span className="text-sm font-bold font-mono text-gray-900 block tabular-nums">
                          {ppiResults.pwIn}&quot; × {ppiResults.phIn}&quot;
                        </span>
                        <span className="text-[11px] text-gray-500 font-mono">
                          {ppiResults.pwCm} × {ppiResults.phCm} cm
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("ppi.specTotalPixels")}</span>
                        <span className="text-lg font-bold font-mono text-gray-900 tabular-nums">
                          {ppiResults.megapixels} MP
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl mb-6">
                      {t("invalidPositive")}
                    </div>
                  )}
                </div>

                {/* Educational Viewing Distance Guidance */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-gray-900">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>{t("guidanceTitle")}</span>
                  </div>
                  <p>
                    {t("guidanceAcuity", { dist: `${ppiResults.retinaIn}" / ${ppiResults.retinaCm}cm` })}
                  </p>
                  <p>
                    {t("guidanceErgonomic")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: RESOLUTION CALCULATOR & MISSING DIMENSION SOLVER   */}
        {/* ========================================================= */}
        {activeTab === "resolution" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Box A: Direct Resolution Classification */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/70">
              <h3 className="text-sm font-semibold text-gray-950 uppercase tracking-wider font-mono mb-4">
                {t("resolution.title")}
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("resolution.dimWidth")}</label>
                  <input
                    type="number"
                    value={resWStr}
                    onChange={(e) => setResWStr(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                    placeholder="1920"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("resolution.dimHeight")}</label>
                  <input
                    type="number"
                    value={resHStr}
                    onChange={(e) => setResHStr(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                    placeholder="1080"
                  />
                </div>
              </div>

              {resResults.isValid ? (
                <div className="space-y-2.5 text-xs font-mono pt-2 border-t border-gray-200">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-sans">{t("resolution.standardClass")}:</span>
                    <span className="font-bold text-gray-900">{resResults.classification}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-sans">{t("resolution.aspectName")}:</span>
                    <span className="font-bold text-blue-600">{resResults.aspect}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-sans">{t("resolution.totalPixels")}:</span>
                    <span className="font-bold text-gray-900">{resResults.totalPixels}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-sans">{t("comparator.megapixels")}:</span>
                    <span className="font-bold text-gray-900">{resResults.megapixels} MP</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 py-4 text-center">
                  {t("invalidPositive")}
                </div>
              )}
            </div>

            {/* Box B: Missing Dimension Solver */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
              <h3 className="text-sm font-semibold text-gray-950 uppercase tracking-wider font-mono mb-4">
                {t("resolution.subtitle")}
              </h3>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">{t("resolution.targetRatio")}</label>
                <select
                  value={targetRatioIndex}
                  onChange={(e) => setTargetRatioIndex(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-gray-900"
                >
                  {STANDARD_RATIOS.map((r, idx) => (
                    <option key={idx} value={idx}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("resolution.knownDim")}</label>
                  <select
                    value={knownDimension}
                    onChange={(e) => setKnownDimension(e.target.value as "width" | "height")}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 capitalize"
                  >
                    <option value="width">{t("knownWidth")}</option>
                    <option value="height">{t("knownHeight")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("resolution.valuePx")}</label>
                  <input
                    type="number"
                    value={knownValueStr}
                    onChange={(e) => setKnownValueStr(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                    placeholder="e.g. 3840"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono space-y-2">
                <div className="text-gray-500 font-sans">
                  {t("calculatedMissing", { dim: knownDimension === "width" ? t("resolution.dimHeight") : t("resolution.dimWidth") })}
                </div>
                <div className="text-2xl font-bold text-gray-950">
                  {resResults.solvedDimension > 0 ? `${resResults.solvedDimension} px` : "--"}
                </div>
                <div className="text-gray-500 text-[11px] font-sans">
                  {t("fullResolution", {
                    val: knownDimension === "width" ? `${knownValueStr} × ${resResults.solvedDimension}` : `${resResults.solvedDimension} × ${knownValueStr}`,
                    mp: resResults.solvedMegapixels
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ASPECT RATIO CALCULATOR                            */}
        {/* ========================================================= */}
        {activeTab === "aspect" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-5 border border-gray-200 rounded-2xl p-6 bg-gray-50/70 space-y-4">
              <h3 className="text-sm font-semibold text-gray-950 uppercase tracking-wider font-mono">
                {t("aspect.title")}
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t("aspect.inputWidth")}</label>
                <input
                  type="number"
                  value={arWidthStr}
                  onChange={(e) => setArWidthStr(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                  placeholder="2560"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t("aspect.inputHeight")}</label>
                <input
                  type="number"
                  value={arHeightStr}
                  onChange={(e) => setArHeightStr(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-mono text-gray-900"
                  placeholder="1080"
                />
              </div>

              {/* Standard Ratio Presets */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-gray-600 block mb-2">{t("commonRatios")}</span>
                <div className="flex flex-wrap gap-1.5">
                  {STANDARD_RATIOS.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => {
                        setArWidthStr((r.rw * 120).toString());
                        setArHeightStr((r.rh * 120).toString());
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white border border-gray-200 hover:border-gray-400 font-mono text-gray-700 transition-colors"
                    >
                      {r.rw}:{r.rh}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border border-gray-200 rounded-2xl p-6 bg-white flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-950 uppercase tracking-wider font-mono mb-4">
                  {t("aspect.subtitle")}
                </h3>

                {arResults.isValid ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("aspect.simplifiedRatio")}</span>
                      <span className="text-2xl font-bold font-mono text-blue-600 tabular-nums">
                        {arResults.simplified}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("aspect.decimalRatio")}</span>
                      <span className="text-2xl font-bold font-mono text-gray-950 tabular-nums">
                        {arResults.decimal}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("aspect.nearestStandard")}</span>
                      <span className="text-sm font-bold text-gray-950 block truncate">
                        {arResults.closestStandard}
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {t("deviation", { val: arResults.deviationPercent })}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 py-6 text-center border border-dashed border-gray-200 rounded-xl mb-6">
                    {t("invalidPositive")}
                  </div>
                )}
              </div>

              {/* Wireframe Proportional Shape Box */}
              {arResults.isValid && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-mono uppercase text-gray-600 mb-3">
                    {t("aspectPreview")}
                  </span>
                  <div
                    style={{
                      width: "160px",
                      height: `${Math.min(140, Math.max(30, Math.round(160 / (safeParsePositive(arWidthStr) / safeParsePositive(arHeightStr)))))}px`,
                    }}
                    className="border-2 border-gray-950 bg-gray-200/80 rounded flex items-center justify-center transition-all shadow-inner"
                  >
                    <span className="text-xs font-mono font-bold text-gray-900">
                      {arResults.simplified}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature Explainer & Search Intent Details */}
        {educationalContent && (
          <div className="w-full mt-12 space-y-6">
            {educationalContent}
            <KnowledgeBaseCallout testId="compare-displays" />
          </div>
        )}
      </div>
    </div>
  );
}

