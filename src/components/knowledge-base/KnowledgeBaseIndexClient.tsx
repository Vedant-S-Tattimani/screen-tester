"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { 
  KNOWLEDGE_CATEGORIES, 
  KNOWLEDGE_ARTICLES, 
  KnowledgeBaseCategory, 
  KnowledgeArticle 
} from "@/data/knowledgeBase";
import { 
  Search, 
  Layers, 
  AlertTriangle, 
  Tv, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal 
} from "lucide-react";

interface KnowledgeBaseIndexClientProps {
  initialCategory?: string;
  translations?: {
    searchPlaceholder?: string;
    filterAll?: string;
    noResultsTitle?: string;
    noResultsSubtitle?: string;
    readArticle?: string;
    minRead?: string;
  };
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  AlertTriangle,
  Tv,
  Smartphone,
  ShieldCheck
};

export function KnowledgeBaseIndexClient({ 
  translations 
}: KnowledgeBaseIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<KnowledgeBaseCategory | "all">("all");

  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_ARTICLES.filter((article: KnowledgeArticle) => {
      const matchesCategory = activeCategory === "all" || article.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.directAnswer.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeCategory]);

  const articlesByCategory = useMemo(() => {
    const grouped: Record<string, KnowledgeArticle[]> = {};
    for (const cat of KNOWLEDGE_CATEGORIES) {
      grouped[cat.id] = filteredArticles.filter(a => a.category === cat.id);
    }
    return grouped;
  }, [filteredArticles]);

  return (
    <div className="space-y-10">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        {/* Search Input */}
        <div className="w-full md:w-96 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translations?.searchPlaceholder || "Search 20 display & hardware guides..."}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-2xs"
            aria-label="Search Knowledge Base articles"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "all"
                ? "bg-gray-950 text-white shadow-2xs"
                : "bg-gray-100 hover:bg-gray-200/70 text-gray-600 hover:text-gray-950"
            }`}
          >
            <span>{translations?.filterAll || "All Articles"}</span>
            <span className="text-[10px] opacity-70 font-mono">({KNOWLEDGE_ARTICLES.length})</span>
          </button>

          {KNOWLEDGE_CATEGORIES.map((cat) => {
            const count = KNOWLEDGE_ARTICLES.filter(a => a.category === cat.id).length;
            const IconComponent = CATEGORY_ICONS[cat.iconName] || Layers;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-gray-950 text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200/70 text-gray-600 hover:text-gray-950"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5 opacity-80" />
                <span>{cat.shortTitle}</span>
                <span className="text-[10px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zero State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {translations?.noResultsTitle || "No matching articles found"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-4">
            {translations?.noResultsSubtitle || "Try adjusting your search query or reset category filters."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Article Groups by Category */}
      <div className="space-y-16">
        {KNOWLEDGE_CATEGORIES.map((cat) => {
          const articles = articlesByCategory[cat.id] || [];
          if (articles.length === 0) return null;
          const IconComponent = CATEGORY_ICONS[cat.iconName] || Layers;

          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">
                    {cat.title}
                  </h2>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold ml-auto">
                  {articles.length} {articles.length === 1 ? "article" : "articles"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 pl-10 max-w-2xl">
                {cat.description}
              </p>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article) => (
                  <article 
                    key={article.slug}
                    className="border border-gray-200/90 rounded-2xl p-5 bg-white hover:border-gray-400 hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Meta header: reading time */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono mb-2.5">
                        <span className="uppercase tracking-wider text-gray-500 font-medium">
                          {cat.shortTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readingTimeMinutes} {translations?.minRead || "min read"}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-[15px] font-bold text-gray-950 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                        <Link href={`/knowledge-base/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      {/* Direct Answer snippet */}
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {article.directAnswer}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <Link 
                        href={`/knowledge-base/${article.slug}`}
                        className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
                      >
                        <span>{translations?.readArticle || "Read Technical Guide"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      {article.relatedTestIds.length > 0 && (
                        <Link
                          href={`/tests/${article.relatedTestIds[0]}`}
                          className="text-[11px] text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1"
                          title="Jump directly to interactive test"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Test</span>
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
