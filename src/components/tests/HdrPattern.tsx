"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { SunMedium, CheckCircle, XCircle, Layers, Sliders, Info, ShieldCheck } from "lucide-react";

interface HdrPatternProps {
  testId?: string;
}

type HdrViewMode = "overview" | "banding" | "specular";

export function HdrPattern({ testId }: HdrPatternProps) {
  const { registerNavigation } = useTestContext();
  const [hdrSupported, setHdrSupported] = useState<boolean | null>(null);
  const [p3Supported, setP3Supported] = useState<boolean | null>(null);
  const [rec2020Supported, setRec2020Supported] = useState<boolean | null>(null);
  const [colorDepth, setColorDepth] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<HdrViewMode>("overview");

  useEffect(() => {
    registerNavigation({});
  }, [registerNavigation]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setHdrSupported(window.matchMedia('(dynamic-range: high)').matches);
        setP3Supported(window.matchMedia('(color-gamut: p3)').matches);
        setRec2020Supported(window.matchMedia('(color-gamut: rec2020)').matches);
        if (window.screen) {
          setColorDepth(window.screen.colorDepth);
        }
      }, 0);
    }
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center p-4 sm:p-8 text-white select-none overflow-y-auto">
        <div className="max-w-4xl w-full flex flex-col items-center gap-6 my-auto">
          
          {/* Header & Status Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white/5 border border-white/10 rounded-2xl p-5 sm:px-6 backdrop-blur-md">
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
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                  <XCircle className="w-3.5 h-3.5" /> SDR Pipeline (Standard Dynamic Range)
                </span>
              )}
            </div>
          </div>

          {/* Mode Switcher */}
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
          </div>

          {/* TAB 1: Overview & Pipeline Metrics */}
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
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/50">Status:</span>
                  <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md ${
                    hdrSupported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/70"
                  }`}>
                    {hdrSupported ? "dynamic-range: high" : "dynamic-range: standard"}
                  </span>
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

              <div className="sm:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3 text-xs text-white/70">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Windows Shortcut Tip:</strong> On Windows 10 & 11, press <kbd className="px-1.5 py-0.5 bg-black/60 border border-white/20 rounded font-mono text-[11px] text-white">Win + Alt + B</kbd> to toggle HDR on/off instantly. Ensure your display cable is DisplayPort 1.4 or HDMI 2.0+ for HDR bandwidth.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 10-Bit Banding Ramp */}
          {activeTab === "banding" && (
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
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
                <div className="h-14 w-full rounded-xl overflow-hidden flex border border-white/10">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const lum = Math.round((i / 31) * 255);
                    return (
                      <div 
                        key={i} 
                        className="flex-1 h-full" 
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
                  className="h-14 w-full rounded-xl border border-white/10" 
                  style={{ background: "linear-gradient(to right, #000000 0%, #ffffff 100%)" }}
                />
              </div>
            </div>
          )}

          {/* TAB 3: Specular Highlight Tone-Mapping */}
          {activeTab === "specular" && (
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-5 text-center">
              <div>
                <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                  Specular Highlight Roll-Off
                </h3>
                <p className="text-xs text-white/60 mt-1 max-w-lg mx-auto">
                  Compare how your display handles near-peak white luminance. If subtle inner reticles disappear into pure white, your display is hard-clipping highlights instead of tone-mapping.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
                {[
                  { label: "92% White", bg: "rgb(235, 235, 235)", text: "text-black" },
                  { label: "96% White", bg: "rgb(245, 245, 245)", text: "text-black" },
                  { label: "98% White", bg: "rgb(250, 250, 250)", text: "text-black" },
                  { label: "100% Peak", bg: "rgb(255, 255, 255)", text: "text-black" },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="aspect-square rounded-2xl border border-white/20 p-3 flex flex-col justify-between shadow-lg"
                    style={{ backgroundColor: item.bg }}
                  >
                    <div className="w-4 h-4 rounded-full border border-black/30" />
                    <div className="text-center">
                      <div className={`text-xs font-mono font-bold ${item.text}`}>{item.label}</div>
                      <div className="text-[10px] font-mono text-black/50">Luminance</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <TestControlBar testId={testId} title="HDR Capability" />
    </>
  );
}