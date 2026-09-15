export type TestCategory = "pixels" | "color" | "luminance" | "display" | "motion" | "capabilities" | "advanced" | "deviceInput";

export interface MonitorTest {
  id: string; // The URL slug (e.g. 'dead-pixel-test')
  category: TestCategory;
  primaryIntent: string;
  relatedTestIds: string[];
}

export const monitorTests: MonitorTest[] = [
  // PIXELS
  {
    id: "dead-pixel-test",
    category: "pixels",
    primaryIntent: "dead pixel test",
    relatedTestIds: ["stuck-pixel-test", "solid-color-test", "burn-in-test"]
  },
  {
    id: "stuck-pixel-test",
    category: "pixels",
    primaryIntent: "stuck pixel test",
    relatedTestIds: ["dead-pixel-test", "bright-pixel-test", "solid-color-test", "burn-in-test"]
  },
  {
    id: "bright-pixel-test",
    category: "pixels",
    primaryIntent: "bright pixel test",
    relatedTestIds: ["dead-pixel-test", "stuck-pixel-test", "solid-color-test"]
  },
  {
    id: "burn-in-test",
    category: "pixels",
    primaryIntent: "screen burn in test",
    relatedTestIds: ["dead-pixel-test", "uniformity-test", "solid-color-test"]
  },
  {
    id: "stuck-pixel-fixer",
    category: "pixels",
    primaryIntent: "stuck pixel fixer screen tool",
    relatedTestIds: ["stuck-pixel-test", "dead-pixel-test", "bright-pixel-test", "burn-in-test"]
  },
  
  // COLOR
  {
    id: "color-test",
    category: "color",
    primaryIntent: "monitor color test",
    relatedTestIds: ["grayscale-test", "color-gamut-test", "color-banding-test", "gamma-test"]
  },
  {
    id: "grayscale-test",
    category: "color",
    primaryIntent: "monitor grayscale test",
    relatedTestIds: ["color-test", "contrast-test", "gamma-test"]
  },
  {
    id: "saturation-test",
    category: "color",
    primaryIntent: "monitor saturation test",
    relatedTestIds: ["color-test", "color-accuracy-test"]
  },
  {
    id: "color-banding-test",
    category: "color",
    primaryIntent: "monitor color banding and bit-depth quantization test",
    relatedTestIds: ["color-test", "gamma-test", "gradient-banding-test"]
  },
  {
    id: "color-gamut-test",
    category: "color",
    primaryIntent: "monitor color gamut test",
    relatedTestIds: ["color-test", "hdr-capability-test", "hdr-test", "color-accuracy-test"]
  },
  {
    id: "color-accuracy-test",
    category: "color",
    primaryIntent: "monitor color accuracy test",
    relatedTestIds: ["color-test", "color-gamut-test", "gamma-test"]
  },

  // LUMINANCE
  {
    id: "brightness-test",
    category: "luminance",
    primaryIntent: "monitor brightness and black clipping test",
    relatedTestIds: ["black-level-test", "white-level-test", "contrast-test", "gamma-test"]
  },
  {
    id: "contrast-test",
    category: "luminance",
    primaryIntent: "monitor contrast and white saturation test",
    relatedTestIds: ["brightness-test", "white-level-test", "black-level-test", "gamma-test"]
  },
  {
    id: "black-level-test",
    category: "luminance",
    primaryIntent: "monitor black level test",
    relatedTestIds: ["white-level-test", "contrast-test", "brightness-test", "near-black-test"]
  },
  {
    id: "white-level-test",
    category: "luminance",
    primaryIntent: "monitor white level test",
    relatedTestIds: ["black-level-test", "brightness-test", "gamma-test"]
  },
  {
    id: "gamma-test",
    category: "luminance",
    primaryIntent: "monitor gamma test",
    relatedTestIds: ["black-level-test", "white-level-test", "color-banding-test"]
  },
  {
    id: "solid-color-test",
    category: "luminance",
    primaryIntent: "fullscreen solid color test",
    relatedTestIds: ["dead-pixel-test", "uniformity-test"]
  },
  {
    id: "viewing-angle-test",
    category: "luminance",
    primaryIntent: "monitor viewing angle test",
    relatedTestIds: ["color-test", "uniformity-test", "backlight-bleed-test"]
  },

  // DISPLAY & BACKLIGHT
  {
    id: "blooming-test",
    category: "display",
    primaryIntent: "monitor blooming test",
    relatedTestIds: ["backlight-bleed-test", "black-level-test"]
  },

  // ADVANCED DISPLAY
  {
    id: "vrr-test",
    category: "advanced",
    primaryIntent: "vrr adaptive sync visual inspection",
    relatedTestIds: ["refresh-rate-test", "screen-tearing-test"]
  },
  {
    id: "hdr-test",
    category: "advanced",
    primaryIntent: "hdr visual inspection",
    relatedTestIds: ["hdr-capability-test", "color-gamut-test", "black-level-test"]
  },
  {
    id: "near-black-test",
    category: "advanced",
    primaryIntent: "near black shadow detail test",
    relatedTestIds: ["black-level-test", "uniformity-test", "contrast-test"]
  },
  {
    id: "gradient-banding-test",
    category: "advanced",
    primaryIntent: "monitor smooth gradient and ramp transitions test",
    relatedTestIds: ["color-banding-test", "color-test", "grayscale-test"]
  },
  {
    id: "text-clarity-test",
    category: "advanced",
    primaryIntent: "text clarity and subpixel rendering test",
    relatedTestIds: ["sharpness-test", "resolution-checker", "scaling-aspect-test"]
  },
  {
    id: "uniformity-test",
    category: "advanced",
    primaryIntent: "screen uniformity test",
    relatedTestIds: ["backlight-bleed-test", "solid-color-test", "near-black-test"]
  },
  {
    id: "backlight-bleed-test",
    category: "advanced",
    primaryIntent: "backlight bleed vs ips glow test",
    relatedTestIds: ["uniformity-test", "black-level-test", "blooming-test"]
  },
  {
    id: "tv-overscan-test",
    category: "advanced",
    primaryIntent: "tv overscan and 1 to 1 pixel mapping test",
    relatedTestIds: ["resolution-checker", "scaling-aspect-test", "sharpness-test"]
  },
  {
    id: "scaling-aspect-test",
    category: "advanced",
    primaryIntent: "scaling and aspect ratio inspection",
    relatedTestIds: ["tv-overscan-test", "resolution-checker", "text-clarity-test"]
  },

  // MOTION
  {
    id: "ghosting-test",
    category: "motion",
    primaryIntent: "monitor ghosting pixel response and overdrive test",
    relatedTestIds: ["motion-blur-test", "refresh-rate-test", "screen-tearing-test"]
  },
  {
    id: "motion-blur-test",
    category: "motion",
    primaryIntent: "monitor MPRT and motion blur persistence test",
    relatedTestIds: ["ghosting-test", "refresh-rate-test"]
  },
  {
    id: "refresh-rate-test",
    category: "motion",
    primaryIntent: "refresh rate test",
    relatedTestIds: ["motion-blur-test", "screen-tearing-test"]
  },
  {
    id: "screen-tearing-test",
    category: "motion",
    primaryIntent: "screen tearing test",
    relatedTestIds: ["refresh-rate-test"]
  },
  {
    id: "screen-flicker-test",
    category: "motion",
    primaryIntent: "monitor screen flicker and refresh stability test",
    relatedTestIds: ["refresh-rate-test"]
  },

  // CAPABILITIES
  {
    id: "resolution-checker",
    category: "capabilities",
    primaryIntent: "screen resolution and display capabilities checker",
    relatedTestIds: ["sharpness-test", "hdr-capability-test", "refresh-rate-test"]
  },
  {
    id: "hdr-capability-test",
    category: "capabilities",
    primaryIntent: "hdr hardware and signal detector",
    relatedTestIds: ["hdr-test", "color-gamut-test", "resolution-checker"]
  },

  {
    id: "touch-screen-test",
    category: "capabilities",
    primaryIntent: "touch screen digitizer and dead zone test",
    relatedTestIds: ["resolution-checker"]
  },
  {
    id: "sharpness-test",
    category: "capabilities",
    primaryIntent: "monitor sharpness test",
    relatedTestIds: ["resolution-checker"]
  },
  {
    id: "compare-displays",
    category: "capabilities",
    primaryIntent: "Compare Display Sizes & Resolutions",
    relatedTestIds: ["resolution-checker", "custom-pattern"]
  },
  {
    id: "display-info",
    category: "capabilities",
    primaryIntent: "display information and browser graphics capabilities",
    relatedTestIds: ["resolution-checker", "compare-displays", "custom-pattern"]
  },
  {
    id: "custom-pattern",
    category: "capabilities",
    primaryIntent: "custom test pattern generator",
    relatedTestIds: ["sharpness-test", "uniformity-test", "compare-displays"]
  },

  // DEVICE & INPUT
  {
    id: "multi-touch-test",
    category: "deviceInput",
    primaryIntent: "multi-touch gestures and multi-finger tracking test",
    relatedTestIds: ["touch-screen-test", "resolution-checker"]
  },
  {
    id: "accelerometer-test",
    category: "deviceInput",
    primaryIntent: "accelerometer and motion sensor test",
    relatedTestIds: ["gyroscope-test", "vibration-test"]
  },
  {
    id: "gyroscope-test",
    category: "deviceInput",
    primaryIntent: "gyroscope and device orientation test",
    relatedTestIds: ["accelerometer-test", "vibration-test"]
  },
  {
    id: "vibration-test",
    category: "deviceInput",
    primaryIntent: "vibration and haptic feedback test",
    relatedTestIds: ["speaker-test", "accelerometer-test"]
  },
  {
    id: "webcam-test",
    category: "deviceInput",
    primaryIntent: "webcam and camera stream test",
    relatedTestIds: ["display-info", "resolution-checker"]
  },
  {
    id: "speaker-test",
    category: "deviceInput",
    primaryIntent: "speaker and audio output channel test",
    relatedTestIds: ["microphone-test", "vibration-test", "display-info"]
  },
  {
    id: "microphone-test",
    category: "deviceInput",
    primaryIntent: "microphone and audio input stream test",
    relatedTestIds: ["speaker-test", "webcam-test", "display-info"]
  },
  {
    id: "reaction-time-test",
    category: "deviceInput",
    primaryIntent: "human reflex reaction time benchmark",
    relatedTestIds: ["refresh-rate-test", "screen-flicker-test", "motion-blur-test"]
  },
  {
    id: "pixel-inversion-test",
    category: "pixels",
    primaryIntent: "pixel inversion and VCOM flicker test",
    relatedTestIds: ["screen-flicker-test", "uniformity-test", "stuck-pixel-test"]
  },
  {
    id: "strobe-crosstalk-test",
    category: "motion",
    primaryIntent: "strobe crosstalk backlight strobing and BFI inspection",
    relatedTestIds: ["motion-blur-test", "ghosting-test", "pursuit-camera-test"]
  },
  {
    id: "vrr-flicker-test",
    category: "motion",
    primaryIntent: "VRR brightness flicker and gamma shift test",
    relatedTestIds: ["vrr-test", "screen-flicker-test", "refresh-rate-test"]
  },
  {
    id: "pursuit-camera-test",
    category: "motion",
    primaryIntent: "pursuit camera motion tracking and MPRT sync test",
    relatedTestIds: ["ghosting-test", "motion-blur-test", "refresh-rate-test"]
  },
  {
    id: "audio-sync-test",
    category: "deviceInput",
    primaryIntent: "audio video sync lip sync and latency calibration",
    relatedTestIds: ["speaker-test", "reaction-time-test"]
  },
  {
    id: "gamepad-test",
    category: "deviceInput",
    primaryIntent: "gamepad controller stick drift deadzone and button tester",
    relatedTestIds: ["reaction-time-test", "touch-screen-test"]
  },
  {
    id: "battery-test",
    category: "deviceInput",
    primaryIntent: "battery health power info status test",
    relatedTestIds: ["display-info", "network-speed-test"]
  },
  {
    id: "network-speed-test",
    category: "deviceInput",
    primaryIntent: "network speed internet latency ping test",
    relatedTestIds: ["battery-test", "display-info"]
  },
  {
    id: "color-blindness-test",
    category: "color",
    primaryIntent: "color blindness color vision deficiency simulator",
    relatedTestIds: ["color-test", "color-accuracy-test", "color-gamut-test"]
  },
  {
    id: "screen-recorder",
    category: "capabilities",
    primaryIntent: "screen recorder screenshot capture tool",
    relatedTestIds: ["display-info", "webcam-test"]
  },
  {
    id: "dark-mode-test",
    category: "advanced",
    primaryIntent: "dark mode light mode theme detection test",
    relatedTestIds: ["display-info", "color-test", "brightness-test"]
  },
  {
    id: "input-lag-test",
    category: "motion",
    primaryIntent: "display input lag and visual latency test",
    relatedTestIds: ["reaction-time-test", "refresh-rate-test", "ghosting-test"]
  },
  {
    id: "ambient-light-test",
    category: "deviceInput",
    primaryIntent: "ambient light sensor lux brightness environment test",
    relatedTestIds: ["brightness-test", "display-info", "battery-test"]
  },
  {
    id: "dpi-calculator",
    category: "capabilities",
    primaryIntent: "dpi ppi pixel density calculator retina threshold",
    relatedTestIds: ["resolution-checker", "display-info", "viewing-distance-calculator"]
  },
  {
    id: "subpixel-layout-test",
    category: "capabilities",
    primaryIntent: "subpixel layout text fringing qd-oled woled bgr test",
    relatedTestIds: ["text-clarity-test", "sharpness-test"]
  },
  {
    id: "pwm-flicker-test",
    category: "motion",
    primaryIntent: "pwm backlight flicker and eye strain test",
    relatedTestIds: ["screen-flicker-test", "vrr-flicker-test"]
  },
  {
    id: "dead-pixel-mapper",
    category: "capabilities",
    primaryIntent: "dead pixel rma coordinate mapper warranty test",
    relatedTestIds: ["dead-pixel-test", "stuck-pixel-fixer"]
  },
  {
    id: "gtg-response-time-test",
    category: "motion",
    primaryIntent: "gtg grey to grey pixel response time overdrive test",
    relatedTestIds: ["ghosting-test", "motion-blur-test"]
  },
  {
    id: "oled-burn-in-calculator",
    category: "capabilities",
    primaryIntent: "oled burn in risk panel longevity calculator",
    relatedTestIds: ["burn-in-test", "display-info"]
  },
  {
    id: "mouse-polling-test",
    category: "deviceInput",
    primaryIntent: "mouse polling rate hz jitter precision test",
    relatedTestIds: ["gamepad-test", "reaction-time-test"]
  },
  {
    id: "gpu-benchmark-test",
    category: "capabilities",
    primaryIntent: "gpu benchmark webgl 3d stress performance test",
    relatedTestIds: ["display-info", "refresh-rate-test"]
  },
  {
    id: "display-certificate",
    category: "capabilities",
    primaryIntent: "display inspection certificate rma report generator",
    relatedTestIds: ["display-info", "dead-pixel-mapper"]
  },
  {
    id: "osd-calibration-guide",
    category: "capabilities",
    primaryIntent: "osd monitor calibration hardware buttons guide",
    relatedTestIds: ["brightness-test", "contrast-test", "gamma-test"]
  },
  {
    id: "oled-abl-test",
    category: "luminance",
    primaryIntent: "oled abl auto brightness limiter window size benchmark",
    relatedTestIds: ["burn-in-test", "brightness-test", "hdr-test"]
  },
  {
    id: "new-monitor-wizard",
    category: "capabilities",
    primaryIntent: "5 minute new monitor unboxing inspection acceptance wizard",
    relatedTestIds: ["dead-pixel-test", "backlight-bleed-test", "uniformity-test", "display-certificate"]
  },
  {
    id: "color-temperature-test",
    category: "color",
    primaryIntent: "monitor color temperature white point d65 d50 9300k comparator",
    relatedTestIds: ["color-test", "grayscale-test", "color-gamut-test"]
  },
  {
    id: "temporal-dithering-test",
    category: "pixels",
    primaryIntent: "temporal dithering frc frame rate control micro flicker test",
    relatedTestIds: ["pixel-inversion-test", "screen-flicker-test", "pwm-flicker-test"]
  },
  {
    id: "hdr-peak-brightness-test",
    category: "advanced",
    primaryIntent: "hdr peak brightness highlight clipping tone mapping 1000 nits test",
    relatedTestIds: ["hdr-test", "hdr-capability-test", "contrast-test"]
  },
  {
    id: "audio-latency-test",
    category: "deviceInput",
    primaryIntent: "audio latency web audio buffer hardware output pipeline test",
    relatedTestIds: ["audio-sync-test", "speaker-test", "microphone-test"]
  },
  {
    id: "eink-refresh-tool",
    category: "capabilities",
    primaryIntent: "e-ink electronic paper screen refresh anti ghosting tool",
    relatedTestIds: ["stuck-pixel-fixer", "screen-flicker-test", "pixel-inversion-test"]
  }
];

