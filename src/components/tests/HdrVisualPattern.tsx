"use client";

import { useState, useSyncExternalStore } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { SunMedium, Layers, Sliders, Info, ShieldAlert, Eye, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HdrVisualPatternProps {
  testId?: string;
}

type HdrViewMode = "specular" | "shadows" | "split" | "gamut" | "steps";

interface HighlightSwatch {
  label: string;
  bgRgb: number;
  deltaRgb: number; // inner target offset
}

const HIGHLIGHT_SWATCHES: HighlightSwatch[] = [
  { label: "90% White", bgRgb: 230, deltaRgb: 6 },
  { label: "94% White", bgRgb: 240, deltaRgb: 5 },
  { label: "97% White", bgRgb: 247, deltaRgb: 4 },
  { label: "99% White", bgRgb: 252, deltaRgb: 2 },
  { label: "100% Peak", bgRgb: 255, deltaRgb: -3 }
];

const SHADOW_SWATCHES = [
  { label: "0% Black", hex: "#000000", rgb: "rgb(0,0,0)" },
  { label: "0.5% Gray", hex: "#010101", rgb: "rgb(1,1,1)" },
  { label: "1% Gray", hex: "#030303", rgb: "rgb(3,3,3)" },
  { label: "2% Gray", hex: "#050505", rgb: "rgb(5,5,5)" },
  { label: "3% Gray", hex: "#080808", rgb: "rgb(8,8,8)" },
  { label: "5% Gray", hex: "#0D0D0D", rgb: "rgb(13,13,13)" },
  { label: "8% Gray", hex: "#141414", rgb: "rgb(20,20,20)" },
  { label: "10% Gray", hex: "#1A1A1A", rgb: "rgb(26,26,26)" }
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
  const { isFullscreen } = useTestContext();
  const [activeTab, setActiveTab] = useState<HdrViewMode>("specular");

  // Dynamic Browser Capabilities Detection via useSyncExternalStore
  const hdrSupported = useMediaQuery("(dynamic-range: high)");
  const p3Supported = useMediaQuery("(color-gamut: p3)");
  const rec2020Supported = useMediaQuery("(color-gamut: rec2020)");
  const colorDepth = useColorDepth();

  return (
    <div className={cn("relative w-full flex flex-col items-center", isFullscreen && "h-full")}>
      {/* Pattern Viewport */}
      <div className={cn(
        "relative w-full bg-black overflow-hidden flex flex-col items-center justify-center p-6 select-none",
        isFullscreen
          ? "h-full rounded-none border-none"
          : "aspect-video min-h-[440px] max-h-[75vh] rounded-2xl border border-slate-800 shadow-2xl"
      )}>
        
        {/* Tab 1: Specular Highlight Clipping */}
        {activeTab === "specular" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Highlight Clipping & Peak White Separation
              </span>
              <p className="text-xs text-slate-500 max-w-md">
                Inspect whether subtle circular target reticles remain distinguishable inside near-peak highlights.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 w-full max-w-3xl">
              {HIGHLIGHT_SWATCHES.map((swatch) => {
                const targetRgb = Math.max(0, Math.min(255, swatch.bgRgb + swatch.deltaRgb));
                return (
                  <div
                    key={swatch.label}
                    className="flex flex-col items-center p-3 rounded-xl border border-slate-800 bg-slate-900/60 shadow-inner"
                  >
                    <div
                      className="w-full aspect-square rounded-lg flex items-center justify-center relative shadow-sm"
                      style={{ backgroundColor: `rgb(${swatch.bgRgb}, ${swatch.bgRgb}, ${swatch.bgRgb})` }}
                    >
                      {/* Reticle Target */}
                      <div
                        className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center"
                        style={{ backgroundColor: `rgb(${targetRgb}, ${targetRgb}, ${targetRgb})` }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: `rgb(${swatch.bgRgb}, ${swatch.bgRgb}, ${swatch.bgRgb})` }}
                        />
                      </div>
                    </div>
                    <span className="mt-2 text-[11px] font-mono text-slate-300 font-semibold">{swatch.label}</span>
                    <span className="text-[10px] font-mono text-slate-500">RGB {swatch.bgRgb}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Near-Black Shadow Detail */}
        {activeTab === "shadows" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Near-Black Shadow Detail & Dark Clipping
              </span>
              <p className="text-xs text-slate-500 max-w-md">
                In a dimmed room, check how low in the dark spectrum you can distinguish subtle squares from true 0% black.
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 w-full max-w-3xl">
              {SHADOW_SWATCHES.map((swatch) => (
                <div
                  key={swatch.label}
                  className="flex flex-col items-center p-2 rounded-xl border border-slate-800 bg-slate-950"
                >
                  <div
                    className="w-full aspect-square rounded-lg border border-slate-700/40 flex items-center justify-center"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div className="w-2.5 h-2.5 rounded-xs border border-white/20" />
                  </div>
                  <span className="mt-2 text-[10px] font-mono text-slate-300 text-center font-medium">{swatch.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: SDR vs Wide-Gamut Split Screen */}
        {activeTab === "split" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Side-by-Side SDR Reference vs High Dynamic Range
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl h-56 rounded-xl overflow-hidden border border-slate-700">
              {/* SDR Side */}
              <div className="h-full bg-neutral-900 p-4 flex flex-col justify-between border-r border-slate-700">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">Standard sRGB</span>
                <div className="space-y-2">
                  <div className="h-10 rounded-md bg-gradient-to-r from-red-600 via-green-600 to-blue-600 opacity-90" />
                  <div className="h-10 rounded-md bg-white opacity-85 flex items-center justify-center text-black text-xs font-bold font-mono">
                    Standard White (100-120 nits SDR)
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Clamped to SDR range</span>
              </div>

              {/* HDR / Extended Side */}
              <div className="h-full bg-black p-4 flex flex-col justify-between">
                <span className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> High Dynamic Range / P3
                </span>
                <div className="space-y-2">
                  <div
                    className="h-10 rounded-md bg-gradient-to-r from-[#FF0000] via-[#00FF00] to-[#0000FF]"
                    style={{
                      background: "linear-gradient(to right, color(display-p3 1 0 0), color(display-p3 0 1 0), color(display-p3 0 0 1))"
                    }}
                  />
                  <div className="h-10 rounded-md bg-white flex items-center justify-center text-black text-xs font-bold font-mono shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                    Peak White Headroom
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Extended dynamic range</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Color Gamut Comparison */}
        {activeTab === "gamut" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Wide Color Gamut Primaries (sRGB vs Display P3)
              </span>
              <p className="text-xs text-slate-500 max-w-md">
                Displays supporting DCI-P3 / HDR render deeper reds and more vivid emerald greens beyond conventional sRGB.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-center">
                <div
                  className="h-20 rounded-lg shadow-inner"
                  style={{ backgroundColor: "color(display-p3 1 0 0, rgb(255, 0, 0))" }}
                />
                <span className="text-xs font-mono text-slate-300 font-bold">P3 Deep Red</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-center">
                <div
                  className="h-20 rounded-lg shadow-inner"
                  style={{ backgroundColor: "color(display-p3 0 1 0, rgb(0, 255, 0))" }}
                />
                <span className="text-xs font-mono text-slate-300 font-bold">P3 Emerald Green</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-center">
                <div
                  className="h-20 rounded-lg shadow-inner"
                  style={{ backgroundColor: "color(display-p3 0 0 1, rgb(0, 0, 255))" }}
                />
                <span className="text-xs font-mono text-slate-300 font-bold">P3 Royal Blue</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: 16-Step Grayscale */}
        {activeTab === "steps" && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Full Spectrum 16-Step Grayscale
              </span>
            </div>
            <div className="flex w-full max-w-2xl h-24 rounded-xl overflow-hidden border border-slate-700">
              {Array.from({ length: 16 }).map((_, i) => {
                const lum = Math.round((i / 15) * 255);
                return (
                  <div
                    key={i}
                    className="flex-1 h-full flex flex-col justify-end p-1 text-[9px] font-mono text-center"
                    style={{
                      backgroundColor: `rgb(${lum}, ${lum}, ${lum})`,
                      color: lum > 128 ? "#000000" : "#FFFFFF"
                    }}
                  >
                    <span>{Math.round((i / 15) * 100)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Detected Browser HDR Capability Overlay */}
        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2.5 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/60 text-[11px] font-mono text-slate-300 shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">CSS HDR:</span>
            <strong className={hdrSupported ? "text-emerald-400" : "text-amber-400"}>
              {hdrSupported === null ? "..." : hdrSupported ? "ACTIVE" : "INACTIVE"}
            </strong>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Display-P3:</span>
            <strong className={p3Supported ? "text-emerald-400" : "text-slate-400"}>
              {p3Supported ? "SUPPORTED" : "SDR"}
            </strong>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Rec.2020:</span>
            <strong className={rec2020Supported ? "text-emerald-400" : "text-slate-500"}>
              {rec2020Supported ? "SUPPORTED" : "NO"}
            </strong>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Color Depth:</span>
            <strong className="text-white">{colorDepth ? `${colorDepth}-bit` : "--"}</strong>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      {!isFullscreen && (
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "specular", label: "Highlight Clipping", icon: SunMedium },
              { id: "shadows", label: "Shadow Detail", icon: Moon },
              { id: "split", label: "SDR vs HDR Split", icon: Sliders },
              { id: "gamut", label: "Wide Gamut Primaries", icon: Layers },
              { id: "steps", label: "Grayscale Steps", icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as HdrViewMode)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-foreground text-background shadow-xs"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hardware Boundary Notice</span>
          </div>
          <p>
            Browser CSS media queries (such as <code>dynamic-range: high</code> and <code>color-gamut: p3</code>) confirm that your operating system compositor is outputting an HDR signal to the browser. However, <strong>the browser cannot measure physical peak brightness in nits or physical contrast ratios</strong>. True optical luminance and peak HDR performance require dedicated colorimeter hardware.
          </p>
        </div>

        {/* Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">1. Operating System HDR:</strong> In Windows Display Settings or macOS System Settings, confirm HDR is toggled ON for this display.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">2. Monitor Picture Mode:</strong> In your monitor OSD, select an accurate HDR preset (e.g. HDR Cinema, Filmmaker, or HDR Standard) rather than dynamic/vivid modes.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">3. Check for Clipping:</strong> In the Highlight Clipping pattern, reticles in the 94% and 97% swatches should remain visible without blown-out white blooming.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">4. Check for Crushed Darks:</strong> In the Shadow Detail pattern, dark blocks (2% to 5%) should remain distinct from pure black.
            </div>
          </div>
        </div>
      </div>
      )}

      {!isFullscreen && <TestControlBar testId={testId} title="HDR Visual Inspection" />}
    </div>
  );
}
