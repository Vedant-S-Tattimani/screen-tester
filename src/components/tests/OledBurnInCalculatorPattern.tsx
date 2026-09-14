"use client";

import { useState, useMemo } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Sun, 
  Monitor, 
  HelpCircle, 
  Flame, 
  CheckCircle2, 
  Sliders
} from "lucide-react";
import { useTranslations } from "next-intl";

type PanelType = "qdoled3" | "qdoled1_2" | "woled_mla" | "woled_std" | "amoled";

interface PanelSpecs {
  name: string;
  resilienceFactor: number; // multiplier for longevity
  subpixelInfo: string;
}

const PANELS: Record<PanelType, PanelSpecs> = {
  woled_mla: {
    name: "LG WOLED with MLA / Meta (e.g. G3, C4, 27GS95QE)",
    resilienceFactor: 1.45,
    subpixelInfo: "Micro Lens Array boosts optical efficiency; lower emitter drive voltage extends organic life."
  },
  qdoled3: {
    name: "Samsung QD-OLED Gen 3 (2024+ 4K 240Hz / 360Hz)",
    resilienceFactor: 1.35,
    subpixelInfo: "Quantum Dot semiconductor emitters with revised heat dissipation graph."
  },
  woled_std: {
    name: "Standard WOLED (e.g. C1, C2, 27GR95QE)",
    resilienceFactor: 1.1,
    subpixelInfo: "White subpixel carries luminance burden; moderate resistance to static HUDs."
  },
  qdoled1_2: {
    name: "QD-OLED Gen 1 / Gen 2 (e.g. AW3423DW, G8 OLED)",
    resilienceFactor: 0.95,
    subpixelInfo: "First-gen blue OLED stack with high heat output; requires active pixel refresh."
  },
  amoled: {
    name: "Mobile / Tablet AMOLED (e.g. Samsung Galaxy, iPad Pro)",
    resilienceFactor: 1.25,
    subpixelInfo: "Direct RGB emission with dynamic thermal throttling."
  }
};

export function OledBurnInCalculatorPattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.oledBurnInCalculator");

  const [panelType, setPanelType] = useState<PanelType>("qdoled3");
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [staticPercent, setStaticPercent] = useState<number>(50); // %
  const [brightnessLevel, setBrightnessLevel] = useState<number>(200); // nits
  const [useAutoHideTaskbar, setUseAutoHideTaskbar] = useState<boolean>(true);
  const [usePixelShift, setUsePixelShift] = useState<boolean>(true);
  const [useLogoDimmer, setUseLogoDimmer] = useState<boolean>(true);
  const [useDarkMode, setUseDarkMode] = useState<boolean>(true);
  const [useScreenTimeout, setUseScreenTimeout] = useState<boolean>(true);

  const panel = PANELS[panelType];

  // Calculation Engine
  const metrics = useMemo(() => {
    // Protection Multiplier
    let protectionFactor = 1.0;
    if (useAutoHideTaskbar) protectionFactor += 0.25;
    if (usePixelShift) protectionFactor += 0.15;
    if (useLogoDimmer) protectionFactor += 0.2;
    if (useDarkMode) protectionFactor += 0.25;
    if (useScreenTimeout) protectionFactor += 0.2;

    // Brightness stress factor (exponential scaling with nits)
    // 120 nits = 0.7x stress, 200 nits = 1.0x stress, 350 nits = 1.6x stress, 800 nits = 3.0x stress
    const brightnessStress = Math.pow(brightnessLevel / 200, 1.35);

    // Static hours per day
    const staticHoursPerDay = dailyHours * (staticPercent / 100);

    // Degradation Index (base arbitrary scale where lower is better)
    const annualStaticHours = staticHoursPerDay * 365;
    const annualStressLoad = (annualStaticHours * brightnessStress) / (panel.resilienceFactor * protectionFactor);

    // Risk calculation at 1, 3, 5 years (%)
    const risk1Year = Math.min(99, Math.round(annualStressLoad / 45));
    const risk3Years = Math.min(99, Math.round((annualStressLoad * 3) / 45));
    const risk5Years = Math.min(99, Math.round((annualStressLoad * 5) / 45));

    // Estimated cumulative hours before noticeable burn-in
    const baseLifeHours = 28000 * panel.resilienceFactor * (protectionFactor / 1.5);
    const estimatedHoursToBurnIn = Math.round(baseLifeHours / brightnessStress);
    const estimatedYears = (estimatedHoursToBurnIn / (dailyHours * 365)).toFixed(1);

    // Grade rating
    let grade = "Grade A+ (Ultra Low Risk)";
    let gradeColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (risk3Years > 40) {
      grade = "Grade D (High Risk)";
      gradeColor = "text-rose-700 bg-rose-50 border-rose-200";
    } else if (risk3Years > 25) {
      grade = "Grade C (Moderate Attention Needed)";
      gradeColor = "text-amber-700 bg-amber-50 border-amber-200";
    } else if (risk3Years > 12) {
      grade = "Grade B (Low Risk)";
      gradeColor = "text-blue-700 bg-blue-50 border-blue-200";
    }

    return {
      staticHoursPerDay: staticHoursPerDay.toFixed(1),
      risk1Year,
      risk3Years,
      risk5Years,
      estimatedHoursToBurnIn,
      estimatedYears,
      grade,
      gradeColor
    };
  }, [
    panelType, 
    dailyHours, 
    staticPercent, 
    brightnessLevel, 
    useAutoHideTaskbar, 
    usePixelShift, 
    useLogoDimmer, 
    useDarkMode, 
    useScreenTimeout,
    panel.resilienceFactor
  ]);

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-600" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900">
            OLED &amp; QD-OLED Burn-in Risk &amp; Longevity Calculator
          </h3>
        </div>
        <span className="text-xs font-mono text-gray-500">
          Actuarial Model v2.4
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Main Grid: Inputs (Left) vs Real-Time Results (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Panel Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-700 block">
                1. Panel Technology Generation
              </label>
              <select
                value={panelType}
                onChange={(e) => setPanelType(e.target.value as PanelType)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs focus:border-blue-600 focus:outline-none"
              >
                {Object.entries(PANELS).map(([k, v]) => (
                  <option key={k} value={k}>{v.name}</option>
                ))}
              </select>
              <p className="text-[11px] text-gray-500">{panel.subpixelInfo}</p>
            </div>

            {/* Daily Usage Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50/80">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-gray-700">
                  <span>Daily Usage:</span>
                  <span className="font-bold">{dailyHours} hrs / day</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={16}
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-gray-700">
                  <span>Static Content Share:</span>
                  <span className="font-bold">{staticPercent}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={95}
                  step={5}
                  value={staticPercent}
                  onChange={(e) => setStaticPercent(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="text-[10px] text-gray-500 block">
                  ({metrics.staticHoursPerDay} hrs of fixed UI/taskbar daily)
                </span>
              </div>
            </div>

            {/* Brightness Slider */}
            <div className="space-y-1 p-4 rounded-xl border border-gray-200 bg-gray-50/80">
              <div className="flex justify-between text-xs font-mono text-gray-700">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  SDR / Average Work Brightness:
                </span>
                <span className="font-bold">{brightnessLevel} nits (cd/m²)</span>
              </div>
              <input
                type="range"
                min={80}
                max={450}
                step={10}
                value={brightnessLevel}
                onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>100 nits (Dim Room)</span>
                <span>200 nits (Standard Office)</span>
                <span>350+ nits (High Brightness)</span>
              </div>
            </div>

            {/* Active Protection Habits */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-gray-700 block">
                Active Mitigations &amp; Habits
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAutoHideTaskbar}
                    onChange={(e) => setUseAutoHideTaskbar(e.target.checked)}
                    className="rounded accent-blue-600 w-4 h-4"
                  />
                  <span>Auto-hide Windows/macOS Taskbar</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePixelShift}
                    onChange={(e) => setUsePixelShift(e.target.checked)}
                    className="rounded accent-blue-600 w-4 h-4"
                  />
                  <span>Monitor Pixel Shift Enabled</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useLogoDimmer}
                    onChange={(e) => setUseLogoDimmer(e.target.checked)}
                    className="rounded accent-blue-600 w-4 h-4"
                  />
                  <span>Logo / Static Luminance Limiter</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useDarkMode}
                    onChange={(e) => setUseDarkMode(e.target.checked)}
                    className="rounded accent-blue-600 w-4 h-4"
                  />
                  <span>Dark Mode in Browser &amp; Apps</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={useScreenTimeout}
                    onChange={(e) => setUseScreenTimeout(e.target.checked)}
                    className="rounded accent-blue-600 w-4 h-4"
                  />
                  <span>Aggressive Screen Timeout (&lt; 3 mins of idle time)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Overall Rating Box */}
            <div className={`p-5 rounded-2xl border ${metrics.gradeColor} space-y-2`}>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold block opacity-75">
                Panel Longevity Forecast
              </span>
              <h4 className="text-lg font-bold tracking-tight">{metrics.grade}</h4>
              <p className="text-xs leading-relaxed opacity-90">
                Under your current workflow, your display is projected to operate for approximately <strong>{metrics.estimatedYears} years</strong> (~{metrics.estimatedHoursToBurnIn.toLocaleString()} hours) before uneven subpixel aging becomes visually perceptible.
              </p>
            </div>

            {/* Risk Probability Timeline */}
            <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-3 shadow-2xs">
              <h4 className="text-xs font-mono font-bold uppercase text-gray-800">
                Burn-In Probability Timeline
              </h4>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-700">1 Year of Ownership</span>
                    <span className="font-mono font-bold text-gray-900">{metrics.risk1Year}% risk</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        metrics.risk1Year > 20 ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.max(4, metrics.risk1Year)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-700">3 Years of Ownership</span>
                    <span className="font-mono font-bold text-gray-900">{metrics.risk3Years}% risk</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        metrics.risk3Years > 35 ? "bg-rose-500" : metrics.risk3Years > 18 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.max(4, metrics.risk3Years)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-700">5 Years of Ownership</span>
                    <span className="font-mono font-bold text-gray-900">{metrics.risk5Years}% risk</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        metrics.risk5Years > 50 ? "bg-rose-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${Math.max(4, metrics.risk5Years)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Static HUD Hazard Heatmap */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
              <h5 className="text-xs font-mono font-bold text-gray-800">Static Hazard Hotspots</h5>
              <div className="relative h-28 rounded-lg border border-gray-300 bg-gray-900 overflow-hidden">
                {/* Top browser tabs */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-red-500/50 border-b border-red-500 flex items-center px-2">
                  <span className="text-[9px] text-white font-mono">Static Browser Tabs / URL Bar</span>
                </div>
                {/* Bottom taskbar */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-red-600/60 border-t border-red-400 flex items-center px-2 justify-between">
                  <span className="text-[9px] text-white font-mono">Windows Taskbar &amp; Clock</span>
                  <span className="text-[9px] text-red-200 font-mono">HIGHEST HAZARD</span>
                </div>
                {/* Side Minimap */}
                <div className="absolute top-6 right-2 w-10 h-10 rounded border border-amber-500 bg-amber-500/30 flex items-center justify-center">
                  <span className="text-[8px] text-amber-200 font-mono">HUD</span>
                </div>
                <div className="h-full flex items-center justify-center text-gray-500 text-[11px] font-mono">
                  Dynamic Video / Game Area (Low Hazard)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
