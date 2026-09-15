/**
 * Smart Device Detection Engine
 * 
 * Probes browser APIs for hardware capabilities and maps them
 * to recommended screen tests.
 */

import {
  supportsHDR,
  supportsP3,
  supportsRec2020,
  supportsTouch,
  getDevicePixelRatio,
  getWebGLDiagnostics,
  supportsMediaDevices,
  supportsVibration,
} from "./browserCapabilities";

// ─── Types ───────────────────────────────────────────────────

export interface DetectedCapability {
  id: string;
  label: string;
  value: string;
  icon: "monitor" | "refresh" | "hdr" | "palette" | "touch" | "gpu" | "battery" | "sensor" | "camera" | "audio" | "gamepad" | "network" | "resolution" | "oled";
  recommendedTests: RecommendedTest[];
}

export interface RecommendedTest {
  id: string;
  title: string;
  href: string;
  reason: string;
}

export interface DeviceProfile {
  capabilities: DetectedCapability[];
  summary: string;
  deviceType: "desktop" | "laptop" | "tablet" | "mobile" | "unknown";
}

// ─── Refresh Rate Detection ──────────────────────────────────

async function detectRefreshRate(): Promise<number> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(60);
      return;
    }

    const timestamps: number[] = [];
    let frameId: number;
    const maxSamples = 30;

    function tick(ts: number) {
      timestamps.push(ts);
      if (timestamps.length < maxSamples) {
        frameId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frameId);
        // Calculate average frame interval
        const intervals: number[] = [];
        for (let i = 1; i < timestamps.length; i++) {
          intervals.push(timestamps[i] - timestamps[i - 1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const hz = Math.round(1000 / avgInterval);

        // Snap to common refresh rates
        const commonRates = [30, 48, 60, 72, 75, 90, 100, 120, 144, 165, 170, 175, 180, 200, 240, 300, 360, 480];
        let closest = hz;
        let minDiff = Infinity;
        for (const rate of commonRates) {
          const diff = Math.abs(hz - rate);
          if (diff < minDiff) {
            minDiff = diff;
            closest = rate;
          }
        }

        resolve(minDiff <= 5 ? closest : hz);
      }
    }

    frameId = requestAnimationFrame(tick);
    // Timeout fallback
    setTimeout(() => {
      cancelAnimationFrame(frameId);
      resolve(60);
    }, 3000);
  });
}

// ─── Screen Resolution Info ──────────────────────────────────

function getScreenInfo() {
  if (typeof window === "undefined") {
    return { width: 1920, height: 1080, colorDepth: 24 };
  }
  return {
    width: window.screen.width,
    height: window.screen.height,
    colorDepth: window.screen.colorDepth,
  };
}

// ─── Device Type Detection ───────────────────────────────────

function detectDeviceType(): "desktop" | "laptop" | "tablet" | "mobile" | "unknown" {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();
  const hasTouch = supportsTouch();
  const width = window.screen.width;

  if (/ipad|tablet/i.test(ua) || (hasTouch && width >= 768 && width <= 1366)) return "tablet";
  if (/iphone|ipod|android.*mobile|windows phone/i.test(ua) || (hasTouch && width < 768)) return "mobile";
  if (/macbook|laptop/i.test(ua) || (typeof navigator !== "undefined" && "getBattery" in navigator)) return "laptop";
  return "desktop";
}

// ─── Battery Detection ───────────────────────────────────────

async function checkBattery(): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  try {
    if ("getBattery" in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const battery = await (navigator as any).getBattery();
      return !!battery;
    }
  } catch { /* ignore */ }
  return false;
}

// ─── Gamepad Detection ───────────────────────────────────────

function checkGamepad(): boolean {
  if (typeof navigator === "undefined") return false;
  try {
    const gamepads = navigator.getGamepads?.();
    if (gamepads) {
      return Array.from(gamepads).some((g) => g !== null);
    }
  } catch { /* ignore */ }
  return false;
}

// ─── OLED Hint Detection ─────────────────────────────────────

