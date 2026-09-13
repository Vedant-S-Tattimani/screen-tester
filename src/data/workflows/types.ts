export interface WorkflowStepItem {
  title: string;
  description: string;
}

export interface InspectionWorkflow {
  id: string; // URL slug e.g. 'new'
  route: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  inspectionTip: string;
  browserLimitations?: string;
  sequence: string[];
  steps: WorkflowStepItem[];
}
