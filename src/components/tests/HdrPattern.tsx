"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import {
  SunMedium,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Monitor,
  Cpu,
  Layers,
  ShieldCheck,
  Activity,
  Sparkles,
  Tv,
  Film,
  RefreshCw,
  Info,
  Sliders,
  Settings2,
  Zap
} from "lucide-react";
import { useTranslations } from "next-intl";

interface HdrPatternProps {
  testId?: string;
}

type TabMode = "dashboard" | "codecs" | "setup";

interface CodecResult {
  name: string;
  format: string;
  description: string;
  supported: boolean;
  smooth: boolean;
  powerEfficient: boolean;
}

export function HdrPattern({ testId = "hdr-capability-test" }: HdrPatternProps) {
  const t = useTranslations("Tests.HdrPattern");
  const { registerNavigation } = useTestContext();

  const [activeTab, setActiveTab] = useState<TabMode>("dashboard");
  const [lastSignalChange, setLastSignalChange] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Probed hardware & browser metrics
  const [hdrSupported, setHdrSupported] = useState<boolean | null>(null);
  const [p3Supported, setP3Supported] = useState<boolean | null>(null);
  const [rec2020Supported, setRec2020Supported] = useState<boolean | null>(null);
  const [srgbSupported, setSrgbSupported] = useState<boolean | null>(null);
  const [colorDepth, setColorDepth] = useState<number | null>(null);
  const [pixelDepth, setPixelDepth] = useState<number | null>(null);
  const [dpr, setDpr] = useState<number | null>(null);
  const [canvasP3Supported, setCanvasP3Supported] = useState<boolean | null>(null);
  const [webglFloatSupported, setWebglFloatSupported] = useState<boolean | null>(null);
  const [codecs, setCodecs] = useState<CodecResult[]>([]);

  // Function to probe all hardware, compositor, canvas & codec capabilities
  const probeCapabilities = useCallback(async () => {
    if (typeof window === "undefined") return;
    setIsRefreshing(true);

    try {
      // 1. CSS Media Queries
      const hdrMql = window.matchMedia("(dynamic-range: high)");
      const p3Mql = window.matchMedia("(color-gamut: p3)");
      const rec2020Mql = window.matchMedia("(color-gamut: rec2020)");
      const srgbMql = window.matchMedia("(color-gamut: srgb)");

      setHdrSupported(hdrMql.matches);
      setP3Supported(p3Mql.matches);
      setRec2020Supported(rec2020Mql.matches);
      setSrgbSupported(srgbMql.matches);

      // 2. Screen & Buffer Properties
      if (window.screen) {
        setColorDepth(window.screen.colorDepth);
        setPixelDepth(window.screen.pixelDepth);
      }
      setDpr(window.devicePixelRatio || 1);

      // 3. Canvas 2D Display-P3 Color Space Support
      try {
        const testCanvas = document.createElement("canvas");
        testCanvas.width = 2;
        testCanvas.height = 2;
        const ctx = testCanvas.getContext("2d", { colorSpace: "display-p3" });
        const actualColorSpace = ctx?.getContextAttributes()?.colorSpace;
        setCanvasP3Supported(actualColorSpace === "display-p3");
      } catch {
        setCanvasP3Supported(false);
      }

      // 4. WebGL Extended Range / Floating-Point Buffer Support
      try {
        const glCanvas = document.createElement("canvas");
        const gl = glCanvas.getContext("webgl2") || glCanvas.getContext("webgl");
        if (gl) {
          const halfFloat = gl.getExtension("EXT_color_buffer_half_float");
          const floatExt = gl.getExtension("EXT_color_buffer_float");
          const oesHalf = gl.getExtension("OES_texture_half_float");
          setWebglFloatSupported(!!(halfFloat || floatExt || oesHalf));
        } else {
          setWebglFloatSupported(false);
        }
      } catch {
        setWebglFloatSupported(false);
      }

      // 5. Video Codec Probing (HDR10, AV1 10-bit, VP9 Profile 2, HLG)
      const codecQueries = [
        {
          name: "HDR10 (HEVC Main 10)",
          format: "video/mp4; codecs=\"hvc1.2.4.L153.B0\"",
          description: t("codecsHdr10Desc"),
          contentType: "video/mp4; codecs=\"hvc1.2.4.L153.B0\""
        },
        {
          name: "AV1 10-bit (YouTube HDR)",
          format: "video/mp4; codecs=\"av01.0.08M.10\"",
          description: t("codecsAv1Desc"),
          contentType: "video/mp4; codecs=\"av01.0.08M.10\""
        },
        {
          name: "VP9 Profile 2 (10-bit)",
          format: "video/webm; codecs=\"vp09.02.10.10.01.09.16.09.01\"",
          description: t("codecsVp9Desc"),
          contentType: "video/webm; codecs=\"vp09.02.10.10.01.09.16.09.01\""
        },
        {
          name: "HLG (Hybrid Log-Gamma)",
          format: "video/mp4; codecs=\"hev1.2.4.L150.B0\"",
          description: t("codecsHlgDesc"),
          contentType: "video/mp4; codecs=\"hev1.2.4.L150.B0\""
        }
      ];

      const probedResults: CodecResult[] = [];

      for (const q of codecQueries) {
        if (navigator.mediaCapabilities?.decodingInfo) {
          try {
            const info = await navigator.mediaCapabilities.decodingInfo({
              type: "file",
              video: {
                contentType: q.contentType,
                width: 3840,
                height: 2160,
                bitrate: 25000000,
                framerate: 60
              }
            });
            probedResults.push({
              name: q.name,
              format: q.format,
              description: q.description,
              supported: info.supported,
              smooth: info.smooth,
              powerEfficient: info.powerEfficient
            });
          } catch {
            const videoEl = document.createElement("video");
            const canPlay = videoEl.canPlayType(q.contentType);
            probedResults.push({
              name: q.name,
              format: q.format,
              description: q.description,
              supported: canPlay === "probably" || canPlay === "maybe",
              smooth: true,
              powerEfficient: false
            });
          }
        } else {
          const videoEl = document.createElement("video");
          const canPlay = videoEl.canPlayType(q.contentType);
          probedResults.push({
            name: q.name,
            format: q.format,
            description: q.description,
            supported: canPlay === "probably" || canPlay === "maybe",
            smooth: true,
            powerEfficient: false
          });
        }
      }

      setCodecs(probedResults);
    } finally {
      setTimeout(() => setIsRefreshing(false), 300);
    }
  }, [t]);

  // Initial probe and dynamic event listener for real-time OS HDR toggling (Win+Alt+B)
  useEffect(() => {
    probeCapabilities();

    if (typeof window !== "undefined") {
      const hdrMql = window.matchMedia("(dynamic-range: high)");
      const p3Mql = window.matchMedia("(color-gamut: p3)");

      const handleHdrChange = (e: MediaQueryListEvent) => {
        setHdrSupported(e.matches);
        setLastSignalChange(
          e.matches
            ? t("signalNotificationHdrActive")
            : t("signalNotificationHdrInactive")
        );
        probeCapabilities();
      };

      const handleP3Change = (e: MediaQueryListEvent) => {
        setP3Supported(e.matches);
        probeCapabilities();
      };

      hdrMql.addEventListener("change", handleHdrChange);
      p3Mql.addEventListener("change", handleP3Change);

      return () => {
        hdrMql.removeEventListener("change", handleHdrChange);
        p3Mql.removeEventListener("change", handleP3Change);
      };
    }
  }, [probeCapabilities, t]);

  // Keyboard navigation
  const cycleTabNext = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "dashboard") return "codecs";
      if (curr === "codecs") return "setup";
      return "dashboard";
    });
  }, []);

  const cycleTabPrev = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "setup") return "codecs";
      if (curr === "codecs") return "dashboard";
      return "setup";
    });
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleTabNext,
      prev: cycleTabPrev,
      reset: () => {
        setActiveTab("dashboard");
        probeCapabilities();
      }
    });
  }, [registerNavigation, cycleTabNext, cycleTabPrev, probeCapabilities]);

  return (
    <>
      <div className="w-full bg-[#09090b] text-white p-4 sm:p-6 select-none overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">

          {/* Live Signal Change Alert Banner (Hot-Reload Toast) */}
          {lastSignalChange && (
            <div className="flex items-center justify-between gap-3 p-3.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">{lastSignalChange}</span>
              </div>
              <button
                type="button"
                onClick={() => setLastSignalChange(null)}
                className="text-amber-400 hover:text-white px-2 py-0.5 rounded text-[11px] font-mono border border-amber-500/30 cursor-pointer"
              >
                {t("dismiss")}
              </button>
            </div>
          )}

          {/* Master Signal Status Hero */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-black border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                  hdrSupported
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/10"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}>
                  <Cpu className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                      {t("pipelineDetectorBadge")}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono">
                      {t("realTimeHardwareAudit")}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                    {t("hdrHardwareSignalDetectorTitle")}
                  </h1>
                  <p className="text-xs text-white/60 mt-1 max-w-xl">
                    {t("hdrHardwareSignalDetectorSubtitle")}
                  </p>
                </div>
              </div>

              {/* Status Badge & Refresh Button */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
                <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-bold ${
                  hdrSupported === null
                    ? "bg-white/5 border-white/10 text-white/50"
                    : hdrSupported
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : "bg-slate-800 border-slate-700 text-slate-300"
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    hdrSupported ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
                  }`} />
                  <span>
                    {hdrSupported === null
                      ? t("probingStatus")
                      : hdrSupported
                      ? t("hdrActiveCompositor")
                      : t("sdrFallbackCompositor")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={probeCapabilities}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-50"
                  title={t("reProbeTooltip")}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">{t("reProbe")}</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">
                  {t("metricDynamicRange")}
                </span>
                <span className={`text-sm font-mono font-bold ${hdrSupported ? "text-amber-300" : "text-white/80"}`}>
                  {hdrSupported ? "High (HDR)" : "Standard (SDR)"}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">
                  {t("metricColorGamut")}
                </span>
                <span className={`text-sm font-mono font-bold ${rec2020Supported ? "text-emerald-400" : p3Supported ? "text-sky-300" : "text-white/80"}`}>
                  {rec2020Supported ? "Rec.2020" : p3Supported ? "Display-P3" : "sRGB"}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">
                  {t("metricBufferDepth")}
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {colorDepth ? `${colorDepth}-bit (${colorDepth >= 30 ? "10-bit HDR" : "8-bit SDR"})` : "--"}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">
                  {t("metricCanvasP3")}
                </span>
                <span className={`text-sm font-mono font-bold ${canvasP3Supported ? "text-emerald-400" : "text-slate-400"}`}>
                  {canvasP3Supported ? t("supported") : t("fallbackSrgb")}
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div role="tablist" aria-label={t("tabListLabel")} className="flex flex-wrap items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              role="tab"
              aria-selected={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-white text-black shadow-md font-extrabold"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{t("tabSignalDashboard")}</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "codecs"}
              onClick={() => setActiveTab("codecs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "codecs"
                  ? "bg-white text-black shadow-md font-extrabold"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{t("tabVideoCodecs")}</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "setup"}
              onClick={() => setActiveTab("setup")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "setup"
                  ? "bg-white text-black shadow-md font-extrabold"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Settings2 className="w-4 h-4" />
              <span>{t("tabOsSetupGuide")}</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: SIGNAL DASHBOARD & LIVE PIPELINE AUDIT             */}
          {/* ========================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Detailed Probed API Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card A: CSS Media Queries */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono font-bold text-white/50 tracking-wider">
                      {t("mediaQueryQueriesTitle")}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">CSS Media Level 4</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">(dynamic-range: high)</div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        hdrSupported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                      }`}>
                        {hdrSupported ? t("activeTrue") : t("inactiveFalse")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">(color-gamut: rec2020)</div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        rec2020Supported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                      }`}>
                        {rec2020Supported ? t("activeTrue") : t("inactiveFalse")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">(color-gamut: p3)</div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        p3Supported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                      }`}>
                        {p3Supported ? t("activeTrue") : t("inactiveFalse")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">(color-gamut: srgb)</div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                        {srgbSupported ? t("activeTrue") : t("activeTrue")}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {t("mediaQueryExplanation")}
                  </p>
                </div>

                {/* Card B: Screen & Canvas Hardware Buffer APIs */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono font-bold text-white/50 tracking-wider">
                      {t("graphicsPipelineTitle")}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">DOM & WebGL APIs</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">screen.colorDepth</div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white/10 text-white">
                        {colorDepth ? `${colorDepth}-bit` : "--"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">Canvas 2D ColorSpace P3</div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        canvasP3Supported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                      }`}>
                        {canvasP3Supported ? t("supported") : t("notSupported")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">WebGL Half-Float Buffer (HDR)</div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        webglFloatSupported ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                      }`}>
                        {webglFloatSupported ? t("supported") : t("notSupported")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="font-mono text-white/80">window.devicePixelRatio</div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white/10 text-white">
                        {dpr ? `${dpr}x` : "1x"}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {t("bufferExplanation")}
                  </p>
                </div>
              </div>

              {/* Interactive Gamut Comparison Sandbox */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    {t("gamutSandboxTitle")}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    {t("gamutSandboxSubtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Red Swatch */}
                  <div className="p-3 bg-black/50 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[11px] font-mono text-white/60 block font-semibold">{t("colorRed")}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-lg bg-[#FF0000] flex flex-col justify-end p-1.5 shadow-inner">
                        <span className="text-[9px] font-mono text-white/90 bg-black/60 px-1 py-0.5 rounded self-start">sRGB</span>
                      </div>
                      <div 
                        className="h-16 rounded-lg flex flex-col justify-end p-1.5 shadow-inner"
                        style={{ backgroundColor: "color(display-p3 1 0 0, rgb(255, 0, 0))" }}
                      >
                        <span className="text-[9px] font-mono text-white/90 bg-black/60 px-1 py-0.5 rounded self-start">Display-P3</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 block leading-tight">
                      {t("redNotice")}
                    </span>
                  </div>

                  {/* Green Swatch */}
                  <div className="p-3 bg-black/50 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[11px] font-mono text-white/60 block font-semibold">{t("colorGreen")}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-lg bg-[#00FF00] flex flex-col justify-end p-1.5 shadow-inner">
                        <span className="text-[9px] font-mono text-black/90 bg-white/70 px-1 py-0.5 rounded self-start">sRGB</span>
                      </div>
                      <div 
                        className="h-16 rounded-lg flex flex-col justify-end p-1.5 shadow-inner"
                        style={{ backgroundColor: "color(display-p3 0 1 0, rgb(0, 255, 0))" }}
                      >
                        <span className="text-[9px] font-mono text-black/90 bg-white/70 px-1 py-0.5 rounded self-start">Display-P3</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 block leading-tight">
                      {t("greenNotice")}
                    </span>
                  </div>

                  {/* Blue Swatch */}
                  <div className="p-3 bg-black/50 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[11px] font-mono text-white/60 block font-semibold">{t("colorBlue")}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-lg bg-[#0000FF] flex flex-col justify-end p-1.5 shadow-inner">
                        <span className="text-[9px] font-mono text-white/90 bg-black/60 px-1 py-0.5 rounded self-start">sRGB</span>
                      </div>
                      <div 
                        className="h-16 rounded-lg flex flex-col justify-end p-1.5 shadow-inner"
                        style={{ backgroundColor: "color(display-p3 0 0 1, rgb(0, 0, 255))" }}
                      >
                        <span className="text-[9px] font-mono text-white/90 bg-black/60 px-1 py-0.5 rounded self-start">Display-P3</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 block leading-tight">
                      {t("blueNotice")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hardware Certification & Nits Boundary Warning */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-100 block mb-1">
                    {t("hardwareBoundaryTitle")}
                  </strong>
                  {t("hardwareBoundaryBody")}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: HDR VIDEO PLAYBACK & CODEC PROBE MATRIX            */}
          {/* ========================================================= */}
          {activeTab === "codecs" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  {t("codecCapabilitiesTitle")}
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  {t("codecCapabilitiesSubtitle")}
                </p>
              </div>

              <div className="space-y-3">
                {codecs.map((codec) => (
                  <div
                    key={codec.name}
                    className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white font-mono">{codec.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
                          {codec.format}
                        </span>
                      </div>
                      <p className="text-xs text-white/50">{codec.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {codec.supported ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{codec.powerEfficient ? t("hardwareAccelerated") : t("softwareDecoded")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{t("notSupported")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-900/40 text-xs text-sky-200 leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-100 block mb-0.5">{t("codecNoteTitle")}</strong>
                  {t("codecNoteBody")}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: OS CONFIGURATION & HARDWARE SETUP GUIDE            */}
          {/* ========================================================= */}
          {activeTab === "setup" && (
            <div className="space-y-4">
              
              {/* Windows 10/11 Guide */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    {t("windowsGuideTitle")}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-white/70 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>{t("windowsShortcut")}</strong>: {t("windowsShortcutDesc")}{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 font-mono text-[11px] text-white">
                      Win + Alt + B
                    </kbd>.
                  </li>
                  <li>
                    <strong>{t("windowsSettings")}</strong>: {t("windowsSettingsDesc")}
                  </li>
                  <li>
                    <strong>{t("sdrSlider")}</strong>: {t("sdrSliderDesc")}
                  </li>
                </ul>
              </div>

              {/* macOS Guide */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    {t("macOsGuideTitle")}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-white/70 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>{t("macXdr")}</strong>: {t("macXdrDesc")}
                  </li>
                  <li>
                    <strong>{t("macPresets")}</strong>: {t("macPresetsDesc")}
                  </li>
                </ul>
              </div>

              {/* Cable Bandwidth & GPU Output */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    {t("cableGuideTitle")}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-white/70 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>{t("hdmiLimits")}</strong>: {t("hdmiLimitsDesc")}
                  </li>
                  <li>
                    <strong>{t("gpuColorDepth")}</strong>: {t("gpuColorDepthDesc")}
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* DOCKED TEST CONTROL BAR */}
      <TestControlBar testId={testId} title={t("hdrHardwareSignalDetectorTitle")}>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center bg-slate-100 dark:bg-black/80 p-1 rounded-xl border border-slate-200 dark:border-white/20 text-xs">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300"
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              {t("tabSignalDashboard")}
            </button>
            <button
              onClick={() => setActiveTab("codecs")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "codecs"
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300"
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              {t("tabVideoCodecs")}
            </button>
            <button
              onClick={() => setActiveTab("setup")}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                activeTab === "setup"
                  ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300"
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              {t("tabOsSetupGuide")}
            </button>
          </div>

          <button
            onClick={probeCapabilities}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{t("refreshAudit")}</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}