export function getTestById(id: string): MonitorTest | undefined {
  return monitorTests.find(t => t.id === id);
}

export function getTestsByCategory(category: TestCategory): MonitorTest[] {
  return monitorTests.filter(t => t.category === category);
}

export function getRelatedTests(testId: string): MonitorTest[] {
  const test = getTestById(testId);
  if (!test) return [];
  return test.relatedTestIds.map(id => getTestById(id)).filter(Boolean) as MonitorTest[];
}

export const TEST_KEY_MAP: Record<string, { ns: "lib" | "tests" | "tools", key: string }> = {
  "dead-pixel-test": { ns: "lib", key: "tests.deadPixel" },
  "stuck-pixel-test": { ns: "lib", key: "tests.stuckPixel" },
  "bright-pixel-test": { ns: "lib", key: "tests.brightPixel" },
  "burn-in-test": { ns: "tests", key: "burnIn" },
  "color-test": { ns: "lib", key: "tests.colorTest" },
  "grayscale-test": { ns: "lib", key: "tests.grayscaleTest" },
  "saturation-test": { ns: "lib", key: "tests.saturationTest" },
  "color-banding-test": { ns: "lib", key: "tests.gradientTest" },
  "color-gamut-test": { ns: "tests", key: "colorGamut" },
  "color-accuracy-test": { ns: "tests", key: "colorAccuracy" },
  "brightness-test": { ns: "lib", key: "tests.brightnessTest" },
  "contrast-test": { ns: "lib", key: "tests.contrastTest" },
  "black-level-test": { ns: "lib", key: "tests.blackLevelTest" },
  "white-level-test": { ns: "lib", key: "tests.whiteLevelTest" },
  "gamma-test": { ns: "lib", key: "tests.gammaTest" },
  "solid-color-test": { ns: "tests", key: "solidColor" },
  "viewing-angle-test": { ns: "tests", key: "viewingAngle" },
  "uniformity-test": { ns: "lib", key: "tests.uniformityTest" },
  "backlight-bleed-test": { ns: "lib", key: "tests.backlightBleed" },
  "blooming-test": { ns: "tests", key: "blooming" },
  "motion-blur-test": { ns: "tests", key: "motionBlurTest" }, 
  "ghosting-test": { ns: "lib", key: "tests.ghostingTest" },
  "refresh-rate-test": { ns: "lib", key: "tests.refreshRate" },
  "screen-tearing-test": { ns: "tests", key: "screenTearing" },
  "screen-flicker-test": { ns: "tests", key: "flicker" },
  "resolution-checker": { ns: "tests", key: "resolution-checker" },
  "display-info": { ns: "lib", key: "tests.displayInfo" },
  "compare-displays": { ns: "tools", key: "compareDisplays" },
  "hdr-capability-test": { ns: "lib", key: "tests.hdrCapabilityTest" },
  "touch-screen-test": { ns: "tests", key: "touchScreen" },
  "sharpness-test": { ns: "tests", key: "sharpness" },
  "custom-pattern": { ns: "tests", key: "customPattern" },
  "stuck-pixel-fixer": { ns: "tests", key: "stuckPixelFixer" },
  "vrr-test": { ns: "tests", key: "vrrTest" },
  "hdr-test": { ns: "tests", key: "hdrVisualTest" },
  "near-black-test": { ns: "tests", key: "nearBlackTest" },
  "gradient-banding-test": { ns: "tests", key: "gradientBandingTest" },
  "text-clarity-test": { ns: "tests", key: "textClarityTest" },
  "tv-overscan-test": { ns: "tests", key: "tvOverscanTest" },
  "scaling-aspect-test": { ns: "tests", key: "scalingAspectTest" },
  "multi-touch-test": { ns: "tests", key: "multiTouchTest" },
  "accelerometer-test": { ns: "tests", key: "accelerometerTest" },
  "gyroscope-test": { ns: "tests", key: "gyroscopeTest" },
  "vibration-test": { ns: "tests", key: "vibrationTest" },
  "webcam-test": { ns: "tests", key: "webcamTest" },
  "speaker-test": { ns: "tests", key: "speakerTest" },
  "microphone-test": { ns: "tests", key: "microphoneTest" },
  "reaction-time-test": { ns: "tests", key: "reactionTimeTest" },
  "pixel-inversion-test": { ns: "tests", key: "pixelInversionTest" },
  "strobe-crosstalk-test": { ns: "tests", key: "strobeCrosstalkTest" },
  "vrr-flicker-test": { ns: "tests", key: "vrrFlickerTest" },
  "pursuit-camera-test": { ns: "tests", key: "pursuitCameraTest" },
  "audio-sync-test": { ns: "tests", key: "audioSyncTest" },
  "gamepad-test": { ns: "tests", key: "gamepadTest" },
  "battery-test": { ns: "tests", key: "batteryTest" },
  "network-speed-test": { ns: "tests", key: "networkSpeedTest" },
  "color-blindness-test": { ns: "tests", key: "colorBlindnessTest" },
  "screen-recorder": { ns: "tests", key: "screenRecorder" },
  "dark-mode-test": { ns: "tests", key: "darkModeTest" },
  "input-lag-test": { ns: "tests", key: "inputLagTest" },
  "ambient-light-test": { ns: "tests", key: "ambientLightTest" },
  "dpi-calculator": { ns: "tests", key: "dpiCalculator" },
  "subpixel-layout-test": { ns: "tests", key: "subpixelLayoutTest" },
  "pwm-flicker-test": { ns: "tests", key: "pwmFlickerTest" },
  "dead-pixel-mapper": { ns: "tools", key: "deadPixelMapper" },
  "gtg-response-time-test": { ns: "tests", key: "gtgResponseTimeTest" },
  "oled-burn-in-calculator": { ns: "tools", key: "oledBurnInCalculator" },
  "mouse-polling-test": { ns: "tests", key: "mousePollingTest" },
  "gpu-benchmark-test": { ns: "tests", key: "gpuBenchmarkTest" },
  "display-certificate": { ns: "tools", key: "displayCertificate" },
  "osd-calibration-guide": { ns: "tools", key: "osdCalibrationGuide" },
  "oled-abl-test": { ns: "tests", key: "oledAblTest" },
  "new-monitor-wizard": { ns: "tools", key: "newMonitorWizard" },
  "color-temperature-test": { ns: "tests", key: "colorTemperatureTest" },
  "temporal-dithering-test": { ns: "tests", key: "temporalDitheringTest" },
  "hdr-peak-brightness-test": { ns: "tests", key: "hdrPeakBrightnessTest" },
  "audio-latency-test": { ns: "tests", key: "audioLatencyTest" },
  "eink-refresh-tool": { ns: "tools", key: "einkRefreshTool" }
};



