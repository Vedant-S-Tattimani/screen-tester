"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { 
  Crosshair, 
  Zap, 
  SunMedium, 
  Palette, 
  Compass, 
  CheckCircle2, 
  Sliders, 
  Sun, 
  Moon, 
  Maximize2, 
  TrendingUp, 
  AlignJustify, 
  Grid, 
  Lightbulb, 
  Focus, 
  Clock, 
  Eye, 
  Activity, 
  Wind, 
  Scissors, 
  EyeOff, 
  Type, 
  Square, 
  Layers, 
  Droplet, 
  Sparkles, 
  Hand,
  Search,
  ArrowRight,
  Monitor
} from "lucide-react";

export interface ScreenTestItem {
  id: string;
  href: string;
  title: string;
  description: string;
  category: string;
}

export interface ScreenTestCategory {
  id: string;
  title: string;
  tests: ScreenTestItem[];
}

interface AllScreenTestsProps {
  categories: ScreenTestCategory[];
  sectionTitle: string;
  sectionSubtitle: string;
  searchPlaceholder: string;
  filterAllText: string;
  noResultsText: string;
}

function getTestIcon(id: string) {
  switch (id) {
    case "dead-pixel-test":
      return <Crosshair className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "stuck-pixel-test":
      return <Zap className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "bright-pixel-test":
      return <SunMedium className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "color-test":
      return <Palette className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "color-gamut-test":
      return <Compass className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "color-accuracy-test":
      return <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "contrast-test":
      return <Sliders className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "brightness-test":
      return <Sun className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "black-level-test":
      return <Moon className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "white-level-test":
      return <Maximize2 className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "gamma-test":
      return <TrendingUp className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "color-banding-test":
      return <AlignJustify className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "uniformity-test":
      return <Grid className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "backlight-bleed-test":
      return <Lightbulb className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "blooming-test":
      return <Focus className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "burn-in-test":
      return <Clock className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "viewing-angle-test":
      return <Eye className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "refresh-rate-test":
      return <Activity className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "ghosting-test":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17" cy="4" r="2"/>
          <path d="m15 8-5 3-4-2"/>
          <path d="m13 13 3 5 4-1"/>
          <path d="M10 11v6l-4 3"/>
        </svg>
      );
    case "motion-blur-test":
      return <Wind className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "screen-tearing-test":
      return <Scissors className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "screen-flicker-test":
      return <EyeOff className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "sharpness-test":
      return <Type className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "solid-color-test":
      return <Square className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "grayscale-test":
      return <Layers className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "saturation-test":
      return <Droplet className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "hdr-capability-test":
      return <Sparkles className="w-3.5 h-3.5 stroke-[1.8]" />;
    case "touch-screen-test":
      return <Hand className="w-3.5 h-3.5 stroke-[1.8]" />;
    default:
      return <Monitor className="w-3.5 h-3.5 stroke-[1.8]" />;
  }
}

export function AllScreenTests({
  categories,
  sectionTitle,
  sectionSubtitle,
  searchPlaceholder,
  filterAllText,
  noResultsText
}: AllScreenTestsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalTestsCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.tests.length, 0);
  }, [categories]);

  // Filtered tests logic
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories.map((category) => {
      // If user selected a category tab and it's not this one, filter out
      if (selectedCategory !== "all" && category.id !== selectedCategory) {
        return { ...category, tests: [] };
      }

      // Filter by search query if any
      const matchingTests = category.tests.filter((test) => {
        if (!query) return true;
        return (
          test.title.toLowerCase().includes(query) ||
          test.description.toLowerCase().includes(query) ||
          test.id.toLowerCase().includes(query)
        );
      });

      return { ...category, tests: matchingTests };
    }).filter((category) => category.tests.length > 0);
  }, [categories, selectedCategory, searchQuery]);

  return (
    <section className="pt-2 pb-12 sm:pb-16 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12" id="all-screen-tests">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-gray-400 select-none">
              LIBRARY · {totalTestsCount} TESTS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-950 uppercase">
            {sectionTitle}
          </h2>
          <p className="text-xs sm:text-[13.5px] text-gray-500 mt-1 max-w-xl">
            {sectionSubtitle}
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-72 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-7 py-2 text-xs bg-gray-50/70 border border-gray-200/90 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-900 cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar select-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
            selectedCategory === "all"
              ? "bg-gray-950 text-white shadow-2xs"
              : "bg-gray-100/80 hover:bg-gray-200/70 text-gray-600 hover:text-gray-950"
          }`}
        >
          {filterAllText} ({totalTestsCount})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-gray-950 text-white shadow-2xs"
                : "bg-gray-100/80 hover:bg-gray-200/70 text-gray-600 hover:text-gray-950"
            }`}
          >
            {cat.title} ({cat.tests.length})
          </button>
        ))}
      </div>

      {/* Test Categories and Grid */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-8 sm:space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-gray-900 whitespace-nowrap">
                  {category.title}
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-semibold select-none">
                  {category.tests.length}
                </span>
                <div className="h-px w-full bg-gray-200/80" />
              </div>

              {/* Grid of Compact Test Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {category.tests.map((test) => (
                  <Link
                    key={test.id}
                    href={test.href}
                    className="group bg-white hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-3.5 transition-all flex items-start gap-3 shadow-2xs hover:shadow-xs min-h-[76px] focus-visible:ring-2 focus-visible:ring-gray-900"
                  >
                    {/* Icon */}
                    <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 group-hover:bg-gray-950 group-hover:text-white transition-colors mt-0.5">
                      {getTestIcon(test.id)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-semibold text-xs sm:text-[13px] text-gray-950 group-hover:text-black leading-snug line-clamp-1">
                          {test.title}
                        </h4>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all shrink-0 opacity-0 group-hover:opacity-100" />
                      </div>
                      <p className="text-[11px] sm:text-[11.5px] text-gray-500 leading-snug line-clamp-2 mt-0.5">
                        {test.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-xs sm:text-sm text-gray-500">
            {noResultsText} &ldquo;<span className="font-medium text-gray-900">{searchQuery}</span>&rdquo;
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 text-xs font-semibold text-gray-900 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
