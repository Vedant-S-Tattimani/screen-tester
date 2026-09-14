"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Eye, Palette, Grid, SplitSquareVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorBlindnessPatternProps {
  testId?: string;
}

type VisionType = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "protanomaly" | "deuteranomaly" | "tritanomaly" | "achromatopsia";

const VISION_FILTERS: Record<VisionType, number[]> = {
  normal: [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0],
  protanopia: [0.567,0.433,0,0,0, 0.558,0.442,0,0,0, 0,0.242,0.758,0,0, 0,0,0,1,0],
  deuteranopia: [0.625,0.375,0,0,0, 0.7,0.3,0,0,0, 0,0.3,0.7,0,0, 0,0,0,1,0],
  tritanopia: [0.95,0.05,0,0,0, 0,0.433,0.567,0,0, 0,0.475,0.525,0,0, 0,0,0,1,0],
  protanomaly: [0.817,0.183,0,0,0, 0.333,0.667,0,0,0, 0,0.125,0.875,0,0, 0,0,0,1,0],
  deuteranomaly: [0.8,0.2,0,0,0, 0.258,0.742,0,0,0, 0,0.142,0.858,0,0, 0,0,0,1,0],
  tritanomaly: [0.967,0.033,0,0,0, 0,0.733,0.267,0,0, 0,0.183,0.817,0,0, 0,0,0,1,0],
  achromatopsia: [0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0,0,0,1,0],
};

const TEST_COLORS = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FF8C00", "#8B4513", "#228B22", "#4169E1", "#9400D3", "#FF1493",
  "#FFD700", "#00CED1", "#DC143C", "#32CD32", "#FF4500", "#1E90FF",
  "#FF69B4", "#00FA9A", "#BA55D3", "#20B2AA", "#FF6347", "#7B68EE",
];

export function ColorBlindnessPattern({ testId = "color-blindness-test" }: ColorBlindnessPatternProps) {
  const t = useTranslations("Tests.ColorBlindnessPattern");
  const [selectedVision, setSelectedVision] = useState<VisionType>("normal");
  const [compareMode, setCompareMode] = useState(false);

  const visionTypes: { key: VisionType; prevalence: string }[] = useMemo(() => [
    { key: "normal", prevalence: "" },
    { key: "protanopia", prevalence: "~1%" },
    { key: "deuteranopia", prevalence: "~1%" },
    { key: "tritanopia", prevalence: "~0.01%" },
    { key: "protanomaly", prevalence: "~1%" },
    { key: "deuteranomaly", prevalence: "~5%" },
    { key: "tritanomaly", prevalence: "~0.01%" },
    { key: "achromatopsia", prevalence: "~0.003%" },
  ], []);

  const filterMatrix = VISION_FILTERS[selectedVision];

  const renderColorGrid = (filterId?: string) => (
    <div className={cn("rounded-xl border border-gray-200 overflow-hidden", filterId && "filter")} style={filterId ? { filter: `url(#${filterId})` } : undefined}>
      {/* Color Wheel Spectrum */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-1">
          {TEST_COLORS.map((color, i) => (
            <div
              key={i}
              className="aspect-square rounded-md shadow-inner border border-black/5"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Gradient Bars */}
      <div className="px-4 pb-4 space-y-2 bg-white">
        <div className="h-6 rounded-md" style={{ background: "linear-gradient(to right, red, orange, yellow, green, cyan, blue, violet)" }} />
        <div className="h-6 rounded-md" style={{ background: "linear-gradient(to right, #FF0000, #00FF00)" }} />
        <div className="h-6 rounded-md" style={{ background: "linear-gradient(to right, #0000FF, #FFFF00)" }} />
        <div className="h-6 rounded-md" style={{ background: "linear-gradient(to right, #FF00FF, #00FF00)" }} />
      </div>

      {/* Ishihara-style Pattern (Simplified circles) */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Circle pattern 1: number in dots */}
          {[0, 1, 2].map((plate) => (
            <div key={plate} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full relative overflow-hidden border border-gray-300" style={{ backgroundColor: plate === 0 ? "#C9B86A" : plate === 1 ? "#8FC466" : "#D4856A" }}>
              <div className="absolute inset-0 flex flex-wrap items-center justify-center p-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isNumber = [8, 9, 13, 14, 15, 16, 20, 21, 22, 23, 26, 27].includes(i);
                  return (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: `${3 + Math.random() * 3}px`,
                        height: `${3 + Math.random() * 3}px`,
                        margin: "1px",
                        backgroundColor: isNumber
                          ? (plate === 0 ? "#B74438" : plate === 1 ? "#C7553B" : "#5D9E47")
                          : (plate === 0 ? "#D4AC5A" : plate === 1 ? "#7BBD56" : "#C07860"),
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample UI Elements */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-2">
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg">{t("error")}</span>
          <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg">{t("success")}</span>
          <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-semibold rounded-lg">{t("warning")}</span>
          <span className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg">{t("info")}</span>
          <span className="px-3 py-1.5 bg-purple-500 text-white text-xs font-semibold rounded-lg">{t("special")}</span>
        </div>
        <div className="flex gap-2 items-center text-xs">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="text-gray-600">{t("critical")}</span>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block ml-2" />
          <span className="text-gray-600">{t("normal")}</span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block ml-2" />
          <span className="text-gray-600">{t("caution")}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-5">
      {/* SVG Filters */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="cvd-filter">
            <feColorMatrix type="matrix" values={filterMatrix.join(" ")} />
          </filter>
          {Object.entries(VISION_FILTERS).map(([key, matrix]) => (
            <filter key={key} id={`cvd-${key}`}>
              <feColorMatrix type="matrix" values={matrix.join(" ")} />
            </filter>
          ))}
        </defs>
      </svg>

      {/* Vision Type Selector */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">{t("selectVision")}</h3>
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border",
              compareMode ? "bg-gray-950 text-white border-gray-950" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            )}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            {t("compare")}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {visionTypes.map(({ key, prevalence }) => (
            <button
              key={key}
              onClick={() => setSelectedVision(key)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border",
                selectedVision === key
                  ? "bg-gray-950 text-white border-gray-950 shadow-sm"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              )}
            >
              {t(`visionTypes.${key}`)}
              {prevalence && <span className="ml-1 text-[10px] opacity-60">{prevalence}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Display Area */}
      {compareMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">{t("normalVision")}</div>
            {renderColorGrid()}
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">{t(`visionTypes.${selectedVision}`)}</div>
            {renderColorGrid(`cvd-${selectedVision}`)}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">
            {t("viewing")}: {t(`visionTypes.${selectedVision}`)}
          </div>
          {renderColorGrid(selectedVision !== "normal" ? `cvd-${selectedVision}` : undefined)}
        </div>
      )}

      {/* Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">{t("aboutTitle")}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{t("aboutText")}</p>
      </div>
    </div>
  );
}
