import { PixelDefectMarker, MonitorProfile } from "@/lib/inspectionStorage";

export interface InspectionReportOverviewData {
  totalTests: number;
  completedCount: number;
  skippedCount: number;
  withObservationsCount: number;
  withNotesCount: number;
  pixelDefectsCount: number;
  durationString: string | null;
  statusCounts: {
    normal: number;
    attention: number;
    unsure: number;
    notTested: number;
  };
}

export interface BrowserDisplayDetectedData {
  screenResolution: string;
  logicalResolution: string;
  viewport: string;
  devicePixelRatio: number;
  colorDepth: number;
  pixelDepth: number;
  orientation: string;
  refreshRateEstimate: string;
  hdrSupported: boolean;
  colorGamut: string;
  webglRenderer: string;
  webglVendor: string;
}

export interface InspectionTestResultRow {
  testId: string;
  name: string;
  category: string;
  status: "Completed" | "Skipped" | "Not available";
  observation: "LOOKS_NORMAL" | "NEEDS_ATTENTION" | "UNSURE" | "NOT_TESTED";
  observationLabel: string;
  notes: string;
  pixelDefectsCount: number;
}

export interface InspectionReportData {
  inspectionId: string;
  isArchived: boolean;
  timestamp: string;
  workflowTitle: string;
  workflowId: string;
  overview: InspectionReportOverviewData;
  displayInfo: BrowserDisplayDetectedData;
  userProfile: MonitorProfile;
  testResults: InspectionTestResultRow[];
  browserDetectedResults: Array<{
    title: string;
    value: string;
    badge: "BROWSER-DETECTED" | "NOT AVAILABLE";
  }>;
  visualObservations: Array<{
    testId: string;
    testName: string;
    category: string;
    observation: "LOOKS_NORMAL" | "NEEDS_ATTENTION" | "UNSURE" | "NOT_TESTED";
    notes: string;
  }>;
  pixelDefects: PixelDefectMarker[];
  generalNotes: string;
}
