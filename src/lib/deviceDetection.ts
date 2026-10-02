/**
 * Smart Device Detection Engine
 * 
 * Probes browser APIs for hardware capabilities and maps them
 * to recommended screen tests with full internationalization support.
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

export interface RecommendedTest {
  id: string;
  title: string;
  href: string;
  reason: string;
  reasonKey?: string;
  reasonParams?: Record<string, string | number>;
}

export interface DetectedCapability {
  id: string;
  label: string;
  labelKey?: string;
  value: string;
  icon: "monitor" | "refresh" | "hdr" | "palette" | "touch" | "gpu" | "battery" | "sensor" | "camera" | "audio" | "gamepad" | "network" | "resolution" | "oled";
  recommendedTests: RecommendedTest[];
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
        const intervals: number[] = [];
        for (let i = 1; i < timestamps.length; i++) {
          intervals.push(timestamps[i] - timestamps[i - 1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const hz = Math.round(1000 / avgInterval);

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

// ─── Device Type Detection ───────────────────────────────────

async function detectDeviceType(hasBatteryHint: boolean): Promise<"desktop" | "laptop" | "tablet" | "mobile" | "unknown"> {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();
  const hasTouch = supportsTouch();
  const width = window.screen.width;
  const dpr = getDevicePixelRatio();

  if (/ipad|tablet/i.test(ua) || (hasTouch && width >= 768 && width <= 1366 && !hasBatteryHint)) {
    return "tablet";
  }
  if (/iphone|ipod|android.*mobile|windows phone/i.test(ua) || (hasTouch && width < 768)) {
    return "mobile";
  }

  // Check battery: if device has a battery and isn't mobile/tablet, it's a laptop
  if (hasBatteryHint) {
    return "laptop";
  }

  if (/macbook|laptop|thinkpad/i.test(ua)) {
    return "laptop";
  }

  // Heuristic: portable resolution with elevated scaling
  if (width <= 1920 && dpr >= 1.25 && hasTouch) {
    return "laptop";
  }

  return "desktop";
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

  const hasHDR = supportsHDR();
  const hasP3 = supportsP3();
  const dpr = getDevicePixelRatio();
  const ua = navigator.userAgent.toLowerCase();

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
  const hasBattery = await checkBattery();
  const deviceType = await detectDeviceType(hasBattery);
  const refreshRate = await detectRefreshRate();
  const webgl = getWebGLDiagnostics();
  const hasTouch = supportsTouch();
  const hasHDR = supportsHDR();
  const hasP3 = supportsP3();
  const hasRec2020 = supportsRec2020();
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
    labelKey: "capabilities.resolution",
    value: `${screen.width}×${screen.height} (${resLabel})`,
    icon: "resolution",
    recommendedTests: [
      { id: "resolution-checker", title: "Resolution & DPR Checker", href: "/tests/resolution-checker", reason: "Verify your detected resolution", reasonKey: "reasons.verifyResolution" },
      { id: "sharpness-test", title: "Sharpness Test", href: "/tests/sharpness-test", reason: "Test edge detail at your native resolution", reasonKey: "reasons.testSharpness" },
      ...(dpr >= 2 ? [
        { id: "subpixel-layout-test", title: "Subpixel Layout Test", href: "/tests/subpixel-layout-test", reason: `High DPR (${dpr}x) — check subpixel rendering`, reasonKey: "reasons.checkSubpixel", reasonParams: { dpr } },
        { id: "text-clarity-test", title: "Text Clarity Test", href: "/tests/text-clarity-test", reason: "Retina-class display — verify text rendering", reasonKey: "reasons.retinaText" },
      ] : [
        { id: "dpi-calculator", title: "DPI / PPI Calculator", href: "/tools/dpi-calculator", reason: "Calculate your display's pixel density", reasonKey: "reasons.calcDpi" },
      ]),
    ],
  });

  // 2. Pixel Integrity & Uniformity (Universal)
  capabilities.push({
    id: "pixel-integrity",
    label: "Pixel Integrity",
    labelKey: "capabilities.pixelIntegrity",
    value: "Subpixel Defect Screening",
    icon: "monitor",
    recommendedTests: [
      { id: "dead-pixel-test", title: "Dead Pixel Test", href: "/tests/dead-pixel-test", reason: "Inspect your display for stuck or dead subpixels", reasonKey: "reasons.deadPixelCheck" },
      { id: "stuck-pixel-fixer", title: "Stuck Pixel Fixer", href: "/tests/stuck-pixel-fixer", reason: "Exercise and revive stuck pixels with rapid cycling", reasonKey: "reasons.stuckPixelCycle" },
      { id: "uniformity-test", title: "Uniformity Test", href: "/tests/uniformity-test", reason: "Check panel brightness and color consistency", reasonKey: "reasons.uniformityCheck" },
    ],
  });

  // 3. Refresh Rate
  if (refreshRate > 60) {
    capabilities.push({
      id: "high-refresh",
      label: "High Refresh Rate",
      labelKey: "capabilities.highRefresh",
      value: `${refreshRate} Hz`,
      icon: "refresh",
      recommendedTests: [
        { id: "refresh-rate-test", title: "Refresh Rate Test", href: "/tests/refresh-rate-test", reason: `Verify ${refreshRate}Hz is active`, reasonKey: "reasons.verifyHz", reasonParams: { hz: refreshRate } },
        { id: "ghosting-test", title: "Ghosting Test", href: "/tests/ghosting-test", reason: "High refresh — check for ghosting artifacts", reasonKey: "reasons.ghostingHz" },
        { id: "motion-blur-test", title: "Motion Blur Test", href: "/tests/motion-blur-test", reason: "Test motion clarity at high refresh", reasonKey: "reasons.motionClarity" },
        { id: "vrr-test", title: "VRR / FreeSync Test", href: "/tests/vrr-test", reason: "Check variable refresh rate support", reasonKey: "reasons.vrrCheck" },
        { id: "gtg-response-time-test", title: "GTG Response Time", href: "/tests/gtg-response-time-test", reason: "Measure pixel response time", reasonKey: "reasons.gtgResponse" },
      ],
    });
  } else {
    capabilities.push({
      id: "standard-refresh",
      label: "Refresh Rate",
      labelKey: "capabilities.standardRefresh",
      value: `${refreshRate} Hz`,
      icon: "refresh",
      recommendedTests: [
        { id: "refresh-rate-test", title: "Refresh Rate Test", href: "/tests/refresh-rate-test", reason: "Confirm your display refresh rate", reasonKey: "reasons.confirmHz" },
        { id: "screen-flicker-test", title: "Flicker Test", href: "/tests/screen-flicker-test", reason: "Check for PWM flicker at 60Hz", reasonKey: "reasons.pwmFlicker60" },
      ],
    });
  }

  // 4. HDR Support
  if (hasHDR) {
    capabilities.push({
      id: "hdr",
      label: "HDR Display",
      labelKey: "capabilities.hdr",
      value: "HDR Supported",
      icon: "hdr",
      recommendedTests: [
        { id: "hdr-capability-test", title: "HDR Capability Test", href: "/tests/hdr-capability-test", reason: "Verify HDR tone mapping", reasonKey: "reasons.hdrToneMapping" },
        { id: "hdr-test", title: "HDR Visual Test", href: "/tests/hdr-test", reason: "HDR color and brightness evaluation", reasonKey: "reasons.hdrVisual" },
        { id: "hdr-peak-brightness-test", title: "HDR Peak Brightness", href: "/tests/hdr-peak-brightness-test", reason: "Measure HDR peak luminance", reasonKey: "reasons.hdrPeak" },
      ],
    });
  }

  // 5. Wide Color Gamut
  if (hasP3 || hasRec2020) {
    const gamutName = hasRec2020 ? "Rec. 2020" : "Display P3";
    capabilities.push({
      id: "wide-gamut",
      label: "Wide Color Gamut",
      labelKey: "capabilities.wideGamut",
      value: gamutName,
      icon: "palette",
      recommendedTests: [
        { id: "color-gamut-test", title: "Color Gamut Test", href: "/tests/color-gamut-test", reason: `${gamutName} gamut — test extended colors`, reasonKey: "reasons.gamutExtended", reasonParams: { gamut: gamutName } },
        { id: "color-accuracy-test", title: "Color Accuracy Test", href: "/tests/color-accuracy-test", reason: "Verify color accuracy across gamut", reasonKey: "reasons.colorAccuracy" },
        { id: "color-temperature-test", title: "Color Temperature Test", href: "/tests/color-temperature-test", reason: "Check white point calibration", reasonKey: "reasons.colorTemp" },
        { id: "saturation-test", title: "Saturation Test", href: "/tests/saturation-test", reason: "Evaluate color saturation rendering", reasonKey: "reasons.colorSat" },
      ],
    });
  }

  // 6. High Color Depth
  if (screen.colorDepth > 24) {
    capabilities.push({
      id: "deep-color",
      label: "Deep Color",
      labelKey: "capabilities.deepColor",
      value: `${screen.colorDepth}-bit`,
      icon: "palette",
      recommendedTests: [
        { id: "color-banding-test", title: "Color Banding Test", href: "/tests/color-banding-test", reason: `${screen.colorDepth}-bit color — check for banding`, reasonKey: "reasons.colorBanding", reasonParams: { depth: screen.colorDepth } },
        { id: "gradient-banding-test", title: "Gradient Banding Test", href: "/tests/gradient-banding-test", reason: "Deep color should show smooth gradients", reasonKey: "reasons.gradientBanding" },
        { id: "grayscale-test", title: "Grayscale Test", href: "/tests/grayscale-test", reason: "Verify smooth grayscale transitions", reasonKey: "reasons.smoothGrayscale" },
      ],
    });
  }

  // 7. OLED Hints
  if (isOLED) {
    capabilities.push({
      id: "oled",
      label: "OLED Display (Likely)",
      labelKey: "capabilities.oled",
      value: "AMOLED / OLED",
      icon: "oled",
      recommendedTests: [
        { id: "oled-abl-test", title: "OLED ABL Test", href: "/tests/oled-abl-test", reason: "Test auto-brightness limiter behavior", reasonKey: "reasons.oledAbl" },
        { id: "burn-in-test", title: "Burn-In Test", href: "/tests/burn-in-test", reason: "Check for OLED burn-in / image retention", reasonKey: "reasons.oledBurnIn" },
        { id: "black-level-test", title: "Black Level Test", href: "/tests/black-level-test", reason: "OLED should achieve perfect blacks", reasonKey: "reasons.oledBlack" },
        { id: "near-black-test", title: "Near-Black Test", href: "/tests/near-black-test", reason: "Test dark shadow detail on OLED", reasonKey: "reasons.oledNearBlack" },
      ],
    });
  }

  // 8. Touch Support
  if (hasTouch) {
    const maxPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints : 0;
    capabilities.push({
      id: "touch",
      label: "Touch Display",
      labelKey: "capabilities.touch",
      value: maxPoints > 1 ? `${maxPoints}-point Multi-Touch` : "Touch Supported",
      icon: "touch",
      recommendedTests: [
        { id: "touch-screen-test", title: "Touch Screen Test", href: "/tests/touch-screen-test", reason: "Verify touch accuracy and response", reasonKey: "reasons.touchAccuracy" },
        ...(maxPoints > 1 ? [
          { id: "multi-touch-test", title: "Multi-Touch Test", href: "/tests/multi-touch-test", reason: `Test all ${maxPoints} simultaneous touch points`, reasonKey: "reasons.multiTouchPoints", reasonParams: { points: maxPoints } },
        ] : []),
        { id: "reaction-time-test", title: "Reaction Time Test", href: "/tests/reaction-time-test", reason: "Measure touch input latency", reasonKey: "reasons.touchLatency" },
      ],
    });
  }

  // 9. GPU
  if (webgl.supported && webgl.renderer !== "Generic / Protected") {
    const gpuName = webgl.renderer.length > 50 ? webgl.renderer.substring(0, 47) + "..." : webgl.renderer;
    capabilities.push({
      id: "gpu",
      label: "GPU Detected",
      labelKey: "capabilities.gpu",
      value: gpuName,
      icon: "gpu",
      recommendedTests: [
        { id: "gpu-benchmark-test", title: "GPU Benchmark Test", href: "/tests/gpu-benchmark-test", reason: "Benchmark your GPU's rendering performance", reasonKey: "reasons.gpuBenchmark" },
        { id: "screen-tearing-test", title: "Screen Tearing Test", href: "/tests/screen-tearing-test", reason: "Check for GPU/display sync issues", reasonKey: "reasons.screenTearing" },
      ],
    });
  }

  // 10. Battery
  if (hasBattery) {
    capabilities.push({
      id: "battery",
      label: "Battery Powered",
      labelKey: "capabilities.battery",
      value: "Battery Detected",
      icon: "battery",
      recommendedTests: [
        { id: "battery-test", title: "Battery Health & Power Info", href: "/tests/battery-test", reason: "Monitor battery charge and health", reasonKey: "reasons.batteryHealth" },
        { id: "pwm-flicker-test", title: "PWM Flicker Test", href: "/tests/pwm-flicker-test", reason: "Mobile displays may use PWM dimming", reasonKey: "reasons.mobileDimming" },
      ],
    });
  }

  // 11. Media Devices (Webcam / Mic / Audio)
  if (hasMediaDevices) {
    capabilities.push({
      id: "media",
      label: "Camera & Audio",
      labelKey: "capabilities.media",
      value: "Media Devices Available",
      icon: "camera",
      recommendedTests: [
        { id: "webcam-test", title: "Webcam Test", href: "/tests/webcam-test", reason: "Test your camera feed and resolution", reasonKey: "reasons.webcamFeed" },
        { id: "microphone-test", title: "Microphone Test", href: "/tests/microphone-test", reason: "Check microphone input levels", reasonKey: "reasons.micLevels" },
        { id: "speaker-test", title: "Speaker Test", href: "/tests/speaker-test", reason: "Verify audio output quality", reasonKey: "reasons.speakerQuality" },
        { id: "audio-latency-test", title: "Audio Latency Test", href: "/tests/audio-latency-test", reason: "Measure Web Audio playback latency", reasonKey: "reasons.audioLatency" },
        { id: "audio-sync-test", title: "Audio Sync Test", href: "/tests/audio-sync-test", reason: "Verify audio and video lip-sync", reasonKey: "reasons.audioSync" },
      ],
    });
  }

  // 12. Network Connectivity (Online & Speed)
  if (typeof navigator !== "undefined" && "onLine" in navigator) {
    const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number } }).connection;
    const netDesc = conn?.effectiveType ? `${conn.effectiveType.toUpperCase()} Connected` : "Online";
    capabilities.push({
      id: "network",
      label: "Network Connection",
      labelKey: "capabilities.network",
      value: netDesc,
      icon: "network",
      recommendedTests: [
        { id: "network-speed-test", title: "Internet Speed Test", href: "/tests/network-speed-test", reason: "Test your actual bandwidth, ping & jitter", reasonKey: "reasons.networkSpeed" },
      ],
    });
  }

  // 13. Gamepad
  if (hasGamepad) {
    capabilities.push({
      id: "gamepad",
      label: "Gamepad Connected",
      labelKey: "capabilities.gamepad",
      value: "Controller Detected",
      icon: "gamepad",
      recommendedTests: [
        { id: "gamepad-test", title: "Gamepad Test", href: "/tests/gamepad-test", reason: "Test all buttons, axes, and triggers", reasonKey: "reasons.gamepadAxes" },
        { id: "input-lag-test", title: "Input Lag Test", href: "/tests/input-lag-test", reason: "Measure controller-to-screen latency", reasonKey: "reasons.gamepadLag" },
      ],
    });
  }

  // 14. Vibration (mobile)
  if (hasVibration) {
    capabilities.push({
      id: "vibration",
      label: "Haptic Feedback",
      labelKey: "capabilities.vibration",
      value: "Vibration Motor",
      icon: "sensor",
      recommendedTests: [
        { id: "vibration-test", title: "Vibration Test", href: "/tests/vibration-test", reason: "Test haptic vibration patterns", reasonKey: "reasons.hapticVibe" },
      ],
    });
  }

  // 15. Tailored Inspection Workflow
  const inspectionTest: RecommendedTest =
    deviceType === "laptop"
      ? { id: "inspection-laptop", title: "Laptop Display Inspection", href: "/monitor-inspection/laptop", reason: "Guided health check for battery, hinge & backlight", reasonKey: "reasons.laptopInspection" }
      : isOLED
      ? { id: "inspection-oled", title: "OLED Display Inspection", href: "/monitor-inspection/oled", reason: "Specialized OLED burn-in & pure black inspection", reasonKey: "reasons.oledInspection" }
      : refreshRate > 60
      ? { id: "inspection-gaming", title: "Gaming Display Inspection", href: "/monitor-inspection/gaming", reason: "Comprehensive high-refresh & motion blur audit", reasonKey: "reasons.gamingInspection" }
      : { id: "inspection-general", title: "General Display Checkup", href: "/monitor-inspection/general", reason: "Full 8-step screen health inspection", reasonKey: "reasons.generalInspection" };

  capabilities.push({
    id: "tailored-inspection",
    label: "Tailored Inspection",
    labelKey: "capabilities.tailoredInspection",
    value: inspectionTest.title,
    icon: "monitor",
    recommendedTests: [inspectionTest],
  });

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
