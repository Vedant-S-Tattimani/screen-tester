"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { 
  getMicrophoneStream, 
  stopMediaStream, 
  enumerateAudioInputDevices, 
  createAudioAnalyzer, 
  getSupportedRecordingMimeTypes, 
  formatDuration, 
  generateRecordingFilename, 
  AudioInputDevice, 
  AudioAnalyzer, 
  SupportedRecordingFormat 
} from "@/lib/audioUtils";
import { 
  Mic, 
  Square, 
  Pause, 
  Play, 
  RotateCcw, 
  Download, 
  Trash2, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  FileAudio
} from "lucide-react";

const MAX_RECORDING_SECONDS = 300; // 5 minutes safety ceiling

type RecorderState = "idle" | "recording" | "paused" | "stopped";

export function VoiceRecorder() {
  const t = useTranslations("VoiceRecorder");

  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [activeMimeType] = useState<SupportedRecordingFormat | null>(() => {
    if (typeof window === "undefined") return null;
    const formats = getSupportedRecordingMimeTypes();
    return formats.length > 0 ? formats[0] : null;
  });
  const [devices, setDevices] = useState<AudioInputDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [liveLevel, setLiveLevel] = useState<number>(0);

  // References
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const analyzerRef = useRef<AudioAnalyzer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Stop recording timer
  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Stop live audio level animation
  const stopLevelAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (analyzerRef.current) {
      analyzerRef.current.cleanup();
      analyzerRef.current = null;
    }
    setLiveLevel(0);
  }, []);

  // Teardown and reset stream
  const cleanupStream = useCallback(() => {
    stopLevelAnimation();
    stopTimer();
    if (mediaStreamRef.current) {
      stopMediaStream(mediaStreamRef.current);
      mediaStreamRef.current = null;
    }
  }, [stopLevelAnimation, stopTimer]);

  // Enumerate devices & probe formats on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    queueMicrotask(() => {
      enumerateAudioInputDevices().then(list => {
        setDevices(list);
        if (list.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(list[0].deviceId);
        }
      });
    });

    return () => {
      cleanupStream();
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, [cleanupStream, audioBlobUrl, selectedDeviceId]);

  // Start live level monitoring loop
  const startLevelMonitoring = (stream: MediaStream) => {
    const analyzer = createAudioAnalyzer(stream);
    if (!analyzer) return;
    analyzerRef.current = analyzer;

    const poll = () => {
      if (!analyzerRef.current) return;
      const analysis = analyzerRef.current.getAnalysis();
      setLiveLevel(analysis.level);
      animFrameRef.current = requestAnimationFrame(poll);
    };

    animFrameRef.current = requestAnimationFrame(poll);
  };

  // Start recording
  const handleStartRecording = async () => {
    cleanupStream();
    setErrorMessage("");
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
      setAudioBlobUrl(null);
    }
    recordedChunksRef.current = [];

    try {
      const stream = await getMicrophoneStream(selectedDeviceId || undefined);
      mediaStreamRef.current = stream;

      // Re-enumerate to get device labels now that permission is granted
      enumerateAudioInputDevices().then(setDevices);

      const mime = activeMimeType?.mimeType || "";
      const options: MediaRecorderOptions = mime ? { mimeType: mime } : {};
      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const resolvedMime = recorder.mimeType || activeMimeType?.mimeType || "audio/webm";
        const blob = new Blob(recordedChunksRef.current, { type: resolvedMime });
        const url = URL.createObjectURL(blob);
        setAudioBlobUrl(url);
        setRecorderState("stopped");
        cleanupStream();
      };

      recorder.start(250); // Collect chunk every 250ms
      setRecorderState("recording");
      setRecordingSeconds(0);

      // Start 1-second interval timer
      stopTimer();
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev + 1 >= MAX_RECORDING_SECONDS) {
            // Safety ceiling reached
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
              mediaRecorderRef.current.stop();
            }
            return MAX_RECORDING_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);

      // Start level analyzer
      startLevelMonitoring(stream);
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      cleanupStream();
      setRecorderState("idle");
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setErrorMessage(t("errors.permissionDenied"));
      } else if (error.name === "NotFoundError") {
        setErrorMessage(t("errors.deviceNotFound"));
      } else {
        setErrorMessage(error.message || t("errors.startFailed"));
      }
    }
  };

  // Pause recording
  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setRecorderState("paused");
      stopTimer();
      stopLevelAnimation();
    }
  };

  // Resume recording
  const handleResumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setRecorderState("recording");

      stopTimer();
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev + 1 >= MAX_RECORDING_SECONDS) {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
              mediaRecorderRef.current.stop();
            }
            return MAX_RECORDING_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);

      if (mediaStreamRef.current) {
        startLevelMonitoring(mediaStreamRef.current);
      }
    }
  };

  // Stop recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  // Delete & Reset
  const handleResetRecording = () => {
    cleanupStream();
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
      setAudioBlobUrl(null);
    }
    recordedChunksRef.current = [];
    setRecorderState("idle");
    setRecordingSeconds(0);
  };

  // Download recording
  const handleDownload = () => {
    if (!audioBlobUrl) return;
    const ext = activeMimeType?.extension || "webm";
    const filename = generateRecordingFilename(ext);

    const a = document.createElement("a");
    a.href = audioBlobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8 font-sans max-w-2xl mx-auto">
      
      {/* Device & Format Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-gray-50 border border-gray-200/90 rounded-2xl text-xs">
        {/* Device Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="voice-recorder-device-select" className="text-gray-500 font-medium whitespace-nowrap">
            {t("labels.microphone")}:
          </label>
          <select
            id="voice-recorder-device-select"
            disabled={recorderState === "recording" || recorderState === "paused"}
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-gray-900 max-w-[200px] truncate"
          >
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label}
              </option>
            ))}
            {devices.length === 0 && (
              <option value="">{t("labels.defaultMicrophone")}</option>
            )}
          </select>
        </div>

        {/* MIME Format Indicator */}
        {activeMimeType && (
          <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[11px] self-end sm:self-center">
            <FileAudio className="w-3.5 h-3.5 text-gray-400" />
            <span>Format: {activeMimeType.label}</span>
          </div>
        )}
      </div>

      {/* Main Recording Console Box */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xs">
        
        {/* Timer Display */}
        <div className="space-y-1">
          <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-gray-950">
            {formatDuration(recordingSeconds)}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {recorderState === "recording" && (
                <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t("states.recording")}
                </span>
              )}
              {recorderState === "paused" && (
                <span className="text-amber-600 font-semibold">{t("states.paused")}</span>
              )}
              {recorderState === "stopped" && (
                <span className="text-blue-600 font-semibold">{t("states.completed")}</span>
              )}
              {recorderState === "idle" && (
                <span>{t("states.ready")} (Max 5:00)</span>
              )}
            </span>
          </div>
        </div>

        {/* Live Input Level Wave Indicator (During recording) */}
        {(recorderState === "recording" || recorderState === "paused") && (
          <div className="space-y-2 max-w-sm mx-auto">
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/80">
              <div 
                className={`h-full transition-all duration-75 ${
                  recorderState === "paused" 
                    ? "bg-gray-300" 
                    : liveLevel > 70 
                      ? "bg-amber-500" 
                      : "bg-emerald-500"
                }`}
                style={{ width: `${liveLevel}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>Silence</span>
              <span>Input Activity</span>
              <span>Peak</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 text-left max-w-md mx-auto">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          {/* 1. IDLE State Button */}
          {recorderState === "idle" && (
            <button
              type="button"
              onClick={handleStartRecording}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gray-950 hover:bg-gray-800 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>{t("buttons.startRecording")}</span>
            </button>
          )}

          {/* 2. RECORDING State Buttons */}
          {recorderState === "recording" && (
            <>
              <button
                type="button"
                onClick={handlePauseRecording}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>{t("buttons.pause")}</span>
              </button>

              <button
                type="button"
                onClick={handleStopRecording}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{t("buttons.stop")}</span>
              </button>
            </>
          )}

          {/* 3. PAUSED State Buttons */}
          {recorderState === "paused" && (
            <>
              <button
                type="button"
                onClick={handleResumeRecording}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t("buttons.resume")}</span>
              </button>

              <button
                type="button"
                onClick={handleStopRecording}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{t("buttons.stop")}</span>
              </button>
            </>
          )}

          {/* 4. STOPPED State: Audio Player & Export */}
          {recorderState === "stopped" && audioBlobUrl && (
            <div className="w-full space-y-4 pt-2">
              <audio 
                controls 
                src={audioBlobUrl} 
                className="w-full max-w-md mx-auto focus:outline-hidden"
              />

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("buttons.downloadRecording")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetRecording}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("buttons.recordAgain")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetRecording}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t("buttons.delete")}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Privacy & Safety Information Banner */}
      <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl text-xs text-gray-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t("privacy.title")}</span>
        </div>
        <p className="leading-relaxed">
          {t("privacy.notice")}
        </p>
        <div className="pt-1 text-[11px] text-gray-500 flex items-center gap-2">
          <span className="font-semibold text-gray-700">{t("privacy.limitTitle")}:</span>
          <span>{t("privacy.limitNotice")}</span>
        </div>
      </div>

    </div>
  );
}
