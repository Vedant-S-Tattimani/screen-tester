"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  getMicrophoneStream, 
  stopMediaStream, 
  enumerateAudioInputDevices, 
  createAudioAnalyzer, 
  AudioInputDevice, 
  AudioAnalyzer
} from "@/lib/audioUtils";
import { recordTestObservation, ObservationResult } from "@/lib/inspectionStorage";
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ShieldCheck, 
  Sliders, 
  Volume2, 
  Activity, 
  Radio
} from "lucide-react";

interface MicrophonePatternProps {
  testId?: string;
}

type MicState = 
  | "IDLE" 
  | "STARTING" 
  | "ACTIVE" 
  | "DENIED" 
  | "NOT_FOUND" 
  | "IN_USE" 
  | "UNSUPPORTED" 
  | "ERROR";

interface TrackTelemetry {
  deviceId: string | null;
  channelCount: number | null;
  sampleRate: number | null;
  echoCancellation?: boolean | null;
  noiseSuppression?: boolean | null;
  autoGainControl?: boolean | null;
}

export function MicrophonePattern({ testId = "microphone-test" }: MicrophonePatternProps) {
  const t = useTranslations("MicrophoneTest");
  const { setObservation } = useTestContext();

  const [micState, setMicState] = useState<MicState>(() => {
    if (typeof window === "undefined") return "IDLE";
    if (!navigator.mediaDevices?.getUserMedia) return "UNSUPPORTED";
    return "IDLE";
  });

  const [devices, setDevices] = useState<AudioInputDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  // Live Analysis Telemetry
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [peakLevel, setPeakLevel] = useState<number>(0);
  const [isSilence, setIsSilence] = useState<boolean>(true);
  const [isClipping, setIsClipping] = useState<boolean>(false);

  // Hardware/Track Telemetry
  const [telemetry, setTelemetry] = useState<TrackTelemetry>({
    deviceId: null,
    channelCount: null,
    sampleRate: null
  });

  // User Observation Choice
  const [userObservationChoice, setUserObservationChoice] = useState<ObservationResult | null>(null);
  const [observationSubReason, setObservationSubReason] = useState<string>("");

  // Quick 5-second Loopback Player State
  const [isLoopbackRecording, setIsLoopbackRecording] = useState<boolean>(false);
  const [loopbackCountdown, setLoopbackCountdown] = useState<number>(5);
  const [loopbackAudioUrl, setLoopbackAudioUrl] = useState<string | null>(null);
  const [isLoopbackPlaying, setIsLoopbackPlaying] = useState<boolean>(false);

  // References
  const streamRef = useRef<MediaStream | null>(null);
  const analyzerRef = useRef<AudioAnalyzer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const loopbackRecorderRef = useRef<MediaRecorder | null>(null);
  const loopbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loopbackChunksRef = useRef<BlobPart[]>([]);
  const loopbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Stop all active microphone streams and visualizers
  const stopMicrophone = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (analyzerRef.current) {
      analyzerRef.current.cleanup();
      analyzerRef.current = null;
    }

    if (streamRef.current) {
      stopMediaStream(streamRef.current);
      streamRef.current = null;
    }

    setMicState("IDLE");
    setAudioLevel(0);
    setPeakLevel(0);
    setIsSilence(true);
    setIsClipping(false);
  }, []);

  // Populate connected audio input devices
  const refreshDevices = useCallback(async () => {
    const list = await enumerateAudioInputDevices();
    setDevices(list);
    if (list.length > 0 && !selectedDeviceId) {
      setSelectedDeviceId(list[0].deviceId);
    }
  }, [selectedDeviceId]);

  // Initial enumeration on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    queueMicrotask(() => refreshDevices());

    const handleDeviceChange = () => {
      refreshDevices();
    };

    navigator.mediaDevices?.addEventListener("devicechange", handleDeviceChange);

    return () => {
      stopMicrophone();
      if (navigator.mediaDevices?.removeEventListener) {
        navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
      }
      if (loopbackAudioUrl) {
        URL.revokeObjectURL(loopbackAudioUrl);
      }
      if (loopbackTimerRef.current) {
        clearInterval(loopbackTimerRef.current);
      }
    };
  }, [refreshDevices, stopMicrophone, loopbackAudioUrl]);

  // Waveform oscilloscope drawing loop
  const startVisualizerLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const waveformData = new Uint8Array(128);

    const draw = () => {
      if (!analyzerRef.current) return;

      const analysis = analyzerRef.current.getAnalysis();
      setAudioLevel(analysis.level);
      setPeakLevel(analysis.peak);
      setIsSilence(analysis.isSilence);
      setIsClipping(analysis.isClipping);

      analyzerRef.current.getWaveform(waveformData);

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = "rgba(51, 65, 85, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Waveform line
      ctx.lineWidth = 2;
      ctx.strokeStyle = analysis.isClipping 
        ? "#ef4444" 
        : analysis.level > 60 
          ? "#f59e0b" 
          : "#10b981";

      ctx.beginPath();
      const sliceWidth = width / (waveformData.length - 1);
      let x = 0;

      for (let i = 0; i < waveformData.length; i++) {
        const v = waveformData[i] / 128.0; // 0..2, mid is 1.0
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  // Start microphone stream
  const startMicrophone = async (targetDeviceId?: string) => {
    stopMicrophone();
    setMicState("STARTING");

    try {
      const deviceIdToUse = targetDeviceId || selectedDeviceId;
      const stream = await getMicrophoneStream(deviceIdToUse || undefined);
      streamRef.current = stream;

      // Extract track settings telemetry
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        const settings = audioTrack.getSettings();
        setTelemetry({
          deviceId: settings.deviceId || null,
          channelCount: settings.channelCount || 1,
          sampleRate: settings.sampleRate || null,
          echoCancellation: settings.echoCancellation ?? null,
          noiseSuppression: settings.noiseSuppression ?? null,
          autoGainControl: settings.autoGainControl ?? null
        });

        audioTrack.onended = () => {
          stopMicrophone();
        };
      }

      // Initialize Web Audio API analyzer
      const analyzer = createAudioAnalyzer(stream);
      if (analyzer) {
        analyzerRef.current = analyzer;
        startVisualizerLoop();
      }

      setMicState("ACTIVE");

      // Re-enumerate to get human readable labels now that permission is granted
      await refreshDevices();
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setMicState("DENIED");
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        setMicState("NOT_FOUND");
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        setMicState("IN_USE");
      } else {
        setMicState("ERROR");
      }
    }
  };

  // Switch microphone device
  const handleDeviceChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    if (micState === "ACTIVE" || micState === "STARTING") {
      startMicrophone(deviceId);
    }
  };

  // Quick 5-second Loopback audio sample check
  const startLoopbackSample = () => {
    if (!streamRef.current || isLoopbackRecording) return;

    if (loopbackAudioUrl) {
      URL.revokeObjectURL(loopbackAudioUrl);
      setLoopbackAudioUrl(null);
    }

    loopbackChunksRef.current = [];
    let recorder: MediaRecorder;

    try {
      recorder = new MediaRecorder(streamRef.current);
    } catch {
      return;
    }

    loopbackRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        loopbackChunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(loopbackChunksRef.current, { type: recorder.mimeType || "audio/webm" });
      const url = URL.createObjectURL(blob);
      setLoopbackAudioUrl(url);
      setIsLoopbackRecording(false);
    };

    recorder.start();
    setIsLoopbackRecording(true);
    setLoopbackCountdown(5);

    let remaining = 5;
    loopbackTimerRef.current = setInterval(() => {
      remaining -= 1;
      setLoopbackCountdown(remaining);
      if (remaining <= 0) {
        if (loopbackTimerRef.current) clearInterval(loopbackTimerRef.current);
        if (recorder.state === "recording") {
          recorder.stop();
        }
      }
    }, 1000);
  };

  // Playback the recorded loopback sample
  const toggleLoopbackPlayback = () => {
    if (!loopbackAudioUrl) return;

    if (!loopbackAudioRef.current) {
      loopbackAudioRef.current = new Audio(loopbackAudioUrl);
      loopbackAudioRef.current.volume = 0.5; // Safe conservative volume
      loopbackAudioRef.current.onended = () => setIsLoopbackPlaying(false);
    }

    if (isLoopbackPlaying) {
      loopbackAudioRef.current.pause();
      loopbackAudioRef.current.currentTime = 0;
      setIsLoopbackPlaying(false);
    } else {
      loopbackAudioRef.current.src = loopbackAudioUrl;
      loopbackAudioRef.current.play().then(() => {
        setIsLoopbackPlaying(true);
      }).catch(() => {
        setIsLoopbackPlaying(false);
      });
    }
  };

  // Save observation to active inspection session
  const handleObservation = (result: ObservationResult, label: string) => {
    setUserObservationChoice(result);
    setObservationSubReason(label);
    setObservation(result);

    const notes = `Microphone input evaluation: ${label}. Selected device: ${telemetry.deviceId || "Default"}. Sample rate: ${telemetry.sampleRate ? telemetry.sampleRate + "Hz" : "Unknown"}. Peak level observed: ${peakLevel}%.`;
    recordTestObservation(testId, result, notes);
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100 font-sans">
      {/* Top Status & Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">{t("labels.status")}:</span>
            {micState === "ACTIVE" && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("states.active")}
              </span>
            )}
            {micState === "STARTING" && (
              <span className="text-blue-400 font-semibold animate-pulse">{t("states.requesting")}</span>
            )}
            {micState === "IDLE" && (
              <span className="text-slate-400">{t("states.idle")}</span>
            )}
            {micState === "DENIED" && (
              <span className="text-rose-400 font-semibold">{t("states.permissionDenied")}</span>
            )}
            {micState === "NOT_FOUND" && (
              <span className="text-amber-400 font-semibold">{t("states.notFound")}</span>
            )}
            {micState === "IN_USE" && (
              <span className="text-amber-400 font-semibold">{t("states.inUse")}</span>
            )}
            {micState === "UNSUPPORTED" && (
              <span className="text-rose-400 font-semibold">{t("states.unsupported")}</span>
            )}
            {micState === "ERROR" && (
              <span className="text-rose-400 font-semibold">{t("states.error")}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {micState === "ACTIVE" ? (
            <button
              type="button"
              onClick={stopMicrophone}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/40 hover:bg-rose-600/30 transition-colors text-xs font-semibold cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{t("buttons.stopMicrophone")}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startMicrophone()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{t("buttons.startMicrophone")}</span>
            </button>
          )}

          {devices.length > 1 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => handleDeviceChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-hidden focus:border-blue-500 max-w-[200px] truncate"
              aria-label={t("labels.selectMicrophone")}
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
        
        {/* Permission / Inactive Guidance Cards */}
        {micState === "IDLE" && (
          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
              <Mic className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h2 className="text-base font-bold text-slate-100">{t("idle.title")}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("idle.description")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => startMicrophone()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t("buttons.startMicrophone")}</span>
            </button>
          </div>
        )}

        {micState === "DENIED" && (
          <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <MicOff className="w-5 h-5" />
              <span>{t("denied.title")}</span>
            </div>
            <p className="text-xs text-rose-200/80 leading-relaxed">
              {t("denied.description")}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => startMicrophone()}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors"
              >
                {t("buttons.retryPermission")}
              </button>
            </div>
          </div>
        )}

        {micState === "NOT_FOUND" && (
          <div className="p-6 bg-amber-950/30 rounded-2xl border border-amber-900/50 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>{t("notFound.title")}</span>
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              {t("notFound.description")}
            </p>
            <button
              type="button"
              onClick={() => refreshDevices()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors"
            >
              {t("buttons.refreshDevices")}
            </button>
          </div>
        )}

        {/* Live Audio Visualizer Card (Rendered when active) */}
        {micState === "ACTIVE" && (
          <div className="space-y-4">
            
            {/* Real-time Oscilloscope Canvas */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">{t("labels.liveWaveform")}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  {isClipping ? (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold animate-pulse">
                      {t("labels.possibleClipping")}
                    </span>
                  ) : isSilence ? (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {t("labels.silenceDetected")}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                      {t("labels.inputDetected")}
                    </span>
                  )}
                </div>
              </div>

              {/* Canvas viewport */}
              <div className="h-32 w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={640} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Live RMS Level Meter Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-blue-400" />
                    <span>{t("labels.browserReportedLevel")}</span>
                  </span>
                  <span className="font-mono text-slate-300 font-bold">
                    {audioLevel}% <span className="text-slate-500 font-normal">({t("labels.peak")}: {peakLevel}%)</span>
                  </span>
                </div>

                {/* Progress bar with peak marker */}
                <div className="relative w-full h-3.5 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full transition-all duration-75 ${
                      isClipping 
                        ? "bg-rose-500" 
                        : audioLevel > 60 
                          ? "bg-amber-500" 
                          : "bg-emerald-500"
                    }`}
                    style={{ width: `${audioLevel}%` }}
                  />
                  {/* Peak hold vertical tick */}
                  {peakLevel > 0 && (
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xs pointer-events-none"
                      style={{ left: `${peakLevel}%` }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Quick 5-Second Loopback Playback Test */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-slate-200">{t("loopback.title")}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">5-Second Audio Check</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("loopback.description")}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {isLoopbackRecording ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold animate-pulse"
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>{t("loopback.recordingCountdown", { seconds: loopbackCountdown })}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startLoopbackSample}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-xs font-semibold cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t("loopback.startRecordSample")}</span>
                  </button>
                )}

                {loopbackAudioUrl && !isLoopbackRecording && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleLoopbackPlayback}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-xs font-semibold cursor-pointer"
                    >
                      {isLoopbackPlaying ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>{t("loopback.stopPlayback")}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{t("loopback.playSample")}</span>
                        </>
                      )}
                    </button>
                    <Link
                      href="/tests/speaker-test"
                      className="text-xs text-blue-400 hover:underline flex items-center gap-1 ml-2"
                    >
                      <span>{t("loopback.verifySpeakers")}</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Information & Hardware Telemetry Grid */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t("telemetry.title")}</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-mono uppercase font-semibold">
                  {t("badges.browserReported")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono block">{t("telemetry.channels")}</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">
                    {telemetry.channelCount ? `${telemetry.channelCount} ${telemetry.channelCount === 1 ? "Mono" : "Stereo"}` : "—"}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono block">{t("telemetry.sampleRate")}</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">
                    {telemetry.sampleRate ? `${telemetry.sampleRate} Hz` : "—"}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono block">{t("telemetry.noiseSuppression")}</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">
                    {telemetry.noiseSuppression !== null ? (telemetry.noiseSuppression ? "Active" : "Off") : "Browser managed"}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono block">{t("telemetry.echoCancellation")}</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">
                    {telemetry.echoCancellation !== null ? (telemetry.echoCancellation ? "Active" : "Off") : "Browser managed"}
                  </span>
                </div>
              </div>
            </div>

            {/* User Acoustic Observation Section */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">
                  {t("observation.title")}
                </span>
                {userObservationChoice && (
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">
                    {t("observation.recordedBadge")} ({observationSubReason})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("observation.description")}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleObservation("LOOKS_NORMAL", "Working normally")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    userObservationChoice === "LOOKS_NORMAL" && observationSubReason === "Working normally"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t("observation.workingNormally")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleObservation("LOOKS_NORMAL", "Input detected")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    userObservationChoice === "LOOKS_NORMAL" && observationSubReason === "Input detected"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t("observation.inputDetected")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleObservation("NEEDS_ATTENTION", "Low input")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    userObservationChoice === "NEEDS_ATTENTION" && observationSubReason === "Low input"
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("observation.lowInput")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleObservation("NEEDS_ATTENTION", "No input / Silent")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    userObservationChoice === "NEEDS_ATTENTION" && observationSubReason === "No input / Silent"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t("observation.noInput")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleObservation("NEEDS_ATTENTION", "Possible clipping / Distortion")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    userObservationChoice === "NEEDS_ATTENTION" && observationSubReason === "Possible clipping / Distortion"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t("observation.possibleClipping")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleObservation("UNSURE", "Unsure")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    userObservationChoice === "UNSURE"
                      ? "bg-slate-700 text-white border border-slate-500"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t("observation.unsure")}</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Privacy & Hardware Boundary Notice Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">{t("privacy.title")}:</strong> {t("privacy.notice")}
        </div>
      </div>

      <TestControlBar testId={testId} title={t("title")} />
    </div>
  );
}
