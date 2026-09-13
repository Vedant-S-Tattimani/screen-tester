export type KnowledgeBaseCategory = 
  | "display-basics"
  | "display-problems"
  | "tv-and-display-setup"
  | "device-and-input"
  | "browser-and-testing";

export interface KnowledgeCategoryInfo {
  id: KnowledgeBaseCategory;
  title: string;
  shortTitle: string;
  description: string;
  iconName: "Layers" | "AlertTriangle" | "Tv" | "Smartphone" | "ShieldCheck";
}

export interface KnowledgeArticleSection {
  title: string;
  content: string[];
  bullets?: string[];
  callout?: {
    type: "note" | "warning" | "tip";
    text: string;
  };
}

export interface KnowledgeFaqItem {
  question: string;
  answer: string;
}

export interface KnowledgeArticle {
  slug: string;
  category: KnowledgeBaseCategory;
  title: string;
  subtitle: string;
  description: string; // for meta description
  directAnswer: string; // concise 1-2 sentence definition
  whyItMatters: string;
  whatToLookFor: string[];
  howToTest: string[];
  whatScreenTesterCanObserve: string[];
  whatScreenTesterCannotDetermine: string[];
  commonCauses: string[];
  whatToDoNext: string[];
  sections: KnowledgeArticleSection[];
  faq: KnowledgeFaqItem[];
  relatedTestIds: string[];
  relatedTroubleshootingIds: string[];
  relatedArticleSlugs: string[];
  primarySearchIntent: string;
  readingTimeMinutes: number;
}
