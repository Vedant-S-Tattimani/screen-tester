"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Wifi, WifiOff, Clock, ArrowDown, ArrowUp, Activity, Play, RotateCcw, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkSpeedPatternProps {
  testId?: string;
}

interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
  type: string;
}

interface SpeedResult {
  latency: number;
  downloadSpeed: number;
  timestamp: number;
}

export function NetworkSpeedPattern({ testId = "network-speed-test" }: NetworkSpeedPatternProps) {
  const t = useTranslations("Tests.NetworkSpeedPattern");
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SpeedResult | null>(null);
  const [history, setHistory] = useState<SpeedResult[]>([]);
  const [online, setOnline] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Read Network Information API
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      const readConn = () => {
        setNetworkInfo({
          effectiveType: conn.effectiveType || "unknown",
          downlink: conn.downlink || 0,
          rtt: conn.rtt || 0,
          saveData: conn.saveData || false,
          type: conn.type || "unknown",
        });
      };
      readConn();
      conn.addEventListener?.("change", readConn);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const runSpeedTest = useCallback(async () => {
    if (testing) return;
    setTesting(true);
    setProgress(0);
    setResults(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // Phase 1: Latency test (30%)
      setProgress(10);
      const latencies: number[] = [];
      for (let i = 0; i < 5; i++) {
        const start = performance.now();
        await fetch(`/favicon.ico?_t=${Date.now()}_${i}`, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });
        latencies.push(performance.now() - start);
        setProgress(10 + (i + 1) * 4);
      }
      const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;

      // Phase 2: Download speed (70%)
      setProgress(35);
      const downloadSpeeds: number[] = [];
      // Generate a random payload URL with cache-busting
      const testSizes = [50000, 100000, 200000];
      for (let i = 0; i < testSizes.length; i++) {
        const start = performance.now();
        const response = await fetch(`/hero-devices.webp?_size=${testSizes[i]}&_t=${Date.now()}_${i}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const blob = await response.blob();
        const elapsed = (performance.now() - start) / 1000; // seconds
        const bitsLoaded = blob.size * 8;
        const speedMbps = (bitsLoaded / elapsed) / 1_000_000;
        downloadSpeeds.push(speedMbps);
        setProgress(35 + ((i + 1) / testSizes.length) * 55);
      }
      const avgDownload = downloadSpeeds.reduce((a, b) => a + b, 0) / downloadSpeeds.length;

      setProgress(100);
      const result: SpeedResult = {
        latency: Math.round(avgLatency),
        downloadSpeed: Math.round(avgDownload * 100) / 100,
        timestamp: Date.now(),
      };
      setResults(result);
      setHistory((prev) => [...prev, result]);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Speed test error:", err);
      }
    } finally {
      setTesting(false);
    }
  }, [testing]);

  const getSpeedRating = (speed: number): { label: string; color: string } => {
    if (speed >= 100) return { label: t("excellent"), color: "text-green-500" };
    if (speed >= 50) return { label: t("veryGood"), color: "text-emerald-500" };
    if (speed >= 25) return { label: t("good"), color: "text-blue-500" };
    if (speed >= 10) return { label: t("fair"), color: "text-yellow-500" };
    return { label: t("slow"), color: "text-red-500" };
  };

  const getLatencyRating = (ms: number): { label: string; color: string } => {
    if (ms <= 20) return { label: t("excellent"), color: "text-green-500" };
    if (ms <= 50) return { label: t("good"), color: "text-blue-500" };
    if (ms <= 100) return { label: t("fair"), color: "text-yellow-500" };
    return { label: t("poor"), color: "text-red-500" };
  };

  if (!online) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
        <WifiOff className="w-16 h-16 text-gray-300" />
        <h3 className="text-lg font-bold text-gray-700">{t("offline")}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">{t("offlineHint")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Speed Test Button */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center gap-5">
          {/* Result or Start */}
          {results && !testing ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{t("download")}</div>
                  <div className={cn("text-4xl sm:text-5xl font-extrabold", getSpeedRating(results.downloadSpeed).color)}>
                    {results.downloadSpeed}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Mbps</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{t("latency")}</div>
                  <div className={cn("text-4xl sm:text-5xl font-extrabold", getLatencyRating(results.latency).color)}>
                    {results.latency}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">ms</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className={cn("text-sm font-semibold", getSpeedRating(results.downloadSpeed).color)}>
                  {getSpeedRating(results.downloadSpeed).label}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Wifi className="w-12 h-12 text-gray-300" />
              {testing && (
                <div className="w-full max-w-xs">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-2">{t("testing")}... {Math.round(progress)}%</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={testing ? () => abortRef.current?.abort() : runSpeedTest}
            disabled={false}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer",
              testing
                ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                : "bg-gray-950 text-white hover:bg-gray-800 shadow-sm"
            )}
          >
            {testing ? (
              <>
                <Activity className="w-4 h-4 animate-pulse" />
                {t("stop")}
              </>
            ) : results ? (
              <>
                <RotateCcw className="w-4 h-4" />
                {t("testAgain")}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {t("startTest")}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Network Information API */}
      {networkInfo && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("connectionInfo")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("connectionType")}</div>
              <div className="text-sm font-bold text-gray-900 mt-0.5">{networkInfo.type}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("effectiveType")}</div>
              <div className="text-sm font-bold text-gray-900 mt-0.5">{networkInfo.effectiveType}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("estimatedDownlink")}</div>
              <div className="text-sm font-bold text-gray-900 mt-0.5">{networkInfo.downlink} Mbps</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("estimatedRtt")}</div>
              <div className="text-sm font-bold text-gray-900 mt-0.5">{networkInfo.rtt} ms</div>
            </div>
          </div>
          {networkInfo.saveData && (
            <div className="mt-3 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
              {t("dataSaverOn")}
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("testHistory")}</h3>
          <div className="space-y-2">
            {history.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-xs">
                <span className="text-gray-500">#{i + 1}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><ArrowDown className="w-3 h-3 text-blue-500" />{r.downloadSpeed} Mbps</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-orange-500" />{r.latency} ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-400 text-center">{t("browserNote")}</p>
    </div>
  );
}