function detectOLEDHints(): boolean {
  if (typeof window === "undefined") return false;

  // Check for very high contrast ratio support
  const hasHDR = supportsHDR();
  const hasP3 = supportsP3();
  const dpr = getDevicePixelRatio();
  const ua = navigator.userAgent.toLowerCase();

  // OLED phones: iPhone X+, Samsung Galaxy S/Note, Pixel
  const oledPhonePatterns = /iphone\s*(1[0-9]|x|xs|11|12|13|14|15|16)/i;
  const oledAndroid = /galaxy\s*(s[2-9]|s1[0-9]|s2[0-9]|note|z\s*f)/i;
  const pixel = /pixel\s*[2-9]/i;

  const isOLEDPhone = oledPhonePatterns.test(ua) || oledAndroid.test(ua) || pixel.test(ua);

  return isOLEDPhone || (hasHDR && hasP3 && dpr >= 2);
}

// ─── Main Detection Function ─────────────────────────────────

export async function detectDeviceCapabilities(): Promise<DeviceProfile> {
  const capabilities: DetectedCapability[] = [];
  const screen = getScreenInfo();
  const dpr = getDevicePixelRatio();
  const deviceType = detectDeviceType();
  const refreshRate = await detectRefreshRate();
  const webgl = getWebGLDiagnostics();
  const hasTouch = supportsTouch();
  const hasHDR = supportsHDR();
  const hasP3 = supportsP3();
  const hasRec2020 = supportsRec2020();
  const hasBattery = await checkBattery();
  const hasGamepad = checkGamepad();
  const isOLED = detectOLEDHints();
  const hasMediaDevices = supportsMediaDevices();
  const hasVibration = supportsVibration();

  // 1. Resolution
  const resLabel =
    screen.width >= 3840 ? "4K UHD" :
    screen.width >= 2560 ? "QHD / 1440p" :
    screen.width >= 1920 ? "Full HD / 1080p" :
    screen.width >= 1366 ? "HD+" :
    `${screen.width}×${screen.height}`;

  capabilities.push({
    id: "resolution",
    label: "Resolution",
    value: `${screen.width}×${screen.height} (${resLabel})`,
    icon: "resolution",
    recommendedTests: [
      { id: "resolution-checker", title: "Resolution & DPR Checker", href: "/tests/resolution-checker", reason: "Verify your detected resolution" },
      { id: "sharpness-test", title: "Sharpness Test", href: "/tests/sharpness-test", reason: "Test edge detail at your native resolution" },
      ...(dpr >= 2 ? [
        { id: "subpixel-layout-test", title: "Subpixel Layout Test", href: "/tests/subpixel-layout-test", reason: `High DPR (${dpr}x) — check subpixel rendering` },
        { id: "text-clarity-test", title: "Text Clarity Test", href: "/tests/text-clarity-test", reason: "Retina-class display — verify text rendering" },
      ] : [
        { id: "dpi-calculator", title: "DPI / PPI Calculator", href: "/tools/dpi-calculator", reason: "Calculate your display's pixel density" },
      ]),
    ],
  });

  // 2. Refresh Rate
  if (refreshRate > 60) {
    capabilities.push({
      id: "high-refresh",
      label: "High Refresh Rate",
      value: `${refreshRate} Hz`,
      icon: "refresh",
      recommendedTests: [
        { id: "refresh-rate-test", title: "Refresh Rate Test", href: "/tests/refresh-rate-test", reason: `Verify ${refreshRate}Hz is active` },
        { id: "ghosting-test", title: "Ghosting Test", href: "/tests/ghosting-test", reason: "High refresh — check for ghosting artifacts" },
        { id: "motion-blur-test", title: "Motion Blur Test", href: "/tests/motion-blur-test", reason: "Test motion clarity at high refresh" },
        { id: "vrr-test", title: "VRR / FreeSync Test", href: "/tests/vrr-test", reason: "Check variable refresh rate support" },
        { id: "gtg-response-time-test", title: "GTG Response Time", href: "/tests/gtg-response-time-test", reason: "Measure pixel response time" },
      ],
    });
  } else {
    capabilities.push({
      id: "standard-refresh",
      label: "Refresh Rate",
      value: `${refreshRate} Hz`,
      icon: "refresh",
      recommendedTests: [
        { id: "refresh-rate-test", title: "Refresh Rate Test", href: "/tests/refresh-rate-test", reason: "Confirm your display refresh rate" },
        { id: "screen-flicker-test", title: "Flicker Test", href: "/tests/screen-flicker-test", reason: "Check for PWM flicker at 60Hz" },
      ],
    });
  }

  // 3. HDR Support
  if (hasHDR) {
    capabilities.push({
      id: "hdr",
      label: "HDR Display",
      value: "HDR Supported",
      icon: "hdr",
      recommendedTests: [
        { id: "hdr-capability-test", title: "HDR Capability Test", href: "/tests/hdr-capability-test", reason: "Verify HDR tone mapping" },
        { id: "hdr-test", title: "HDR Visual Test", href: "/tests/hdr-test", reason: "HDR color and brightness evaluation" },
        { id: "hdr-peak-brightness-test", title: "HDR Peak Brightness", href: "/tests/hdr-peak-brightness-test", reason: "Measure HDR peak luminance" },
      ],
    });
  }

  // 4. Wide Color Gamut
  if (hasP3 || hasRec2020) {
    capabilities.push({
      id: "wide-gamut",
      label: "Wide Color Gamut",
      value: hasRec2020 ? "Rec. 2020" : "Display P3",
      icon: "palette",
      recommendedTests: [
        { id: "color-gamut-test", title: "Color Gamut Test", href: "/tests/color-gamut-test", reason: `${hasRec2020 ? "Rec.2020" : "P3"} gamut — test extended colors` },
        { id: "color-accuracy-test", title: "Color Accuracy Test", href: "/tests/color-accuracy-test", reason: "Verify color accuracy across gamut" },
        { id: "color-temperature-test", title: "Color Temperature Test", href: "/tests/color-temperature-test", reason: "Check white point calibration" },
        { id: "saturation-test", title: "Saturation Test", href: "/tests/saturation-test", reason: "Evaluate color saturation rendering" },
      ],
    });
  }

  // 5. High Color Depth
  if (screen.colorDepth > 24) {
    capabilities.push({
      id: "deep-color",
      label: "Deep Color",
      value: `${screen.colorDepth}-bit`,
      icon: "palette",
      recommendedTests: [
        { id: "color-banding-test", title: "Color Banding Test", href: "/tests/color-banding-test", reason: `${screen.colorDepth}-bit color — check for banding` },
        { id: "gradient-banding-test", title: "Gradient Banding Test", href: "/tests/gradient-banding-test", reason: "Deep color should show smooth gradients" },
        { id: "grayscale-test", title: "Grayscale Test", href: "/tests/grayscale-test", reason: "Verify smooth grayscale transitions" },
      ],
    });
  }

  // 6. OLED Hints
  if (isOLED) {
    capabilities.push({
      id: "oled",
      label: "OLED Display (Likely)",
      value: "AMOLED / OLED",
      icon: "oled",
      recommendedTests: [
        { id: "oled-abl-test", title: "OLED ABL Test", href: "/tests/oled-abl-test", reason: "Test auto-brightness limiter behavior" },
        { id: "burn-in-test", title: "Burn-In Test", href: "/tests/burn-in-test", reason: "Check for OLED burn-in / image retention" },
        { id: "black-level-test", title: "Black Level Test", href: "/tests/black-level-test", reason: "OLED should achieve perfect blacks" },
        { id: "near-black-test", title: "Near-Black Test", href: "/tests/near-black-test", reason: "Test dark shadow detail on OLED" },
      ],
    });
  }

  // 7. Touch Support
  if (hasTouch) {
    const maxPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints : 0;
    capabilities.push({
      id: "touch",
      label: "Touch Display",
      value: maxPoints > 1 ? `${maxPoints}-point Multi-Touch` : "Touch Supported",
      icon: "touch",
      recommendedTests: [
        { id: "touch-screen-test", title: "Touch Screen Test", href: "/tests/touch-screen-test", reason: "Verify touch accuracy and response" },
        ...(maxPoints > 1 ? [
          { id: "multi-touch-test", title: "Multi-Touch Test", href: "/tests/multi-touch-test", reason: `Test all ${maxPoints} simultaneous touch points` },
        ] : []),
        { id: "reaction-time-test", title: "Reaction Time Test", href: "/tests/reaction-time-test", reason: "Measure touch input latency" },
      ],
    });
  }

  // 8. GPU
  if (webgl.supported && webgl.renderer !== "Generic / Protected") {
    const gpuName = webgl.renderer.length > 50 ? webgl.renderer.substring(0, 47) + "..." : webgl.renderer;
    capabilities.push({
      id: "gpu",
      label: "GPU Detected",
      value: gpuName,
      icon: "gpu",
      recommendedTests: [
        { id: "gpu-benchmark-test", title: "GPU Benchmark Test", href: "/tests/gpu-benchmark-test", reason: "Benchmark your GPU's rendering performance" },
        { id: "screen-tearing-test", title: "Screen Tearing Test", href: "/tests/screen-tearing-test", reason: "Check for GPU/display sync issues" },
      ],
    });
  }

  // 9. Battery
  if (hasBattery) {
    capabilities.push({
      id: "battery",
      label: "Battery Powered",
      value: "Battery Detected",
      icon: "battery",
      recommendedTests: [
        { id: "battery-test", title: "Battery Health & Power Info", href: "/tests/battery-test", reason: "Monitor battery charge and health" },
        { id: "pwm-flicker-test", title: "PWM Flicker Test", href: "/tests/pwm-flicker-test", reason: "Mobile displays may use PWM dimming" },
      ],
    });
  }

  // 10. Media Devices (Webcam / Mic)
  if (hasMediaDevices) {
    capabilities.push({
      id: "media",
      label: "Camera & Audio",
      value: "Media Devices Available",
      icon: "camera",
      recommendedTests: [
        { id: "webcam-test", title: "Webcam Test", href: "/tests/webcam-test", reason: "Test your camera feed and resolution" },
        { id: "microphone-test", title: "Microphone Test", href: "/tests/microphone-test", reason: "Check microphone input levels" },
        { id: "speaker-test", title: "Speaker Test", href: "/tests/speaker-test", reason: "Verify audio output quality" },
      ],
    });
  }

  // 11. Gamepad
  if (hasGamepad) {
    capabilities.push({
      id: "gamepad",
      label: "Gamepad Connected",
      value: "Controller Detected",
      icon: "gamepad",
      recommendedTests: [
        { id: "gamepad-test", title: "Gamepad Test", href: "/tests/gamepad-test", reason: "Test all buttons, axes, and triggers" },
        { id: "input-lag-test", title: "Input Lag Test", href: "/tests/input-lag-test", reason: "Measure controller-to-screen latency" },
      ],
    });
  }

  // 12. Vibration (mobile)
  if (hasVibration) {
    capabilities.push({
      id: "vibration",
      label: "Haptic Feedback",
      value: "Vibration Motor",
      icon: "sensor",
      recommendedTests: [
        { id: "vibration-test", title: "Vibration Test", href: "/tests/vibration-test", reason: "Test haptic vibration patterns" },
      ],
    });
  }

  // Build summary
  const summaryParts: string[] = [];
  summaryParts.push(resLabel);
  summaryParts.push(`${refreshRate}Hz`);
  if (hasHDR) summaryParts.push("HDR");
  if (hasP3 || hasRec2020) summaryParts.push(hasRec2020 ? "Rec.2020" : "P3");
  if (isOLED) summaryParts.push("OLED");
  if (hasTouch) summaryParts.push("Touch");

  return {
    capabilities,
    summary: summaryParts.join(" · "),
    deviceType,
  };
}
