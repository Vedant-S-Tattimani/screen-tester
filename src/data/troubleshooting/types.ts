export type TroubleshootingCategory = "display" | "pixels" | "imageQuality" | "tv" | "deviceInput";

export interface TroubleshootingTestLink {
  label: string;
  testId: string;
  testPath: string;
}

export interface TroubleshootingTopic {
  id: string;
  title: string;
  category: TroubleshootingCategory;
  categoryTitle: string;
  symptom: string;
  possibleCauses: string[];
  checks: string[];
  whatScreenTesterCanTest: {
    description: string;
    links: TroubleshootingTestLink[];
  };
  whatScreenTesterCannotDetermine: string[];
  actions: string[];
  whenToStop: string;
}
