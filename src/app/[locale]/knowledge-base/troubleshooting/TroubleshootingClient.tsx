"use client";

import { useState, useEffect, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { 
  TROUBLESHOOTING_TOPICS, 
  TROUBLESHOOTING_CATEGORIES, 
  TroubleshootingCategory
} from "@/data/troubleshooting";
import { 
  Search, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Wrench,
  Layers,
  BookOpen,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getArticleByTroubleshootingId } from "@/data/knowledgeBase";

export function TroubleshootingClient() {
  const t = useTranslations("Troubleshooting");
  const [selectedCategory, setSelectedCategory] = useState<TroubleshootingCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  // Deep-link hash navigation support
  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        setExpandedTopics(prev => ({ ...prev, [hash]: true }));
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    });
  }, []);

  const filteredTopics = useMemo(() => {
    return TROUBLESHOOTING_TOPICS.filter(topic => {
      const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.symptom.toLowerCase().includes(q) ||
        topic.possibleCauses.some(c => c.toLowerCase().includes(q)) ||
        topic.checks.some(c => c.toLowerCase().includes(q)) ||
        topic.actions.some(a => a.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={t("clearSearch")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {t("showingCount", { count: filteredTopics.length, total: TROUBLESHOOTING_TOPICS.length })}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
              selectedCategory === "all"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            )}
          >
            {t("allCategories")} ({TROUBLESHOOTING_TOPICS.length})
          </button>
          {TROUBLESHOOTING_CATEGORIES.map(cat => {
            const count = TROUBLESHOOTING_TOPICS.filter(t => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                  isSelected
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                )}
              >
                {t(`categories.${cat.id}`)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics List */}
      {filteredTopics.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">{t("noResultsTitle")}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t("noResultsDesc")}
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            {t("resetFilters")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTopics.map((topic) => {
            const isExpanded = !!expandedTopics[topic.id];
            return (
              <details
                key={topic.id}
                id={topic.id}
                open={isExpanded}
                onToggle={(e) => {
                  const nextState = e.currentTarget.open;
                  setExpandedTopics(prev => ({ ...prev, [topic.id]: nextState }));
                  if (nextState && typeof window !== "undefined") {
                    window.history.replaceState(null, "", `#${topic.id}`);
                  }
                }}
                className={cn(
                  "group bg-white border rounded-2xl transition-shadow overflow-hidden",
                  isExpanded ? "border-blue-300 shadow-sm" : "border-slate-200/90 hover:border-slate-300"
                )}
              >
                {/* Header / Summary bar */}
                <summary
                  className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-slate-50/50 list-none [&::-webkit-details-marker]:hidden"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {t(`categories.${topic.category}`)}
                      </span>
                      <span className="text-xs font-mono text-slate-400">#{topic.id}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {topic.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {topic.symptom}
                    </p>
                  </div>

                  <div className="shrink-0 p-2 text-slate-400 group-hover:text-slate-600 rounded-lg">
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>

                {/* Server-Rendered Explanatory Content (Always in initial HTML) */}
                <div 
                  id={`content-${topic.id}`} 
                  className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/40 space-y-6"
                >
                  {/* Section 1: Possible Causes */}
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t("sections.possibleCauses")}</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {topic.possibleCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 2: Checks to Perform */}
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t("sections.checksToPerform")}</span>
                    </h3>
                    <div className="space-y-2 text-xs text-slate-700">
                      {topic.checks.map((chk, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/70">
                          <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">0{idx + 1}.</span>
                          <span className="leading-relaxed">{chk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Practical Actions */}
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-purple-600" />
                      <span>{t("sections.practicalActions")}</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-800">
                      {topic.actions.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-purple-50/30 border border-purple-100 p-3 rounded-xl">
                          <ArrowRight className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
                          <span className="leading-relaxed font-medium">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 4: What Screen Tester Can & Cannot Test */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* What Screen Tester Can Test */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">
                          {t("sections.whatScreenTesterCanTest")}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {topic.whatScreenTesterCanTest.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {topic.whatScreenTesterCanTest.links.map((link) => (
                          <Link
                            key={link.testId}
                            href={link.testPath}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-medium hover:bg-black transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* What Screen Tester Cannot Determine */}
                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-slate-500" />
                        <h4 className="text-xs font-bold text-slate-800 uppercase font-mono">
                          {t("sections.whatScreenTesterCannotDetermine")}
                        </h4>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {topic.whatScreenTesterCannotDetermine.map((limit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                            <span>{limit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 5: When to Stop / Seek Service */}
                  <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-semibold block mb-0.5">{t("sections.whenToStop")}:</strong>
                      <p className="leading-relaxed text-amber-900">
                        {topic.whenToStop}
                      </p>
                    </div>
                  </div>

                  {/* Section 6: Knowledge Base Background Reference */}
                  {(() => {
                    const kbArticle = getArticleByTroubleshootingId(topic.id);
                    if (!kbArticle) return null;
                    return (
                      <div className="p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                        <div className="flex items-center gap-2 text-blue-950 font-medium">
                          <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Technical Reference: <strong>{kbArticle.title}</strong></span>
                        </div>
                        <Link
                          href={`/knowledge-base/${kbArticle.slug}`}
                          className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
                        >
                          <span>Read Knowledge Article</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    );
                  })()}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
