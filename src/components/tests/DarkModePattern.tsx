"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun, Monitor, Check, Palette, Type, Layout, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DarkModePatternProps {
  testId?: string;
}

type ThemePreference = "light" | "dark" | "system";

export function DarkModePattern({ testId = "dark-mode-test" }: DarkModePatternProps) {
  const t = useTranslations("Tests.DarkModePattern");
  const [systemPref, setSystemPref] = useState<"light" | "dark">("light");
  const [selectedTheme, setSelectedTheme] = useState<ThemePreference>("system");
  const [colorSchemeSupport, setColorSchemeSupport] = useState(false);
  const [prefersContrast, setPrefersContrast] = useState("no-preference");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPref(mq.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) => setSystemPref(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);

    // Check color-scheme support
    setColorSchemeSupport(CSS.supports("color-scheme", "light dark"));

    // Check contrast preference
    if (window.matchMedia("(prefers-contrast: high)").matches) setPrefersContrast("high");
    else if (window.matchMedia("(prefers-contrast: more)").matches) setPrefersContrast("more");
    else if (window.matchMedia("(prefers-contrast: less)").matches) setPrefersContrast("less");

    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeTheme = selectedTheme === "system" ? systemPref : selectedTheme;
  const isDark = activeTheme === "dark";

  const sampleCards = [
    { title: t("sampleCard1Title"), desc: t("sampleCard1Desc"), icon: <Layout className="w-5 h-5" /> },
    { title: t("sampleCard2Title"), desc: t("sampleCard2Desc"), icon: <Type className="w-5 h-5" /> },
    { title: t("sampleCard3Title"), desc: t("sampleCard3Desc"), icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* System Detection */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-4">{t("systemDetection")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("osPreference")}</div>
            <div className="flex items-center justify-center gap-2">
              {systemPref === "dark" ? <Moon className="w-5 h-5 text-indigo-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <span className="font-bold text-gray-900 capitalize">{systemPref === "dark" ? t("dark") : t("light")}</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("colorSchemeCSS")}</div>
            <div className="flex items-center justify-center gap-2">
              {colorSchemeSupport ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <span className="w-5 h-5 text-red-500 font-bold">✕</span>
              )}
              <span className="font-bold text-gray-900">
                {colorSchemeSupport ? t("supported") : t("notSupported")}
              </span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("contrastPref")}</div>
            <span className="font-bold text-gray-900 capitalize">{prefersContrast}</span>
          </div>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">{t("previewTheme")}</h3>
        <div className="flex gap-2">
          {(["system", "light", "dark"] as ThemePreference[]).map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border",
                selectedTheme === theme
                  ? "bg-gray-950 text-white border-gray-950"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              )}
            >
              {theme === "system" ? <Monitor className="w-4 h-4" /> : theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {t(`themes.${theme}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Live Theme Preview */}
      <div className={cn(
        "rounded-2xl border p-6 transition-all duration-500",
        isDark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className={cn("text-lg font-bold", isDark ? "text-white" : "text-gray-950")}>{t("previewTitle")}</h2>
            <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium", isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600")}>
              {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              {isDark ? t("darkMode") : t("lightMode")}
            </div>
          </div>

          {/* Sample Text */}
          <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}>
            {t("previewText")}
          </p>

          {/* Sample Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleCards.map((card, i) => (
              <div key={i} className={cn(
                "p-4 rounded-xl border transition-all",
                isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
              )}>
                <div className={cn("mb-2", isDark ? "text-blue-400" : "text-blue-600")}>{card.icon}</div>
                <h4 className={cn("text-sm font-semibold mb-1", isDark ? "text-white" : "text-gray-900")}>{card.title}</h4>
                <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Sample UI Elements */}
          <div className="flex flex-wrap gap-2">
            <button className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all",
              isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
            )}>{t("primaryBtn")}</button>
            <button className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold border transition-all",
              isDark ? "border-gray-700 text-gray-300 bg-gray-800" : "border-gray-300 text-gray-700 bg-white"
            )}>{t("secondaryBtn")}</button>
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs",
              isDark ? "bg-green-900/30 text-green-400 border border-green-800" : "bg-green-50 text-green-700 border border-green-200"
            )}>
              <Check className="w-3.5 h-3.5" /> {t("successMsg")}
            </div>
          </div>

          {/* Toggle Example */}
          <div className={cn("flex items-center gap-3 p-3 rounded-lg", isDark ? "bg-gray-900" : "bg-gray-50")}>
            {isDark ? <ToggleRight className="w-8 h-8 text-blue-400" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}
            <span className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-600")}>{t("toggleLabel")}</span>
          </div>
        </div>
      </div>

      <p className={cn("text-[11px] text-center", "text-gray-400")}>{t("browserNote")}</p>
    </div>
  );
}
