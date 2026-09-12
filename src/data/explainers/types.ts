export interface VisualCue {
  label: string;
  description: string;
}

export interface ExplainerData {
  overview?: string;
  whatToLookFor?: VisualCue[];
  canObserve: string[];
  cannotMeasure: string[];
  interpretation?: string;
  nextSteps?: {
    text: string;
    actionLabel?: string;
    actionHref?: string;
  };
}

export interface ExplainerLabels {
  overviewHeading: string;
  whatToLookForHeading: string;
  boundariesHeading: string;
  canObserveLabel: string;
  cannotMeasureLabel: string;
  interpretationHeading: string;
  nextStepsHeading: string;
}
