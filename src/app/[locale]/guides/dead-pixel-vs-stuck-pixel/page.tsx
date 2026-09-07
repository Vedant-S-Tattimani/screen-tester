import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;
  return {
    title: "Dead Pixel vs Stuck Pixel: Diagnosis & Fixes | Monitor Tester",
    description: "Understand the visual and physical differences between dead pixels and stuck subpixels, how to test for them, and manufacturer warranty policies.",
    alternates: {
      canonical: "/guides/dead-pixel-vs-stuck-pixel"
    }
  };
}

export default async function DeadPixelVsStuckPixelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-8">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          DISPLAY GUIDE & ANALYSIS
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Dead Pixel vs Stuck Pixel: How to Tell the Difference
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Pixel flaws are among the most common defects found in LCD and OLED panels. Knowing whether an aberrant pixel is permanently dead or merely stuck determines whether it can be recovered or warrants a manufacturer warranty return.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 mb-3">
            Permanent Defect
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Dead Pixel</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A pixel whose transistor has completely failed, leaving all three RGB subpixels permanently switched off (or unpowered).
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <strong>Appearance:</strong> Always appears pitch black against white and colored backgrounds.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <strong>Cause:</strong> Broken electrode, failed thin-film transistor (TFT), or severed micro-trace.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <strong>Recovery:</strong> Hardware-level failure; cannot be fixed via software cycling.
            </li>
          </ul>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            Potentially Recoverable
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Stuck Pixel</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A pixel where one or two subpixels (Red, Green, or Blue) remain constantly energised and cannot turn off.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <strong>Appearance:</strong> A bright red, green, blue, cyan, or magenta dot, most noticeable against dark or black backgrounds.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <strong>Cause:</strong> Liquid crystal molecules temporarily locked in open state or charge imbalance.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <strong>Recovery:</strong> Rapid high-frequency color flashing (stuck pixel cycle) can sometimes unstick the crystal orientation.
            </li>
          </ul>
        </div>
      </div>

      {/* ISO Standard Info */}
      <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-muted/20 my-10 space-y-4">
        <h3 className="text-lg font-bold text-foreground">ISO 9241-307 Panel Defect Standards</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Most consumer monitors are classified as <strong>Class 2 panels</strong>. Under ISO standards, manufacturers allow up to 2 permanently bright pixels, 2 permanently dark pixels, or up to 5 defective subpixels per million pixels before considering the panel defective for warranty replacement.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you have discovered a pixel defect within the retailer&apos;s initial return or exchange window (typically 14 to 30 days), return it directly to the retailer rather than filing a manufacturer warranty claim, which may be rejected under Class 2 allowances.
        </p>
      </div>

      {/* Recommended Diagnostic Tests */}
      <div className="mt-12 pt-8 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-4">Run Diagnostic Tests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tests/dead-pixel-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Dead Pixel Test</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Cycle through full screen solid white and primary colors</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/tests/stuck-pixel-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Stuck Pixel Fixer & Test</h4>
              <p className="text-xs text-muted-foreground mt-0.5">High-frequency RGB subpixel cycling tool</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
