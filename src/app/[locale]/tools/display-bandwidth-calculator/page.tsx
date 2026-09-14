"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Sliders, Cpu, CheckCircle2, AlertTriangle, XCircle, Info, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const RESOLUTION_PRESETS = [
  { label: "1080p (FHD)", w: 1920, h: 1080 },
  { label: "1440p (QHD)", w: 2560, h: 1440 },
  { label: "Ultrawide (UWQHD)", w: 3440, h: 1440 },
  { label: "4K (UHD)", w: 3840, h: 2160 },
  { label: "Super Ultrawide (49\")", w: 5120, h: 1440 },
  { label: "5K", w: 5120, h: 2880 },
  { label: "8K (FUHD)", w: 7680, h: 4320 },
];

const REFRESH_RATES = [60, 120, 144, 165, 240, 360, 480, 540];

const CABLE_STANDARDS = [
  { name: "HDMI 2.0", maxGbps: 14.4, dsc: false },
  { name: "HDMI 2.1 (FRL6)", maxGbps: 42.6, dsc: true, maxWithDsc: 120 },
  { name: "DisplayPort 1.2", maxGbps: 17.28, dsc: false },
  { name: "DisplayPort 1.4 (HBR3)", maxGbps: 25.92, dsc: true, maxWithDsc: 77.7 },
  { name: "DisplayPort 2.1 (UHBR10)", maxGbps: 38.69, dsc: true, maxWithDsc: 116 },
  { name: "DisplayPort 2.1 (UHBR20)", maxGbps: 77.37, dsc: true, maxWithDsc: 232 },
];

export default function DisplayBandwidthCalculatorPage() {
  const t = useTranslations("Tools.DisplayBandwidthCalculator");

  const [width, setWidth] = useState<number>(3840);
  const [height, setHeight] = useState<number>(2160);
  const [refreshRate, setRefreshRate] = useState<number>(144);
  const [colorDepth, setColorDepth] = useState<number>(10); // 8, 10, 12
  const [chroma, setChroma] = useState<"444" | "422" | "420">("444");

  // VESA CVT-RB2 timing overhead calculation
  const bandwidth = useMemo(() => {
    let chromaMultiplier = 1;
    if (chroma === "422") chromaMultiplier = 2 / 3;
    if (chroma === "420") chromaMultiplier = 1 / 2;

    const bpp = colorDepth * 3 * chromaMultiplier;
    // CVT-RB2 blanking factor ~1.15
    const totalPixelsPerSec = width * height * refreshRate * 1.15;
    const rawBps = totalPixelsPerSec * bpp;
    const rawGbps = rawBps / 1e9;
    const dscGbps = rawGbps / 3; // Standard 3:1 DSC ratio

    return {
      rawGbps: Math.round(rawGbps * 100) / 100,
      dscGbps: Math.round(dscGbps * 100) / 100
    };
  }, [width, height, refreshRate, colorDepth, chroma]);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 mb-2">
          <Cpu className="w-4 h-4" />
          <span>{t("eyebrow")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Panel */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Resolution Preset */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              {t("resolutionLabel")}
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {RESOLUTION_PRESETS.map((res) => (
                <button
                  key={res.label}
                  onClick={() => {
                    setWidth(res.w);
                    setHeight(res.h);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    width === res.w && height === res.h
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {res.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 font-mono">{t("width")}:</span>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono mt-1"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-mono">{t("height")}:</span>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono mt-1"
                />
              </div>
            </div>
          </div>

          {/* Refresh Rate */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              {t("refreshRateLabel")}
            </label>
            <div className="flex flex-wrap gap-2">
              {REFRESH_RATES.map((hz) => (
                <button
                  key={hz}
                  onClick={() => setRefreshRate(hz)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors",
                    refreshRate === hz
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {hz}Hz
                </button>
              ))}
            </div>
          </div>

          {/* Color Depth & Chroma Subsampling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t("colorDepthLabel")}
              </label>
              <div className="flex gap-2">
                {[8, 10, 12].map((bit) => (
                  <button
                    key={bit}
                    onClick={() => setColorDepth(bit)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors",
                      colorDepth === bit
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {bit}-bit {bit === 10 ? "(HDR)" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t("chromaLabel")}
              </label>
              <div className="flex gap-2">
                {[
                  { id: "444", label: "4:4:4 (RGB)" },
                  { id: "422", label: "4:2:2" },
                  { id: "420", label: "4:2:0" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setChroma(c.id as "444" | "422" | "420")}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors",
                      chroma === c.id
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Calculation Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Bandwidth Stat Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-slate-800 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {t("requiredDataRate")}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-400 font-mono">
                  {bandwidth.rawGbps}
                </span>
                <span className="text-lg font-mono text-slate-400">Gbps</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {t("uncompressedRateNote")}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-300">{t("withDsc3to1")}:</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                ~{bandwidth.dscGbps} Gbps
              </span>
            </div>
          </div>

          {/* Cable Standard Support Compatibility */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              {t("cableCompatibility")}
            </h3>
            <div className="divide-y divide-slate-100">
              {CABLE_STANDARDS.map((cable) => {
                const fitsNative = bandwidth.rawGbps <= cable.maxGbps;
                const fitsDsc = !fitsNative && cable.dsc && bandwidth.rawGbps <= (cable.maxWithDsc || 0);

                return (
                  <div key={cable.name} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{cable.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">Max {cable.maxGbps} Gbps</div>
                    </div>
                    <div>
                      {fitsNative ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t("supportedNative")}
                        </span>
                      ) : fitsDsc ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {t("supportedDsc")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full font-medium">
                          <XCircle className="w-3.5 h-3.5" />
                          {t("insufficientBandwidth")}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
