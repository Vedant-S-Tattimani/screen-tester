"use client";

import Image from "next/image";
import "@/components/ExtensionCleanup";
import { useState, useRef, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SearchInput } from "./SearchInput";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"tests" | "inspection" | "tools" | "guides" | null>(null);

  const testsRef = useRef<HTMLDivElement>(null);
  const inspectionRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname.startsWith(path);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        openDropdown &&
        !testsRef.current?.contains(e.target as Node) &&
        !inspectionRef.current?.contains(e.target as Node) &&
        !toolsRef.current?.contains(e.target as Node) &&
        !guidesRef.current?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-gray-200/80 h-16">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-6 sm:px-8 lg:px-12">
        
        {/* Brand: Logo + SCREEN TESTER + Tagline */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2.5 sm:gap-3 group select-none py-1 focus-visible:ring-2 focus-visible:ring-gray-900 rounded" 
          onClick={() => {
            setMobileOpen(false);
            setOpenDropdown(null);
          }}
        >
          <Image
            src="/logo.png"
            alt="Screen Tester Logo"
            width={38}
            height={38}
            priority
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 aspect-square"
          />
          <div className="flex flex-col">
            <span className="font-mono text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.14em] text-gray-950 block leading-tight">
              SCREEN TESTER
            </span>
            <span className="text-[8.5px] font-mono font-medium tracking-[0.2em] text-gray-500 block uppercase">
              CHECK · INSPECT · UNDERSTAND
            </span>
          </div>
        </Link>

        {/* Center Navigation Dropdowns */}
        <nav className="hidden lg:flex items-center gap-7 lg:gap-8 h-full" aria-label="Main Navigation">
          
          {/* 1. Tests Dropdown */}
          <div 
            ref={testsRef}
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown("tests")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === "tests" ? null : "tests")}
              className={`flex items-center gap-1 text-[13px] font-medium transition-colors py-2 rounded focus-visible:ring-2 focus-visible:ring-gray-900 cursor-pointer ${
                isActive("/tests") && !isActive("/tests/display-info") && !isActive("/tests/resolution-checker") && !isActive("/tests/compare-displays") && !isActive("/tests/custom-pattern") ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
              aria-expanded={openDropdown === "tests"}
            >
              <span>{t("nav.tests")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "tests" ? "rotate-180 text-gray-900" : "text-gray-500"}`} />
            </button>

            {openDropdown === "tests" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200/90 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 px-3 py-1.5 border-b border-gray-100 mb-1">
                  {t("dropdown.popularTests")}
                </div>
                <div className="space-y-0.5">
                  <Link 
                    href="/tests/dead-pixel-test"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.deadPixels")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">PIXELS</span>
                  </Link>
                  <Link 
                    href="/tests/color-test"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.colorTest")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">COLOR</span>
                  </Link>
                  <Link 
                    href="/tests/brightness-test"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.brightness")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">LUM</span>
                  </Link>
                  <Link 
                    href="/tests/contrast-test"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.contrast")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">LUM</span>
                  </Link>
                  <Link 
                    href="/tests/ghosting-test"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.ghosting")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">MOTION</span>
                  </Link>
                  <Link 
                    href="/tests/refresh-rate-test"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.refreshRate")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">HZ</span>
                  </Link>
                </div>
                <div className="mt-1 pt-1 border-t border-gray-100">
                  <Link
                    href="/tests"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-950 hover:bg-gray-50 transition-colors"
                  >
                    <span>{t("dropdown.viewAllTests")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 2. Inspection Dropdown */}
          <div 
            ref={inspectionRef}
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown("inspection")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === "inspection" ? null : "inspection")}
              className={`flex items-center gap-1 text-[13px] font-medium transition-colors py-2 rounded focus-visible:ring-2 focus-visible:ring-gray-900 cursor-pointer ${
                isActive("/monitor-inspection") ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
              aria-expanded={openDropdown === "inspection"}
            >
              <span>{t("nav.inspection")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "inspection" ? "rotate-180 text-gray-900" : "text-gray-500"}`} />
            </button>

            {openDropdown === "inspection" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200/90 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 px-3 py-1.5 border-b border-gray-100 mb-1">
                  {t("dropdown.troubleshootInspect")}
                </div>
                <div className="space-y-0.5">
                  <Link 
                    href="/monitor-inspection/diagnostic"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50/60 hover:bg-purple-100/70 transition-colors"
                  >
                    <span>{t("dropdown.diagnoseProblem")}</span>
                    <span className="text-[9px] font-mono font-bold tracking-wider bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">{t("dropdown.wizardBadge")}</span>
                  </Link>
                  <Link 
                    href="/monitor-inspection/general"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.generalCheckup")}</span>
                    <span className="text-[10px] text-gray-500">{t("dropdown.subAllRound")}</span>
                  </Link>
                  <Link 
                    href="/monitor-inspection/used"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.usedMonitor")}</span>
                    <span className="text-[10px] text-gray-500">{t("dropdown.subPrePurchase")}</span>
                  </Link>
                  <Link 
                    href="/monitor-inspection/gaming"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.gamingDisplay")}</span>
                    <span className="text-[10px] text-gray-500">{t("dropdown.subHzMotion")}</span>
                  </Link>
                  <Link 
                    href="/monitor-inspection/oled"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.oledDisplay")}</span>
                    <span className="text-[10px] text-gray-500">{t("dropdown.subBurnIn")}</span>
                  </Link>
                  <Link 
                    href="/monitor-inspection/laptop"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.laptopDisplay")}</span>
                    <span className="text-[10px] text-gray-500">{t("dropdown.subDpiScale")}</span>
                  </Link>
                  <Link 
                    href="/monitor-inspection/tv"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("inspection.tv")}</span>
                    <span className="text-[10px] text-gray-500">{t("inspection.tvSubtitle")}</span>
                  </Link>
                </div>
                <div className="mt-1 pt-1 border-t border-gray-100 flex flex-col gap-0.5">
                  <Link
                    href="/monitor-inspection/summary"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <span>{t("dropdown.savedReports")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/monitor-inspection"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-950 hover:bg-gray-50 transition-colors"
                  >
                    <span>{t("dropdown.inspectionHub")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. Tools Dropdown */}
          <div 
            ref={toolsRef}
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown("tools")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === "tools" ? null : "tools")}
              className={`flex items-center gap-1 text-[13px] font-medium transition-colors py-2 rounded focus-visible:ring-2 focus-visible:ring-gray-900 cursor-pointer ${
                isActive("/tools") || isActive("/tests/display-info") || isActive("/tests/resolution-checker") || isActive("/tests/compare-displays") || isActive("/tests/custom-pattern") ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
              aria-expanded={openDropdown === "tools"}
            >
              <span>{t("nav.tools")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "tools" ? "rotate-180 text-gray-900" : "text-gray-500"}`} />
            </button>

            {openDropdown === "tools" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200/90 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 px-3 py-1.5 border-b border-gray-100 mb-1">
                  {t("dropdown.utilitiesTools")}
                </div>
                <div className="space-y-0.5">
                  <Link 
                    href="/tests/display-info"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.displayInfo")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">GPU / INFO</span>
                  </Link>
                  <Link 
                    href="/tests/resolution-checker"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.resolutionPpi")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">GEOMETRY</span>
                  </Link>
                  <Link 
                    href="/tests/compare-displays"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.compareDisplays")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">COMPARE</span>
                  </Link>
                  <Link 
                    href="/tests/custom-pattern"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.customPattern")}</span>
                    <span className="text-[10px] text-gray-500 font-mono">PATTERN</span>
                  </Link>
                </div>
                <div className="mt-1 pt-1 border-t border-gray-100">
                  <Link
                    href="/tools"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-950 hover:bg-gray-50 transition-colors"
                  >
                    <span>{t("dropdown.viewAllTools")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 4. Guides Dropdown */}
          <div 
            ref={guidesRef}
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown("guides")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === "guides" ? null : "guides")}
              className={`flex items-center gap-1 text-[13px] font-medium transition-colors py-2 rounded focus-visible:ring-2 focus-visible:ring-gray-900 cursor-pointer ${
                isActive("/guides") ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
              aria-expanded={openDropdown === "guides"}
            >
              <span>{t("nav.guides")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "guides" ? "rotate-180 text-gray-900" : "text-gray-500"}`} />
            </button>

            {openDropdown === "guides" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200/90 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 px-3 py-1.5 border-b border-gray-100 mb-1">
                  {t("dropdown.practicalGuides")}
                </div>
                <div className="space-y-0.5">
                  <Link 
                    href="/guides/dead-pixel-vs-stuck-pixel"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.deadVsStuck")}</span>
                  </Link>
                  <Link 
                    href="/guides/how-to-check-monitor-ghosting"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.ghostingMotion")}</span>
                  </Link>
                  <Link 
                    href="/guides/how-to-check-backlight-bleed"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.backlightBleed")}</span>
                  </Link>
                  <Link 
                    href="/guides/monitor-viewing-angles-explained"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  >
                    <span>{t("dropdown.viewingAngles")}</span>
                  </Link>
                </div>
                <div className="mt-1 pt-1 border-t border-gray-100">
                  <Link
                    href="/guides"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-950 hover:bg-gray-50 transition-colors"
                  >
                    <span>{t("dropdown.allGuides")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Right Section: Embedded Search Bar + Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Desktop Search Bar matching reference pill */}
          <div className="hidden lg:block lg:w-64">
            <SearchInput id="header-search-input" name="q" placeholder={t("searchPlaceholder")} />
          </div>

          {/* Language Selector */}
          <LanguageSwitcher />

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-1.5 text-gray-600 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 rounded cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl flex flex-col py-4 px-6 space-y-4 z-50 animate-in fade-in duration-150">
          <div className="mb-1">
            <SearchInput id="header-search-input-mobile" name="q" onSelect={() => setMobileOpen(false)} placeholder={t("searchPlaceholder")} />
          </div>

          <div className="border-b border-gray-100 pb-3">
            <Link 
              href="/tests" 
              className="block text-sm font-semibold text-gray-950 mb-2"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.tests")}
            </Link>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
              <Link href="/tests/dead-pixel-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.deadPixels")}</Link>
              <Link href="/tests/color-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.colorTest")}</Link>
              <Link href="/tests/brightness-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.brightness")}</Link>
              <Link href="/tests/ghosting-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.ghosting")}</Link>
              <Link href="/tests/refresh-rate-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.refreshRate")}</Link>
              <Link href="/tests" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1 font-medium text-gray-950">{t("dropdown.viewAllTests")} →</Link>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-3">
            <Link 
              href="/monitor-inspection" 
              className="block text-sm font-semibold text-gray-950 mb-2"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.inspection")}
            </Link>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
              <Link href="/monitor-inspection/diagnostic" onClick={() => setMobileOpen(false)} className="hover:text-purple-700 py-1 font-semibold text-purple-700">{t("dropdown.diagnoseProblem")}</Link>
              <Link href="/monitor-inspection/general" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.generalCheckup")}</Link>
              <Link href="/monitor-inspection/used" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.usedMonitor")}</Link>
              <Link href="/monitor-inspection/gaming" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.gamingDisplay")}</Link>
              <Link href="/monitor-inspection/oled" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.oledDisplay")}</Link>
              <Link href="/monitor-inspection/laptop" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.laptopDisplay")}</Link>
              <Link href="/monitor-inspection/tv" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("inspection.tv")}</Link>
              <Link href="/monitor-inspection/summary" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1 font-medium text-blue-600">{t("dropdown.savedReports")} →</Link>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-3">
            <Link 
              href="/tools" 
              className="block text-sm font-semibold text-gray-950 mb-2"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.tools")}
            </Link>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
              <Link href="/tests/display-info" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.displayInfo")}</Link>
              <Link href="/tests/resolution-checker" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.resolutionPpi")}</Link>
              <Link href="/tests/compare-displays" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.compareDisplays")}</Link>
              <Link href="/tests/custom-pattern" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.customPattern")}</Link>
              <Link href="/tools" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1 font-medium text-gray-950 col-span-2">{t("dropdown.viewAllTools")} →</Link>
            </div>
          </div>

          <div>
            <Link 
              href="/guides" 
              className="block text-sm font-semibold text-gray-950 mb-2"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.guides")}
            </Link>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
              <Link href="/guides/dead-pixel-vs-stuck-pixel" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.deadVsStuck")}</Link>
              <Link href="/guides/how-to-check-monitor-ghosting" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.ghostingMotion")}</Link>
              <Link href="/guides/how-to-check-backlight-bleed" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("dropdown.backlightBleed")}</Link>
              <Link href="/guides" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1 font-medium text-gray-950">{t("dropdown.allGuides")} →</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}