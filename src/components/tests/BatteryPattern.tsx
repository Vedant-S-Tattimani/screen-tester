"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning, Plug, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface BatteryPatternProps {
  testId?: string;
}

interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export function BatteryPattern({ testId = "battery-test" }: BatteryPatternProps) {
  const t = useTranslations("Tests.BatteryPattern");
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  const [supported, setSupported] = useState(true);
  const [history, setHistory] = useState<{ time: number; level: number }[]>([]);

  useEffect(() => {
    let batteryRef: any = null;

    const updateBattery = (b: any) => {
      const info: BatteryInfo = {
        level: b.level,
        charging: b.charging,
        chargingTime: b.chargingTime,
        dischargingTime: b.dischargingTime,
      };
      setBattery(info);
      setHistory((prev) => [...prev.slice(-59), { time: Date.now(), level: b.level * 100 }]);
    };

    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        batteryRef = b;
        updateBattery(b);
        b.addEventListener("levelchange", () => updateBattery(b));
        b.addEventListener("chargingchange", () => updateBattery(b));
        b.addEventListener("chargingtimechange", () => updateBattery(b));
        b.addEventListener("dischargingtimechange", () => updateBattery(b));
      }).catch(() => setSupported(false));
    } else {
      setSupported(false);
    }

    const interval = setInterval(() => {
      if (batteryRef) updateBattery(batteryRef);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || seconds <= 0) return "—";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const getBatteryIcon = () => {
    if (!battery) return <Battery className="w-8 h-8" />;
    if (battery.charging) return <BatteryCharging className="w-8 h-8 text-green-500" />;
    if (battery.level > 0.8) return <BatteryFull className="w-8 h-8 text-green-500" />;
    if (battery.level > 0.5) return <BatteryMedium className="w-8 h-8 text-yellow-500" />;
    if (battery.level > 0.2) return <BatteryLow className="w-8 h-8 text-orange-500" />;
    return <BatteryWarning className="w-8 h-8 text-red-500" />;
  };

  const getLevelColor = (level: number) => {
    if (level > 80) return "text-green-500";
    if (level > 50) return "text-yellow-500";
    if (level > 20) return "text-orange-500";
    return "text-red-500";
  };

  const getLevelBarColor = (level: number) => {
    if (level > 80) return "bg-green-500";
    if (level > 50) return "bg-yellow-500";
    if (level > 20) return "bg-orange-500";
    return "bg-red-500";
  };

  if (!supported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
        <BatteryWarning className="w-16 h-16 text-gray-300" />
        <h3 className="text-lg font-bold text-gray-700">{t("notSupported")}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">{t("notSupportedHint")}</p>
      </div>
    );
  }

  if (!battery) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400 text-sm">{t("loading")}</div>
      </div>
    );
  }

  const levelPct = Math.round(battery.level * 100);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Main Battery Display */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          {/* Big Battery Icon + Percentage */}
          <div className="flex items-center gap-4">
            {getBatteryIcon()}
            <span className={cn("text-5xl sm:text-6xl font-extrabold tracking-tight", getLevelColor(levelPct))}>
              {levelPct}%
            </span>
          </div>

          {/* Charging Status */}
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
            battery.charging ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-600 border border-gray-200"
          )}>
            {battery.charging ? <Plug className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            {battery.charging ? t("charging") : t("onBattery")}
          </div>

          {/* Level Bar */}
          <div className="w-full max-w-sm h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", getLevelBarColor(levelPct))}
              style={{ width: `${levelPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{t("batteryLevel")}</div>
          <div className={cn("text-2xl font-bold", getLevelColor(levelPct))}>{levelPct}%</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
            {battery.charging ? t("timeToFull") : t("timeRemaining")}
          </div>
          <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1.5">
            <Clock className="w-5 h-5 text-gray-400" />
            {battery.charging ? formatTime(battery.chargingTime) : formatTime(battery.dischargingTime)}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{t("powerSource")}</div>
          <div className="text-2xl font-bold text-gray-900">
            {battery.charging ? t("acPower") : t("batteryPower")}
          </div>
        </div>
      </div>

      {/* History Chart */}
      {history.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("levelHistory")}</h3>
          <div className="h-24 flex items-end gap-0.5">
            {history.map((point, i) => (
              <div
                key={i}
                className={cn("flex-1 rounded-t transition-all", getLevelBarColor(point.level))}
                style={{ height: `${point.level}%`, opacity: 0.3 + (i / history.length) * 0.7 }}
                title={`${point.level}%`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Browser Support Note */}
      <p className="text-[11px] text-gray-400 text-center">{t("browserNote")}</p>
    </div>
  );
}
