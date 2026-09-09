"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  BROWSER_CAPABILITIES_DATA, 
  TEST_REQUIREMENTS_MATRIX,
  CompatibilityStatus 
} from "@/data/browserCompatibility";
import { 
  supportsFullscreen, 
  supportsTouch, 
  supportsWebGPU, 
  supportsScreenDetails, 
  supportsScreenOrientation, 
  supportsCanvas2D, 
  supportsHDR, 
  supportsP3, 
  supportsPointerEvents,
  supportsWebAudio,
  supportsMediaDevices,
  supportsWakeLock,
  supportsLocalStorage,
  supportsPrint,
  getWebGLDiagnostics, 
  getDevicePixelRatio 
} from "@/lib/browserCapabilities";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  ExternalLink,
  Sparkles,
  Layers,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicProbeResult {
  supported: boolean;
  value?: string;
  notes?: string;
}

export function BrowserCompatibilityClient() {
  const t = useTranslations("BrowserCompatibility");
  const [activeTab, setActiveTab] = useState<"liveProbe" | "matrix" | "tests">("liveProbe");
  const [probeResults, setProbeResults] = useState<Record<string, DynamicProbeResult>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Dynamic live probe of user's active browser
  useEffect(() => {
    queueMicrotask(() => {
      const results: Record<string, DynamicProbeResult> = {};

      results["screen-orientation"] = {
        supported: supportsScreenOrientation(),
        value: typeof window !== "undefined" && window.screen?.orientation ? window.screen.orientation.type : "Not Available"
      };

      results["fullscreen-api"] = {
        supported: supportsFullscreen(),
        value: supportsFullscreen() ? "Fullscreen API Enabled" : "Not Supported on this Browser"
      };

      const dpr = getDevicePixelRatio();
      results["device-pixel-ratio"] = {
        supported: true,
        value: `${dpr}x scale factor`
      };

      results["screen-details"] = {
        supported: supportsScreenDetails(),
        value: supportsScreenDetails() ? "Available (Requires Permission)" : "Not Available in this Browser Engine"
      };

      results["raf-timing"] = {
        supported: typeof window !== "undefined" && typeof window.requestAnimationFrame === "function",
        value: "Hardware-synchronized requestAnimationFrame active"
      };

      results["canvas-2d"] = {
        supported: supportsCanvas2D(),
        value: "HTML5 2D Rendering Context Active"
      };

      const webgl = getWebGLDiagnostics();
      results["webgl"] = {
        supported: webgl.supported,
        value: webgl.supported ? `${webgl.version} (${webgl.renderer.substring(0, 45)})` : "WebGL Disabled / Hardware acceleration off"
      };

      results["webgpu"] = {
        supported: supportsWebGPU(),
        value: supportsWebGPU() ? "WebGPU API Available" : "Not Supported in this Browser Version"
      };

      results["pointer-events"] = {
        supported: supportsPointerEvents(),
        value: supportsTouch() ? `Pointer Events + Touch (${navigator.maxTouchPoints || 1} points)` : "Pointer Events (Mouse / Trackpad)"
      };

      results["web-audio"] = {
        supported: supportsWebAudio(),
        value: supportsWebAudio() ? "AudioContext Enabled" : "Not Available"
      };

      results["media-devices"] = {
        supported: supportsMediaDevices(),
        value: supportsMediaDevices() ? "MediaDevices API Available" : "Not Available"
      };

      results["wake-lock"] = {
        supported: supportsWakeLock(),
        value: supportsWakeLock() ? "Screen Wake Lock API Available" : "Not Supported"
      };

      results["local-storage"] = {
        supported: supportsLocalStorage(),
        value: supportsLocalStorage() ? "LocalStorage Available (Client-Side Storage)" : "Storage Blocked / Cookies Disabled"
      };

      results["print-api"] = {
        supported: supportsPrint(),
        value: supportsPrint() ? "Window.print Supported" : "Not Available"
      };

      results["hdr-query"] = {
        supported: supportsHDR(),
        value: supportsHDR() ? "CSS dynamic-range: high Matches" : "Standard Dynamic Range (SDR)"
      };

      results["p3-gamut"] = {
        supported: supportsP3(),
        value: supportsP3() ? "CSS color-gamut: p3 Matches" : "Standard sRGB Gamut"
      };

      setProbeResults(results);
      setIsLoaded(true);
    });
  }, []);

  const getStatusBadge = (status: CompatibilityStatus) => {
    switch (status) {
      case "SUPPORTED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t("badgeSupported")}</span>
          </span>
        );
      case "PARTIAL":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
            <AlertCircle className="w-3 h-3" />
            <span>{t("badgePartial")}</span>
          </span>
        );
      case "REQUIRES USER PERMISSION":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800">
            <Info className="w-3 h-3" />
            <span>{t("badgePermission")}</span>
          </span>
        );
      case "BROWSER DEPENDENT":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-800">
            <span>{t("badgeDependent")}</span>
          </span>
        );
      case "NOT AVAILABLE":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-500">
            <XCircle className="w-3 h-3" />
            <span>{t("badgeNotAvailable")}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Honesty Principle Banner */}
      <div className="p-5 sm:p-6 bg-blue-50/70 border border-blue-200/90 rounded-2xl text-xs sm:text-sm text-blue-950 space-y-2 leading-relaxed shadow-xs">
        <div className="flex items-center gap-2 font-bold uppercase font-mono text-blue-800 text-xs tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>{t("honestyNotice.title")}</span>
        </div>
        <p className="text-blue-900">
          {t("honestyNotice.body")}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("liveProbe")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors",
            activeTab === "liveProbe"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          )}
        >
          <Cpu className="w-4 h-4" />
          <span>{t("probeTitle")}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("matrix")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors",
            activeTab === "matrix"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          )}
        >
          <Layers className="w-4 h-4" />
          <span>{t("matrixTitle")}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tests")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors",
            activeTab === "tests"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t("testsMatrixTitle")}</span>
        </button>
      </div>

      {/* TAB 1: LIVE PROBE */}
      {activeTab === "liveProbe" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t("probeTitle")}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{t("probeSubtitle")}</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-mono font-bold uppercase">
              {isLoaded ? t("badgeSupported") : "..."}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BROWSER_CAPABILITIES_DATA.map((cap) => {
              const probe = probeResults[cap.id];
              return (
                <div
                  key={cap.id}
                  className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 text-sm">{cap.name}</span>
                      {probe ? (
                        probe.supported ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{t("badgeSupported")}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-500 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            <span>{t("badgeNotAvailable")}</span>
                          </span>
                        )
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-400">...</span>
                      )}
                    </div>
                    <code className="text-[10px] font-mono text-slate-400 block">{cap.apiSpec}</code>
                    <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>

                  {probe?.value && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded-lg truncate" title={probe.value}>
                      <span className="text-slate-400 select-none">Detected: </span>
                      <strong className="text-slate-900">{probe.value}</strong>
                    </div>
                  )}

                  <div className="mt-2 text-[10px] text-slate-500 italic bg-amber-50/40 p-2 rounded border border-amber-100">
                    <strong className="text-amber-800 not-italic">Physical boundary: </strong>
                    {cap.hardwareDistinction}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BROWSER SUPPORT MATRIX */}
      {activeTab === "matrix" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t("matrixTitle")}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{t("matrixSubtitle")}</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-white shadow-2xs">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-semibold uppercase text-slate-600">
                <tr>
                  <th className="py-3 px-4">{t("colCapability")}</th>
                  <th className="py-3 px-3">{t("colPlatformChromium")}</th>
                  <th className="py-3 px-3">{t("colPlatformFirefox")}</th>
                  <th className="py-3 px-3">{t("colPlatformSafari")}</th>
                  <th className="py-3 px-3">{t("colPlatformIos")}</th>
                  <th className="py-3 px-3">{t("colPlatformAndroid")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BROWSER_CAPABILITIES_DATA.map((cap) => (
                  <tr key={cap.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <strong className="font-semibold text-slate-900 block">{cap.name}</strong>
                      <code className="text-[10px] font-mono text-slate-400">{cap.apiSpec}</code>
                    </td>
                    <td className="py-3 px-3">{getStatusBadge(cap.supportMatrix.chromium)}</td>
                    <td className="py-3 px-3">{getStatusBadge(cap.supportMatrix.firefox)}</td>
                    <td className="py-3 px-3">{getStatusBadge(cap.supportMatrix.safariDesktop)}</td>
                    <td className="py-3 px-3">{getStatusBadge(cap.supportMatrix.iosSafari)}</td>
                    <td className="py-3 px-3">{getStatusBadge(cap.supportMatrix.androidBrowsers)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TEST REQUIREMENTS MATRIX */}
      {activeTab === "tests" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t("testsMatrixTitle")}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{t("testsMatrixSubtitle")}</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-white shadow-2xs">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-semibold uppercase text-slate-600">
                <tr>
                  <th className="py-3 px-4">{t("colTestName")}</th>
                  <th className="py-3 px-3">{t("colTargetDevice")}</th>
                  <th className="py-3 px-3">{t("colInputReq")}</th>
                  <th className="py-3 px-3">{t("colFullscreenReq")}</th>
                  <th className="py-3 px-3">{t("colWebglReq")}</th>
                  <th className="py-3 px-4">{t("colDesc")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEST_REQUIREMENTS_MATRIX.map((test) => (
                  <tr key={test.testId} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <Link href={`/tests/${test.testId}`} className="hover:text-blue-600 inline-flex items-center gap-1">
                        <span>{test.testName}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>
                    <td className="py-3 px-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase",
                        test.orientation === "Desktop-oriented" && "bg-blue-50 text-blue-700",
                        test.orientation === "Universal" && "bg-slate-100 text-slate-700",
                        test.orientation === "Mobile-oriented" && "bg-emerald-50 text-emerald-700"
                      )}>
                        {test.orientation}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {test.touchCapable ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {test.fullscreenRecommended ? (
                        <span className="text-blue-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Recommended
                        </span>
                      ) : (
                        <span className="text-slate-400">Optional</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {test.webglRequired ? (
                        <span className="text-purple-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Required
                        </span>
                      ) : (
                        <span className="text-slate-400">No (Canvas 2D / DOM)</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px] leading-relaxed max-w-xs">
                      {test.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
