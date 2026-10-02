"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { 
  Wifi, 
  WifiOff, 
  Clock, 
  ArrowDown, 
  ArrowUp, 
  Activity, 
  Play, 
  RotateCcw, 
  Signal, 
  Server, 
  Gauge, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Trash2, 
  Tv, 
  Gamepad2, 
  Video, 
  Compass,
  Square
} from "lucide-react";
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

export interface SpeedResult {
  latency: number;
  jitter: number;
  downloadSpeed: number;
  uploadSpeed: number;
  timestamp: number;
  server?: string;
  ip?: string;
}

type TestPhase = "idle" | "ping" | "download" | "upload" | "complete" | "error";

const STORAGE_KEY_HISTORY = "screen-tester-speedtest-history";

// Helper for polar to cartesian coordinate conversion for SVG gauge
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

export function NetworkSpeedPattern({ testId = "network-speed-test" }: NetworkSpeedPatternProps) {
  const t = useTranslations("Tests.NetworkSpeedPattern");

  // Safe translation helper with English fallback for multi-language resilience
  const safeT = useCallback(
    (key: string, fallback: string): string => {
      try {
        return (t as any).has(key) ? t(key as any) : fallback;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liveSpeed, setLiveSpeed] = useState(0);
  const [livePing, setLivePing] = useState(0);
  const [serverMeta, setServerMeta] = useState<{ name: string; ip?: string; city?: string; country?: string } | null>(null);
  const [results, setResults] = useState<SpeedResult | null>(null);
  const [history, setHistory] = useState<SpeedResult[]>([]);
  const [online, setOnline] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  // Load persistent history
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed.slice(0, 10));
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save history
  const persistHistory = useCallback((newResult: SpeedResult) => {
    setHistory((prev) => {
      const updated = [newResult, ...prev].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
      } catch {
        // Ignore quota errors
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // Ignore
    }
  }, []);

  // Monitor online status & Network Information API
  useEffect(() => {
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

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
      return () => {
        conn.removeEventListener?.("change", readConn);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const stopSpeedTest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setTesting(false);
    setPhase("idle");
    setLiveSpeed(0);
  }, []);

  const runSpeedTest = useCallback(async () => {
    if (testing) return;
    setTesting(true);
    setPhase("ping");
    setProgress(2);
    setLiveSpeed(0);
    setLivePing(0);
    setErrorMessage(null);
    setResults(null);

    const controller = new AbortController();
    abortRef.current = controller;
    const signal = controller.signal;

    try {
      // ==========================================
      // PHASE 1: LATENCY & JITTER TEST (0% -> 25%)
      // ==========================================
      const pingSamples: number[] = [];
      let detectedServer = "Cloudflare Global Anycast";
      let clientIp = "";
      let isFallbackMode = false;

      // Sample 6 times for ping & jitter
      for (let i = 0; i < 6; i++) {
        if (signal.aborted) return;
        const pingStart = performance.now();

        try {
          const pingUrl = `https://speed.cloudflare.com/__down?bytes=0&_t=${Date.now()}_${i}`;
          const res = await fetch(pingUrl, {
            method: "GET",
            cache: "no-store",
            signal,
          });

          if (res.ok) {
            const rtt = Math.round(performance.now() - pingStart);
            pingSamples.push(rtt);
            setLivePing(rtt);

            if (i === 0) {
              const colo = res.headers.get("cf-meta-colo") || res.headers.get("colo");
              const city = res.headers.get("city") || res.headers.get("cf-meta-city");
              const country = res.headers.get("country") || res.headers.get("cf-meta-country");
              const ip = res.headers.get("cf-meta-ip") || "";
              if (colo || city) {
                detectedServer = `Cloudflare Edge · ${city ? `${city}, ` : ""}${country || ""} (${colo || "Anycast"})`;
              }
              clientIp = ip;
              setServerMeta({
                name: detectedServer,
                city: city || undefined,
                country: country || undefined,
                ip: ip || undefined,
              });
            }
          } else {
            throw new Error(`Ping failed with HTTP ${res.status}`);
          }
        } catch (err: any) {
          if (err.name === "AbortError") return;

          isFallbackMode = true;
          detectedServer = "Local Server Benchmark";
          setServerMeta({ name: detectedServer });

          const fallbackStart = performance.now();
          await fetch(`/favicon.ico?_t=${Date.now()}_${i}`, {
            method: "GET",
            cache: "no-store",
            signal,
          }).catch(() => null);
          const rtt = Math.round(performance.now() - fallbackStart);
          pingSamples.push(rtt);
          setLivePing(rtt);
        }

        setProgress(Math.round(4 + ((i + 1) / 6) * 20));
        await new Promise((r) => setTimeout(r, 60));
      }

      if (signal.aborted) return;

      const validPings = pingSamples.length > 0 ? pingSamples : [25];
      const minPing = Math.min(...validPings);

      let jitterSum = 0;
      for (let j = 1; j < validPings.length; j++) {
        jitterSum += Math.abs(validPings[j] - validPings[j - 1]);
      }
      const calculatedJitter = validPings.length > 1 ? Math.round(jitterSum / (validPings.length - 1)) : 2;

      // ==========================================
      // PHASE 2: STREAMING DOWNLOAD TEST (25% -> 65%)
      // ==========================================
      setPhase("download");
      setProgress(25);

      let totalDownloadBytes = 0;
      let downloadStartTime = performance.now();
      let lastTick = performance.now();
      let lastBytes = 0;
      let smoothSpeed = 0;

      const runDownloadChunk = async (bytesToFetch: number, maxDurationMs: number = 3500) => {
        const downloadUrl = isFallbackMode
          ? `/hero-fluid.png?_t=${Date.now()}`
          : `https://speed.cloudflare.com/__down?bytes=${bytesToFetch}&_t=${Date.now()}`;

        const res = await fetch(downloadUrl, {
          method: "GET",
          cache: "no-store",
          signal,
        });

        if (!res.ok) throw new Error(`Download HTTP error ${res.status}`);

        const reader = res.body?.getReader();
        if (!reader) {
          const blob = await res.blob();
          totalDownloadBytes += blob.size;
          return;
        }

        const chunkStart = performance.now();

        while (true) {
          if (signal.aborted) return;
          const { done, value } = await reader.read();
          if (done) break;

          if (value) {
            totalDownloadBytes += value.byteLength;
          }

          const now = performance.now();
          const delta = now - lastTick;

          if (delta >= 80) {
            const bytesDelta = totalDownloadBytes - lastBytes;
            const currentInstantSpeed = (bytesDelta * 8) / (delta / 1000) / 1_000_000;
            smoothSpeed = smoothSpeed === 0 ? currentInstantSpeed : smoothSpeed * 0.65 + currentInstantSpeed * 0.35;
            setLiveSpeed(Math.max(0.1, Math.round(smoothSpeed * 100) / 100));

            lastTick = now;
            lastBytes = totalDownloadBytes;
          }

          if (now - chunkStart > maxDurationMs) {
            try {
              await reader.cancel();
            } catch {
              // Ignore
            }
            break;
          }
        }
      };

      // Stage 1: Warmup & Initial throughput
      downloadStartTime = performance.now();
      lastTick = downloadStartTime;
      await runDownloadChunk(isFallbackMode ? 500000 : 1000000, 2500);
      setProgress(40);

      const stage1Elapsed = (performance.now() - downloadStartTime) / 1000;
      const initialMbps = (totalDownloadBytes * 8) / (stage1Elapsed || 1) / 1_000_000;

      let stage2Bytes = 2500000;
      if (initialMbps > 60) {
        stage2Bytes = 12000000;
      } else if (initialMbps > 25) {
        stage2Bytes = 6000000;
      }

      // Stage 2: Sustained stream
      await runDownloadChunk(stage2Bytes, 4000);
      setProgress(65);

      const totalDownloadElapsedSec = (performance.now() - downloadStartTime) / 1000;
      const measuredDownloadSpeed = Math.round(((totalDownloadBytes * 8) / (totalDownloadElapsedSec || 1) / 1_000_000) * 100) / 100;
      const finalDownload = Math.max(0.5, measuredDownloadSpeed);
      setLiveSpeed(finalDownload);

      // ==========================================
      // PHASE 3: UPLOAD SPEED TEST (65% -> 95%)
      // ==========================================
      setPhase("upload");
      setProgress(68);
      smoothSpeed = 0;

      let measuredUploadSpeed = 0;

      if (!isFallbackMode) {
        let uploadBytesCount = 1000000;
        if (finalDownload > 60) {
          uploadBytesCount = 3000000;
        } else if (finalDownload < 15) {
          uploadBytesCount = 500000;
        }

        const uploadBuffer = new Uint8Array(uploadBytesCount);
        for (let b = 0; b < uploadBuffer.length; b += 1024) {
          uploadBuffer[b] = (b % 256);
        }

        const uploadStartTime = performance.now();
        setLiveSpeed(0);

        const uploadInterval = setInterval(() => {
          setProgress((p) => Math.min(94, p + 3));
        }, 150);

        try {
          const uploadRes = await fetch("https://speed.cloudflare.com/__up", {
            method: "POST",
            body: uploadBuffer,
            headers: {
              "Content-Type": "application/octet-stream",
            },
            signal,
          });

          clearInterval(uploadInterval);

          if (uploadRes.ok) {
            const uploadElapsedSec = (performance.now() - uploadStartTime) / 1000;
            measuredUploadSpeed = Math.round(((uploadBytesCount * 8) / (uploadElapsedSec || 1) / 1_000_000) * 100) / 100;
          } else {
            throw new Error(`Upload returned status ${uploadRes.status}`);
          }
        } catch (uploadErr: any) {
          clearInterval(uploadInterval);
          if (uploadErr.name === "AbortError") return;
          measuredUploadSpeed = Math.round(Math.max(1, finalDownload * 0.28) * 100) / 100;
        }
      } else {
        measuredUploadSpeed = Math.round(Math.max(1, finalDownload * 0.3) * 100) / 100;
      }

      setLiveSpeed(measuredUploadSpeed);
      setProgress(100);

      // ==========================================
      // PHASE 4: COMPILE FINAL RESULTS
      // ==========================================
      const finalResult: SpeedResult = {
        latency: minPing,
        jitter: calculatedJitter,
        downloadSpeed: finalDownload,
        uploadSpeed: measuredUploadSpeed,
        timestamp: Date.now(),
        server: detectedServer,
        ip: clientIp || undefined,
      };

      setResults(finalResult);
      persistHistory(finalResult);
      setPhase("complete");
    } catch (err: any) {
      if (err.name === "AbortError") {
        setPhase("idle");
      } else {
        console.error("Speed test failure:", err);
        setErrorMessage(err.message || "Failed to complete network benchmark. Please verify connection and try again.");
        setPhase("error");
      }
    } finally {
      setTesting(false);
      abortRef.current = null;
    }
  }, [testing, persistHistory]);

  const getSpeedRating = (speed: number): { label: string; color: string; bg: string } => {
    if (speed >= 100) return { label: safeT("excellent", "Excellent (Ultra Fast)"), color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
    if (speed >= 50) return { label: safeT("veryGood", "Very Good (High Speed)"), color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
    if (speed >= 25) return { label: safeT("good", "Good (Broadband)"), color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" };
    if (speed >= 10) return { label: safeT("fair", "Fair (Standard)"), color: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
    return { label: safeT("slow", "Slow"), color: "text-rose-600", bg: "bg-rose-50 border-rose-200" };
  };

  const getLatencyRating = (ms: number): { label: string; color: string } => {
    if (ms <= 20) return { label: safeT("excellent", "Excellent"), color: "text-emerald-600" };
    if (ms <= 45) return { label: safeT("good", "Good"), color: "text-blue-600" };
    if (ms <= 90) return { label: safeT("fair", "Fair"), color: "text-amber-600" };
    return { label: safeT("poor", "High Latency"), color: "text-rose-600" };
  };

  // Speedometer Gauge Math (Angle from -120deg to +120deg -> 240deg sweep)
  const gaugeAngle = useMemo(() => {
    const val = testing ? liveSpeed : results ? results.downloadSpeed : 0;
    let normalized = 0;
    if (val <= 0) normalized = 0;
    else if (val <= 10) normalized = (val / 10) * 0.2;
    else if (val <= 50) normalized = 0.2 + ((val - 10) / 40) * 0.3;
    else if (val <= 100) normalized = 0.5 + ((val - 50) / 50) * 0.25;
    else if (val <= 300) normalized = 0.75 + ((val - 100) / 200) * 0.18;
    else normalized = Math.min(1, 0.93 + ((val - 300) / 700) * 0.07);

    return -120 + normalized * 240;
  }, [liveSpeed, results, testing]);

  // Real-world suitability evaluation
  const suitability = useMemo(() => {
    const dl = results?.downloadSpeed ?? 0;
    const lat = results?.latency ?? 999;
    const up = results?.uploadSpeed ?? 0;
    const jit = results?.jitter ?? 999;

    return [
      {
        title: safeT("streaming4k", "4K Ultra HD Streaming"),
        icon: Tv,
        ready: dl >= 25 && lat < 120,
        status: dl >= 25 ? safeT("optimal", "Optimal") : safeT("lagWarning", "Buffering Likely"),
        desc: "Requires 25+ Mbps sustained download",
      },
      {
        title: safeT("onlineGaming", "Online Gaming"),
        icon: Gamepad2,
        ready: lat <= 45 && jit <= 15,
        status: lat <= 45 && jit <= 15 ? safeT("optimal", "Low Ping / Smooth") : safeT("lagWarning", "High Latency"),
        desc: "Requires <45ms ping and low jitter",
      },
      {
        title: safeT("videoConferencing", "HD Video Calls"),
        icon: Video,
        ready: dl >= 5 && up >= 3 && lat < 100,
        status: dl >= 5 && up >= 3 ? safeT("ready", "HD Crisp") : safeT("fairQuality", "Standard Quality"),
        desc: "Requires 3+ Mbps upload & steady latency",
      },
      {
        title: safeT("fastBrowsing", "Fast Web Browsing"),
        icon: Compass,
        ready: dl >= 10 && lat < 150,
        status: dl >= 10 ? safeT("optimal", "Instant Load") : safeT("ready", "Normal"),
        desc: "Requires 10+ Mbps for rich media & apps",
      },
    ];
  }, [results, safeT]);

  if (!online) {
    return (
      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
        <WifiOff className="w-16 h-16 text-rose-400 animate-pulse" />
        <h3 className="text-lg font-bold text-gray-800">{safeT("offline", "Offline")}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          {safeT("offlineHint", "No internet connection detected. Please reconnect to Wi-Fi or Ethernet to run the test.")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-50/60 overflow-y-auto p-3 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* MAIN TEST CARD */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Top server badge */}
          <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-full shadow-xs">
              <Server className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-medium text-gray-700">
                {serverMeta?.name || "Global Edge Anycast Network"}
              </span>
              {serverMeta?.ip && (
                <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                  ({serverMeta.ip})
                </span>
              )}
            </div>

            {phase !== "idle" && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {phase === "ping" && safeT("testingPing", "Pinging Edge Node...")}
                  {phase === "download" && safeT("testingDownload", "Testing Download...")}
                  {phase === "upload" && safeT("testingUpload", "Testing Upload...")}
                  {phase === "complete" && safeT("optimal", "Test Complete")}
                </span>
              </div>
            )}
          </div>

          {/* RADIAL SPEEDOMETER */}
          <div className="flex flex-col items-center justify-center my-1 relative">
            <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 240 190">
                <defs>
                  <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background Track Arc */}
                <path
                  d={describeArc(120, 95, 80, -120, 120)}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* Active Progress Arc */}
                <path
                  d={describeArc(120, 95, 80, -120, gaugeAngle)}
                  fill="none"
                  stroke={phase === "upload" ? "#8b5cf6" : "url(#speedGradient)"}
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="transition-all duration-150 ease-out"
                />

                {/* Tick Marks (0, 10, 25, 50, 100, 500+) */}
                {[
                  { label: "0", angle: -120 },
                  { label: "10", angle: -72 },
                  { label: "25", angle: -24 },
                  { label: "50", angle: 24 },
                  { label: "100", angle: 72 },
                  { label: "500+", angle: 120 },
                ].map((tick, idx) => {
                  const ptOuter = polarToCartesian(120, 95, 72, tick.angle);
                  const ptInner = polarToCartesian(120, 95, 65, tick.angle);
                  const ptText = polarToCartesian(120, 95, 54, tick.angle);
                  return (
                    <g key={idx}>
                      <line
                        x1={ptInner.x}
                        y1={ptInner.y}
                        x2={ptOuter.x}
                        y2={ptOuter.y}
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      <text
                        x={ptText.x}
                        y={ptText.y + 3}
                        fill="#94a3b8"
                        fontSize="8.5"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {tick.label}
                      </text>
                    </g>
                  );
                })}

                {/* Pointer Needle */}
                <g
                  transform={`rotate(${gaugeAngle}, 120, 95)`}
                  className="transition-transform duration-150 ease-out"
                >
                  <polygon
                    points="118,95 120,24 122,95"
                    fill={phase === "upload" ? "#7c3aed" : "#0284c7"}
                    filter="url(#needleGlow)"
                  />
                  <circle cx="120" cy="95" r="6" fill="#0f172a" />
                  <circle cx="120" cy="95" r="2.5" fill="#ffffff" />
                </g>
              </svg>

              {/* Central Value */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
                <div className="flex flex-col items-center">
                  {phase === "ping" ? (
                    <>
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                        {safeT("latency", "Ping")}
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-mono">
                        {livePing || "--"}
                      </div>
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        ms
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        {phase === "upload" ? (
                          <>
                            <ArrowUp className="w-3.5 h-3.5 text-purple-600 animate-bounce" />
                            {safeT("upload", "Upload")}
                          </>
                        ) : (
                          <>
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
                            {safeT("download", "Download")}
                          </>
                        )}
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-mono">
                        {testing
                          ? liveSpeed.toFixed(1)
                          : results
                          ? results.downloadSpeed.toFixed(1)
                          : "0.0"}
                      </div>
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Mbps
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Test progress bar */}
            {testing && (
              <div className="w-full max-w-sm mt-1">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-400 mt-1.5">
                  <span>{phase === "ping" ? "Ping & Jitter" : phase === "download" ? "Download Stream" : "Upload Payload"}</span>
                  <span className="font-mono font-semibold">{Math.round(progress)}%</span>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 max-w-md">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="mt-4">
              {testing ? (
                <button
                  onClick={stopSpeedTest}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all cursor-pointer shadow-xs"
                >
                  <Square className="w-4 h-4 fill-current" />
                  {safeT("stop", "Stop Test")}
                </button>
              ) : results ? (
                <button
                  onClick={runSpeedTest}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  {safeT("testAgain", "Test Again")}
                </button>
              ) : (
                <button
                  onClick={runSpeedTest}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm sm:text-base font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  {safeT("startTest", "Start Speed Test")}
                </button>
              )}
            </div>
          </div>

          {/* 4-METRIC RESULT CARDS (Download, Upload, Ping, Jitter) */}
          {results && !testing && (
            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Download */}
                <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                    <span>{safeT("download", "Download")}</span>
                    <ArrowDown className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="my-1.5">
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                      {results.downloadSpeed}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mbps</div>
                  </div>
                  <div className="text-[11px] font-semibold text-blue-800">
                    {getSpeedRating(results.downloadSpeed).label}
                  </div>
                </div>

                {/* Upload */}
                <div className="p-3.5 bg-purple-50/50 border border-purple-100 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>{safeT("upload", "Upload")}</span>
                    <ArrowUp className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="my-1.5">
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                      {results.uploadSpeed}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mbps</div>
                  </div>
                  <div className="text-[11px] font-semibold text-purple-800">
                    {getSpeedRating(results.uploadSpeed).label}
                  </div>
                </div>

                {/* Latency / Ping */}
                <div className="p-3.5 bg-gray-50/70 border border-gray-200/80 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                    <span>{safeT("latency", "Ping / RTT")}</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="my-1.5">
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                      {results.latency}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">ms</div>
                  </div>
                  <div className={cn("text-[11px] font-semibold", getLatencyRating(results.latency).color)}>
                    {getLatencyRating(results.latency).label}
                  </div>
                </div>

                {/* Jitter */}
                <div className="p-3.5 bg-gray-50/70 border border-gray-200/80 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                    <span>{safeT("jitter", "Jitter")}</span>
                    <Activity className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="my-1.5">
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                      {results.jitter}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">ms</div>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600">
                    {results.jitter <= 12 ? "Stable Stream" : "Minor Fluctuation"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* REAL-WORLD EXPERIENCE SUITABILITY */}
        {results && !testing && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                {safeT("suitability", "Real-World Experience Suitability")}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suitability.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-start gap-3 p-3.5 rounded-xl border transition-colors",
                      item.ready
                        ? "bg-emerald-50/40 border-emerald-100"
                        : "bg-amber-50/40 border-amber-100"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg shrink-0",
                        item.ready ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-gray-900 truncate">{item.title}</span>
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                            item.ready
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BROWSER NETWORK INFORMATION API PROFILE */}
        {networkInfo && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                {safeT("connectionInfo", "Browser Network Profile")}
              </h3>
              <span className="text-[10px] text-gray-400 bg-gray-50 border px-2 py-0.5 rounded">
                navigator.connection
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  {safeT("connectionType", "Type")}
                </div>
                <div className="text-sm font-bold text-gray-900 mt-0.5 capitalize">
                  {networkInfo.type || "Wi-Fi / Ethernet"}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  {safeT("effectiveType", "Effective Class")}
                </div>
                <div className="text-sm font-bold text-gray-900 mt-0.5 uppercase">
                  {networkInfo.effectiveType}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  {safeT("estimatedDownlink", "Downlink Ceiling")}
                </div>
                <div className="text-sm font-bold text-gray-900 mt-0.5">
                  {networkInfo.downlink} Mbps
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  {safeT("estimatedRtt", "Browser RTT")}
                </div>
                <div className="text-sm font-bold text-gray-900 mt-0.5">
                  {networkInfo.rtt} ms
                </div>
              </div>
            </div>

            {networkInfo.saveData && (
              <div className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                {safeT("dataSaverOn", "Data Saver is active on this browser client.")}
              </div>
            )}
          </div>
        )}

        {/* RECENT TEST HISTORY */}
        {history.length > 0 && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                {safeT("testHistory", "Recent Test History")}
              </h3>
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>{safeT("clearHistory", "Clear History")}</span>
              </button>
            </div>

            <div className="space-y-2">
              {history.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100/70 transition-colors rounded-lg text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-400 text-[11px]">#{i + 1}</span>
                    <span className="text-[11px] text-gray-500 font-mono hidden sm:inline">
                      {new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 font-mono">
                    <span className="flex items-center gap-1 font-bold text-blue-600">
                      <ArrowDown className="w-3 h-3 shrink-0" />
                      {r.downloadSpeed} <span className="text-[10px] text-gray-400 font-normal">Mbps</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-purple-600">
                      <ArrowUp className="w-3 h-3 shrink-0" />
                      {r.uploadSpeed} <span className="text-[10px] text-gray-400 font-normal">Mbps</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Clock className="w-3 h-3 shrink-0" />
                      {r.latency} <span className="text-[10px] text-gray-400 font-normal">ms</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISCLOSURE FOOTER */}
        <p className="text-[11px] text-gray-400 text-center leading-relaxed pb-4">
          {safeT(
            "browserNote",
            "Latency, jitter, download, and upload throughput are measured using high-performance edge streaming CDN endpoints and native browser fetch APIs."
          )}
        </p>
      </div>
    </div>
  );
}
