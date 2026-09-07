import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { BookOpen, ShieldCheck, Eye, ArrowRight, Layers } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;
  return {
    title: "Display Knowledge Base & Technical Guide | Monitor Tester",
    description: "In-depth technical explanations of display panel technologies (IPS, OLED, VA, TN), common screen defects, calibration principles, and troubleshooting.",
    alternates: {
      canonical: "/knowledge-base"
    }
  };
}

export default async function KnowledgeBasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex-1 bg-white text-gray-950">
      <div className="max-w-[1400px] mx-auto py-16 sm:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3 select-none">
            TECHNICAL REFERENCE & TROUBLESHOOTING
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-950 mb-5">
            Display Knowledge Base
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Clear, technically accurate explanations of panel architectures, defect diagnostics, calibration fundamentals, and browser-observable display metrics.
          </p>
        </div>

        {/* Section 1: Panel Technologies */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200/80 pb-3">
            <Layers className="w-5 h-5 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-950">Panel Technologies Compared</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* IPS */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-blue-600 font-semibold tracking-wider">In-Plane Switching</span>
                <h3 className="text-lg font-bold text-gray-950 mt-1 mb-2">IPS Panels</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Liquid crystals align horizontally parallel to the glass. Offers wide 178° viewing angles and superior color fidelity. Trade-off: moderate contrast (~1,000:1) and characteristic off-axis white glow (IPS glow).
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
                <strong>Best for:</strong> Creative work, photo/video editing, office productivity.
              </div>
            </div>

            {/* VA */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-600 font-semibold tracking-wider">Vertical Alignment</span>
                <h3 className="text-lg font-bold text-gray-950 mt-1 mb-2">VA Panels</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Crystals align perpendicularly when unpowered. Provides deep blacks and high static contrast ratios (3,000:1 to 5,000:1). Trade-off: dark-level smearing (black ghosting) and slight gamma shift at wider viewing angles.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
                <strong>Best for:</strong> Dark-room movie viewing, narrative single-player gaming.
              </div>
            </div>

            {/* OLED */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-purple-600 font-semibold tracking-wider">Self-Emissive Organic</span>
                <h3 className="text-lg font-bold text-gray-950 mt-1 mb-2">OLED / QD-OLED</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Each pixel emits its own light with zero backlight. Delivers infinite contrast, true black levels (0.000 nits), and instantaneous 0.03ms pixel response. Trade-off: potential permanent burn-in on static desktop elements and ABL dimming.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
                <strong>Best for:</strong> HDR content, competitive high-motion gaming, cinema.
              </div>
            </div>

            {/* TN */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-amber-600 font-semibold tracking-wider">Twisted Nematic</span>
                <h3 className="text-lg font-bold text-gray-950 mt-1 mb-2">TN Panels</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Legacy architecture with fast physical response times and affordable cost. Trade-off: severe vertical color inversion, narrow viewing angles, and low color saturation compared to modern IPS and OLED.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
                <strong>Best for:</strong> Budget competitive esports where response speed supersedes color.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Defect Identification */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200/80 pb-3">
            <Eye className="w-5 h-5 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-950">How to Spot Common Display Defects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dead vs Stuck Pixels */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white">
              <h3 className="text-base font-bold text-gray-950 mb-2">Dead vs. Stuck Pixels</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                A <strong>dead pixel</strong> is permanently off, visible as a persistent black dot on light backgrounds. A <strong>stuck pixel</strong> has one or two subpixels permanently energised, appearing as a bright red, green, or blue dot on dark backgrounds.
              </p>
              <Link href="/tests/dead-pixel-test" className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1">
                Run Dead Pixel Test <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Backlight Bleed vs IPS Glow */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white">
              <h3 className="text-base font-bold text-gray-950 mb-2">Backlight Bleed vs. IPS Glow</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                <strong>Backlight bleed</strong> originates from bezel frame pinching and does not shift when you change your viewing angle. <strong>IPS glow</strong> is an inherent optical characteristic of IPS crystals that changes intensity and location as you move your head.
              </p>
              <Link href="/tests/backlight-bleed-test" className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1">
                Run Backlight Bleed Test <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Ghosting vs Overshoot */}
            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white">
              <h3 className="text-base font-bold text-gray-950 mb-2">Ghosting vs. Inverse Ghosting</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                <strong>Ghosting</strong> is dark/colored trailing caused by slow liquid crystal transitions. <strong>Inverse ghosting (overshoot)</strong> is a bright halo caused by aggressive monitor overdrive voltage pushing crystals past their target color.
              </p>
              <Link href="/tests/ghosting-test" className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1">
                Run Ghosting Test <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Browser Capabilities & Calibration Honesty */}
        <section className="mb-16 border border-gray-200/80 rounded-2xl p-8 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-950">Browser Testing Boundaries & Honesty</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
            Browser APIs can render mathematically precise color swatches, stepped luminance gradients, and monitor requestAnimationFrame timing. However, web browsers have legitimate technical boundaries:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-gray-200/60">
              <strong className="text-gray-900 block mb-1">Color Accuracy</strong>
              <span className="text-gray-500">Requires hardware spectrophotometers/colorimeters. The browser provides visual gamut checks.</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200/60">
              <strong className="text-gray-900 block mb-1">Luminance (Nits)</strong>
              <span className="text-gray-500">Browsers cannot measure emitted photometric light. Use stepped grayscale to calibrate clipping.</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200/60">
              <strong className="text-gray-900 block mb-1">Pixel Response (GtG)</strong>
              <span className="text-gray-500">Physical crystal transition times require high-speed pursuit cameras. We test visual trail perception.</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200/60">
              <strong className="text-gray-900 block mb-1">Private & Local</strong>
              <span className="text-gray-500">All tests execute strictly in client-side memory. Zero telemetry or personal data is collected.</span>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-200/80">
          <Link href="/guides" className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Browse Device Guides</span>
          </Link>
          <Link href="/faq" className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1.5">
            <span>Read Frequently Asked Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
