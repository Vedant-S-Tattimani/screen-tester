export type GuideCategory = "device" | "concept" | "workflow";

export interface MonitorGuide {
  id: string; // The URL slug (e.g. 'monitor-screen-test')
  category: GuideCategory;
  primaryIntent: string;
  relatedTestIds: string[];
}

export const monitorGuides: MonitorGuide[] = [
  // DEVICE GUIDES
  {
    id: "monitor-screen-test",
    category: "device",
    primaryIntent: "how to test a monitor",
    relatedTestIds: ["dead-pixel-test", "backlight-bleed-test", "ghosting-test"]
  },
  {
    id: "laptop-screen-test",
    category: "device",
    primaryIntent: "how to test laptop screen",
    relatedTestIds: ["dead-pixel-test", "color-test", "brightness-test"]
  },
  {
    id: "oled-screen-test",
    category: "device",
    primaryIntent: "how to test oled screen",
    relatedTestIds: ["burn-in-test", "uniformity-test", "black-level-test"]
  },
  {
    id: "lcd-screen-test",
    category: "device",
    primaryIntent: "how to test lcd screen",
    relatedTestIds: ["backlight-bleed-test", "viewing-angle-test", "dead-pixel-test"]
  },
  {
    id: "tv-screen-test",
    category: "device",
    primaryIntent: "how to test tv screen",
    relatedTestIds: ["burn-in-test", "color-banding-test", "motion-blur-test"]
  },
  {
    id: "mobile-screen-test",
    category: "device",
    primaryIntent: "how to test phone screen",
    relatedTestIds: ["touch-screen-test", "dead-pixel-test", "burn-in-test"]
  },

  // CONCEPTS
  {
    id: "monitor-viewing-angles-explained",
    category: "concept",
    primaryIntent: "monitor viewing angles explained",
    relatedTestIds: ["viewing-angle-test", "color-test", "uniformity-test"]
  }
];

export function getGuideById(id: string): MonitorGuide | undefined {
  return monitorGuides.find(g => g.id === id);
}

export function getGuidesByCategory(category: GuideCategory): MonitorGuide[] {
  return monitorGuides.filter(g => g.category === category);
}
