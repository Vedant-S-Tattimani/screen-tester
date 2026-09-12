import { ExplainerData, ExplainerLabels } from "./types";
import { EN_EXPLAINERS, EN_LABELS } from "./en";
import { DE_EXPLAINERS, DE_LABELS } from "./de";
import { ES_EXPLAINERS, ES_LABELS } from "./es";
import { FR_EXPLAINERS, FR_LABELS } from "./fr";
import { PT_EXPLAINERS, PT_LABELS } from "./pt";
import { JA_EXPLAINERS, JA_LABELS } from "./ja";
import { KO_EXPLAINERS, KO_LABELS } from "./ko";
import { HI_EXPLAINERS, HI_LABELS } from "./hi";

export * from "./types";

const EXPLAINERS_BY_LOCALE: Record<string, Record<string, ExplainerData>> = {
  en: EN_EXPLAINERS,
  de: DE_EXPLAINERS,
  es: ES_EXPLAINERS,
  fr: FR_EXPLAINERS,
  pt: PT_EXPLAINERS,
  ja: JA_EXPLAINERS,
  ko: KO_EXPLAINERS,
  hi: HI_EXPLAINERS,
};

const LABELS_BY_LOCALE: Record<string, ExplainerLabels> = {
  en: EN_LABELS,
  de: DE_LABELS,
  es: ES_LABELS,
  fr: FR_LABELS,
  pt: PT_LABELS,
  ja: JA_LABELS,
  ko: KO_LABELS,
  hi: HI_LABELS,
};

export function getFeatureExplainer(testId: string, locale: string = "en"): ExplainerData | null {
  const localeData = EXPLAINERS_BY_LOCALE[locale] || EXPLAINERS_BY_LOCALE["en"];
  if (localeData && localeData[testId]) {
    return localeData[testId];
  }
  // Fallback to English if key missing in locale
  if (EXPLAINERS_BY_LOCALE["en"] && EXPLAINERS_BY_LOCALE["en"][testId]) {
    return EXPLAINERS_BY_LOCALE["en"][testId];
  }
  return null;
}

export function getExplainerLabels(locale: string = "en"): ExplainerLabels {
  return LABELS_BY_LOCALE[locale] || LABELS_BY_LOCALE["en"];
}
