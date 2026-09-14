"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Video, Camera, Download, Play, Pause, Square, Circle, Clock, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScreenRecorderPatternProps {
  testId?: string;
}

type RecordingState = "idle" | "recording" | "paused" | "done";

export function ScreenRecorderPattern({ testId = "screen-recorder" }: ScreenRecorderPatternProps) {
  const t = useTranslations("Tests.ScreenRecorderPattern");
  const [state, setState] = useState<RecordingState>("idle");
  const [duration, setDuration] = useState(0);
  const [supported, setSupported] = useState(true);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!navigator.mediaDevices || !("getDisplayMedia" in navigator.mediaDevices)) {
      setSupported(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: true,
      });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm")
          ? "video/webm"
          : "video/mp4";

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
          setFileSize(chunksRef.current.reduce((s, c) => s + c.size, 0));
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        setFileSize(blob.size);
        setState("done");
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      };

      // If user stops sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== "inactive") recorder.stop();
      };

      recorder.start(1000); // collect data every second
      setState("recording");
      setDuration(0);
      setRecordedUrl(null);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } catch (err) {
      console.error("Screen recording error:", err);
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setState("paused");
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
      setState("recording");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, []);

  const takeScreenshot = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new (window as any).ImageCapture(track);

      // Fallback: draw to canvas from video
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(video, 0, 0);

      stream.getTracks().forEach(track => track.stop());
      const url = canvas.toDataURL("image/png");
      setScreenshotUrl(url);
    } catch (err) {
      console.error("Screenshot error:", err);
    }
  }, []);

  const downloadRecording = useCallback(() => {
    if (!recordedUrl) return;
    const a = document.createElement("a");
    a.href = recordedUrl;
    a.download = `screen-recording-${Date.now()}.webm`;
    a.click();
  }, [recordedUrl]);

  const downloadScreenshot = useCallback(() => {
    if (!screenshotUrl) return;
    const a = document.createElement("a");
    a.href = screenshotUrl;
    a.download = `screenshot-${Date.now()}.png`;
    a.click();
  }, [screenshotUrl]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  if (!supported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
        <Video className="w-16 h-16 text-gray-300" />
        <h3 className="text-lg font-bold text-gray-700">{t("notSupported")}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">{t("notSupportedHint")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Main Controls */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center gap-5">
          {/* Recording Indicator */}
          {(state === "recording" || state === "paused") && (
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                state === "recording" ? "bg-red-500 animate-pulse" : "bg-yellow-500"
              )} />
              <span className="text-3xl font-mono font-bold text-gray-900">{formatDuration(duration)}</span>
              {fileSize > 0 && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <HardDrive className="w-3 h-3" /> {formatSize(fileSize)}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {state === "idle" || state === "done" ? (
              <>
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer shadow-sm"
                >
                  <Circle className="w-4 h-4 fill-current" />
                  {t("startRecording")}
                </button>
                <button
                  onClick={takeScreenshot}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-all cursor-pointer shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  {t("screenshot")}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={state === "recording" ? pauseRecording : resumeRecording}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-yellow-500 text-white text-sm font-semibold hover:bg-yellow-600 transition-all cursor-pointer"
                >
                  {state === "recording" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {state === "recording" ? t("pause") : t("resume")}
                </button>
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-all cursor-pointer"
                >
                  <Square className="w-4 h-4" />
                  {t("stopRecording")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recorded Video Preview */}
      {recordedUrl && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">{t("preview")}</h3>
            <button
              onClick={downloadRecording}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-950 text-white text-xs font-medium hover:bg-gray-800 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {t("downloadVideo")} ({formatSize(fileSize)})
            </button>
          </div>
          <video src={recordedUrl} controls className="w-full rounded-lg border border-gray-200" />
        </div>
      )}

      {/* Screenshot Preview */}
      {screenshotUrl && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">{t("screenshotPreview")}</h3>
            <button
              onClick={downloadScreenshot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-950 text-white text-xs font-medium hover:bg-gray-800 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {t("downloadScreenshot")}
            </button>
          </div>
          <img src={screenshotUrl} alt="Screenshot" className="w-full rounded-lg border border-gray-200" />
        </div>
      )}

      <p className="text-[11px] text-gray-400 text-center">{t("browserNote")}</p>
    </div>
  );
}
