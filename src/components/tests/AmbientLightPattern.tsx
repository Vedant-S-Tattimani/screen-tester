"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Sun, SunDim, Lightbulb, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface AmbientLightPatternProps {
  testId?: string;
}

export function AmbientLightPattern({ testId = "ambient-light-test" }: AmbientLightPatternProps) {
  const t = useTranslations("Tests.AmbientLightPattern");
  const [supported, setSupported] = useState(true);
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  const [lux, setLux] = useState<number | null>(null);
  const [history, setHistory] = useState<{ time: number; lux: number }[]>([]);
  const [minLux, setMinLux] = useState(Infinity);
  const [maxLux, setMaxLux] = useState(-Infinity);
  const sensorRef = useRef<any>(null);

  useEffect(() => {
    if (!("AmbientLightSensor" in window)) {
      setSupported(false);
      return;
    }

    try {
      const sensor = new (window as any).AmbientLightSensor({ frequency: 2 });
      sensorRef.current = sensor;

      sensor.addEventListener("reading", () => {
        const luxValue = sensor.illuminance;
        setLux(luxValue);
        setHistory(prev => [...prev.slice(-119), { time: Date.now(), lux: luxValue }]);
        setMinLux(prev => Math.min(prev, luxValue));
        setMaxLux(prev => Math.max(prev, luxValue));
      });

      sensor.addEventListener("error", (event: any) => {
        if (event.error.name === "NotAllowedError") {
          setPermissionNeeded(true);
        } else if (event.error.name === "NotReadableError") {
          setSupported(false);
        }
      });

      sensor.start();
    } catch (err: any) {
      if (err.name === "SecurityError") {
        setPermissionNeeded(true);
      } else {
        setSupported(false);
      }
    }

    return () => {
      if (sensorRef.current) {
        try { sensorRef.current.stop(); } catch {}
      }
    };
  }, []);

  const getLuxCategory = (lux: number): { label: string; color: string; icon: React.ReactNode; recommendation: string } => {
    if (lux < 50) return { label: t("veryDark"), color: "text-indigo-500", icon: <SunDim className="w-8 h-8 text-indigo-400" />, recommendation: t("recDark") };
    if (lux < 200) return { label: t("dim"), color: "text-blue-500", icon: <SunDim className="w-8 h-8 text-blue-400" />, recommendation: t("recDim") };
    if (lux < 500) return { label: t("normal"), color: "text-green-500", icon: <Sun className="w-8 h-8 text-green-500" />, recommendation: t("recNormal") };
    if (lux < 1000) return { label: t("bright"), color: "text-yellow-500", icon: <Sun className="w-8 h-8 text-yellow-500" />, recommendation: t("recBright") };
    return { label: t("veryBright"), color: "text-orange-500", icon: <Lightbulb className="w-8 h-8 text-orange-500" />, recommendation: t("recVeryBright") };
  };

  if (!supported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
        <AlertTriangle className="w-16 h-16 text-gray-300" />
        <h3 className="text-lg font-bold text-gray-700">{t("notSupported")}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">{t("notSupportedHint")}</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 max-w-md">
          <h4 className="text-xs font-bold text-gray-600 mb-2">{t("enableGuide")}</h4>
          <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
            <li>{t("enableStep1")}</li>
            <li>{t("enableStep2")}</li>
            <li>{t("enableStep3")}</li>
          </ul>
        </div>
      </div>
    );
  }

  if (permissionNeeded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
        <AlertTriangle className="w-16 h-16 text-yellow-400" />
        <h3 className="text-lg font-bold text-gray-700">{t("permissionNeeded")}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">{t("permissionHint")}</p>
      </div>
    );
  }

  if (lux === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400 text-sm">{t("waiting")}</div>
      </div>
    );
  }

  const category = getLuxCategory(lux);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Main Lux Display */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          {category.icon}
          <div className="text-center">
            <span className={cn("text-5xl sm:text-6xl font-extrabold tracking-tight", category.color)}>
              {Math.round(lux)}
            </span>
            <span className="text-lg text-gray-400 ml-2">lux</span>
          </div>
          <div className={cn("text-sm font-semibold", category.color)}>{category.label}</div>
        </div>
      </div>

      {/* Brightness Gauge */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("brightnessGauge")}</h3>
        <div className="relative h-6 rounded-full overflow-hidden" style={{
          background: "linear-gradient(to right, #1e1b4b, #312e81, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)"
        }}>
          <div
            className="absolute top-0 bottom-0 w-1 bg-white border border-gray-800 rounded-full transition-all duration-300"
            style={{ left: `${Math.min(Math.log10(Math.max(lux, 1)) / Math.log10(10000) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0</span>
          <span>10</span>
          <span>100</span>
          <span>1k</span>
          <span>10k</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("current")}</div>
          <div className={cn("text-2xl font-bold", category.color)}>{Math.round(lux)} lux</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("min")}</div>
          <div className="text-2xl font-bold text-blue-500">{isFinite(minLux) ? Math.round(minLux) : "—"} lux</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("max")}</div>
          <div className="text-2xl font-bold text-orange-500">{isFinite(maxLux) ? Math.round(maxLux) : "—"} lux</div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">{t("recommendation")}</h3>
        <p className="text-sm text-gray-600">{category.recommendation}</p>
      </div>

      {/* History Chart */}
      {history.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> {t("readingHistory")}
          </h3>
          <div className="h-24 flex items-end gap-px">
            {history.map((point, i) => {
              const maxH = Math.max(...history.map(h => h.lux), 1);
              const height = (point.lux / maxH) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-amber-400 transition-all"
                  style={{ height: `${Math.max(height, 2)}%`, opacity: 0.3 + (i / history.length) * 0.7 }}
                  title={`${Math.round(point.lux)} lux`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Reference Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("luxReference")}</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-gray-500">{t("refMoonlight")}</span><span className="font-mono font-bold text-gray-700">0.1 lux</span></div>
          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-gray-500">{t("refDimRoom")}</span><span className="font-mono font-bold text-gray-700">50 lux</span></div>
          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-gray-500">{t("refOffice")}</span><span className="font-mono font-bold text-gray-700">300–500 lux</span></div>
          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-gray-500">{t("refOvercast")}</span><span className="font-mono font-bold text-gray-700">1,000 lux</span></div>
          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-gray-500">{t("refSunlight")}</span><span className="font-mono font-bold text-gray-700">10,000+ lux</span></div>
          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-gray-500">{t("refDirectSun")}</span><span className="font-mono font-bold text-gray-700">100,000 lux</span></div>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 text-center">{t("browserNote")}</p>
    </div>
  );
}
