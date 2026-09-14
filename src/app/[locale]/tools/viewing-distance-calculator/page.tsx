"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Eye, Ruler, CheckCircle2, Sparkles, Sliders, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const RESOLUTION_PRESETS = [
  { label: "1080p (FHD)", w: 1920, h: 1080 },
  { label: "1440p (QHD)", w: 2560, h: 1440 },
  { label: "4K (UHD)", w: 3840, h: 2160 },
  { label: "5K (Apple Studio)", w: 5120, h: 2880 },
  { label: "8K (FUHD)", w: 7680, h: 4320 },
];

const DIAGONAL_PRESETS = [24, 27, 32, 42, 55, 65];

export default function ViewingDistanceCalculatorPage() {
  const t = useTranslations("Tools.ViewingDistanceCalculator");

  const [diagonalInches, setDiagonalInches] = useState<number>(27);
  const [selectedRes, setSelectedRes] = useState<typeof RESOLUTION_PRESETS[number]>(RESOLUTION_PRESETS[1]); // 1440p default
  const [distanceInches, setDistanceInches] = useState<number>(28); // Standard desk distance ~70cm / 28 inches
  const [unit, setUnit] = useState<"in" | "cm">("in");

  const stats = useMemo(() => {
    const { w, h } = selectedRes;
    const ppi = Math.round(Math.sqrt(w * w + h * h) / diagonalInches);

    // Distance in inches
    const distIn = unit === "cm" ? distanceInches / 2.54 : distanceInches;

    // Pixels Per Degree: 2 * dist * tan(0.5 deg) * ppi
    const ppd = Math.round(2 * distIn * Math.tan((0.5 * Math.PI) / 180) * ppi);

    // Retina distance threshold (when PPD >= 60 for 20/20 vision)
    const retinaDistIn = 60 / (2 * Math.tan((0.5 * Math.PI) / 180) * ppi);
    const retinaDistCm = Math.round(retinaDistIn * 2.54);

    const isRetina = ppd >= 60;

    return {
      ppi,
      ppd,
      retinaDistIn: Math.round(retinaDistIn * 10) / 10,
      retinaDistCm,
      isRetina
    };
  }, [diagonalInches, selectedRes, distanceInches, unit]);

  const displayDistance = unit === "cm" ? Math.round(distanceInches * 2.54) : distanceInches;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-600 mb-2 font-semibold">
          <Eye className="w-4 h-4" />
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
        {/* Left Form Controls Panel */}
        <div className="lg:col-span-7 min-w-0 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-7">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              {t("units")}
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100">
              <button
                type="button"
                onClick={() => setUnit("in")}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                  unit === "in"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {t("inches")}
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                  unit === "cm"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {t("centimeters")}
              </button>
            </div>
          </div>

          {/* Screen Size Controls */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                {t("screenSize")}
              </label>
              <span className="text-sm font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200/60">
                {diagonalInches}&quot;
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {DIAGONAL_PRESETS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiagonalInches(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer",
                    diagonalInches === d
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-2xs"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  {d}&quot;
                </button>
              ))}
            </div>

            <input
              type="range"
              min="13"
              max="85"
              value={diagonalInches}
              onChange={(e) => setDiagonalInches(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>13&quot; (Laptop)</span>
              <span>85&quot; (Large TV)</span>
            </div>
          </div>

          {/* Resolution Selection */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              {t("resolution")}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {RESOLUTION_PRESETS.map((res) => (
                <button
                  key={res.label}
                  type="button"
                  onClick={() => setSelectedRes(res)}
                  className={cn(
                    "px-3.5 py-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer",
                    selectedRes.label === res.label
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-2xs"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  <div className="font-semibold">{res.label}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {res.w} × {res.h}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Viewing Distance Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                {t("viewingDistance")}
              </label>
              <span className="text-sm font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200/60">
                {displayDistance} {unit}
              </span>
            </div>

            <input
              type="range"
              min="12"
              max="120"
              value={distanceInches}
              onChange={(e) => setDistanceInches(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>{unit === "cm" ? "30 cm (Desk)" : "12\" (Desk)"}</span>
              <span>{unit === "cm" ? "300 cm (Living Room)" : "120\" (Living Room)"}</span>
            </div>
          </div>
        </div>

        {/* Right Output Results Panel (Sticky on Desktop) */}
        <div className="lg:col-span-5 min-w-0 space-y-6 lg:sticky lg:top-8">
          {/* Main Visual Acuity & Retina Status Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-slate-800 flex flex-col gap-5">
            {/* Header & Status Badge */}
            <div className="flex items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {t("visualAcuity")}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-purple-400 font-mono tracking-tight">
                    {stats.ppd}
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-400 uppercase">PPD</span>
                </div>
              </div>

              <div className="shrink-0">
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold font-mono inline-flex items-center gap-1.5 border shadow-xs text-center",
                    stats.isRetina
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{stats.isRetina ? t("retinaAchieved") : t("pixelsVisible")}</span>
                </span>
              </div>
            </div>

            {/* Explanatory Assessment Note */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {stats.isRetina
                ? t("retinaPpdDescription", { ppd: stats.ppd })
                : t("subRetinaPpdDescription", { ppd: stats.ppd })}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {t("pixelDensity")}
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono text-white">
                  {stats.ppi} <span className="text-xs font-normal text-slate-400">PPI</span>
                </span>
              </div>

              <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {t("retinaThreshold")}
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                  {unit === "cm" ? `${stats.retinaDistCm} cm` : `${stats.retinaDistIn}"`}
                </span>
              </div>
            </div>
          </div>

          {/* Educational Info Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              <Info className="w-4 h-4 text-purple-600 shrink-0" />
              <span>{t("howItWorksTitle")}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t("howItWorksText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
