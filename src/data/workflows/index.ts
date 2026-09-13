import { InspectionWorkflow } from "./types";
import { EN_INSPECTION_WORKFLOWS } from "./en";
import { DE_INSPECTION_WORKFLOWS } from "./de";
import { ES_INSPECTION_WORKFLOWS } from "./es";
import { FR_INSPECTION_WORKFLOWS } from "./fr";
import { PT_INSPECTION_WORKFLOWS } from "./pt";
import { JA_INSPECTION_WORKFLOWS } from "./ja";
import { KO_INSPECTION_WORKFLOWS } from "./ko";
import { HI_INSPECTION_WORKFLOWS } from "./hi";

export * from "./types";

const WORKFLOWS_BY_LOCALE: Record<string, InspectionWorkflow[]> = {
  en: EN_INSPECTION_WORKFLOWS,
  de: DE_INSPECTION_WORKFLOWS,
  es: ES_INSPECTION_WORKFLOWS,
  fr: FR_INSPECTION_WORKFLOWS,
  pt: PT_INSPECTION_WORKFLOWS,
  ja: JA_INSPECTION_WORKFLOWS,
  ko: KO_INSPECTION_WORKFLOWS,
  hi: HI_INSPECTION_WORKFLOWS,
};

export const inspectionWorkflows: InspectionWorkflow[] = EN_INSPECTION_WORKFLOWS;

export function getInspectionWorkflows(locale: string = "en"): InspectionWorkflow[] {
  return WORKFLOWS_BY_LOCALE[locale] || WORKFLOWS_BY_LOCALE["en"] || EN_INSPECTION_WORKFLOWS;
}

export function getWorkflowById(id: string, locale: string = "en"): InspectionWorkflow | undefined {
  const workflows = getInspectionWorkflows(locale);
  return workflows.find(w => w.id === id);
}
