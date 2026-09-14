"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Calculator, Monitor, Eye, Ruler, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DpiCalculatorPatternProps {
  testId?: string;
}

const PRESETS = [
  { label: '24" 1080p', diag: 24, w: 1920, h: 1080 },
  { label: '27" 1440p', diag: 27, w: 2560, h: 1440 },
  { label: '27" 4K', diag: 27, w: 3840, h: 2160 },
  { label: '32" 4K', diag: 32, w: 3840, h: 2160 },
  { label: '34" UWQHD', diag: 34, w: 3440, h: 1440 },
  { label: '13" MacBook', diag: 13.3, w: 2560, h: 1600 },
  { label: '14" Laptop', diag: 14, w: 1920, h: 1080 },
  { label: '15.6" 1080p', diag: 15.6, w: 1920, h: 1080 },
  { label: '16" MacBook Pro', diag: 16.2, w: 3456, h: 2234 },
  { label: '49" DQHD', diag: 49, w: 5120, h: 1440 },
];

export function DpiCalculatorPattern({ testId = "dpi-calculator" }: DpiCalculatorPatternProps) {
  const t = useTranslations("Tests.DpiCalculatorPattern");
  const [diagonal, setDiagonal] = useState<string>("27");
  const [resW, setResW] = useState<string>("2560");
  const [resH, setResH] = useState<string>("1440");
  const [viewingDist, setViewingDist] = useState<string>("24");

  const results = useMemo(() => {
    const d = parseFloat(diagonal);
    const w = parseInt(resW);
    const h = parseInt(resH);
    const dist = parseFloat(viewingDist);
    if (!d || !w || !h || d <= 0 || w <= 0 || h <= 0) return null;

    const diagonalPixels = Math.sqrt(w * w + h * h);
    const ppi = diagonalPixels / d;
    const dotPitch = 25.4 / ppi; // mm
    const aspectRatio = w / h;
    const aspectGcd = gcd(w, h);
    const arW = w / aspectGcd;
    const arH = h / aspectGcd;
    const totalPixels = w * h;
    const subpixels = totalPixels * 3;
    const physicalW = (w / ppi); // inches
    const physicalH = (h / ppi); // inches

    // Retina threshold: 300 PPI at 10-12 inches, decreases with distance
    // Apple's formula: PPI needed = 3438 / viewing_distance_inches
    const retinaThreshold = dist > 0 ? 3438 / dist : 300;
    const isRetina = ppi >= retinaThreshold;

    // Angular resolution (arcmin per pixel)
    const arcminPerPixel = dist > 0 ? (2 * Math.atan(dotPitch / (2 * dist * 25.4))) * (180 / Math.PI) * 60 : 0;

    return {
      ppi: Math.round(ppi * 10) / 10,
      dotPitch: Math.round(dotPitch * 1000) / 1000,
      aspectRatio: `${arW}:${arH}`,
      totalPixels,
      subpixels,
      physicalW: Math.round(physicalW * 100) / 100,
      physicalH: Math.round(physicalH * 100) / 100,
      retinaThreshold: Math.round(retinaThreshold),
      isRetina,
      arcminPerPixel: Math.round(arcminPerPixel * 100) / 100,
    };
  }, [diagonal, resW, resH, viewingDist]);

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setDiagonal(String(preset.diag));
    setResW(String(preset.w));
    setResH(String(preset.h));
  };

  const getPpiRating = (ppi: number) => {
    if (ppi >= 200) return { label: t("excellent"), color: "text-green-500" };
    if (ppi >= 140) return { label: t("sharp"), color: "text-blue-500" };
    if (ppi >= 100) return { label: t("adequate"), color: "text-yellow-500" };
    return { label: t("low"), color: "text-red-500" };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Presets */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("quickPresets")}</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("enterSpecs")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">{t("diagonal")} ({t("inches")})</label>
            <input
              type="number"
              value={diagonal}
              onChange={e => setDiagonal(e.target.value)}
              step="0.1"
              min="1"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">{t("width")} (px)</label>
            <input
              type="number"
              value={resW}
              onChange={e => setResW(e.target.value)}
              min="1"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">{t("height")} (px)</label>
            <input
              type="number"
              value={resH}
              onChange={e => setResH(e.target.value)}
              min="1"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">{t("viewingDistance")} ({t("inches")})</label>
            <input
              type="number"
              value={viewingDist}
              onChange={e => setViewingDist(e.target.value)}
              step="1"
              min="1"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Main PPI Display */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Calculator className="w-8 h-8 text-gray-300" />
              <div className="text-center">
                <span className={cn("text-5xl sm:text-6xl font-extrabold tracking-tight", getPpiRating(results.ppi).color)}>
                  {results.ppi}
                </span>
                <span className="text-lg text-gray-400 ml-2">PPI</span>
              </div>
              <span className={cn("text-sm font-semibold", getPpiRating(results.ppi).color)}>
                {getPpiRating(results.ppi).label}
              </span>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("dotPitch")}</div>
              <div className="text-xl font-bold text-gray-900">{results.dotPitch} mm</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("aspectRatioLabel")}</div>
              <div className="text-xl font-bold text-gray-900">{results.aspectRatio}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("totalPixels")}</div>
              <div className="text-xl font-bold text-gray-900">{(results.totalPixels / 1_000_000).toFixed(1)}M</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("subpixels")}</div>
              <div className="text-xl font-bold text-gray-900">{(results.subpixels / 1_000_000).toFixed(1)}M</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("physicalSize")}</div>
              <div className="text-xl font-bold text-gray-900">{results.physicalW}" × {results.physicalH}"</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("angularRes")}</div>
              <div className="text-xl font-bold text-gray-900">{results.arcminPerPixel} arcmin</div>
            </div>
          </div>

          {/* Retina Status */}
          <div className={cn(
            "rounded-xl border p-4 flex items-center gap-4",
            results.isRetina
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          )}>
            <Eye className={cn("w-8 h-8 shrink-0", results.isRetina ? "text-green-500" : "text-yellow-500")} />
            <div>
              <h4 className={cn("font-bold text-sm", results.isRetina ? "text-green-800" : "text-yellow-800")}>
                {results.isRetina ? t("retinaYes") : t("retinaNo")}
              </h4>
              <p className={cn("text-xs mt-0.5", results.isRetina ? "text-green-600" : "text-yellow-600")}>
                {t("retinaThreshold")}: {results.retinaThreshold} PPI @ {viewingDist}" — {t("yourDisplay")}: {results.ppi} PPI
              </p>
            </div>
          </div>
        </>
      )}

      <p className="text-[11px] text-gray-400 text-center">{t("browserNote")}</p>
    </div>
  );
}
