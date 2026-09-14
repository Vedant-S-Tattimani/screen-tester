"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  Camera, 
  CameraOff, 
  FlipHorizontal, 
  ShieldCheck, 
  ShieldAlert, 
  Play, 
  Square, 
  Download, 
  AlertTriangle
} from "lucide-react";
import { useTranslations } from "next-intl";

interface WebcamPatternProps {
  testId?: string;
}

type CameraState = 
  | "IDLE" 
  | "STARTING" 
  | "STREAMING" 
  | "DENIED" 
  | "NOT_FOUND" 
  | "IN_USE" 
  | "INSECURE" 
  | "UNSUPPORTED" 
  | "ERROR";

interface CameraDeviceInfo {
  deviceId: string;
  label: string;
}

interface TrackTelemetry {
  width: number | null;
  height: number | null;
  frameRate: number | null;
  facingMode: string | null;
  deviceId: string | null;
}

export function WebcamPattern({ testId = "webcam-test" }: WebcamPatternProps) {
    const t = useTranslations("Tests.WebcamPattern");
  useTestContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraState, setCameraState] = useState<CameraState>(() => {
    if (typeof window === "undefined") return "IDLE";
    if (window.isSecureContext === false && window.location.hostname !== "localhost") return "INSECURE";
    if (!navigator.mediaDevices?.getUserMedia) return "UNSUPPORTED";
    return "IDLE";
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [devices, setDevices] = useState<CameraDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [isMirrored, setIsMirrored] = useState<boolean>(true);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  const [telemetry, setTelemetry] = useState<TrackTelemetry>({
    width: null,
    height: null,
    frameRate: null,
    facingMode: null,
    deviceId: null
  });

  // Stop all media tracks
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState("IDLE");
    setTelemetry({
      width: null,
      height: null,
      frameRate: null,
      facingMode: null,
      deviceId: null
    });
  }, []);

  // Populate available video input devices
  const enumerateVideoDevices = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.enumerateDevices) {
      return;
    }
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices
        .filter(d => d.kind === "videoinput")
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${index + 1}`
        }));
      setDevices(videoInputs);
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch {
      // ignore
    }
  }, [selectedDeviceId]);

  // Initial check on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      enumerateVideoDevices();
    }, 0);

    // Listen to device changes (e.g. webcam plugged in or unplugged)
    const handleDeviceChange = () => {
      enumerateVideoDevices();
    };
    navigator.mediaDevices?.addEventListener("devicechange", handleDeviceChange);

    return () => {
      clearTimeout(timer);
      stopCamera();
      if (navigator.mediaDevices?.removeEventListener) {
        navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
      }
    };
  }, [enumerateVideoDevices, stopCamera]);

  // Start camera stream
  const startCamera = async (targetDeviceId?: string) => {
    stopCamera();
    setCameraState("STARTING");
    setErrorMessage("");

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraState("UNSUPPORTED");
      return;
    }

    const deviceConstraint = targetDeviceId || selectedDeviceId;
    const constraints: MediaStreamConstraints = {
      video: deviceConstraint ? { deviceId: { exact: deviceConstraint } } : true,
      audio: false // Strictly no audio / microphone
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Read browser-reported track settings
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const settings = videoTrack.getSettings();
        setTelemetry({
          width: settings.width || null,
          height: settings.height || null,
          frameRate: settings.frameRate ? Number(settings.frameRate.toFixed(1)) : null,
          facingMode: settings.facingMode || null,
          deviceId: settings.deviceId || null
        });

        // Track ended handler (e.g. unplugged)
        videoTrack.onended = () => {
          stopCamera();
        };
      }

      setCameraState("STREAMING");

      // Re-enumerate to get updated human-readable device labels now that permission is granted
      await enumerateVideoDevices();
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setCameraState("DENIED");
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        setCameraState("NOT_FOUND");
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        setCameraState("IN_USE");
      } else {
        setCameraState("ERROR");
        setErrorMessage(error.message || "Failed to initialize camera stream.");
      }
    }
  };

  // Switch camera device
  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    if (cameraState === "STREAMING" || cameraState === "STARTING") {
      startCamera(deviceId);
    }
  };

  // Local Snapshot (100% in-browser memory canvas capture)
  const handleTakeSnapshot = () => {
    const video = videoRef.current;
    if (!video || cameraState !== "STREAMING") return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setSnapshotUrl(dataUrl);
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top HUD / Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">{t("status")}</span>
            {cameraState === "STREAMING" && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("livePreview")}</span>
            )}
            {cameraState === "STARTING" && (
              <span className="text-blue-400 font-semibold animate-pulse">{t("requestingCamera")}</span>
            )}
            {cameraState === "IDLE" && (
              <span className="text-slate-400 font-medium">{t("readyStopped")}</span>
            )}
            {cameraState === "DENIED" && (
              <span className="text-rose-400 font-medium">{t("permissionDenied")}</span>
            )}
            {cameraState === "NOT_FOUND" && (
              <span className="text-rose-400 font-medium">{t("noCameraFound")}</span>
            )}
            {cameraState === "IN_USE" && (
              <span className="text-amber-400 font-medium">{t("cameraInUseBy")}</span>
            )}
            {cameraState === "INSECURE" && (
              <span className="text-rose-400 font-medium">{t("insecureContextRequiresHttps")}</span>
            )}
            {cameraState === "UNSUPPORTED" && (
              <span className="text-rose-400 font-medium">{t("getusermediaUnsupported")}</span>
            )}
            {cameraState === "ERROR" && (
              <span className="text-rose-400 font-medium">{t("error")}</span>
            )}
          </div>

          {/* Telemetry Display */}
          {telemetry.width && telemetry.height && (
            <>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-slate-400">
                <span className="uppercase text-[10px] tracking-wider">{t("resolution")}</span>
                <span className="text-slate-200 font-semibold">
                  {telemetry.width} {t("times")}{telemetry.height}
                </span>
              </div>
            </>
          )}

          {telemetry.frameRate && (
            <>
              <div className="h-4 w-px bg-slate-800 hidden md:block" />
              <div className="hidden md:flex items-center gap-1.5 font-mono text-slate-400">
                <span className="uppercase text-[10px] tracking-wider">{t("rate")}</span>
                <span className="text-slate-200">{telemetry.frameRate} {t("fps")}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Camera Device Dropdown */}
          {devices.length > 1 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => handleDeviceSelect(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-hidden focus:border-blue-500"
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label}
                </option>
              ))}
            </select>
          )}

          {/* Mirror Toggle */}
          <button
            type="button"
            onClick={() => setIsMirrored(m => !m)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isMirrored 
                ? "bg-blue-600/30 border-blue-500 text-blue-300" 
                : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
            }`}
            title={t("toggleHorizontalMirrorPreviewTitle")}
            aria-label={t("toggleHorizontalMirrorPreviewTitle")}
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Start / Stop */}
          {cameraState !== "STREAMING" && cameraState !== "STARTING" ? (
            <button
              type="button"
              onClick={() => startCamera()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t("startCamera")}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <Square className="w-3.5 h-3.5 text-rose-400" />
              <span>{t("stopCamera")}</span>
            </button>
          )}

          {/* Snapshot Button */}
          {cameraState === "STREAMING" && (
            <button
              type="button"
              onClick={handleTakeSnapshot}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t("snapshot")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Preview Surface */}
      <div className="relative flex-1 w-full min-h-[360px] sm:min-h-[480px] bg-black flex items-center justify-center overflow-hidden">
        {/* Live Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-contain transition-transform duration-100 ${
            isMirrored ? "scale-x-[-1]" : ""
          } ${cameraState === "STREAMING" ? "opacity-100" : "opacity-0 absolute"}`}
        />

        {/* Empty / Stopped State */}
        {cameraState === "IDLE" && (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-bold text-slate-200">{t("cameraInactive")}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("clickQuotStartCamera")}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("localProcessingBullZero")}</span>
            </div>
          </div>
        )}

        {/* Permission Denied State */}
        {cameraState === "DENIED" && (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <CameraOff className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-bold text-rose-300">{t("cameraPermissionDenied")}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("cameraAccessWasDenied")}</p>
          </div>
        )}

        {/* In Use State */}
        {cameraState === "IN_USE" && (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-bold text-amber-300">{t("cameraAlreadyInUse")}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("anotherProgramSuchAs")}</p>
          </div>
        )}

        {/* Not Found State */}
        {cameraState === "NOT_FOUND" && (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <CameraOff className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-bold text-rose-300">{t("noVideoInputDevice")}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("noWebcamHardwareWas")}</p>
          </div>
        )}

        {/* Error State */}
        {cameraState === "ERROR" && (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-bold text-rose-300">{t("unableToStartCamera")}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {errorMessage || "An unexpected error occurred while requesting the video stream."}
            </p>
          </div>
        )}

        {/* Local Snapshot Preview Modal */}
        {snapshotUrl && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-20">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-md w-full space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{t("localSnapshotFrame")}</span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{t("clientMemoryOnly")}</span>
                </span>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={snapshotUrl} 
                  alt="Webcam Local Snapshot" 
                  className="w-full h-auto object-contain max-h-[260px]"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <a
                  href={snapshotUrl}
                  download="screen-tester-webcam-snapshot.png"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("downloadSnapshot")}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSnapshotUrl(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                >
                  {t("close")}</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Technical Honesty & Privacy Disclaimer Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">{t("hardwarePrivacyNotice")}</strong> {t("videoFramesAreProcessed")}</div>
      </div>

      <TestControlBar testId={testId} title={t("webcamTestTitle")} />
    </div>
  );
}
