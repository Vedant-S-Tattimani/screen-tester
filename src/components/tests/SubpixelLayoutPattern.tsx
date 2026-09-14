"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  ZoomIn, 
  Eye, 
  Layers, 
  Sliders, 
  Maximize2, 
  Minimize2, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  Type
} from "lucide-react";
import { useTranslations } from "next-intl";

type SubpixelType = "rgb" | "bgr" | "qdoled1" | "qdoled2" | "woled" | "pentile";

interface SubpixelProfile {
  id: SubpixelType;
  name: string;
  tag: string;
  subpixels: string[];
  description: string;
  fringingRisk: "None" | "Low" | "Moderate" | "High";
  riskColor: string;
}

const SUBPIXEL_PROFILES: SubpixelProfile[] = [
  {
    id: "rgb",
    name: "Standard RGB Stripe",
    tag: "IPS / VA / TN Standard",
    subpixels: ["#ef4444", "#22c55e", "#3b82f6"],
    description: "Standard horizontal order. Default target for Windows ClearType and macOS font rendering.",
    fringingRisk: "None",
    riskColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
  },
  {
    id: "bgr",
    name: "Inverted BGR Stripe",
    tag: "Select Gaming Monitors",
    subpixels: ["#3b82f6", "#22c55e", "#ef4444"],
    description: "Reversed blue-green-red subpixels. Causes slight color fringing under default Windows ClearType unless tuned via cttune.",
    fringingRisk: "Moderate",
    riskColor: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    id: "qdoled1",
    name: "QD-OLED Gen 1 (Triangular)",
    tag: "First-Gen QD-OLED",
    subpixels: ["#22c55e", "#ef4444", "#3b82f6"],
    description: "Green subpixel positioned above Red and Blue in a triangle. Known for subtle green/magenta fringes on high-contrast horizontal edges.",
    fringingRisk: "High",
    riskColor: "text-rose-600 bg-rose-50 border-rose-200"
  },
  {
    id: "qdoled2",
    name: "QD-OLED Gen 2 / Gen 3",
    tag: "Modern 4K / 360Hz QD-OLED",
    subpixels: ["#22c55e", "#ef4444", "#3b82f6"],
    description: "Refined subpixel geometry with square emitters and tighter spacing, significantly reducing font edge discoloration.",
    fringingRisk: "Low",
    riskColor: "text-blue-600 bg-blue-50 border-blue-200"
  },
  {
    id: "woled",
    name: "LG WOLED (R-W-G-B)",
    tag: "OLED TVs & Displays",
    subpixels: ["#ef4444", "#ffffff", "#22c55e", "#3b82f6"],
    description: "Features a dedicated white emitter alongside RGB to boost luminance. ClearType's 3-subpixel algorithm can create faint edge shadows.",
    fringingRisk: "Moderate",
    riskColor: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    id: "pentile",
    name: "Diamond PenTile",
    tag: "AMOLED / Mobile Panels",
    subpixels: ["#22c55e", "#ef4444", "#22c55e", "#3b82f6"],
    description: "Subpixel sharing with twice as many green subpixels as red or blue. Requires high PPI (300+) to eliminate visible diamond stepping.",
    fringingRisk: "Moderate",
    riskColor: "text-amber-600 bg-amber-50 border-amber-200"
  }
];

