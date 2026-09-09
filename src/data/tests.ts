export type TestCategory = "pixels" | "color" | "luminance" | "display" | "motion" | "capabilities" | "advanced";

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
    primaryIntent: "monitor color banding test",
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
    primaryIntent: "monitor brightness test",
    relatedTestIds: ["black-level-test", "white-level-test", "contrast-test", "gamma-test"]
  },
  {
    id: "contrast-test",
    category: "luminance",
    primaryIntent: "monitor contrast test",
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
    relatedTestIds: ["refresh-rate-test", "screen-tearing-test", "ghosting-test"]
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
    primaryIntent: "gradient banding visual test",
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
    primaryIntent: "monitor ghosting test",
    relatedTestIds: ["motion-blur-test", "refresh-rate-test", "screen-tearing-test"]
  },
  {
    id: "motion-blur-test",
    category: "motion",
    primaryIntent: "monitor motion blur test",
    relatedTestIds: ["ghosting-test", "refresh-rate-test"]
  },
  {
    id: "refresh-rate-test",
    category: "motion",
    primaryIntent: "refresh rate test",
    relatedTestIds: ["ghosting-test", "motion-blur-test", "screen-tearing-test"]
  },
  {
    id: "screen-tearing-test",
    category: "motion",
    primaryIntent: "screen tearing test",
    relatedTestIds: ["refresh-rate-test", "ghosting-test"]
  },
  {
    id: "screen-flicker-test",
    category: "motion",
    primaryIntent: "monitor flicker test",
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
    primaryIntent: "hdr test",
    relatedTestIds: ["color-gamut-test", "resolution-checker"]
  },
  {
    id: "touch-screen-test",
    category: "capabilities",
    primaryIntent: "touch screen test",
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
    primaryIntent: "compare display sizes and resolutions",
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

export const TEST_KEY_MAP: Record<string, { ns: "lib" | "tests", key: string }> = {
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
  "ghosting-test": { ns: "lib", key: "tests.ghostingTest" },
  "motion-blur-test": { ns: "lib", key: "tests.ghostingTest" }, 
  "refresh-rate-test": { ns: "lib", key: "tests.refreshRate" },
  "screen-tearing-test": { ns: "tests", key: "screenTearing" },
  "screen-flicker-test": { ns: "tests", key: "flicker" },
  "resolution-checker": { ns: "lib", key: "tests.displayInfo" },
  "display-info": { ns: "lib", key: "tests.displayInfo" },
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
  "scaling-aspect-test": { ns: "tests", key: "scalingAspectTest" }
};

