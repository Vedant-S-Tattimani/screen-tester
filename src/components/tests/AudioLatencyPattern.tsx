"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Volume2, 
  VolumeX, 
  Activity, 
  Clock, 
  Radio, 
  Play, 
  Pause, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from "lucide-react";

interface AudioHardwareStats {
  sampleRate: number;
  baseLatencyMs: number;
  outputLatencyMs: number;
  totalLatencyMs: number;
  maxChannels: number;
  state: string;
}

export function AudioLatencyPattern({ testId }: { testId: string }) {
  const [stats, setStats] = useState<AudioHardwareStats | null>(null);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(60);
  const [visualFlash, setVisualFlash] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = useCallback(() => {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Extract latency details
    const baseLatency = (ctx.baseLatency || 0) * 1000;
    // outputLatency is supported in Chromium browsers
    const outputLatency = ((ctx as unknown as { outputLatency?: number }).outputLatency || 0) * 1000;
    const total = baseLatency + outputLatency;

    setStats({
      sampleRate: ctx.sampleRate,
      baseLatencyMs: Number(baseLatency.toFixed(2)),
      outputLatencyMs: Number(outputLatency.toFixed(2)),
      totalLatencyMs: Number(total.toFixed(2)),
      maxChannels: ctx.destination.maxChannelCount,
      state: ctx.state
    });
  }, []);

  // Play single pulse
  const playPulse = useCallback((freq = 880, duration = 0.08) => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);

    // Visual pulse
    setVisualFlash(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => setVisualFlash(false), 80);
  }, [initAudio]);

  // Metronome loop
  useEffect(() => {
    if (isPlayingMetronome) {
      const intervalMs = (60 / bpm) * 1000;
      timerRef.current = setInterval(() => {
        playPulse(1000, 0.06);
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingMetronome, bpm, playPulse]);

  return (
    <div className="relative w-full h-[650px] sm:h-[720px] rounded-2xl overflow-hidden flex flex-col select-none border border-neutral-800 shadow-2xl bg-neutral-950 text-white">
      {/* Top Header */}
      <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-200">
            Web Audio Hardware Pipeline Diagnostics
          </span>
        </div>

        <button
          onClick={initAudio}
          className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono border border-neutral-700 text-neutral-300"
        >
          {stats ? "Refresh Audio State" : "Initialize Audio Engine"}
        </button>
      </div>

      {/* Main Diagnostic Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto">
        {/* Visual Flash Trigger Orb */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={() => playPulse(880, 0.1)}
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-100 shadow-2xl cursor-pointer ${
              visualFlash
                ? "bg-emerald-400 border-white shadow-[0_0_80px_rgba(52,211,153,0.8)] scale-105"
                : "bg-neutral-900 border-neutral-700 hover:border-emerald-500/60 hover:bg-neutral-800/80"
            }`}
          >
            <Volume2 className={`w-10 h-10 mb-1 transition-colors ${visualFlash ? "text-black" : "text-emerald-400"}`} />
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${visualFlash ? "text-black" : "text-neutral-300"}`}>
              Click to Sound
            </span>
            <span className={`text-[10px] font-mono mt-0.5 ${visualFlash ? "text-black/70" : "text-neutral-500"}`}>
              Instantaneous Beep
            </span>
          </button>
        </div>

        {/* Hardware Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-6">
          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl text-center">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              Hardware Sample Rate
            </span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {stats ? `${stats.sampleRate.toLocaleString()} Hz` : "Click to Init"}
            </span>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl text-center">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              Base Kernel Latency
            </span>
            <span className="text-lg font-bold font-mono text-blue-400">
              {stats ? `${stats.baseLatencyMs} ms` : "—"}
            </span>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl text-center">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              Driver Output Latency
            </span>
            <span className="text-lg font-bold font-mono text-amber-400">
              {stats && stats.outputLatencyMs > 0 ? `${stats.outputLatencyMs} ms` : stats ? "Kernel Direct" : "—"}
            </span>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl text-center">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              Output Channels
            </span>
            <span className="text-lg font-bold font-mono text-purple-400">
              {stats ? `${stats.maxChannels} ch (${stats.maxChannels > 2 ? "Surround" : "Stereo"})` : "—"}
            </span>
          </div>
        </div>

        {/* Metronome Sync Bar */}
        <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingMetronome((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-medium transition-all ${
                isPlayingMetronome
                  ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {isPlayingMetronome ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingMetronome ? "Stop Metronome" : "Continuous Sync Pulse"}</span>
            </button>
            <span className="font-mono text-neutral-400">Pulse Count: {clickCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-neutral-400">BPM:</span>
            {[60, 120, 180].map((val) => (
              <button
                key={val}
                onClick={() => setBpm(val)}
                className={`px-2 py-1 rounded font-mono ${bpm === val ? "bg-blue-600 text-white font-bold" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Technical Context */}
      <div className="z-20 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <div>
          Web Audio AudioContext API • Real-Time Hardware Buffer Analysis
        </div>
        <div className="text-neutral-500">
          Bluetooth latency typically adds +80–200ms
        </div>
      </div>
    </div>
  );
}