export function SubpixelLayoutPattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.subpixelLayoutTest");
  const [selectedProfile, setSelectedProfile] = useState<SubpixelType>("rgb");
  const [activeTab, setActiveTab] = useState<"visualizer" | "lines" | "text" | "cleartype">("visualizer");
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [fontSize, setFontSize] = useState<number>(18);
  const [isDarkBg, setIsDarkBg] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const profile = SUBPIXEL_PROFILES.find(p => p.id === selectedProfile) || SUBPIXEL_PROFILES[0];

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Draw simulated microscopic subpixel array
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== "visualizer") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, width, height);

    const pitch = zoomLevel * 3;
    const rows = Math.ceil(height / pitch) + 1;
    const cols = Math.ceil(width / pitch) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * pitch;
        const y = r * pitch;

        if (selectedProfile === "rgb" || selectedProfile === "bgr") {
          const colors = selectedProfile === "rgb" 
            ? ["#ef4444", "#22c55e", "#3b82f6"]
            : ["#3b82f6", "#22c55e", "#ef4444"];
          const subW = (pitch - 4) / 3;
          colors.forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.fillRect(x + idx * subW + 1, y + 2, subW - 2, pitch - 4);
            ctx.fillStyle = "rgba(255,255,255,0.25)";
            ctx.fillRect(x + idx * subW + 2, y + 3, (subW - 2) * 0.4, (pitch - 4) * 0.6);
          });
        } else if (selectedProfile === "woled") {
          const colors = ["#ef4444", "#f8fafc", "#22c55e", "#3b82f6"];
          const subW = (pitch - 4) / 4;
          colors.forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.fillRect(x + idx * subW + 1, y + 2, subW - 2, pitch - 4);
          });
        } else if (selectedProfile === "qdoled1" || selectedProfile === "qdoled2") {
          // Triangular structure: Green on top, Red & Blue below
          const pad = 2;
          const greenW = pitch - pad * 2;
          const greenH = (pitch / 2) - pad;
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(x + pad + (greenW * 0.2), y + pad, greenW * 0.6, greenH);

          const bottomW = (pitch - pad * 3) / 2;
          const bottomH = (pitch / 2) - pad;
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(x + pad, y + (pitch / 2), bottomW, bottomH);
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(x + pad * 2 + bottomW, y + (pitch / 2), bottomW, bottomH);
        } else {
          // Diamond pentile
          const midX = x + pitch / 2;
          const midY = y + pitch / 2;
          ctx.fillStyle = "#22c55e";
          ctx.beginPath();
          ctx.arc(midX, midY, pitch * 0.18, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = (r + c) % 2 === 0 ? "#ef4444" : "#3b82f6";
          ctx.fillRect(x + 2, y + 2, pitch * 0.35, pitch * 0.35);
        }
      }
    }
  }, [selectedProfile, zoomLevel, activeTab]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : ""
      }`}
    >
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-2xs">
            <button
              onClick={() => setActiveTab("visualizer")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === "visualizer" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Subpixel Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab("lines")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === "lines" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1px Test Gratings</span>
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === "text" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Text Fringing</span>
            </button>
            <button
              onClick={() => setActiveTab("cleartype")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === "cleartype" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>ClearType Tuner</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkBg(!isDarkBg)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isDarkBg ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-4 sm:p-6 space-y-6">
        {activeTab === "visualizer" && (
          <div className="space-y-4">
            {/* Subpixel Architecture Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {SUBPIXEL_PROFILES.map((p) => {
                const isSelected = selectedProfile === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProfile(p.id)}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? "border-gray-950 bg-gray-50/80 shadow-2xs ring-1 ring-gray-950" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1.5">
                      {p.subpixels.map((col, i) => (
                        <div 
                          key={i} 
                          className="w-2.5 h-4 rounded-xs border border-black/20"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-900 leading-tight mb-0.5">{p.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{p.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Microscopic Loupe Canvas */}
            <div className="relative rounded-xl border border-gray-900/10 overflow-hidden shadow-inner bg-black">
              <canvas 
                ref={canvasRef} 
                width={900} 
                height={360} 
                className="w-full h-[280px] sm:h-[360px] object-cover block"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-xs font-mono">
                  Simulated Subpixel Emitter Layout ({zoomLevel}× Loupe)
                </div>
                <div className="pointer-events-auto flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-xs text-gray-300 font-mono">Zoom:</span>
                  <input 
                    type="range" 
                    min={8} 
                    max={24} 
                    value={zoomLevel} 
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="w-24 accent-blue-500"
                  />
                  <span className="text-xs font-mono text-white w-6 text-right">{zoomLevel}×</span>
                </div>
              </div>
            </div>

            {/* Profile Assessment Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-950">{profile.name}</h4>
                  <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border ${profile.riskColor}`}>
                    Text Fringing Risk: {profile.fringingRisk}
                  </span>
                </div>
                <p className="text-xs text-gray-600 max-w-2xl">{profile.description}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "lines" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
              <p className="text-xs text-gray-700 leading-relaxed">
                Inspect these single-pixel alternating black-and-white lines from your normal reading distance. 
                If the lines appear completely neutral grey without color shimmer, your subpixel rendering matches your panel layout.
                If you see magenta, green, or rainbow bands, subpixel mismatch is present.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vertical 1px Gratings */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 text-xs font-mono font-bold text-gray-800 flex justify-between">
                  <span>1px Vertical Gratings (Checks RGB/BGR Horizontal Order)</span>
                  <span className="text-gray-500">100% Native Scale</span>
                </div>
                <div 
                  className="h-48 w-full"
                  style={{
                    backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 1px, #fff 1px, #fff 2px)",
                    backgroundSize: "2px 100%"
                  }}
                />
              </div>

              {/* Horizontal 1px Gratings */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 text-xs font-mono font-bold text-gray-800 flex justify-between">
                  <span>1px Horizontal Gratings (Checks QD-OLED Vertical Shift)</span>
                  <span className="text-gray-500">100% Native Scale</span>
                </div>
                <div 
                  className="h-48 w-full"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, #fff 1px, #fff 2px)",
                    backgroundSize: "100% 2px"
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "text" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-600">Font Size:</span>
                <input 
                  type="range" 
                  min={11} 
                  max={32} 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-28 accent-blue-600"
                />
                <span className="text-xs font-mono font-bold text-gray-900">{fontSize}px</span>
              </div>
              <p className="text-xs text-gray-500">
                Look closely at edges of vertical stems (l, t, H) and curves (e, o) for green or magenta color bleeding.
              </p>
            </div>

            <div className={`p-6 rounded-xl border transition-colors ${
              isDarkBg ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"
            }`}>
              <div className="space-y-4" style={{ fontSize: `${fontSize}px` }}>
                <p className="font-sans font-normal leading-relaxed">
                  The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. 0123456789.
                </p>
                <p className="font-serif font-normal leading-relaxed">
                  Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump!
                </p>
                <p className="font-mono font-medium tracking-tight">
                  const subpixelOrder = panelType === &quot;BGR&quot; ? invertClearType() : defaultRGB;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-200/40 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600">
                    Pure Red High Contrast: HHHH llll oooo
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600">
                    Pure Green High Contrast: HHHH llll oooo
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-600">
                    Pure Blue High Contrast: HHHH llll oooo
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cleartype" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-bold text-gray-950">How to Tune ClearType on Windows</h4>
                </div>
                <ol className="list-decimal pl-5 text-xs text-gray-600 space-y-2">
                  <li>Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-[11px] font-mono">Win + R</kbd>, type <code className="text-blue-600 font-bold">cttune.exe</code>, and hit Enter.</li>
                  <li>Ensure <strong>&quot;Turn on ClearType&quot;</strong> is checked and click Next.</li>
                  <li>At Step 2, select the rectangle whose text looks sharpest and most natural without colored halo borders.</li>
                  <li>If using a <strong>BGR monitor</strong>, Windows will automatically switch from RGB subpixel antialiasing to BGR subpixel antialiasing.</li>
                  <li>For <strong>QD-OLED panels</strong>, third-party utilities like <em>MacType</em> or disabling ClearType for standard grayscale antialiasing can eliminate text fringing entirely.</li>
                </ol>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h4 className="text-sm font-bold text-gray-950">macOS &amp; Linux Text Smoothing</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Modern macOS (since Mojave) disables subpixel antialiasing by default in favor of high-DPI whole-pixel grayscale smoothing. 
                  Because of this, macOS handles QD-OLED and BGR layouts much better without subpixel colored fringing, provided your display has adequate PPI (110+ PPI or 4K).
                </p>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs font-mono text-gray-700">
                  defaults -currentHost write -g AppleFontSmoothing -int 2
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
