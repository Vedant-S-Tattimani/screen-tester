import { TroubleshootingTopic, TroubleshootingCategory } from "./types";
import { EN_TROUBLESHOOTING_TOPICS } from "./en";
import { DE_TROUBLESHOOTING_TOPICS } from "./de";
import { ES_TROUBLESHOOTING_TOPICS } from "./es";
import { FR_TROUBLESHOOTING_TOPICS } from "./fr";
import { PT_TROUBLESHOOTING_TOPICS } from "./pt";
import { JA_TROUBLESHOOTING_TOPICS } from "./ja";
import { KO_TROUBLESHOOTING_TOPICS } from "./ko";
import { HI_TROUBLESHOOTING_TOPICS } from "./hi";

export * from "./types";

const TOPICS_BY_LOCALE: Record<string, TroubleshootingTopic[]> = {
  en: EN_TROUBLESHOOTING_TOPICS,
  de: DE_TROUBLESHOOTING_TOPICS,
  es: ES_TROUBLESHOOTING_TOPICS,
  fr: FR_TROUBLESHOOTING_TOPICS,
  pt: PT_TROUBLESHOOTING_TOPICS,
  ja: JA_TROUBLESHOOTING_TOPICS,
  ko: KO_TROUBLESHOOTING_TOPICS,
  hi: HI_TROUBLESHOOTING_TOPICS,
};

export const TROUBLESHOOTING_CATEGORIES: Array<{ id: TroubleshootingCategory; label: string }> = [
  { id: "display", label: "Display Problems" },
  { id: "pixels", label: "Pixel Problems" },
  { id: "imageQuality", label: "Image Quality" },
  { id: "tv", label: "TV Problems" },
  { id: "deviceInput", label: "Device & Input Problems" }
];

export const TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = EN_TROUBLESHOOTING_TOPICS;

export function getTroubleshootingTopics(locale: string = "en"): TroubleshootingTopic[] {
  return TOPICS_BY_LOCALE[locale] || TOPICS_BY_LOCALE["en"] || EN_TROUBLESHOOTING_TOPICS;
}

export function getTroubleshootingById(id: string, locale: string = "en"): TroubleshootingTopic | undefined {
  const topics = getTroubleshootingTopics(locale);
  return topics.find(topic => topic.id === id);
}

export function getTroubleshootingByCategory(category: TroubleshootingCategory, locale: string = "en"): TroubleshootingTopic[] {
  const topics = getTroubleshootingTopics(locale);
  return topics.filter(topic => topic.category === category);
}

export function getTroubleshootingByTestId(testId: string, locale: string = "en"): TroubleshootingTopic | undefined {
  const topics = getTroubleshootingTopics(locale);
  return topics.find(topic => 
    topic.whatScreenTesterCanTest?.links?.some(link => link.testId === testId)
  );
}
