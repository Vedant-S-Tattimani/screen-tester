"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Sun, 
  Layers, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from "lucide-react";
import { useTranslations } from 'next-intl';

interface BrightnessTier {
  nits: number;
  label: string;
  certification: string;
  relativeLevel: number; // 0.0 to 1.0 (relative visual scale)
}

const TIERS: BrightnessTier[] = [
  { nits: 100, label: "100 Nits", certification: "SDR Studio Reference White", relativeLevel: 0.2 },
  { nits: 200, label: "200 Nits", certification: "Typical Desktop SDR Target", relativeLevel: 0.35 },
  { nits: 400, label: "400 Nits", certification: "VESA DisplayHDR 400 Entry", relativeLevel: 0.55 },
  { nits: 600, label: "600 Nits", certification: "VESA DisplayHDR 600 True HDR", relativeLevel: 0.70 },
  { nits: 800, label: "800 Nits", certification: "OLED / QD-OLED Peak 10%", relativeLevel: 0.82 },
  { nits: 1000, label: "1,000 Nits", certification: "DisplayHDR 1000 / Mastering Peak", relativeLevel: 0.90 },
  { nits: 1400, label: "1,400 Nits", certification: "DisplayHDR 1400 Mini-LED Peak", relativeLevel: 0.95 },
  { nits: 2000, label: "2,000 Nits", certification: "Flagship Mini-LED Highlights", relativeLevel: 0.98 },
  { nits: 4000, label: "4,000 Nits", certification: "Dolby Vision Reference Peak", relativeLevel: 1.0 },
];

export function HdrPeakBrightnessPattern({
testId }: { testId: string }) {
  const t = useTranslations('Tests.HdrPeakBrightnessPattern');
  const [selectedTier, setSelectedTier] = useState<number>(5); // 1000 nits default
  const [isHdrSupported, setIsHdrSupported] = useState<boolean | null>(null);
  const [innerPatchDelta, setInnerPatchDelta] = useState<number>(4); // % difference
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [bgMode, setBgMode] = useState<"black" | "darkGray">("black");

  const containerRef = useRef<HTMLDivElement>(null);

  // Check hardware HDR capability
  useEffect(() => {
    if (typeof window !== "undefined") {
      const match = window.matchMedia("(dynamic-range: high)");
      setIsHdrSupported(match.matches);

      const handler = (e: MediaQueryListEvent) => setIsHdrSupported(e.matches);
      match.addEventListener("change", handler);
      return () => match.removeEventListener("change", handler);
    }
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const active = TIERS[selectedTier];

  // Base white values
  const baseWhite = Math.round(active.relativeLevel * 255);
  const baseColor = `rgb(${baseWhite}, ${baseWhite}, ${baseWhite})`;

  // Inner patch has slight contrast step to test clipping
  const innerWhite = Math.min(255, Math.round(baseWhite * (1 + innerPatchDelta / 100)));
  const innerColor = `rgb(${innerWhite}, ${innerWhite}, ${innerWhite})`;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isFullscreen ? "h-full rounded-none border-none" : "h-[650px] sm:h-[720px] rounded-2xl border border-neutral-800"} overflow-hidden flex flex-col select-none shadow-2xl ${
        bgMode === "black" ? "bg-black" : "bg-[#111116]"
      } text-white transition-colors duration-300`}
    >
      {/* Top Header */}
      <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Luminance Tier:
          </span>
          {TIERS.map((tier, idx) => (
            <button
              key={tier.nits}
              onClick={() => setSelectedTier(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                selectedTier === idx
                  ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {tier.nits} nits
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-mono">
            {isHdrSupported ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> HDR Active
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" /> SDR / Emulated
              </span>
            )}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Visual Clipping Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6">
        {/* The Peak Luminance Target Box */}
        <div 
          className="w-72 h-72 sm:w-96 sm:h-96 rounded-2xl flex items-center justify-center relative shadow-2xl transition-colors duration-300"
          style={{ backgroundColor: baseColor }}
        >
          {/* Nested Inner Highlight Patch */}
          <div 
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl flex items-center justify-center text-center p-2 transition-colors duration-300 shadow-inner"
            style={{ backgroundColor: innerColor }}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 font-bold select-none">
              Inner +{innerPatchDelta}% Step
            </span>
          </div>
        </div>

        {/* Floating Technical Card */}
        <div className="mt-6 bg-neutral-900/90 backdrop-blur-md px-5 py-3 rounded-xl border border-neutral-800 text-center max-w-md shadow-xl">
          <div className="font-mono text-sm font-bold text-amber-400">{active.label} Target</div>
          <p className="text-xs text-neutral-300 mt-0.5">{active.certification}</p>
          <p className="text-[11px] text-neutral-400 mt-2">
            If your display tone mapping clips at this luminance, the inner square will completely disappear into the outer box. If visible, highlight details are preserved.
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="z-20 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-neutral-400">{t("highlightClipping")}</span>
          <button
            onClick={() => setInnerPatchDelta(2)}
            className={`px-2.5 py-1 rounded font-mono ${innerPatchDelta === 2 ? "bg-amber-500 text-black font-bold" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
          >
            +2% (Fine)
          </button>
          <button
            onClick={() => setInnerPatchDelta(4)}
            className={`px-2.5 py-1 rounded font-mono ${innerPatchDelta === 4 ? "bg-amber-500 text-black font-bold" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
          >
            +4% (Standard)
          </button>
          <button
            onClick={() => setInnerPatchDelta(8)}
            className={`px-2.5 py-1 rounded font-mono ${innerPatchDelta === 8 ? "bg-amber-500 text-black font-bold" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
          >
            +8% (Coarse)
          </button>
        </div>

        <div className="flex items-center gap-2 font-mono text-neutral-400 text-[11px]">
          <span>{t("targetStandard")}</span>
          <span className="text-emerald-400 font-bold">{t("pqCurve")}</span>
        </div>
      </div>
    </div>
  );
}
