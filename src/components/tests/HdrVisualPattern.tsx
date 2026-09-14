"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import {
  SunMedium,
  Layers,
  Sliders,
  Eye,
  Moon,
  Sparkles,
  Maximize,
  Minimize,
  Square,
  Activity,
  ShieldAlert,
  Info,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface HdrVisualPatternProps {
  testId?: string;
}

type HdrViewMode = "specular" | "apl" | "toneCurve" | "shadows" | "gamut";
type BgLuminance = "black" | "dark" | "mid";

interface HighlightSwatch {
  label: string;
  bgRgb: number;
  deltaRgb: number;
}

const HIGHLIGHT_SWATCHES: HighlightSwatch[] = [
  { label: "90% White", bgRgb: 230, deltaRgb: 6 },
  { label: "93% White", bgRgb: 238, deltaRgb: 5 },
  { label: "96% White", bgRgb: 245, deltaRgb: 4 },
  { label: "98% White", bgRgb: 250, deltaRgb: 3 },
  { label: "99% White", bgRgb: 253, deltaRgb: 2 },
  { label: "100% Peak", bgRgb: 255, deltaRgb: -3 }
];

const SHADOW_SWATCHES = [
  { label: "0% Black", hex: "#000000", rgb: "rgb(0,0,0)", val: 0 },
  { label: "0.5% Gray", hex: "#010101", rgb: "rgb(1,1,1)", val: 1 },
  { label: "1% Gray", hex: "#030303", rgb: "rgb(3,3,3)", val: 3 },
  { label: "2% Gray", hex: "#050505", rgb: "rgb(5,5,5)", val: 5 },
  { label: "3% Gray", hex: "#080808", rgb: "rgb(8,8,8)", val: 8 },
  { label: "5% Gray", hex: "#0D0D0D", rgb: "rgb(13,13,13)", val: 13 },
  { label: "8% Gray", hex: "#141414", rgb: "rgb(20,20,20)", val: 20 },
  { label: "10% Gray", hex: "#1A1A1A", rgb: "rgb(26,26,26)", val: 26 }
];

function subscribeMediaQuery(query: string, callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => subscribeMediaQuery(query, cb),
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false
  );
}

function useColorDepth(): number {
  return useSyncExternalStore(
    () => () => {},
    () => (typeof window !== "undefined" ? window.screen.colorDepth || 24 : 24),
    () => 24
  );
}

