"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Crosshair, 
  Trash2, 
  Copy, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Maximize2, 
  Minimize2, 
  Eye, 
  Plus, 
  Layers
} from "lucide-react";
import { useTranslations } from "next-intl";

interface LoggedDefect {
  id: string;
  x: number;
  y: number;
  color: string;
  type: "dead_dark" | "stuck_red" | "stuck_green" | "stuck_blue" | "bright_subpixel" | "dust";
  zone: "center" | "edge";
  timestamp: string;
}

const BG_COLORS = [
  { name: "Pure Black", hex: "#000000", textColor: "text-white" },
  { name: "Pure White", hex: "#ffffff", textColor: "text-gray-950" },
  { name: "50% Neutral Grey", hex: "#808080", textColor: "text-white" },
  { name: "Primary Red", hex: "#ff0000", textColor: "text-white" },
  { name: "Primary Green", hex: "#00ff00", textColor: "text-gray-950" },
  { name: "Primary Blue", hex: "#0000ff", textColor: "text-white" },
  { name: "Cyan", hex: "#00ffff", textColor: "text-gray-950" },
  { name: "Magenta", hex: "#ff00ff", textColor: "text-white" },
  { name: "Yellow", hex: "#ffff00", textColor: "text-gray-950" }
];

export function DeadPixelMapperPattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.deadPixelMapper");
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);
  const [defects, setDefects] = useState<LoggedDefect[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedType, setSelectedType] = useState<LoggedDefect["type"]>("dead_dark");
  const [showLoupe, setShowLoupe] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentColor = BG_COLORS[activeColorIdx];

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

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMousePos({ x, y });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Calculate zone (center 50% vs outer 50%)
    const inCenterX = x > rect.width * 0.25 && x < rect.width * 0.75;
    const inCenterY = y > rect.height * 0.25 && y < rect.height * 0.75;
    const zone = inCenterX && inCenterY ? "center" : "edge";

    const newDefect: LoggedDefect = {
      id: `dp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      x,
      y,
      color: currentColor.name,
      type: selectedType,
      zone,
      timestamp: new Date().toLocaleTimeString()
    };

    setDefects((prev) => [...prev, newDefect]);
  };

  const removeDefect = (id: string) => {
    setDefects((prev) => prev.filter((d) => d.id !== id));
  };

  const clearAllDefects = () => {
    setDefects([]);
  };

  // Render canvas with plotted defects and loupe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Fill background
    ctx.fillStyle = currentColor.hex;
    ctx.fillRect(0, 0, w, h);

    // Draw grid lines in full-screen mode subtle
    if (isFullscreen) {
      ctx.strokeStyle = activeColorIdx === 0 ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      const step = 80;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // Draw marked defect markers
    defects.forEach((d, idx) => {
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = activeColorIdx === 0 ? "#ffffff" : "#000000";
      ctx.font = "10px monospace";
      ctx.fillText(`#${idx + 1} (${d.x},${d.y})`, d.x + 12, d.y + 4);
    });

    // Draw loupe / magnifier near mouse if enabled
    if (showLoupe && mousePos.x > 0 && mousePos.y > 0 && mousePos.x < w && mousePos.y < h) {
      const loupeRadius = 38;
      const loupeX = mousePos.x + 50 > w - loupeRadius * 2 ? mousePos.x - 60 : mousePos.x + 50;
      const loupeY = mousePos.y + 50 > h - loupeRadius * 2 ? mousePos.y - 60 : mousePos.y + 20;

      ctx.save();
      ctx.beginPath();
      ctx.arc(loupeX, loupeY, loupeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = activeColorIdx === 0 ? "#ffffff" : "#000000";
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(10,10,15,0.92)";
      ctx.fill();
      ctx.stroke();
      ctx.clip();

      // Crosshair inside loupe
      ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(loupeX - loupeRadius, loupeY);
      ctx.lineTo(loupeX + loupeRadius, loupeY);
      ctx.moveTo(loupeX, loupeY - loupeRadius);
      ctx.lineTo(loupeX, loupeY + loupeRadius);
      ctx.stroke();

      ctx.restore();
    }
  }, [currentColor, defects, mousePos, showLoupe, isFullscreen, activeColorIdx]);

  // ISO 9241-307 evaluation
  const deadCount = defects.filter((d) => d.type === "dead_dark").length;
  const stuckCount = defects.filter((d) => d.type !== "dead_dark" && d.type !== "dust").length;
  const isClass1Pass = defects.length === 0;
  const isClass2Pass = deadCount <= 2 && stuckCount <= 5;

  const copyRmaSummary = () => {
    const lines = [
      `=== SCREEN TESTER RMA DEFECT REPORT ===`,
      `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      `Total Logged Defective Pixels: ${defects.length}`,
      `Dead (Dark) Pixels: ${deadCount}`,
      `Stuck / Bright Subpixels: ${stuckCount}`,
      `ISO 9241-307 Class 1 (Zero-Defect Premium): ${isClass1Pass ? "PASS" : "FAIL (Eligible for Class 1 RMA)"}`,
      `ISO 9241-307 Class 2 (Standard Consumer): ${isClass2Pass ? "PASS" : "FAIL (Eligible for Standard RMA)"}`,
      `Coordinates:`,
      ...defects.map(
        (d, idx) => `#${idx + 1}: (${d.x}, ${d.y}) - Type: ${d.type} - Background: ${d.color} - Zone: ${d.zone}`
      )
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none" : ""
      }`}
    >
      {/* Top Header & Color Palette */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono font-bold text-gray-700 mr-1">Background:</span>
          {BG_COLORS.map((bg, idx) => (
            <button
              key={idx}
              onClick={() => setActiveColorIdx(idx)}
              className={`w-6 h-6 rounded-md border transition-all ${
                activeColorIdx === idx ? "scale-110 ring-2 ring-blue-600 ring-offset-1 border-transparent" : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: bg.hex }}
              title={bg.name}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLoupe(!showLoupe)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              showLoupe ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Loupe: {showLoupe ? "ON" : "OFF"}
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
        {/* Instruction Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-rose-600" />
            <span>Click anywhere on the canvas below to pinpoint and record a suspect dead or stuck pixel at exact <code className="font-mono text-blue-600">({mousePos.x}, {mousePos.y})</code>.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-gray-500">Defect Type to Log:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as LoggedDefect["type"])}
              className="text-xs rounded-md border border-gray-300 bg-white px-2 py-1 font-mono font-medium text-gray-900"
            >
              <option value="dead_dark">Dead / Dark Pixel</option>
              <option value="stuck_red">Stuck Red Subpixel</option>
              <option value="stuck_green">Stuck Green Subpixel</option>
              <option value="stuck_blue">Stuck Blue Subpixel</option>
              <option value="bright_subpixel">Bright White Subpixel</option>
              <option value="dust">Surface Dust Spec</option>
            </select>
          </div>
        </div>

        {/* Interactive Full-Area Canvas */}
        <div className="relative rounded-xl border border-gray-300 overflow-hidden shadow-inner cursor-crosshair">
          <canvas
            ref={canvasRef}
            width={1200}
            height={440}
            onMouseMove={handleCanvasMouseMove}
            onClick={handleCanvasClick}
            className="w-full h-[340px] sm:h-[440px] block"
          />
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="rounded-lg bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-xs font-mono">
              Cursor: X: {mousePos.x}px, Y: {mousePos.y}px · {defects.length} Logged
            </span>
          </div>
        </div>

        {/* Defect Log Table & ISO 9241-307 Evaluation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Table of Defect Log (2 Cols) */}
          <div className="lg:col-span-2 rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h4 className="text-xs font-bold font-mono uppercase text-gray-800">
                {t.has("tableHeaders.type") ? `${t("tableHeaders.type")} (${defects.length})` : `Pinpointed Defects (${defects.length})`}
              </h4>
              {defects.length > 0 && (
                <button
                  onClick={clearAllDefects}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            <div className="max-h-52 overflow-y-auto">
              {defects.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500">
                  {t.has("noDefectsLogged") ? t("noDefectsLogged") : "No defective pixels logged yet. Cycle through colors and click any defective point on screen to record it."}
                </div>
              ) : (
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-500 text-[11px]">
                    <tr>
                      <th className="px-4 py-2 font-normal">{t.has("tableHeaders.id") ? t("tableHeaders.id") : "#"}</th>
                      <th className="px-4 py-2 font-normal">{t.has("tableHeaders.coords") ? t("tableHeaders.coords") : "Coord (X,Y)"}</th>
                      <th className="px-4 py-2 font-normal">{t.has("tableHeaders.type") ? t("tableHeaders.type") : "Type"}</th>
                      <th className="px-4 py-2 font-normal">{t.has("tableHeaders.zone") ? t("tableHeaders.zone") : "Zone"}</th>
                      <th className="px-4 py-2 font-normal text-right">{t.has("tableHeaders.actions") ? t("tableHeaders.actions") : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {defects.map((d, i) => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-bold text-gray-900">#{i + 1}</td>
                        <td className="px-4 py-2 text-blue-600">({d.x}, {d.y})</td>
                        <td className="px-4 py-2 capitalize">{t.has(`defectTypes.${d.type}`) ? t(`defectTypes.${d.type}`) : d.type.replace("_", " ")}</td>
                        <td className="px-4 py-2 capitalize text-gray-600">{t.has(`zones.${d.zone}`) ? t(`zones.${d.zone}`) : d.zone}</td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => removeDefect(d.id)}
                            className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* ISO 9241-307 RMA Compliance Card */}
          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase text-gray-900">
                {t.has("isoAssessment") ? t("isoAssessment") : "ISO 9241-307 RMA Assessment"}
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg border bg-white">
                  <span className="font-medium text-gray-700">{t.has("class1Title") ? t("class1Title") : "Class 1 (Zero-Bright-Dot):"}</span>
                  <span className={`font-bold font-mono text-[11px] px-2 py-0.5 rounded ${
                    isClass1Pass ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {isClass1Pass ? (t.has("class1Pass") ? t("class1Pass") : "PASS (0 Defect)") : (t.has("rmaEligible") ? t("rmaEligible") : "RMA ELIGIBLE")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border bg-white">
                  <span className="font-medium text-gray-700">{t.has("class2Title") ? t("class2Title") : "Class 2 (Consumer Standard):"}</span>
                  <span className={`font-bold font-mono text-[11px] px-2 py-0.5 rounded ${
                    isClass2Pass ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {isClass2Pass ? (t.has("class2Pass") ? t("class2Pass") : "PASS (Within Limit)") : (t.has("rmaEligible") ? t("rmaEligible") : "RMA ELIGIBLE")}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed">
                {t.has("isoNote") ? t("isoNote") : "Most consumer warranties (Dell, LG, ASUS, Samsung) adhere to ISO Class 2 (max 2 dead or 5 stuck subpixels per 1M pixels). Premium lines guarantee 0 bright subpixels."}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={copyRmaSummary}
                disabled={defects.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold shadow-2xs transition-all ${
                  defects.length === 0 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-gray-950 hover:bg-gray-800 text-white cursor-pointer"
                }`}
              >
                <Copy className="w-4 h-4" />
                <span>{copiedNotification ? (t.has("reportCopied") ? t("reportCopied") : "Report Copied to Clipboard!") : (t.has("copyReport") ? t("copyReport") : "Copy RMA Log to Clipboard")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
