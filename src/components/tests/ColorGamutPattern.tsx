"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Sparkles, Eye, Layers, Palette, Info, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

interface ColorGamutPatternProps {
  testId?: string;
}

type GamutViewMode = "target" | "swatches" | "ramp";
type PrimaryChannel = "red" | "green" | "blue";

const SRGB_COLORS: Record<PrimaryChannel, string> = {
  red: "rgb(255, 0, 0)",
  green: "rgb(0, 255, 0)",
  blue: "rgb(0, 0, 255)"
};

const P3_COLORS: Record<PrimaryChannel, string> = {
  red: "color(display-p3 1 0 0)",
  green: "color(display-p3 0 1 0)",
  blue: "color(display-p3 0 0 1)"
};

export function ColorGamutPattern({ testId }: ColorGamutPatternProps) {
    const t = useTranslations("Tests.ColorGamutPattern");
  const { registerNavigation } = useTestContext();
  const [cssP3Supported, setCssP3Supported] = useState<boolean>(false);
  const [mediaP3Match, setMediaP3Match] = useState<boolean>(false);
  const [mediaRec2020Match, setMediaRec2020Match] = useState<boolean>(false);
  const [gradientColorSpaceSupported, setGradientColorSpaceSupported] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<GamutViewMode>("target");
  const [targetChannel, setTargetChannel] = useState<PrimaryChannel>("red");
  const [showAlignmentGuide, setShowAlignmentGuide] = useState<boolean>(false);

  useEffect(() => {
    registerNavigation({});
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const hasCssSupports = typeof CSS !== "undefined" && typeof CSS.supports === "function";
        const supportsP3 = hasCssSupports && CSS.supports("color", "color(display-p3 1 0 0)");
        const supportsGradientP3 = hasCssSupports && CSS.supports("background", "linear-gradient(to right in display-p3, color(display-p3 0 0 0), color(display-p3 1 0 0))");

        setCssP3Supported(supportsP3);
        setGradientColorSpaceSupported(supportsGradientP3);

        if (typeof window.matchMedia === "function") {
          setMediaP3Match(window.matchMedia("(color-gamut: p3)").matches);
          setMediaRec2020Match(window.matchMedia("(color-gamut: rec2020)").matches);
        }
      }, 0);
    }
  }, [registerNavigation]);

  const getP3Gradient = (channel: PrimaryChannel) => {
    if (!cssP3Supported) {
      return `linear-gradient(to right, rgb(0, 0, 0), ${SRGB_COLORS[channel]})`;
    }
    if (gradientColorSpaceSupported) {
      return `linear-gradient(to right in display-p3, color(display-p3 0 0 0), ${P3_COLORS[channel]})`;
    }
    return `linear-gradient(to right, color(display-p3 0 0 0), ${P3_COLORS[channel]})`;
  };

  return (
    <>
      <div className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center p-4 sm:p-8 text-white select-none overflow-y-auto">
        <div className="max-w-4xl w-full flex flex-col items-center gap-6 my-auto">
          
          {/* Header & Gamut Detection Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white/5 border border-white/10 rounded-2xl p-4 sm:px-6 backdrop-blur-md">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-semibold font-mono">
                {t("browserReportedAmpVisual")}</div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                {t("colorGamutTestSrgb")}</h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/60 font-medium">{t("browserDetection")}</span>
              {cssP3Supported ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" title={t("browserSupportsCssColorTitle")}>
                  <Sparkles className="w-3 h-3" /> {t("cssColorDisplayP3")}</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <AlertTriangle className="w-3 h-3" /> {t("cssP3Unsupported")}</span>
              )}

              {mediaP3Match ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" title={t("mediaQueryReportsP3Title")}>
                  {t("colorGamutP3")}</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10" title={t("mediaQueryReportsStandardTitle")}>
                  {t("colorGamutSrgb")}</span>
              )}

              {mediaRec2020Match && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {t("colorGamutRec2020")}</span>
              )}
            </div>
          </div>

          {/* Mode Switcher */}
          <div role="tablist" aria-label={t("colorGamutViewModesTitle")} className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              role="tab"
              aria-selected={activeTab === "target"}
              onClick={() => setActiveTab("target")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "target" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t("opticalDetectionTarget")}</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "swatches"}
              onClick={() => setActiveTab("swatches")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "swatches" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t("srgbVsP3Swatches")}</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "ramp"}
              onClick={() => setActiveTab("ramp")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "ramp" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{t("spectralRamp")}</span>
            </button>
          </div>

          {/* TAB 1: Optical Detection Target */}
          {activeTab === "target" && (
            <div className="w-full flex flex-col items-center gap-4">
              {/* Channel Selector & Alignment Guide Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-lg text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white/50">{t("primaryChannel")}</span>
                  {(["red", "green", "blue"] as const).map(ch => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setTargetChannel(ch)}
                      className={`capitalize px-3 py-1 rounded-md text-xs font-medium border transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                        targetChannel === ch 
                          ? "bg-white/20 border-white/40 text-white font-semibold" 
                          : "border-white/10 text-white/50 hover:text-white"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAlignmentGuide(prev => !prev)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
                    showAlignmentGuide
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold"
                      : "border-white/10 text-white/40 hover:text-white/70"
                  }`}
                  title={t("toggleDashedAlignmentOutlineTitle")}
                >
                  {showAlignmentGuide ? "Guide: ON" : "Guide: OFF"}
                </button>
              </div>

              {/* Visual Detection Canvas / Box */}
              {!cssP3Supported ? (
                <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-center bg-white/5">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1.5">{t("cssColorDisplayP3_1")}</h3>
                  <p className="text-xs text-white/60 max-w-md leading-relaxed">
                    {t("yourCurrentBrowserEngine")}</p>
                </div>
              ) : (
                <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
                  {/* sRGB Base Background */}
                  <div 
                    className="absolute inset-0 transition-colors"
                    style={{ backgroundColor: SRGB_COLORS[targetChannel] }}
                  />

                  {/* Embedded Wide P3 Target Disk */}
                  <div 
                    className={`relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all select-none ${
                      showAlignmentGuide ? "border-2 border-dashed border-white/60" : ""
                    }`}
                    style={{ backgroundColor: P3_COLORS[targetChannel] }}
                  >
                    <div className="flex flex-col items-center justify-center pointer-events-none text-center">
                      <span 
                        className={`text-xs sm:text-sm font-black tracking-widest uppercase transition-opacity ${
                          showAlignmentGuide ? "text-white/80 drop-shadow-sm" : "text-transparent"
                        }`}
                      >
                        {t("displayP3")}</span>
                      <span 
                        className={`text-[10px] font-mono transition-opacity mt-0.5 ${
                          showAlignmentGuide ? "text-white/70" : "text-transparent"
                        }`}
                      >
                        {t("target")}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-center bg-black/60 backdrop-blur-xs py-1.5 px-3 rounded-lg text-[11px] text-white/90 font-mono">
                    {mediaP3Match 
                      ? "Compositor reports wide gamut: Center P3 disk should appear visibly distinguishable if your display pipeline renders Display-P3."
                      : "Compositor reports standard sRGB: The center P3 disk clamps to sRGB and should blend into the background (uniform flat field)."}
                  </div>
                </div>
              )}

              {/* Explanatory Guide */}
              <div className="flex items-start gap-2.5 max-w-xl text-xs text-white/60 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-left">
                  <p>
                    <strong>{t("opticalDetectionPrinciple")}</strong> {t("theOuterBackgroundIs")}<code>{SRGB_COLORS[targetChannel]}</code>{t("theCenterDiskIs")}<code>{P3_COLORS[targetChannel]}</code>{t("onStandardSrgbDisplays")}</p>
                  {targetChannel === "blue" && (
                    <p className="text-amber-300/90">
                      <strong>{t("blueChannelNote")}</strong> {t("theDciP3Color")}</p>
                  )}
                  <p className="text-white/40 text-[11px]">
                    <em>{t("boundaryNoteBrowserMedia")}</em>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Comparison Swatches */}
          {activeTab === "swatches" && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* sRGB Column */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold tracking-widest text-white/70 uppercase font-mono">{t("requestedSrgb")}</span>
                    <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded">{t("rec709Standard")}</span>
                  </div>
                  <div className="space-y-3 w-full">
                    <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'rgb(255, 0, 0)' }}>
                      <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">{t("srgbRedRgb255")}</span>
                    </div>
                    <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'rgb(0, 255, 0)' }}>
                      <span className="text-[10px] font-mono text-black/90 bg-white/60 px-2 py-0.5 rounded">{t("srgbGreenRgb0")}</span>
                    </div>
                    <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'rgb(0, 0, 255)' }}>
                      <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">{t("srgbBlueRgb0")}</span>
                    </div>
                  </div>
                </div>

                {/* Display P3 Column */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold tracking-widest text-white/70 uppercase font-mono">{t("requestedDisplayP3")}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      {cssP3Supported ? "CSS Display-P3" : "CSS P3 Unsupported"}
                    </span>
                  </div>
                  <div className="space-y-3 w-full">
                    <div 
                      className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" 
                      style={{ backgroundColor: cssP3Supported ? 'color(display-p3 1 0 0)' : 'rgb(255, 0, 0)' }}
                    >
                      <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">
                        {t("p3WideRedColor")}</span>
                    </div>
                    <div 
                      className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" 
                      style={{ backgroundColor: cssP3Supported ? 'color(display-p3 0 1 0)' : 'rgb(0, 255, 0)' }}
                    >
                      <span className="text-[10px] font-mono text-black/90 bg-white/60 px-2 py-0.5 rounded">
                        {t("p3WideGreenColor")}</span>
                    </div>
                    <div 
                      className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" 
                      style={{ backgroundColor: cssP3Supported ? 'color(display-p3 0 0 1)' : 'rgb(0, 0, 255)' }}
                    >
                      <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">
                        {t("p3BlueColorDisplay")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory note */}
              <div className="flex items-start gap-2.5 max-w-xl text-xs text-white/60 bg-white/5 border border-white/10 p-3.5 rounded-xl w-full">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-left leading-relaxed">
                  <strong>{t("visualContentComparison")}</strong> {t("evaluatesHumanVisualPerception")}</p>
              </div>
            </div>
          )}

          {/* TAB 3: Spectral Ramp */}
          {activeTab === "ramp" && (
            <div className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60 font-mono font-semibold">
                    {t("continuousGamutSaturationRamp")}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">
                    {t("compareSrgbVsDisplay")}</div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-white/50">{t("channel")}</span>
                  {(["red", "green", "blue"] as const).map(ch => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setTargetChannel(ch)}
                      className={`capitalize px-3 py-1 rounded-md text-xs font-medium border transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                        targetChannel === ch 
                          ? "bg-white/20 border-white/40 text-white font-semibold" 
                          : "border-white/10 text-white/50 hover:text-white"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="h-12 w-full rounded-lg shadow-inner" style={{ background: `linear-gradient(to right, rgb(0, 0, 0), ${SRGB_COLORS[targetChannel]})` }} />
                  <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1">
                    <span>{t("srgb0")}{targetChannel}</span>
                    <span>{t("srgb100")}{targetChannel}</span>
                  </div>
                </div>

                <div>
                  <div className="h-12 w-full rounded-lg shadow-inner" style={{ background: getP3Gradient(targetChannel) }} />
                  <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1">
                    <span>{t("displayP30")}{targetChannel}</span>
                    <span>{t("displayP3100")}{targetChannel}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-white/40 leading-relaxed border-t border-white/10 pt-3 text-left">
                {t("continuousRampComparisonVerifies")}</div>
            </div>
          )}

        </div>
      </div>

      <TestControlBar testId={testId} title={t("colorGamutTestSrgbTitle")}>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-300 font-bold font-mono uppercase tracking-wider">{t("status")}</span>
          <span className={`font-mono px-3 py-1 rounded-lg text-xs font-bold ${
            cssP3Supported && mediaP3Match
              ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50"
              : cssP3Supported
              ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
              : "bg-white/10 text-white/70 border border-white/20"
          }`}>
            {cssP3Supported && mediaP3Match
              ? "CSS P3 & (color-gamut: p3) Active"
              : cssP3Supported
              ? "CSS P3 Supported · (color-gamut: sRGB)"
              : "CSS color(display-p3) Unsupported"}
          </span>
        </div>
      </TestControlBar>
    </>
  );
}
