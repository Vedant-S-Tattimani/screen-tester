import Image from "next/image";
import { Link } from "@/i18n/routing";
import { 
  AppWindow, 
  ShieldCheck, 
  Laptop, 
  Globe, 
  Sun, 
  Activity, 
  ArrowRight, 
  Monitor, 
  RefreshCw, 
  Gamepad2, 
  Tv, 
  BookOpen, 
  GraduationCap, 
  Cog, 
  HelpCircle 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 bg-white text-[#0f172a]">
      {/* ================================================== */}
      {/* 1. HERO SECTION                                    */}
      {/* ================================================== */}
      <section className="pt-8 sm:pt-11 pb-10 sm:pb-12 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Eyebrow */}
            <div className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.24em] text-gray-400 mb-4 select-none">
              TEST. INSPECT. UNDERSTAND.
            </div>

            {/* Large Bold Headline (exactly 2 lines on desktop) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[66px] font-bold tracking-[-0.035em] text-gray-950 leading-[1.07] mb-5">
              Check your display.<br />
              Find the flaws.
            </h1>

            {/* Practical Utility Description */}
            <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed max-w-xl mb-9 font-normal">
              A comprehensive suite of tools to test your monitor for dead pixels, backlight bleed, color accuracy, motion blur, and more. Free, precise, and works directly in your browser.
            </p>

            {/* Trust / Product Attributes - 4 concise horizontal items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-1 select-none">
              {/* 1. Works in your browser */}
              <div className="flex items-start gap-2.5">
                <AppWindow className="w-4 h-4 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <div className="text-[12px] font-semibold text-gray-900 leading-tight">Works in your browser</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">No software required</div>
                </div>
              </div>

              {/* 2. Private and secure */}
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <div className="text-[12px] font-semibold text-gray-900 leading-tight">Private and secure</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">All tests run locally</div>
                </div>
              </div>

              {/* 3. Works on any device */}
              <div className="flex items-start gap-2.5">
                <Laptop className="w-4 h-4 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <div className="text-[12px] font-semibold text-gray-900 leading-tight">Works on any device</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">Desktop, laptop, tablet, mobile</div>
                </div>
              </div>

              {/* 4. Multi-language */}
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <div className="text-[12px] font-semibold text-gray-900 leading-tight">Multi-language</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">Available in multiple languages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Column — Realistic Desktop Monitor */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
            <div className="w-full max-w-[580px] relative">
              <Image
                src="/hero-monitor.jpg"
                alt="Realistic desktop monitor testing display performance"
                width={1200}
                height={896}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
              
              {/* Screen Tag inside monitor display */}
              <div className="absolute right-[14%] bottom-[33%] text-right pointer-events-none select-none">
                <p className="text-[10px] sm:text-[11px] text-white/95 font-normal leading-snug drop-shadow-xs">
                  Better displays<br />for a clearer world.
                </p>
              </div>

              {/* Subtle handwritten-style editorial annotation */}
              <div className="hidden xl:flex absolute -right-12 top-[26%] flex-col items-center select-none pointer-events-none">
                <span className="font-serif italic text-[13px] text-gray-400 tracking-wide leading-snug text-center">
                  See every<br />detail<br />clearly.
                </span>
                <span className="w-6 h-[1px] bg-gray-300 my-1.5" />
                <svg width="18" height="24" viewBox="0 0 18 24" fill="none" className="text-gray-300 stroke-current">
                  <path d="M9 1 C9 8, 8 16, 9 22 M5 18 L9 22 L13 18" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 2. QUICK CHECKS SECTION                           */}
      {/* ================================================== */}
      <section className="pt-2 pb-8 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-gray-950">
              Quick checks
            </h2>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Run the most common tests instantly.
            </p>
          </div>
          <Link 
            href="/tests"
            className="text-[13px] font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            <span>View all tests</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 5 Compact Horizontal Quick Check Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {/* 1. Dead Pixel Test */}
          <Link 
            href="/tests/dead-pixel-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between group transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* 3x3 pixel grid icon */}
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" className="text-gray-800">
                  <circle cx="3" cy="3" r="1.3" />
                  <circle cx="9" cy="3" r="1.3" />
                  <circle cx="15" cy="3" r="1.3" />
                  <circle cx="3" cy="9" r="1.3" />
                  <circle cx="9" cy="9" r="1.3" />
                  <circle cx="15" cy="9" r="1.3" />
                  <circle cx="3" cy="15" r="1.3" />
                  <circle cx="9" cy="15" r="1.3" />
                  <circle cx="15" cy="15" r="1.3" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-gray-950 truncate">
                  Dead Pixel Test
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight truncate">
                  Find dark or bright pixels
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>

          {/* 2. Color Test */}
          <Link 
            href="/tests/color-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between group transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Segmented Color Wheel Donut */}
              <div 
                className="w-5 h-5 rounded-full p-[3px] shrink-0" 
                style={{ background: 'conic-gradient(#ef4444 0deg, #f97316 45deg, #eab308 90deg, #22c55e 135deg, #06b6d4 180deg, #3b82f6 225deg, #8b5cf6 270deg, #ec4899 315deg, #ef4444 360deg)' }}
              >
                <div className="w-full h-full rounded-full bg-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-gray-950 truncate">
                  Color Test
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight truncate">
                  Inspect colors and saturation
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>

          {/* 3. Brightness Test */}
          <Link 
            href="/tests/brightness-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between group transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4 text-gray-800 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-gray-950 truncate">
                  Brightness Test
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight truncate">
                  Inspect visibility
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>

          {/* 4. Ghosting Test */}
          <Link 
            href="/tests/ghosting-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between group transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                  <rect width="13" height="10" x="9" y="4" rx="1.5" />
                  <path d="M13 14v3" />
                  <path d="M10 17h6" />
                  <path d="M2 6h4" />
                  <path d="M2 10h5" />
                  <path d="M2 14h3" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-gray-950 truncate">
                  Ghosting Test
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight truncate">
                  Check motion clarity
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>

          {/* 5. Refresh Rate Test */}
          <Link 
            href="/tests/refresh-rate-test"
            className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between group transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-blue-700 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-gray-950 truncate">
                  Refresh Rate Test
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight truncate">
                  Measure frame timing
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. INSPECTION WORKFLOWS SECTION                    */}
      {/* ================================================== */}
      <section className="pt-2 pb-8 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-gray-950">
              Choose an inspection workflow
            </h2>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Guided checks for your specific situation.
            </p>
          </div>
          <Link 
            href="/monitor-inspection"
            className="text-[13px] font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            <span>View all workflows</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Subtle Pastel Tinted Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {/* 1. New Monitor (very pale blue) */}
          <Link 
            href="/monitor-inspection/new"
            className="bg-[#f0f6fc] border border-[#e1ecf8] hover:border-[#cbdef4] rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer min-h-[142px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-7 h-7 flex items-center text-blue-600 mb-3">
                <Monitor className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-900 mb-1">New monitor</h3>
              <p className="text-[11px] text-gray-500 leading-snug">Essential checks before first use</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 2. Used Monitor (very pale green) */}
          <Link 
            href="/monitor-inspection/used"
            className="bg-[#f0f9f3] border border-[#def2e4] hover:border-[#caebd2] rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer min-h-[142px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-7 h-7 flex items-center text-emerald-600 mb-3">
                <RefreshCw className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-900 mb-1">Used monitor</h3>
              <p className="text-[11px] text-gray-500 leading-snug">Look for common issues and hidden defects</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 3. Gaming Display (very pale warm tone) */}
          <Link 
            href="/monitor-inspection/gaming"
            className="bg-[#fdf6f0] border border-[#f8e7d9] hover:border-[#f1d4be] rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer min-h-[142px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-7 h-7 flex items-center text-amber-700 mb-3">
                <Gamepad2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-900 mb-1">Gaming display</h3>
              <p className="text-[11px] text-gray-500 leading-snug">Check refresh rate, tearing, and motion clarity</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 4. OLED Display (very pale violet) */}
          <Link 
            href="/monitor-inspection/oled"
            className="bg-[#f7f4fc] border border-[#ece4f8] hover:border-[#ddd1f4] rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer min-h-[142px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-7 h-7 flex items-center text-purple-600 mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <circle cx="3" cy="3" r="1.3" />
                  <circle cx="7.6" cy="3" r="1.3" />
                  <circle cx="12.3" cy="3" r="1.3" />
                  <circle cx="17" cy="3" r="1.3" />
                  <circle cx="3" cy="7.6" r="1.3" />
                  <circle cx="7.6" cy="7.6" r="1.3" />
                  <circle cx="12.3" cy="7.6" r="1.3" />
                  <circle cx="17" cy="7.6" r="1.3" />
                  <circle cx="3" cy="12.3" r="1.3" />
                  <circle cx="7.6" cy="12.3" r="1.3" />
                  <circle cx="12.3" cy="12.3" r="1.3" />
                  <circle cx="17" cy="12.3" r="1.3" />
                  <circle cx="3" cy="17" r="1.3" />
                  <circle cx="7.6" cy="17" r="1.3" />
                  <circle cx="12.3" cy="17" r="1.3" />
                  <circle cx="17" cy="17" r="1.3" />
                </svg>
              </div>
              <h3 className="font-semibold text-[13px] text-gray-900 mb-1">OLED display</h3>
              <p className="text-[11px] text-gray-500 leading-snug">Test for burn-in, uniformity, and HDR performance</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 5. Laptop Display (very pale cyan) */}
          <Link 
            href="/monitor-inspection/laptop"
            className="bg-[#f1f9fa] border border-[#daf2f5] hover:border-[#c3e8ec] rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer min-h-[142px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-7 h-7 flex items-center text-cyan-700 mb-3">
                <Laptop className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-900 mb-1">Laptop display</h3>
              <p className="text-[11px] text-gray-500 leading-snug">Quick checks for built-in laptop screens</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>

          {/* 6. TV (very pale rose) */}
          <Link 
            href="/monitor-inspection/tv"
            className="bg-[#fdf2f4] border border-[#fbe0e5] hover:border-[#f6c7d0] rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer min-h-[142px] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div>
              <div className="w-7 h-7 flex items-center text-rose-600 mb-3">
                <Tv className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-900 mb-1">TV</h3>
              <p className="text-[11px] text-gray-500 leading-snug">Inspect your TV&apos;s display quality and performance</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all self-end mt-3" />
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. LOWER RESOURCE INDEX BAR                        */}
      {/* ================================================== */}
      <section className="pt-2 pb-14 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        <div className="border border-gray-200/85 rounded-2xl bg-white overflow-hidden shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/80">
            
            {/* 1. Display guides */}
            <Link
              href="/guides"
              className="p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50/70 transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <BookOpen className="w-5 h-5 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
                    Display guides
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    Learn how to spot defects and interpret what you see
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
            </Link>

            {/* 2. Knowledge base */}
            <Link
              href="/knowledge-base"
              className="p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50/70 transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <GraduationCap className="w-5 h-5 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
                    Knowledge base
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    Clear explanations and troubleshooting help
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
            </Link>

            {/* 3. Display information */}
            <Link
              href="/tests/resolution-checker"
              className="p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50/70 transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <Cog className="w-5 h-5 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
                    Display information
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    View resolution, DPR, color depth and more about your display
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
            </Link>

            {/* 4. Frequently asked questions */}
            <Link
              href="/faq"
              className="p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50/70 transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <HelpCircle className="w-5 h-5 text-gray-800 shrink-0 mt-0.5 stroke-[1.8]" />
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
                    Frequently asked questions
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    Get answers to common questions
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}