"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Calendar, 
  FileText,
  User,
  Monitor,
  Hash
} from "lucide-react";
import { useTranslations } from "next-intl";

export function DisplayCertificatePattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.displayCertificate");

  // Auto-detected specs
  const [detectedSpecs, setDetectedSpecs] = useState({
    resolution: "Loading...",
    dpr: "1",
    colorDepth: "24-bit",
    gamut: "sRGB",
    refreshRate: "60 Hz",
    browser: "Detecting..."
  });

  // User input fields
  const [monitorModel, setMonitorModel] = useState<string>("LG 27GP850 UltraGear / Dell Alienware");
  const [serialNumber, setSerialNumber] = useState<string>("SN-9824-A194");
  const [inspectorName, setInspectorName] = useState<string>("Display Quality Inspector");
  const [deadPixelCount, setDeadPixelCount] = useState<number>(0);
  const [backlightGrade, setBacklightGrade] = useState<string>("Pass (Minimal Glow)");
  const [uniformityGrade, setUniformityGrade] = useState<string>("Grade A (Uniform)");
  const [motionGrade, setMotionGrade] = useState<string>("Pass (No Severe Ghosting)");
  const [overallVerdict, setOverallVerdict] = useState<"certified" | "conditional" | "rma">("certified");

  const certIdRef = useRef<string>(`ST-CERT-${Math.floor(100000 + Math.random() * 900000)}`);
  const certDateRef = useRef<string>(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));

  // Auto-detect browser display properties
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window.screen.width * (window.devicePixelRatio || 1);
      const h = window.screen.height * (window.devicePixelRatio || 1);
      const isP3 = window.matchMedia && window.matchMedia("(color-gamut: p3)").matches;

      setDetectedSpecs({
        resolution: `${Math.round(w)} × ${Math.round(h)} px`,
        dpr: `${window.devicePixelRatio || 1}x`,
        colorDepth: `${window.screen.colorDepth || 24}-bit`,
        gamut: isP3 ? "DCI-P3 Wide Gamut" : "Standard sRGB",
        refreshRate: "Calibrated (60Hz–240Hz+)",
        browser: `${navigator.platform || "Desktop"} / ${navigator.userAgent.includes("Chrome") ? "Chrome-Blink" : "Web Engine"}`
      });
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      {/* Editor & Configuration Panel (Hidden on Print) */}
      <div className="print:hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-950">Display Certificate &amp; RMA Report Generator</h3>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF Certificate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-mono text-gray-600 font-bold block">Monitor Brand &amp; Model:</label>
            <input
              type="text"
              value={monitorModel}
              onChange={(e) => setMonitorModel(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 font-medium text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-gray-600 font-bold block">Serial Number / Asset Tag:</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 font-medium text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-gray-600 font-bold block">Inspector / Owner Name:</label>
            <input
              type="text"
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 font-medium text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-gray-600 font-bold block">Dead / Stuck Pixel Count:</label>
            <input
              type="number"
              min={0}
              max={50}
              value={deadPixelCount}
              onChange={(e) => setDeadPixelCount(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-2 font-medium text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-gray-600 font-bold block">Backlight Bleed / Glow:</label>
            <select
              value={backlightGrade}
              onChange={(e) => setBacklightGrade(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 font-medium text-gray-900 bg-white"
            >
              <option value="Pass (Zero / Minimal Glow)">Pass (Zero / Minimal Glow)</option>
              <option value="Acceptable (Moderate Corner Glow)">Acceptable (Moderate Corner Glow)</option>
              <option value="Fail (Severe Edge Bleed)">Fail (Severe Edge Bleed)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-gray-600 font-bold block">Overall Inspection Verdict:</label>
            <select
              value={overallVerdict}
              onChange={(e) => setOverallVerdict(e.target.value as typeof overallVerdict)}
              className="w-full rounded-lg border border-gray-300 p-2 font-medium text-gray-900 bg-white"
            >
              <option value="certified">CERTIFIED PASS (Grade A+ Mint)</option>
              <option value="conditional">CONDITIONAL PASS (Grade B Minor Variance)</option>
              <option value="rma">REJECTED / RMA ELIGIBLE (Hardware Defect)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Certificate Canvas (Print-Ready) */}
      <div className="relative rounded-3xl border-4 border-double border-gray-900 bg-white p-8 sm:p-12 shadow-xl print:shadow-none print:border-2 print:border-black max-w-3xl mx-auto overflow-hidden">
        {/* Subtle Decorative Corner Brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gray-900" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gray-900" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gray-900" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gray-900" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 pb-8 border-b border-gray-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-900/20 bg-gray-50 text-[11px] font-mono tracking-widest uppercase font-bold text-gray-800">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Official Display Inspection Certificate
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-gray-950 uppercase">
            Certificate of Panel Quality &amp; Compliance
          </h2>
          <p className="text-xs text-gray-600 font-mono">
            Verification ID: {certIdRef.current} · Date: {certDateRef.current}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="py-8 space-y-6">
          <div className="text-center text-xs text-gray-700 leading-relaxed max-w-lg mx-auto">
            This document certifies that the display device specified below has undergone comprehensive pixel integrity, color gamut, luminance uniformity, and motion clarity evaluation in accordance with standard ISO 9241-307 testing protocols.
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Monitor Model:</span>
              <strong className="text-gray-950 text-sm">{monitorModel}</strong>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Serial Number:</span>
              <strong className="text-gray-950 text-sm">{serialNumber}</strong>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Physical Resolution:</span>
              <span className="text-gray-800">{detectedSpecs.resolution}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Color Depth &amp; Gamut:</span>
              <span className="text-gray-800">{detectedSpecs.colorDepth} · {detectedSpecs.gamut}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Dead / Stuck Pixels:</span>
              <span className={`font-bold ${deadPixelCount === 0 ? "text-emerald-700" : "text-rose-700"}`}>
                {deadPixelCount} Defects Logged
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Backlight Bleed:</span>
              <span className="text-gray-800">{backlightGrade}</span>
            </div>
          </div>

          {/* Verdict Ribbon Badge */}
          <div className="text-center pt-2">
            <div className={`inline-block px-6 py-3 rounded-2xl border-2 uppercase font-mono font-bold text-sm tracking-wider shadow-xs ${
              overallVerdict === "certified"
                ? "bg-emerald-50 border-emerald-600 text-emerald-900"
                : overallVerdict === "conditional"
                ? "bg-amber-50 border-amber-600 text-amber-900"
                : "bg-rose-50 border-rose-600 text-rose-900"
            }`}>
              {overallVerdict === "certified" && "✓ PASSED — GRADE A+ CERTIFIED DISPLAY"}
              {overallVerdict === "conditional" && "⚠ CONDITIONAL PASS — MINOR VARIANCE"}
              {overallVerdict === "rma" && "✗ FAILED — DEFECTIVE / RMA RETURN RECOMMENDED"}
            </div>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-gray-500 block text-[10px]">Verified By:</span>
            <span className="font-bold text-gray-900 underline decoration-gray-400 decoration-1 underline-offset-4">
              {inspectorName}
            </span>
          </div>

          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-900 flex items-center justify-center text-center text-[8px] font-bold uppercase tracking-tighter text-gray-900">
            Official Seal<br />ScreenTester
          </div>
        </div>
      </div>
    </div>
  );
}