export function HdrVisualPattern({ testId = "hdr-test" }: HdrVisualPatternProps) {
  const t = useTranslations("Tests.HdrVisualPattern");
  const { isFullscreen, toggleFullscreen, registerNavigation } = useTestContext();

  const [activeTab, setActiveTab] = useState<HdrViewMode>("specular");
  const [bgLum, setBgLum] = useState<BgLuminance>("black");
  const [sensitivityOffset, setSensitivityOffset] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [aplSize, setAplSize] = useState<"10%" | "25%" | "50%" | "100%">("10%");
  const [showHud, setShowHud] = useState(true);

  // Live browser pipeline status indicators
  const hdrSupported = useMediaQuery("(dynamic-range: high)");
  const p3Supported = useMediaQuery("(color-gamut: p3)");
  const rec2020Supported = useMediaQuery("(color-gamut: rec2020)");
  const colorDepth = useColorDepth();

  // Momentary blink helper for reticles
  const triggerBlink = useCallback(() => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 400);
  }, []);

  // Keyboard navigation & cycling
  const cycleNext = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "specular") return "apl";
      if (curr === "apl") return "toneCurve";
      if (curr === "toneCurve") return "shadows";
      if (curr === "shadows") return "gamut";
      return "specular";
    });
    setShowHud(true);
  }, []);

  const cyclePrev = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "gamut") return "shadows";
      if (curr === "shadows") return "toneCurve";
      if (curr === "toneCurve") return "apl";
      if (curr === "apl") return "specular";
      return "gamut";
    });
    setShowHud(true);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleNext,
      prev: cyclePrev,
      reset: () => {
        setActiveTab("specular");
        setBgLum("black");
        setSensitivityOffset(0);
      }
    });
  }, [registerNavigation, cycleNext, cyclePrev]);

  // Fullscreen HUD auto-fade
  useEffect(() => {
    if (!isFullscreen) {
      setShowHud(true);
      return;
    }
    setShowHud(true);
    const timer = setTimeout(() => setShowHud(false), 3200);
    return () => clearTimeout(timer);
  }, [isFullscreen, activeTab]);

  // Keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "1") { setActiveTab("specular"); setShowHud(true); }
      else if (e.key === "2") { setActiveTab("apl"); setShowHud(true); }
      else if (e.key === "3") { setActiveTab("toneCurve"); setShowHud(true); }
      else if (e.key === "4") { setActiveTab("shadows"); setShowHud(true); }
      else if (e.key === "5") { setActiveTab("gamut"); setShowHud(true); }
      else if (e.key.toLowerCase() === "f") { toggleFullscreen(); }
      else if (e.key.toLowerCase() === "b") { triggerBlink(); }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen, triggerBlink]);

  const bgStyle =
    bgLum === "black" ? "#000000" : bgLum === "dark" ? "#0d0d10" : "#2a2a30";

  return (
    <div className={cn("relative w-full flex flex-col items-center", isFullscreen && "h-full")}>
      
      {/* Pattern Viewport */}
      <div
        className={cn(
          "relative w-full overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 select-none transition-colors duration-200",
          isFullscreen
            ? "h-full rounded-none border-none"
            : "aspect-video min-h-[460px] max-h-[75vh] rounded-2xl border border-slate-800 shadow-2xl"
        )}
        style={{ backgroundColor: bgStyle }}
      >
        {/* Fullscreen Floating HUD */}
        {isFullscreen && (
          <div
            className={cn(
              "absolute top-6 left-6 z-30 transition-opacity duration-300 pointer-events-none",
              showHud ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-white shadow-2xl space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                {t("fullscreenHudVisualCalibration")}
              </span>
              <span className="text-sm font-bold block">
                {activeTab === "specular" && t("modeSpecularHighlight")}
                {activeTab === "apl" && t("modeAplWindow")}
                {activeTab === "toneCurve" && t("modeToneCurveRamps")}
                {activeTab === "shadows" && t("modeNearBlackShadows")}
                {activeTab === "gamut" && t("modeWideGamutPrimaries")}
              </span>
              <span className="text-[10px] text-white/50 block">
                {t("fullscreenHudInstructions")}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 1: SPECULAR HIGHLIGHT CLIPPING & RETICLE SEPARATION  */}
        {/* ========================================================= */}
        {activeTab === "specular" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6 my-auto">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                {t("highlightClippingPeakWhite")}
              </span>
              <p className="text-xs text-slate-400 max-w-lg">
                {t("inspectWhetherSubtleCircular")}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full max-w-4xl">
              {HIGHLIGHT_SWATCHES.map((swatch) => {
                const adjustedDelta = swatch.deltaRgb + (swatch.deltaRgb > 0 ? sensitivityOffset : -sensitivityOffset);
                const targetRgb = Math.max(0, Math.min(255, swatch.bgRgb + adjustedDelta));

                return (
                  <div
                    key={swatch.label}
                    className="flex flex-col items-center p-3 rounded-2xl border border-white/20 bg-slate-900/70 shadow-xl"
                  >
                    <div
                      className="w-full aspect-square rounded-xl flex items-center justify-center relative shadow-inner overflow-hidden"
                      style={{ backgroundColor: `rgb(${swatch.bgRgb}, ${swatch.bgRgb}, ${swatch.bgRgb})` }}
                    >
                      {/* High-Precision Multi-Ring Reticle */}
                      <div
                        className={cn(
                          "relative w-12 h-12 flex items-center justify-center transition-opacity duration-150",
                          isBlinking ? "opacity-0" : "opacity-100"
                        )}
                      >
                        <div
                          className="absolute inset-0 rounded-full border-[2px]"
                          style={{ borderColor: `rgb(${targetRgb}, ${targetRgb}, ${targetRgb})` }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `rgb(${targetRgb}, ${targetRgb}, ${targetRgb})` }}
                        />
                      </div>
                    </div>
                    <span className="mt-2.5 text-xs font-mono text-white font-bold">{swatch.label}</span>
                    <span className="text-[10px] font-mono text-white/50">RGB {swatch.bgRgb}</span>
                  </div>
                );
              })}
            </div>

            {/* Diagnostic Interpretation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl text-[11px] text-center">
              <div className="px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                <strong>{t("allReticlesVisibleTitle")}:</strong> {t("allReticlesVisibleDesc")}
              </div>
              <div className="px-3 py-1 rounded-lg bg-amber-950/40 border border-amber-900/50 text-amber-300">
                <strong>{t("nearPeakBlownOutTitle")}:</strong> {t("nearPeakBlownOutDesc")}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: 10% APL PEAK LUMINANCE BURST WINDOW (INDUSTRY STD)*/}
        {/* ========================================================= */}
        {activeTab === "apl" && (
          <div className="w-full h-full flex flex-col items-center justify-center my-auto relative">
            <div className="text-center space-y-1 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
                <Flame className="w-4 h-4" /> {t("aplBurstWindowTitle")}
              </span>
              <p className="text-xs text-slate-400 max-w-lg">
                {t("aplBurstWindowSubtitle")}
              </p>
            </div>

            {/* Center Peak Luminance Burst Target */}
            <div className="flex items-center justify-center my-auto p-4 w-full">
              <div
                className={cn(
                  "bg-white flex flex-col items-center justify-center text-black font-mono font-black shadow-[0_0_50px_rgba(255,255,255,0.7)] transition-all duration-300 rounded-xl",
                  aplSize === "10%" && "w-32 h-32 sm:w-44 sm:h-44 text-sm sm:text-base",
                  aplSize === "25%" && "w-48 h-48 sm:w-64 sm:h-64 text-base sm:text-lg",
                  aplSize === "50%" && "w-64 h-64 sm:w-96 sm:h-96 text-lg sm:text-xl",
                  aplSize === "100%" && "w-full h-72 sm:h-96 text-xl"
                )}
              >
                <span>100% PEAK WHITE</span>
                <span className="text-[10px] sm:text-xs font-normal opacity-70">RGB 255 (Max Luminance)</span>
                <span className="text-[9px] font-mono mt-1 opacity-50">{aplSize} Window APL</span>
              </div>
            </div>

            {/* Window Size Selector Strip */}
            <div className="flex items-center gap-2 mt-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white">
              <span className="text-white/50 text-[11px] font-mono">{t("aplSizeLabel")}:</span>
              {(["10%", "25%", "50%", "100%"] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setAplSize(sz)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                    aplSize === sz ? "bg-white text-black shadow-xs font-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: PQ / EOTF TONE CURVE & 10-BIT QUANTIZATION RAMPS   */}
        {/* ========================================================= */}
        {activeTab === "toneCurve" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-5 my-auto max-w-3xl">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                {t("toneCurveGradationTitle")}
              </span>
              <p className="text-xs text-slate-400 max-w-lg">
                {t("toneCurveGradationSubtitle")}
              </p>
            </div>

            {/* Smooth 10-bit High Bitrate Ramp */}
            <div className="w-full space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{t("continuous10BitRamp")}</span>
                <span>0% → 100%</span>
              </div>
              <div
                className="h-14 w-full rounded-xl border border-white/20 shadow-inner"
                style={{ background: "linear-gradient(to right, #000000 0%, #ffffff 100%)" }}
              />
            </div>

            {/* Stepped 8-bit Quantized Ramp */}
            <div className="w-full space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{t("stepped8BitQuantizedRamp")}</span>
                <span>32 discrete steps</span>
              </div>
              <div className="h-14 w-full rounded-xl overflow-hidden flex border border-white/20 shadow-inner">
                {Array.from({ length: 32 }).map((_, i) => {
                  const lum = Math.round((i / 31) * 255);
                  return (
                    <div
                      key={i}
                      className="flex-1 h-full border-r border-white/5 last:border-r-0"
                      style={{ backgroundColor: `rgb(${lum}, ${lum}, ${lum})` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 max-w-lg text-center">
              {t("toneCurveInspectionTip")}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 4: NEAR-BLACK SHADOW DETAIL & BLACK CRUSH             */}
        {/* ========================================================= */}
        {activeTab === "shadows" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6 my-auto">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                {t("nearBlackShadowDetail")}
              </span>
              <p className="text-xs text-slate-400 max-w-lg">
                {t("inADimmedRoom")}
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 w-full max-w-3xl">
              {SHADOW_SWATCHES.map((swatch) => (
                <div
                  key={swatch.label}
                  className="flex flex-col items-center p-2 rounded-xl border border-white/15 bg-black"
                >
                  <div
                    className="w-full aspect-square rounded-lg border border-white/20 flex items-center justify-center"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div className="w-3 h-3 rounded-xs border border-white/30" />
                  </div>
                  <span className="mt-2 text-[10px] font-mono text-white text-center font-bold">
                    {swatch.label}
                  </span>
                  <span className="text-[9px] font-mono text-white/40">
                    +{swatch.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 max-w-lg text-center">
              {t("shadowInspectionTip")}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 5: WIDE GAMUT VISUAL SATURATION (sRGB vs P3 vs Rec2020)*/}
        {/* ========================================================= */}
        {activeTab === "gamut" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6 my-auto">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                {t("wideColorGamutPrimaries")}
              </span>
              <p className="text-xs text-slate-400 max-w-lg">
                {t("displaysSupportingDciP3")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              {/* Red */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-white/10 space-y-2 text-center">
                <div
                  className="h-24 rounded-xl shadow-lg"
                  style={{ backgroundColor: "color(display-p3 1 0 0, rgb(255, 0, 0))" }}
                />
                <span className="text-xs font-mono text-white font-bold block">{t("p3DeepRed")}</span>
                <span className="text-[10px] font-mono text-white/50 block">color(display-p3 1 0 0)</span>
              </div>

              {/* Green */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-white/10 space-y-2 text-center">
                <div
                  className="h-24 rounded-xl shadow-lg"
                  style={{ backgroundColor: "color(display-p3 0 1 0, rgb(0, 255, 0))" }}
                />
                <span className="text-xs font-mono text-white font-bold block">{t("p3EmeraldGreen")}</span>
                <span className="text-[10px] font-mono text-white/50 block">color(display-p3 0 1 0)</span>
              </div>

              {/* Blue */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-white/10 space-y-2 text-center">
                <div
                  className="h-24 rounded-xl shadow-lg"
                  style={{ backgroundColor: "color(display-p3 0 0 1, rgb(0, 0, 255))" }}
                />
                <span className="text-xs font-mono text-white font-bold block">{t("p3RoyalBlue")}</span>
                <span className="text-[10px] font-mono text-white/50 block">color(display-p3 0 0 1)</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Detected Browser Capabilities Overlay Badge */}
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono text-slate-300 shadow-lg">
          <div className="flex items-center gap-1">
            <span className="text-white/40">HDR:</span>
            <strong className={hdrSupported ? "text-emerald-400" : "text-amber-400"}>
              {hdrSupported === null ? "..." : hdrSupported ? "ACTIVE" : "INACTIVE"}
            </strong>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1">
            <span className="text-white/40">P3:</span>
            <strong className={p3Supported ? "text-emerald-400" : "text-slate-400"}>
              {p3Supported ? "YES" : "SDR"}
            </strong>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1">
            <span className="text-white/40">Buffer:</span>
            <strong className="text-white">{colorDepth ? `${colorDepth}-bit` : "--"}</strong>
          </div>
        </div>

      </div>

      {/* Control Strip */}
      <TestInlineControls>
        <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-4">
          
          {/* Top Row: Mode Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "specular", label: t("modeSpecularHighlight"), icon: SunMedium },
                { id: "apl", label: t("modeAplWindow"), icon: Flame },
                { id: "toneCurve", label: t("modeToneCurveRamps"), icon: Layers },
                { id: "shadows", label: t("modeNearBlackShadows"), icon: Moon },
                { id: "gamut", label: t("modeWideGamutPrimaries"), icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as HdrViewMode)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-foreground text-background shadow-xs font-bold"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Fullscreen & Blink Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerBlink}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer"
                title={t("flashReticlesTitle")}
              >
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>{t("flashReticles")}</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                <span>{isFullscreen ? t("exitFullscreen") : t("fullscreenF")}</span>
              </button>
            </div>
          </div>

          {/* Sub Controls: Background Luminance & Sensitivity */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono">{t("bgLuminanceLabel")}:</span>
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                {(["black", "dark", "mid"] as const).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBgLum(bg)}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      bgLum === bg
                        ? "bg-foreground text-background shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {bg === "black" ? t("bgBlack0") : bg === "dark" ? t("bgDark5") : t("bgMid18")}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "specular" && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono">{t("reticleDeltaOffset")}:</span>
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                  {[-1, 0, 1, 2].map((offset) => (
                    <button
                      key={offset}
                      onClick={() => setSensitivityOffset(offset)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all cursor-pointer ${
                        sensitivityOffset === offset
                          ? "bg-foreground text-background shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {offset === 0 ? "Standard" : offset > 0 ? `+${offset}` : `${offset}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </TestInlineControls>

      <TestControlBar testId={testId} title={t("hdrVisualCalibrationBarTitle")} />
    </div>
  );
}
