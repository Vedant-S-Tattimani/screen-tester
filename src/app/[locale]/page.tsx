import Image from "next/image";
import { Link } from "@/i18n/routing";
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Monitor, 
  Sun, 
  Zap, 
  Activity, 
  RefreshCw, 
  Gamepad2, 
  Laptop, 
  Tv, 
  Eye, 
  SlidersHorizontal, 
  BookOpen 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 bg-white text-gray-950">
      {/* 1. HERO SECTION */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Small Eyebrow */}
            <div className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.22em] text-gray-500 mb-4">
              A CLEARER PICTURE
            </div>

            {/* Large Strong Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[62px] font-extrabold tracking-tight text-gray-950 leading-[1.06] mb-6">
              Test your monitor.<br />
              Find the flaws.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
              A comprehensive suite of tools to test your monitor for dead pixels, backlight bleed, color accuracy, motion blur, and more. Free, precise, and works directly in your browser.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8">
              <Link 
                href="/monitor-inspection"
                className="inline-flex items-center justify-center gap-2.5 bg-gray-950 text-white hover:bg-gray-800 px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Testing</span>
              </Link>
              <Link 
                href="/tests"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-7 py-3.5 rounded-full font-medium text-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Browse All Tests</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Value Checkmarks */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs sm:text-[13px] text-gray-700 font-medium select-none">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-900 stroke-[2.2]" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-900 stroke-[2.2]" />
                <span>No installation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-900 stroke-[2.2]" />
                <span>Works in your browser</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column — Realistic Desktop Monitor */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end justify-center relative">
            <div className="w-full max-w-[620px] relative">
              <Image
                src="/hero-monitor.jpg"
                alt="Realistic desktop monitor testing display performance"
                width={1200}
                height={896}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-sm"
              />
              <div className="text-right mt-1 mr-2">
                <span className="font-serif italic text-xs text-gray-400 select-none">
                  Better displays start with better tools.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. QUICK TESTS SECTION */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-gray-900">
              QUICK TESTS
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Run the most common tests instantly.
            </p>
          </div>
          <Link 
            href="/tests"
            className="text-xs font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            <span>View all tests</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Compact Test Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Dead Pixels */}
          <Link 
            href="/tests/dead-pixel-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-xs transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Monitor className="w-4 h-4 text-gray-800 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[13px] font-semibold text-gray-900">Dead Pixels</span>
          </Link>

          {/* Color Test */}
          <Link 
            href="/tests/color-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-xs transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 via-amber-400 via-emerald-400 to-blue-500 shadow-xs group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[13px] font-semibold text-gray-900">Color Test</span>
          </Link>

          {/* Brightness */}
          <Link 
            href="/tests/brightness-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-xs transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[13px] font-semibold text-gray-900">Brightness</span>
          </Link>

          {/* Contrast */}
          <Link 
            href="/tests/contrast-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-xs transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <div className="w-4 h-4 rounded-full border border-gray-900 overflow-hidden flex group-hover:scale-110 transition-transform">
                <div className="w-1/2 h-full bg-gray-900" />
                <div className="w-1/2 h-full bg-white" />
              </div>
            </div>
            <span className="text-[13px] font-semibold text-gray-900">Contrast</span>
          </Link>

          {/* Ghosting */}
          <Link 
            href="/tests/ghosting-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-xs transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-gray-900 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[13px] font-semibold text-gray-900">Ghosting</span>
          </Link>

          {/* Refresh Rate */}
          <Link 
            href="/tests/refresh-rate-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:shadow-xs transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[13px] font-semibold text-gray-900">Refresh Rate</span>
          </Link>
        </div>
      </section>

      {/* 3. WHAT ARE YOU CHECKING? SECTION */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
              What are you checking?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Choose a guide or workflow based on your situation.
            </p>
          </div>
          <Link 
            href="/monitor-inspection"
            className="text-xs font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            <span>View all inspection workflows</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 5 Distinct Workflows (No "New Monitor") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* 1. Used Monitor */}
          <Link 
            href="/monitor-inspection/used"
            className="bg-[#f8f9fa] hover:bg-[#f3f4f6] border border-gray-200/70 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-xs min-h-[145px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 mb-3">
                <RefreshCw className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </div>
              <h3 className="font-semibold text-[14px] text-gray-900 mb-1">Used monitor</h3>
              <p className="text-xs text-gray-500 leading-snug">Look for defects and hidden issues.</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 2. Gaming Display */}
          <Link 
            href="/monitor-inspection/gaming"
            className="bg-[#f8f9fa] hover:bg-[#f3f4f6] border border-gray-200/70 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-xs min-h-[145px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 mb-3">
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-[14px] text-gray-900 mb-1">Gaming display</h3>
              <p className="text-xs text-gray-500 leading-snug">Check refresh rate, tearing and motion.</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 3. OLED Display */}
          <Link 
            href="/monitor-inspection/oled"
            className="bg-[#f8f9fa] hover:bg-[#f3f4f6] border border-gray-200/70 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-xs min-h-[145px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 mb-3">
                <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-[14px] text-gray-900 mb-1">OLED display</h3>
              <p className="text-xs text-gray-500 leading-snug">Inspect for burn-in and uniformity.</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 4. Laptop Display */}
          <Link 
            href="/guides/laptop-screen-test"
            className="bg-[#f8f9fa] hover:bg-[#f3f4f6] border border-gray-200/70 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-xs min-h-[145px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 mb-3">
                <Laptop className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-[14px] text-gray-900 mb-1">Laptop display</h3>
              <p className="text-xs text-gray-500 leading-snug">Test your built-in screen or external monitor.</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 5. TV or Large Display */}
          <Link 
            href="/guides/tv-screen-test"
            className="bg-[#f8f9fa] hover:bg-[#f3f4f6] border border-gray-200/70 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-xs min-h-[145px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 mb-3">
                <Tv className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-[14px] text-gray-900 mb-1">TV or large display</h3>
              <p className="text-xs text-gray-500 leading-snug">Check size, resolution and image quality.</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>
        </div>
      </section>

      {/* 4. BOTTOM INFORMATION STRIP */}
      <section className="border-t border-b border-gray-150 py-7 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Column 1 */}
          <div className="flex items-start gap-3">
            <Eye className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 tracking-tight">
                Test visually, with confidence
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Detect issues before they become a problem.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex items-start gap-3 md:border-l md:border-gray-200/70 md:pl-8">
            <SlidersHorizontal className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 tracking-tight">
                Tools for every display
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                LCD, OLED, gaming, laptop, TV and more.
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex items-start gap-3 md:border-l md:border-gray-200/70 md:pl-8">
            <BookOpen className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 tracking-tight">
                Clear, unbiased guidance
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Understand what you see and what it means.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}