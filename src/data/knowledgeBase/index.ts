import { KnowledgeArticle, KnowledgeBaseCategory, KnowledgeCategoryInfo } from "./types";
import { EN_KNOWLEDGE_ARTICLES } from "./en";
import { DE_KNOWLEDGE_ARTICLES } from "./de";
import { ES_KNOWLEDGE_ARTICLES } from "./es";
import { FR_KNOWLEDGE_ARTICLES } from "./fr";
import { PT_KNOWLEDGE_ARTICLES } from "./pt";
import { JA_KNOWLEDGE_ARTICLES } from "./ja";
import { KO_KNOWLEDGE_ARTICLES } from "./ko";
import { HI_KNOWLEDGE_ARTICLES } from "./hi";
import { getLocalizedCategories, getLocalizedCategory } from "./categories";

export * from "./types";
export * from "./categories";

const ARTICLES_BY_LOCALE: Record<string, KnowledgeArticle[]> = {
  en: EN_KNOWLEDGE_ARTICLES,
  de: DE_KNOWLEDGE_ARTICLES,
  es: ES_KNOWLEDGE_ARTICLES,
  fr: FR_KNOWLEDGE_ARTICLES,
  pt: PT_KNOWLEDGE_ARTICLES,
  ja: JA_KNOWLEDGE_ARTICLES,
  ko: KO_KNOWLEDGE_ARTICLES,
  hi: HI_KNOWLEDGE_ARTICLES,
};

export function getLocalizedKnowledgeArticles(locale: string = "en"): KnowledgeArticle[] {
  return ARTICLES_BY_LOCALE[locale] || ARTICLES_BY_LOCALE.en;
}

export function getLocalizedKnowledgeArticle(slug: string, locale: string = "en"): KnowledgeArticle | undefined {
  const articles = getLocalizedKnowledgeArticles(locale);
  return articles.find(article => article.slug === slug) || ARTICLES_BY_LOCALE.en.find(article => article.slug === slug);
}

export function getLocalizedKnowledgeCategories(locale: string = "en"): KnowledgeCategoryInfo[] {
  return getLocalizedCategories(locale);
}

export function getLocalizedCategoryInfo(category: KnowledgeBaseCategory, locale: string = "en"): KnowledgeCategoryInfo | undefined {
  return getLocalizedCategory(category, locale);
}

export function getArticleByTestId(testId: string, locale: string = "en"): KnowledgeArticle | undefined {
  const articles = getLocalizedKnowledgeArticles(locale);
  return articles.find(article => article.relatedTestIds.includes(testId)) || ARTICLES_BY_LOCALE.en.find(article => article.relatedTestIds.includes(testId));
}

export function getArticleByTroubleshootingId(topicId: string, locale: string = "en"): KnowledgeArticle | undefined {
  const articles = getLocalizedKnowledgeArticles(locale);
  return articles.find(article => article.relatedTroubleshootingIds.includes(topicId)) || ARTICLES_BY_LOCALE.en.find(article => article.relatedTroubleshootingIds.includes(topicId));
}

// Backward-compatible legacy exports
export const KNOWLEDGE_ARTICLES = EN_KNOWLEDGE_ARTICLES;
export const KNOWLEDGE_CATEGORIES = getLocalizedCategories("en");

export function getAllArticles(locale?: string): KnowledgeArticle[] {
  return getLocalizedKnowledgeArticles(locale);
}

export function getArticleBySlug(slug: string, locale?: string): KnowledgeArticle | undefined {
  return getLocalizedKnowledgeArticle(slug, locale);
}

export function getArticlesByCategory(category: KnowledgeBaseCategory, locale?: string): KnowledgeArticle[] {
  return getLocalizedKnowledgeArticles(locale).filter(article => article.category === category);
}

export function getCategoryInfo(category: KnowledgeBaseCategory, locale?: string): KnowledgeCategoryInfo | undefined {
  return getLocalizedCategoryInfo(category, locale);
}
