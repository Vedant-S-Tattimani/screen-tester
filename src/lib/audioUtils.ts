/**
 * Shared Audio Utilities for Screen Tester
 * Handles microphone streams, device enumeration, Web Audio API analysis,
 * and MediaRecorder format probing.
 * 
 * 100% Client-Side in browser memory.
 */

export interface AudioInputDevice {
  deviceId: string;
  label: string;
}

export interface AudioAnalyzerResult {
  /** Root Mean Square input amplitude normalized 0 - 100 */
  level: number;
  /** Peak level hold 0 - 100 */
  peak: number;
  /** Whether the signal is below ambient noise floor threshold (< 1.5%) */
  isSilence: boolean;
  /** Whether digital PCM amplitude reaches near-clipping threshold (> 96%) */
  isClipping: boolean;
}

export interface AudioAnalyzer {
  getAnalysis: () => AudioAnalyzerResult;
  getWaveform: (outputArray: Uint8Array<ArrayBuffer>) => void;
  cleanup: () => void;
  audioContext: AudioContext;
  sourceNode: MediaStreamAudioSourceNode;
  analyserNode: AnalyserNode;
  resume: () => Promise<void>;
}

export interface SupportedRecordingFormat {
  mimeType: string;
  extension: string;
  label: string;
}

/**
 * Request an audio-only user media stream.
 * Never requests video.
 */
export async function getMicrophoneStream(deviceId?: string): Promise<MediaStream> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw new Error("MEDIA_DEVICES_UNSUPPORTED");
  }

  const audioConstraints: MediaTrackConstraints = deviceId 
    ? { deviceId: { ideal: deviceId } } 
    : {};

  const constraints: MediaStreamConstraints = {
    audio: {
      ...audioConstraints,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    },
    video: false
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  const tracks = stream.getAudioTracks();
  if (tracks.length === 0) {
    throw new Error("NO_AUDIO_TRACK");
  }
  tracks.forEach(track => {
    track.enabled = true;
  });

  return stream;
}

/**
 * Safely stop all tracks on a MediaStream.
 */
export function stopMediaStream(stream: MediaStream | null): void {
  if (!stream) return;
  try {
    stream.getTracks().forEach(track => {
      try {
        track.enabled = false;
        track.stop();
      } catch {
        // ignore track stop error
      }
    });
  } catch {
    // ignore
  }
}

/**
 * Enumerate connected audio input (microphone) devices.
 */
export async function enumerateAudioInputDevices(): Promise<AudioInputDevice[]> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.enumerateDevices) {
    return [];
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices
      .filter(d => d.kind === "audioinput")
      .map((d, index) => ({
        deviceId: d.deviceId,
        label: d.label || `Microphone ${index + 1}`
      }));
  } catch {
    return [];
  }
}

/**
 * Set up a Web Audio API AnalyserNode on an active MediaStream.
 */
export function createAudioAnalyzer(
  stream: MediaStream, 
  existingCtx?: AudioContext | null
): AudioAnalyzer | null {
  if (typeof window === "undefined") return null;

  const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtxClass) return null;

  try {
    const ctx = existingCtx && existingCtx.state !== "closed" 
      ? existingCtx 
      : new AudioCtxClass();

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.6; // Responsive yet smooth
    source.connect(analyser);

    const timeDomainData = new Uint8Array(analyser.frequencyBinCount);
    let peakHold = 0;
    let peakHoldDecayTimer = 0;

    const getAnalysis = (): AudioAnalyzerResult => {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      analyser.getByteTimeDomainData(timeDomainData);

      // Compute Root Mean Square (RMS) of PCM buffer
      let sumSquares = 0;
      let maxSample = 0;

      for (let i = 0; i < timeDomainData.length; i++) {
        // Normalize 0..255 byte to -1.0 .. +1.0
        const normalized = (timeDomainData[i] - 128) / 128;
        sumSquares += normalized * normalized;
        const absVal = Math.abs(normalized);
        if (absVal > maxSample) {
          maxSample = absVal;
        }
      }

      const rms = Math.sqrt(sumSquares / timeDomainData.length);
      // Amplify linear scale for intuitive user observation meter (speech is often low-level)
      const scaledLevel = Math.min(100, Math.round(rms * 220));

      // Peak hold logic with natural decay
      if (scaledLevel > peakHold) {
        peakHold = scaledLevel;
        peakHoldDecayTimer = 0;
      } else {
        peakHoldDecayTimer++;
        if (peakHoldDecayTimer > 20) {
          peakHold = Math.max(0, peakHold - 1.5);
        }
      }

      return {
        level: scaledLevel,
        peak: Math.round(peakHold),
        isSilence: scaledLevel < 2,
        isClipping: maxSample >= 0.98 || scaledLevel >= 95
      };
    };

    const getWaveform = (outputArray: Uint8Array<ArrayBuffer>): void => {
      analyser.getByteTimeDomainData(outputArray);
    };

    const resume = async (): Promise<void> => {
      if (ctx.state === "suspended") {
        await ctx.resume().catch(() => {});
      }
    };

    const cleanup = () => {
      try {
        source.disconnect();
      } catch {}
      try {
        analyser.disconnect();
      } catch {}
      if (!existingCtx && ctx.state !== "closed") {
        try {
          ctx.close().catch(() => {});
        } catch {}
      }
    };

    return {
      getAnalysis,
      getWaveform,
      cleanup,
      audioContext: ctx,
      sourceNode: source,
      analyserNode: analyser,
      resume
    };
  } catch {
    return null;
  }
}

/**
 * Probe supported MediaRecorder audio MIME types in priority order.
 */
export function getSupportedRecordingMimeTypes(): SupportedRecordingFormat[] {
  if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
    return [];
  }

  const candidateFormats: SupportedRecordingFormat[] = [
    { mimeType: "audio/webm;codecs=opus", extension: "webm", label: "WebM (Opus)" },
    { mimeType: "audio/webm", extension: "webm", label: "WebM (Standard)" },
    { mimeType: "audio/ogg;codecs=opus", extension: "ogg", label: "Ogg (Opus)" },
    { mimeType: "audio/mp4", extension: "mp4", label: "MP4 Audio" },
    { mimeType: "audio/aac", extension: "aac", label: "AAC Audio" }
  ];

  return candidateFormats.filter(format => {
    try {
      return MediaRecorder.isTypeSupported(format.mimeType);
    } catch {
      return false;
    }
  });
}

/**
 * Format recording seconds to MM:SS string.
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Generate a clean, anonymous download filename for a recording.
 */
export function generateRecordingFilename(extension: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `screen-tester-microphone-test-${timestamp}.${extension}`;
}
