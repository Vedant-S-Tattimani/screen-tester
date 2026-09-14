"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  Volume2, 
  Play, 
  Square, 
  RotateCcw, 
  ShieldAlert, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Headphones,
  Activity
} from "lucide-react";
import { useTranslations } from "next-intl";

interface SpeakerPatternProps {
  testId?: string;
}

type ChannelMode = "stereo" | "left" | "right";
type ToneType = "mid" | "low" | "high" | "sweep";
type AudioState = "IDLE" | "PLAYING" | "UNSUPPORTED";

interface AudioOutputDevice {
  deviceId: string;
  label: string;
}

export function SpeakerPattern({ testId = "speaker-test" }: SpeakerPatternProps) {
    const t = useTranslations("Tests.SpeakerPattern");
  const { setObservation } = useTestContext();

  const [audioState, setAudioState] = useState<AudioState>(() => {
    if (typeof window === "undefined") return "IDLE";
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    return AudioContextClass ? "IDLE" : "UNSUPPORTED";
  });
  const [channelMode, setChannelMode] = useState<ChannelMode>("stereo");
  const [toneType, setToneType] = useState<ToneType>("mid");
  const [volume, setVolume] = useState<number>(0.2); // Safe default: 20%
  const [outputDevices, setOutputDevices] = useState<AudioOutputDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [isSinkIdSupported] = useState<boolean>(() => typeof AudioContext !== "undefined" && "setSinkId" in AudioContext.prototype);
  const [userObservationChoice, setUserObservationChoice] = useState<"PASS" | "ISSUE" | "UNSURE" | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const sweepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop all audio playback and disconnect nodes
  const stopAudio = useCallback(() => {
    if (sweepTimerRef.current) {
      clearTimeout(sweepTimerRef.current);
      sweepTimerRef.current = null;
    }

    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // ignore
      }
      oscRef.current = null;
    }

    if (gainRef.current) {
      try {
        gainRef.current.disconnect();
      } catch {
        // ignore
      }
      gainRef.current = null;
    }

    if (pannerRef.current) {
      try {
        pannerRef.current.disconnect();
      } catch {
        // ignore
      }
      pannerRef.current = null;
    }

    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      try {
        audioCtxRef.current.suspend();
      } catch {
        // ignore
      }
    }

    setAudioState("IDLE");
  }, []);

  // Initialize and check AudioContext support
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Enumerate output devices if supported
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const audioOutputs = devices
          .filter(d => d.kind === "audiooutput")
          .map((d, index) => ({
            deviceId: d.deviceId,
            label: d.label || `Audio Output ${index + 1}`
          }));
        setOutputDevices(audioOutputs);
        if (audioOutputs.length > 0) {
          setSelectedDeviceId(audioOutputs[0].deviceId);
        }
      }).catch(() => {
        // ignore
      });
    }

    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  // Play synthesized tone
  const playTone = async (selectedChannel = channelMode, selectedTone = toneType) => {
    stopAudio();

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      setAudioState("UNSUPPORTED");
      return;
    }

    let ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "closed") {
      ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
    }

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    // Optional setSinkId routing
    if (selectedDeviceId && isSinkIdSupported && "setSinkId" in ctx) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (ctx as any).setSinkId(selectedDeviceId);
      } catch {
        // ignore
      }
    }

    const now = ctx.currentTime;

    // 1. Oscillator
    const osc = ctx.createOscillator();
    osc.type = "sine";

    if (selectedTone === "low") {
      osc.frequency.setValueAtTime(100, now); // 100 Hz bass
    } else if (selectedTone === "mid") {
      osc.frequency.setValueAtTime(440, now); // 440 Hz standard concert A
    } else if (selectedTone === "high") {
      osc.frequency.setValueAtTime(2500, now); // 2500 Hz treble
    } else if (selectedTone === "sweep") {
      // 4-second exponential frequency sweep: 100 Hz to 4000 Hz
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(4000, now + 4);
      sweepTimerRef.current = setTimeout(() => {
        stopAudio();
      }, 4100);
    }

    // 2. Stereo Panner Node
    let panner: StereoPannerNode | null = null;
    if (ctx.createStereoPanner) {
      panner = ctx.createStereoPanner();
      if (selectedChannel === "left") {
        panner.pan.setValueAtTime(-1, now);
      } else if (selectedChannel === "right") {
        panner.pan.setValueAtTime(1, now);
      } else {
        panner.pan.setValueAtTime(0, now);
      }
    }

    // 3. Gain Node (Smooth ramping to avoid speaker pops)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(Math.min(0.8, Math.max(0, volume)), now + 0.05);

    // Graph connection
    if (panner) {
      osc.connect(panner);
      panner.connect(masterGain);
    } else {
      osc.connect(masterGain);
    }
    masterGain.connect(ctx.destination);

    osc.start(now);

    oscRef.current = osc;
    gainRef.current = masterGain;
    pannerRef.current = panner;

    setAudioState("PLAYING");
  };

  // Adjust volume dynamically while playing
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainRef.current.gain.linearRampToValueAtTime(newVol, now + 0.05);
    }
  };

  // Switch channel or tone dynamically
  const switchChannel = (ch: ChannelMode) => {
    setChannelMode(ch);
    if (audioState === "PLAYING") {
      playTone(ch, toneType);
    }
  };

  const switchTone = (t: ToneType) => {
    setToneType(t);
    if (audioState === "PLAYING") {
      playTone(channelMode, t);
    }
  };

  const handleObservation = (choice: "PASS" | "ISSUE" | "UNSURE") => {
    setUserObservationChoice(choice);
    setObservation(choice);
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top HUD / Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <Volume2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">{t("status")}</span>
            {audioState === "PLAYING" && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {t("playing")}{channelMode.toUpperCase()} {t("bull")}{toneType.toUpperCase()})
              </span>
            )}
            {audioState === "IDLE" && (
              <span className="text-slate-400 font-medium">{t("readyStopped")}</span>
            )}
            {audioState === "UNSUPPORTED" && (
              <span className="text-rose-400 font-medium">{t("webAudioApiUnsupported")}</span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <span className="uppercase text-[10px] tracking-wider">{t("volume")}</span>
            <span className="text-slate-200 font-semibold">{Math.round(volume * 100)}%</span>
          </div>

          {outputDevices.length > 0 && (
            <>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-slate-400">
                <span className="uppercase text-[10px] tracking-wider">{t("endpoints")}</span>
                <span className="text-slate-200">{outputDevices.length} {t("detected")}</span>
              </div>
            </>
          )}
        </div>

        {/* Master Play / Stop Controls */}
        <div className="flex items-center gap-2">
          {audioState !== "PLAYING" ? (
            <button
              type="button"
              onClick={() => playTone()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t("playTone")}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopAudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Square className="w-3.5 h-3.5" />
              <span>{t("stopAudio")}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => { stopAudio(); setVolume(0.2); setChannelMode("stereo"); setToneType("mid"); }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title={t("resetAudioSettingsTitle")}
            aria-label={t("resetAudioSettingsTitle")}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safe Volume Warning Banner */}
      <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>{t("hearingSafetyWarning")}</strong> {t("startAtALow")}</span>
      </div>

      {/* Main Testing Surface */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Channel Selection */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Headphones className="w-3.5 h-3.5 text-blue-400" />
            <span>{t("stereoChannelSeparation")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Left Only */}
            <button
              type="button"
              onClick={() => switchChannel("left")}
              className={`p-4 rounded-xl border text-left transition-all ${
                channelMode === "left"
                  ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{t("leftChannelOnly")}</span>
                <span className="text-[10px] font-mono text-blue-400">{t("pan10")}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {t("audioIsRouted100")}</p>
            </button>

            {/* Stereo Center */}
            <button
              type="button"
              onClick={() => switchChannel("stereo")}
              className={`p-4 rounded-xl border text-left transition-all ${
                channelMode === "stereo"
                  ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{t("stereoCenter")}</span>
                <span className="text-[10px] font-mono text-emerald-400">{t("center00")}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {t("balancedSimultaneousDualChannel")}</p>
            </button>

            {/* Right Only */}
            <button
              type="button"
              onClick={() => switchChannel("right")}
              className={`p-4 rounded-xl border text-left transition-all ${
                channelMode === "right"
                  ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{t("rightChannelOnly")}</span>
                <span className="text-[10px] font-mono text-purple-400">{t("pan10_1")}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {t("audioIsRouted100_1")}</p>
            </button>
          </div>
        </div>

        {/* Tone Frequency Presets */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t("testTonePresetsListening")}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "low", label: "Low Bass", freq: "100 Hz", desc: "Inspect woofer & chassis buzz" },
              { id: "mid", label: "Mid Range", freq: "440 Hz", desc: "Standard concert A reference" },
              { id: "high", label: "High Treble", freq: "2,500 Hz", desc: "Tweeter clarity & distortion" },
              { id: "sweep", label: "Freq Sweep", freq: "100-4,000 Hz", desc: "Logarithmic frequency sweep" }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => switchTone(t.id as ToneType)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  toneType === t.id
                    ? "bg-slate-800 border-blue-500 text-white shadow-xs"
                    : "bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{t.label}</span>
                  <span className="text-[10px] font-mono text-slate-400">{t.freq}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Volume Slider & Output Device Selector */}
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Volume */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t("testVolumeLevel")}</span>
                </span>
                <span className="font-mono text-slate-400 font-bold">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.02"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* Output Device Selection (setSinkId) */}
            {outputDevices.length > 0 && isSinkIdSupported && (
              <div className="sm:w-64 space-y-1.5">
                <label htmlFor="speaker-output-device-select" className="text-xs font-semibold text-slate-300 block">
                  {t("outputEndpointSetsinkid")}</label>
                <select
                  id="speaker-output-device-select"
                  value={selectedDeviceId}
                  onChange={(e) => {
                    setSelectedDeviceId(e.target.value);
                    if (audioState === "PLAYING") playTone();
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-hidden focus:border-blue-500"
                >
                  {outputDevices.map(d => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* User Acoustic Observation Section */}
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              {t("userAudioObservationMandatory")}</span>
            {userObservationChoice && (
              <span className="text-[10px] font-mono text-blue-400 uppercase">{t("recorded")}</span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t("theBrowserGeneratesPure")}<strong>{t("cannotMeasurePhysicalAcoustic")}</strong>{t("howDidTheSpeakers")}</p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleObservation("PASS")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                userObservationChoice === "PASS"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("soundsNormal")}</span>
            </button>

            <button
              type="button"
              onClick={() => handleObservation("ISSUE")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                userObservationChoice === "ISSUE"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>{t("needsAttentionDistortedSilent")}</span>
            </button>

            <button
              type="button"
              onClick={() => handleObservation("UNSURE")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                userObservationChoice === "UNSURE"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("unsure")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Honesty Disclaimer Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">{t("hardwareBoundaryNotice")}</strong> {t("theBrowserSynthesizesDigital")}</div>
      </div>

      <TestControlBar testId={testId} title={t("speakerStereoChannelTestTitle")} />
    </div>
  );
}
