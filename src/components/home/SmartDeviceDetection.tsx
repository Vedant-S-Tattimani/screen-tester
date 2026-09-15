"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/routing";
import {
  Monitor,
  Activity,
  Sun,
  Palette,
  Hand,
  Cpu,
  BatteryMedium,
  Smartphone,
  Webcam,
  Gamepad2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  Scan,
  X,
  RefreshCw,
} from "lucide-react";
import {
  detectDeviceCapabilities,
  type DeviceProfile,
  type DetectedCapability,
} from "@/lib/deviceDetection";

// ─── Icon Map ────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-4 h-4" />,
  refresh: <Activity className="w-4 h-4" />,
  hdr: <Sun className="w-4 h-4" />,
  palette: <Palette className="w-4 h-4" />,
  touch: <Hand className="w-4 h-4" />,
  gpu: <Cpu className="w-4 h-4" />,
  battery: <BatteryMedium className="w-4 h-4" />,
  sensor: <Smartphone className="w-4 h-4" />,
  camera: <Webcam className="w-4 h-4" />,
  audio: <Webcam className="w-4 h-4" />,
  gamepad: <Gamepad2 className="w-4 h-4" />,
  network: <Activity className="w-4 h-4" />,
  resolution: <Scan className="w-4 h-4" />,
  oled: <Sparkles className="w-4 h-4" />,
};

// ─── Component ───────────────────────────────────────────────

export function SmartDeviceDetection() {
  const [profile, setProfile] = useState<DeviceProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [expandedCap, setExpandedCap] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const runDetection = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await detectDeviceCapabilities();
      setProfile(result);
    } catch (e) {
      console.error("Device detection failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    runDetection();
  }, [runDetection]);

  if (isDismissed) return null;

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-2">
        <div className="border border-gray-200/80 rounded-2xl bg-gradient-to-br from-gray-50/80 to-white p-5 sm:p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 w-48 bg-gray-200 rounded mb-1.5" />
              <div className="h-3 w-72 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!profile || profile.capabilities.length === 0) return null;

  const totalRecommended = profile.capabilities.reduce(
    (sum, cap) => sum + cap.recommendedTests.length,
    0
  );

  const visibleCaps = showAll
    ? profile.capabilities
    : profile.capabilities.slice(0, 6);

  const deviceTypeLabel =
    profile.deviceType === "desktop" ? "Desktop Monitor" :
    profile.deviceType === "laptop" ? "Laptop Display" :
    profile.deviceType === "tablet" ? "Tablet Screen" :
    profile.deviceType === "mobile" ? "Mobile Screen" :
    "Display";

  return (
    <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-2">
      <div className="relative border border-gray-200/80 rounded-2xl bg-gradient-to-br from-gray-50/60 via-white to-gray-50/40 overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-900 via-gray-600 to-transparent" />

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
          aria-label="Dismiss device detection"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-white shrink-0">
              <Zap className="w-4.5 h-4.5 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-[15px] text-gray-950 tracking-tight">
                  Smart Device Detection
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-900 text-white">
                  {deviceTypeLabel}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5 leading-snug">
                We detected{" "}
                <span className="font-semibold text-gray-700">
                  {profile.capabilities.length} hardware capabilities
                </span>{" "}
                and recommend{" "}
                <span className="font-semibold text-gray-700">
                  {totalRecommended} targeted tests
                </span>{" "}
                for your {deviceTypeLabel.toLowerCase()}.
              </p>
              {/* Summary line */}
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-gray-400 tracking-wide">
                <span>{profile.summary}</span>
                <button
                  onClick={runDetection}
                  className="ml-1 p-0.5 rounded hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  title="Re-scan device"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Capability Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {visibleCaps.map((cap) => {
              const isOpen = expandedCap === cap.id;
              return (
                <div
                  key={cap.id}
                  className={isOpen ? "sm:col-span-2 lg:col-span-3" : ""}
                >
                  <CapabilityCard
                    capability={cap}
                    isExpanded={isOpen}
                    onToggle={() =>
                      setExpandedCap(isOpen ? null : cap.id)
                    }
                  />
                </div>
              );
            })}
          </div>

          {/* Show More / Less */}
          {profile.capabilities.length > 6 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Show {profile.capabilities.length - 6} More Capabilities{" "}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Capability Card ─────────────────────────────────────────

function CapabilityCard({
  capability,
  isExpanded,
  onToggle,
}: {
  capability: DetectedCapability;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        isExpanded
          ? "border-gray-300 bg-white shadow-sm"
          : "border-gray-200/80 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300/80"
      }`}
    >
      {/* Card Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 sm:p-3.5 text-left"
      >
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            isExpanded
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {iconMap[capability.icon] || <Monitor className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs sm:text-[13px] text-gray-950 leading-snug truncate">
            {capability.label}
          </div>
          <div className="text-[11px] text-gray-500 leading-tight truncate">
            {capability.value}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
            {capability.recommendedTests.length}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Test Recommendations — shown as horizontal list when full-width */}
      {isExpanded && (
        <div className="px-3 sm:px-3.5 pb-3 sm:pb-3.5 border-t border-gray-100">
          <div className="pt-2.5 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Recommended Tests
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {capability.recommendedTests.map((test) => (
              <Link
                key={test.id}
                href={test.href as "/tests/dead-pixel-test"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-5 h-5 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[12px] text-gray-900 leading-snug truncate group-hover:text-gray-950">
                    {test.title}
                  </div>
                  <div className="text-[10.5px] text-gray-400 leading-tight truncate group-hover:text-gray-500">
                    {test.reason}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
