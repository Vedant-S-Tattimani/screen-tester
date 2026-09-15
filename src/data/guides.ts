export type GuideCategory = "device" | "concept" | "workflow";

export interface MonitorGuide {
  id: string; // The URL slug (e.g. 'monitor-screen-test')
  category: GuideCategory;
  primaryIntent: string;
  relatedTestIds: string[];
}

export const monitorGuides: MonitorGuide[] = [
  {
    "id": "monitor-screen-test",
    "category": "device",
    "primaryIntent": "how to test a monitor",
    "relatedTestIds": [
      "dead-pixel-test",
      "stuck-pixel-test",
      "bright-pixel-test",
      "stuck-pixel-fixer",
      "backlight-bleed-test",
      "ghosting-test",
      "motion-blur-test",
      "gtg-response-time-test",
      "input-lag-test",
      "screen-tearing-test",
      "strobe-crosstalk-test",
      "pursuit-camera-test",
      "gpu-benchmark-test",
      "solid-color-test",
      "color-accuracy-test",
      "color-blindness-test",
      "screen-flicker-test",
      "vrr-flicker-test",
      "subpixel-layout-test",
      "display-info",
      "custom-pattern",
      "reaction-time-test",
      "mouse-polling-test",
      "gamepad-test",
      "dpi-calculator",
      "eink-refresh-tool"
    ]
  },
  {
    "id": "laptop-screen-test",
    "category": "device",
    "primaryIntent": "how to test laptop screen",
    "relatedTestIds": [
      "dead-pixel-test",
      "color-test",
      "brightness-test",
      "color-gamut-test",
      "color-accuracy-test",
      "dark-mode-test",
      "screen-flicker-test",
      "pwm-flicker-test",
      "temporal-dithering-test",
      "subpixel-layout-test",
      "display-info",
      "multi-touch-test",
      "speaker-test",
      "microphone-test",
      "webcam-test",
      "ambient-light-test",
      "battery-test",
      "network-speed-test",
      "gpu-benchmark-test",
      "dpi-calculator"
    ]
  },
  {
    "id": "oled-screen-test",
    "category": "device",
    "primaryIntent": "how to test oled screen",
    "relatedTestIds": [
      "burn-in-test",
      "oled-burn-in-calculator",
      "oled-abl-test",
      "uniformity-test",
      "black-level-test",
      "contrast-test",
      "solid-color-test",
      "color-gamut-test",
      "hdr-capability-test",
      "hdr-test",
      "hdr-peak-brightness-test",
      "dark-mode-test",
      "blooming-test"
    ]
  },
  {
    "id": "lcd-screen-test",
    "category": "device",
    "primaryIntent": "how to test lcd screen",
    "relatedTestIds": [
      "backlight-bleed-test",
      "viewing-angle-test",
      "dead-pixel-test",
      "pixel-inversion-test",
      "temporal-dithering-test",
      "solid-color-test",
      "uniformity-test",
      "blooming-test"
    ]
  },
  {
    "id": "tv-screen-test",
    "category": "device",
    "primaryIntent": "how to test tv screen",
    "relatedTestIds": [
      "burn-in-test",
      "oled-burn-in-calculator",
      "color-banding-test",
      "motion-blur-test",
      "contrast-test",
      "saturation-test",
      "oled-abl-test",
      "hdr-capability-test",
      "hdr-test",
      "hdr-peak-brightness-test",
      "blooming-test",
      "sharpness-test",
      "scaling-aspect-test",
      "tv-overscan-test",
      "screen-tearing-test",
      "input-lag-test",
      "gamepad-test",
      "audio-sync-test",
      "audio-latency-test",
      "speaker-test",
      "network-speed-test",
      "viewing-distance-calculator"
    ]
  },
  {
    "id": "mobile-screen-test",
    "category": "device",
    "primaryIntent": "how to test phone screen",
    "relatedTestIds": [
      "touch-screen-test",
      "multi-touch-test",
      "dead-pixel-test",
      "burn-in-test",
      "color-blindness-test",
      "dark-mode-test",
      "pwm-flicker-test",
      "display-info",
      "reaction-time-test",
      "audio-sync-test",
      "audio-latency-test",
      "speaker-test",
      "microphone-test",
      "accelerometer-test",
      "gyroscope-test",
      "vibration-test",
      "ambient-light-test",
      "battery-test",
      "network-speed-test",
      "eink-refresh-tool"
    ]
  },
  {
    "id": "used-monitor-inspection-checklist",
    "category": "device",
    "primaryIntent": "how to test a used monitor before buying",
    "relatedTestIds": [
      "dead-pixel-test",
      "stuck-pixel-test",
      "dead-pixel-mapper",
      "backlight-bleed-test",
      "uniformity-test",
      "ghosting-test",
      "motion-blur-test",
      "refresh-rate-test",
      "resolution-checker",
      "grayscale-test",
      "pursuit-camera-test",
      "scaling-aspect-test",
      "compare-displays",
      "custom-pattern",
      "dual-monitor-matcher",
      "screen-recorder",
      "display-certificate"
    ]
  },
  {
    "id": "new-monitor-inspection-return-window",
    "category": "device",
    "primaryIntent": "new monitor inspection checklist",
    "relatedTestIds": [
      "new-monitor-wizard",
      "dead-pixel-test",
      "stuck-pixel-test",
      "bright-pixel-test",
      "backlight-bleed-test",
      "uniformity-test",
      "gradient-banding-test",
      "text-clarity-test",
      "refresh-rate-test",
      "ghosting-test",
      "motion-blur-test",
      "vrr-test",
      "hdr-test",
      "color-temperature-test",
      "white-level-test",
      "gamma-test",
      "compare-displays",
      "dual-monitor-matcher",
      "screen-recorder",
      "display-certificate"
    ]
  },
  {
    "id": "dead-pixel-vs-stuck-pixel",
    "category": "concept",
    "primaryIntent": "dead pixel vs stuck pixel",
    "relatedTestIds": [
      "dead-pixel-test",
      "stuck-pixel-test",
      "bright-pixel-test",
      "stuck-pixel-fixer",
      "dead-pixel-mapper"
    ]
  },
  {
    "id": "monitor-viewing-angles-explained",
    "category": "concept",
    "primaryIntent": "monitor viewing angles explained",
    "relatedTestIds": [
      "viewing-angle-test",
      "color-test",
      "uniformity-test",
      "viewing-distance-calculator"
    ]
  },
  {
    "id": "displayport-vs-hdmi-bandwidth-chroma",
    "category": "concept",
    "primaryIntent": "DisplayPort vs HDMI: Bandwidth, Revisions & Chroma Subsampling",
    "relatedTestIds": [
      "refresh-rate-test",
      "hdr-test",
      "hdr-capability-test",
      "hdr-peak-brightness-test",
      "vrr-test",
      "resolution-checker",
      "text-clarity-test",
      "color-test",
      "color-gamut-test",
      "display-bandwidth-calculator"
    ]
  },
  {
    "id": "monitor-osd-settings-explained",
    "category": "concept",
    "primaryIntent": "Monitor OSD settings explained",
    "relatedTestIds": [
      "ghosting-test",
      "motion-blur-test",
      "gtg-response-time-test",
      "strobe-crosstalk-test",
      "vrr-test",
      "vrr-flicker-test",
      "hdr-test",
      "refresh-rate-test",
      "text-clarity-test",
      "sharpness-test",
      "gradient-banding-test",
      "near-black-test",
      "uniformity-test",
      "color-temperature-test",
      "saturation-test",
      "white-level-test",
      "grayscale-test",
      "gamma-test",
      "contrast-test",
      "pixel-inversion-test",
      "osd-calibration-guide"
    ]
  }
];

export function getGuideById(id: string): MonitorGuide | undefined {
  return monitorGuides.find(g => g.id === id);
}

export function getGuidesByCategory(category: GuideCategory): MonitorGuide[] {
  return monitorGuides.filter(g => g.category === category);
}
