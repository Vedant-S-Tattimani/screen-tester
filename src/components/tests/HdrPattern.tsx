"use client";

import { useEffect, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { SunMedium, CheckCircle, Monitor, Layers, Sliders, Info, ShieldCheck, Eye, Moon } from "lucide-react";

interface HdrPatternProps {
  testId?: string;
}

type HdrViewMode = "overview" | "banding" | "specular" | "shadow";
type SensitivityLevel = "standard" | "subtle" | "ultrafine";

interface HighlightCardData {
  label: string;
  bgRgb: number;
  reticleDeltas: {
    standard: number;   // ~2-3% delta
    subtle: number;     // ~1-1.5% delta
    ultrafine: number;  // ~0.5-0.8% delta
  };
}

const HIGHLIGHT_CARDS: HighlightCardData[] = [
  {
    label: "92% White",
    bgRgb: 235,
    reticleDeltas: { standard: 8, subtle: 5, ultrafine: 2 }, // Target: 243, 240, 237
  },
  {
    label: "96% White",
    bgRgb: 245,
    reticleDeltas: { standard: 6, subtle: 4, ultrafine: 2 }, // Target: 251, 249, 247
  },
  {
    label: "98% White",
    bgRgb: 250,
    reticleDeltas: { standard: 4, subtle: 3, ultrafine: 2 }, // Target: 254, 253, 252
  },
  {
    label: "100% Peak",
    bgRgb: 255,
    reticleDeltas: { standard: -5, subtle: -3, ultrafine: -2 }, // Target: 250, 252, 253 on pure white
  },
];

export function HdrPattern({ testId = "hdr-capability-test" }: HdrPatternProps) {
  const { registerNavigation } = useTestContext();
  const [hdrSupported, setHdrSupported] = useState<boolean | null>(null);
  const [p3Supported, setP3Supported] = useState<boolean | null>(null);
  const [rec2020Supported, setRec2020Supported] = useState<boolean | null>(null);
  const [colorDepth, setColorDepth] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<HdrViewMode>("specular"); // Highlight clipping is primary inspection view
  const [sensitivity, setSensitivity] = useState<SensitivityLevel>("standard");
  const [isBlinking, setIsBlinking] = useState(false);

  // Probe hardware capabilities
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setHdrSupported(window.matchMedia("(dynamic-range: high)").matches);
        setP3Supported(window.matchMedia("(color-gamut: p3)").matches);
        setRec2020Supported(window.matchMedia("(color-gamut: rec2020)").matches);
        if (window.screen) {
          setColorDepth(window.screen.colorDepth);
        }
      }, 0);
    }
  }, []);

  // Keyboard navigation
  const cycleTabNext = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "overview") return "banding";
      if (curr === "banding") return "specular";
      if (curr === "specular") return "shadow";
      return "overview";
    });
  }, []);

  const cycleTabPrev = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "shadow") return "specular";
      if (curr === "specular") return "banding";
      if (curr === "banding") return "overview";
      return "shadow";
    });
  }, []);

  const resetAll = useCallback(() => {
    setActiveTab("overview");
    setSensitivity("standard");
    setIsBlinking(false);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleTabNext,
      prev: cycleTabPrev,
      reset: resetAll,
    });
  }, [registerNavigation, cycleTabNext, cycleTabPrev, resetAll]);

  // Blink helper: momentarily toggles reticle opacity so users can confirm position
  const triggerBlink = useCallback(() => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 400);
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center p-3 sm:p-6 text-white select-none overflow-y-auto">
        <div className="max-w-4xl w-full flex flex-col items-center gap-4 sm:gap-6 my-auto">
          
          {/* Header & Status Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white/5 border border-white/10 rounded-2xl p-4 sm:px-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                hdrSupported 
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30" 
                  : "bg-white/10 text-white/50 border-white/10"
              }`}>
                <SunMedium className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-semibold font-mono">
                  Hardware Capability & Tone-Mapping
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                  High Dynamic Range (HDR) Diagnostic
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hdrSupported === null ? (
                <span className="text-xs text-white/50 font-mono">Probing Pipeline...</span>
              ) : hdrSupported ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle className="w-3.5 h-3.5" /> High Dynamic Range Active
                </span>
              ) : (
                <span 
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-200 border border-slate-500/30"
                  title="SDR (Standard Dynamic Range) is normal for standard displays. For HDR-capable monitors, press Win + Alt + B in Windows to toggle HDR."
                >
                  <Monitor className="w-3.5 h-3.5 text-slate-400" /> SDR Pipeline (Standard Dynamic Range)
                </span>
              )}
            </div>
          </div>

          {/* Tab Navigation Pill */}
          <div role="tablist" aria-label="HDR View Modes" className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              role="tab"
              aria-selected={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "overview" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pipeline Metrics</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "banding"}
              onClick={() => setActiveTab("banding")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "banding" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>10-Bit Banding Ramp</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "specular"}
              onClick={() => setActiveTab("specular")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "specular" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Highlight Clipping</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "shadow"}
              onClick={() => setActiveTab("shadow")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "shadow" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Shadow Detail</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW & PIPELINE METRICS                        */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50 font-mono font-semibold mb-1">Display Dynamic Range</div>
                  <div className="text-xl font-bold text-white mb-2">CSS dynamic-range</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Queries whether the operating system display compositor is outputting high-luminance extended range values.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Status:</span>
                    <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md ${
                      hdrSupported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/70"
                    }`}>
                      {hdrSupported ? "dynamic-range: high" : "dynamic-range: standard"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Gamut:</span>
                    <span className="font-mono text-white/80">
                      {rec2020Supported ? "Rec.2020 (HDR Wide)" : p3Supported ? "DCI-P3 (Wide Gamut)" : "sRGB (Standard)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50 font-mono font-semibold mb-1">Color Depth</div>
                  <div className="text-xl font-bold text-white mb-2">Hardware Buffer Depth</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Standard SDR monitors render 24-bit (8-bit per channel). True HDR10 panels support 30-bit/32-bit (10-bit per channel, 1.07 billion colors).
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/50">Reported Depth:</span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white/10 text-white/90">
                    {colorDepth ? `${colorDepth}-bit (${colorDepth >= 30 ? "10-bit HDR" : "8-bit SDR"})` : "Probing..."}
                  </span>
                </div>
              </div>

              {/* Physical Panel Reality Check vs Browser Capability */}
              <div className="sm:col-span-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Hardware Reality Check (Browser Signal ≠ True Panel Contrast):</strong> A browser reporting <code className="font-mono bg-black/40 px-1 rounded">dynamic-range: high</code> confirms that your OS/GPU pipeline is transmitting HDR metadata. However, actual HDR picture quality depends completely on physical panel hardware: true per-pixel OLED black levels, or high-zone Full Array Local Dimming (FALD / Mini-LED 1000+ nits). Standard edge-lit &quot;DisplayHDR 400&quot; LCD monitors accept the HDR signal, but global backlight illumination washes out dark scenes and cannot produce true HDR specular pop.
                </div>
              </div>

              <div className="sm:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3 text-xs text-white/70">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Windows Shortcut Tip:</strong> On Windows 10 & 11, press <kbd className="px-1.5 py-0.5 bg-black/60 border border-white/20 rounded font-mono text-[11px] text-white">Win + Alt + B</kbd> to toggle HDR on/off instantly. Ensure your display cable is DisplayPort 1.4 or HDMI 2.0+ for HDR bandwidth.
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: 10-BIT BANDING RAMP                                */}
          {/* ========================================================= */}
          {activeTab === "banding" && (
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                  8-Bit Quantized Stepping vs Continuous Ramp
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  On standard 8-bit SDR panels, gradient stepping shows visible vertical stripe boundaries (color banding). On 10-bit HDR panels, intermediate 10-bit steps blend smoothly without visible seams.
                </p>
              </div>

              {/* 8-bit stepped ramp */}
              <div>
                <div className="text-[11px] font-mono text-white/50 mb-1.5">8-Bit Stepped Gradient (256 discrete levels):</div>
                <div className="h-14 w-full rounded-xl overflow-hidden flex border border-white/10 shadow-inner">
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

              {/* Smooth continuous ramp */}
              <div>
                <div className="text-[11px] font-mono text-white/50 mb-1.5">Smooth High-Bitrate Ramp:</div>
                <div 
                  className="h-14 w-full rounded-xl border border-white/10 shadow-inner" 
                  style={{ background: "linear-gradient(to right, #000000 0%, #ffffff 100%)" }}
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: SPECULAR HIGHLIGHT ROLL-OFF & CLIPPING            */}
          {/* ========================================================= */}
          {activeTab === "specular" && (
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-5 text-center">
              <div>
                <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                  Specular Highlight Roll-Off
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-xl mx-auto leading-relaxed">
                  Compare how your display renders near-peak white luminance. Look closely at the <strong className="text-white">center reticle target</strong> inside each square. If a reticle disappears into solid white, your display is <strong className="text-amber-300">hard-clipping highlights</strong> instead of smoothly tone-mapping near-peak luminance.
                </p>
              </div>

              {/* 4 Calibrated Specular Highlight Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl">
                {HIGHLIGHT_CARDS.map((item, idx) => {
                  const delta = item.reticleDeltas[sensitivity];
                  const reticleRgb = Math.min(255, Math.max(0, item.bgRgb + delta));
                  const reticleColor = `rgb(${reticleRgb}, ${reticleRgb}, ${reticleRgb})`;
                  const cardBg = `rgb(${item.bgRgb}, ${item.bgRgb}, ${item.bgRgb})`;

                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border border-white/20 p-3 flex flex-col items-center justify-between shadow-xl min-h-[170px] sm:min-h-[210px] transition-all relative overflow-hidden"
                      style={{ backgroundColor: cardBg }}
                    >
                      {/* Top Card Header */}
                      <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-black/60 select-none">
                        <span>RGB {item.bgRgb}</span>
                        <span className="text-[9px] uppercase tracking-wider text-black/40">
                          {idx === 3 ? "Peak" : `Box ${idx + 1}`}
                        </span>
                      </div>

                      {/* Prominent Centered Specular Reticle Target */}
                      <div className="my-auto py-2 flex items-center justify-center">
                        <div 
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-opacity duration-150 select-none ${
                            isBlinking ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {/* Outer Concentric Ring */}
                          <div 
                            className="absolute inset-0 rounded-full border-[2.5px]"
                            style={{ borderColor: reticleColor }}
                          />
                          {/* Inner Concentric Ring */}
                          <div 
                            className="absolute w-9 h-9 sm:w-11 sm:h-11 rounded-full border-[2px]"
                            style={{ borderColor: reticleColor }}
                          />
                          {/* Crosshair Horizontal */}
                          <div 
                            className="absolute w-full h-[2px]"
                            style={{ backgroundColor: reticleColor }}
                          />
                          {/* Crosshair Vertical */}
                          <div 
                            className="absolute h-full w-[2px]"
                            style={{ backgroundColor: reticleColor }}
                          />
                          {/* Center Target Core */}
                          <div 
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full z-10 shadow-xs"
                            style={{ backgroundColor: reticleColor }}
                          />
                        </div>
                      </div>

                      {/* Bottom Card Footer */}
                      <div className="text-center w-full select-none pt-1">
                        <div className="text-xs font-mono font-bold text-black">{item.label}</div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-black/60 mt-0.5">
                          Reticle: RGB {reticleRgb} ({delta > 0 ? `+${delta}` : delta})
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Diagnostic Interpretation Guide */}
              <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] sm:text-[11px] text-center mt-1">
                <div className="px-2.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                  <strong className="block text-emerald-200">All 4 Reticles Visible</strong>
                  Excellent tone-mapping; highlight textures are preserved up to peak white.
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-amber-950/30 border border-amber-900/40 text-amber-300">
                  <strong className="block text-amber-200">Reticle 4 Blown Out</strong>
                  Typical SDR/standard clipping; top 2% peak white clips to pure white.
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-300">
                  <strong className="block text-red-200">Reticles 3 & 4 Invisible</strong>
                  Severe highlight clipping; monitor contrast is set too high or HDR tone-mapping is off.
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: SHADOW DETAIL & NEAR-BLACK CLIPPING (HDR)          */}
          {/* ========================================================= */}
          {activeTab === "shadow" && (
            <div className="w-full bg-black border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-5 text-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-mono font-semibold">
                  PQ EOTF Shadow Tracking & Black Floor
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  HDR Near-Black Shadow Detail
                </h3>
                <p className="text-xs text-white/60 max-w-lg mt-1">
                  Evaluates whether HDR low-luminance steps remain distinguishable from true black (0 nits) without crushing or blooming.
                </p>
              </div>

              {/* Near-Black Reference Steps Grid */}
              <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "0.8% Black", val: 2, desc: "Step 2/255" },
                  { label: "1.5% Shadow", val: 4, desc: "Step 4/255" },
                  { label: "3.1% Shadow", val: 8, desc: "Step 8/255" },
                  { label: "6.3% Shadow", val: 16, desc: "Step 16/255" },
                ].map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 relative shadow-inner"
                    style={{ backgroundColor: `rgb(${step.val}, ${step.val}, ${step.val})` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-[10px] font-mono text-white/70"
                      style={{ backgroundColor: `rgb(${step.val + 6}, ${step.val + 6}, ${step.val + 6})` }}
                    >
                      +{step.val}
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-white/80">{step.label}</span>
                    <span className="text-[9px] font-mono text-white/40">{step.desc}</span>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-2xl p-3 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-white/70 space-y-1">
                <strong>What to inspect in HDR mode:</strong>
                <p>
                  1. In a dark room, square #1 (0.8%) should be just barely discernible from the surrounding black. If it is pitch black, your display is <strong>crushing shadows</strong>.
                </p>
                <p>
                  2. On Mini-LED monitors, observe whether local dimming zones create glowing light halos (blooming) around these low-luminance squares. On OLED, each pixel remains completely isolated with zero halo.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* TEST CONTROL BAR (DOCKED OUTSIDE & BELOW VIEWPORT)       */}
      {/* ========================================================= */}
      <TestControlBar testId={testId} title="HDR & Tone-Mapping Calibration">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Tabs Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-black/80 p-1 rounded-xl border border-slate-200 dark:border-white/20 text-xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "overview" 
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              Pipeline Metrics
            </button>
            <button
              onClick={() => setActiveTab("banding")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "banding" 
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              10-Bit Ramp
            </button>
            <button
              onClick={() => setActiveTab("specular")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "specular" 
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              Highlight Clipping
            </button>
            <button
              onClick={() => setActiveTab("shadow")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "shadow" 
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              Shadow Detail
            </button>
          </div>

          {/* Controls specific to Highlight Clipping */}
          {activeTab === "specular" && (
            <div className="flex items-center gap-1.5 border-l border-slate-300 dark:border-white/20 pl-2 text-xs">
              <span className="text-amber-600 dark:text-amber-300 font-mono text-xs font-bold hidden sm:inline">Delta:</span>
              <button
                onClick={() => setSensitivity("standard")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sensitivity === "standard"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-gray-950 font-extrabold shadow-xs"
                    : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                }`}
                title="Standard ~2% delta"
              >
                Standard (2%)
              </button>
              <button
                onClick={() => setSensitivity("subtle")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sensitivity === "subtle"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-gray-950 font-extrabold shadow-xs"
                    : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                }`}
                title="Subtle ~1% delta"
              >
                Subtle (1%)
              </button>
              <button
                onClick={() => setSensitivity("ultrafine")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sensitivity === "ultrafine"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-gray-950 font-extrabold shadow-xs"
                    : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                }`}
                title="Ultra-Fine ~0.5% delta"
              >
                Ultra-Fine (0.5%)
              </button>

              <button
                onClick={triggerBlink}
                className="ml-1 flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/50 bg-muted/40 hover:bg-muted text-gray-800 dark:text-slate-200 dark:hover:text-white text-[11px] font-medium transition-colors shadow-2xs"
                title="Momentarily blink reticles so you can spot their exact location"
              >
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>Flash Reticles</span>
              </button>
            </div>
          )}
        </div>
      </TestControlBar>
    </>
  );
}