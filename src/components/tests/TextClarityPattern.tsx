"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { ShieldAlert, Info, Maximize, ZoomIn } from "lucide-react";

interface TextClarityPatternProps {
  testId?: string;
}

type TextContrastTheme = "dark-on-light" | "light-on-dark" | "colored-fringing";

const FONT_SCALES = [8, 10, 12, 14, 16, 20, 24, 32];


export function TextClarityPattern({ testId = "text-clarity-test" }: TextClarityPatternProps) {
  const { toggleFullscreen } = useTestContext();
  const [theme, setTheme] = useState<TextContrastTheme>("dark-on-light");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  return (
    <>
      {/* Test Inspection Surface */}
      <div
        className={`absolute inset-0 overflow-auto select-none transition-colors duration-200 ${
          theme === "dark-on-light"
            ? "bg-white text-slate-900"
            : theme === "light-on-dark"
            ? "bg-slate-950 text-slate-100"
            : "bg-slate-900 text-white"
        }`}
      >
        <div className="p-6 sm:p-8 min-h-full flex flex-col">
          <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }} className="space-y-8 flex-1 max-w-5xl mx-auto w-full">
          
          {/* Header Description */}
          <div className="border-b pb-4 border-current/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-mono uppercase font-bold tracking-widest opacity-75">
                Subpixel Font Rendering & Text Edge Clarity
              </h2>
              <p className="text-xs opacity-60 mt-0.5">
                Inspect text strokes at varying point sizes for color fringing, haloing, or blur.
              </p>
            </div>
            <div className="text-[11px] font-mono opacity-60">
              Browser Zoom: <strong>100% Recommended</strong>
            </div>
          </div>

          {/* Theme 1 & 2: Standard Contrast Ladders */}
          {theme !== "colored-fringing" ? (
            <div className="space-y-6">
              {/* Font Size Ladder */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-60">
                  Size Ladder (8px to 32px)
                </span>
                <div className="space-y-2 border-l-2 border-current/20 pl-4">
                  {FONT_SCALES.map((size) => (
                    <div key={size} className="flex items-baseline gap-4">
                      <span className="w-12 text-[11px] font-mono opacity-50 shrink-0 font-medium">{size}px:</span>
                      <span style={{ fontSize: `${size}px`, lineHeight: 1.3 }}>
                        The quick brown fox jumps over the lazy dog. 0123456789 (ABCDEF)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Font Typography Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-current/15">
                {/* Sans-Serif */}
                <div className="p-3 rounded-xl bg-current/5 border border-current/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase font-semibold opacity-60">Sans-Serif (System UI)</span>
                  <p className="text-xs leading-relaxed font-sans">
                    Clean modern UI typography uses subtle anti-aliasing. Look closely at vertical stems (l, t, k) and curves (e, o, s) for color fringing.
                  </p>
                </div>

                {/* Serif */}
                <div className="p-3 rounded-xl bg-current/5 border border-current/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase font-semibold opacity-60">Serif (Editorial)</span>
                  <p className="text-xs leading-relaxed font-serif">
                    Thin serifs and high-contrast stroke transitions test fine pixel resolution. Fine horizontal hair-strokes should remain crisp without breaks.
                  </p>
                </div>

                {/* Monospace Code */}
                <div className="p-3 rounded-xl bg-current/5 border border-current/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase font-semibold opacity-60">Monospace (Code & Data)</span>
                  <p className="text-xs leading-relaxed font-mono">
                    const delta = Math.sqrt(x * x + y * y);<br />
                    if (delta &lt; threshold) return true;
                  </p>
                </div>
              </div>

              {/* 1-Pixel Stroke Grids */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-60">
                  1-Pixel Single-Stripe Gratings (Pixel Alignment Check)
                </span>
                <div className="grid grid-cols-3 gap-4 h-24">
                  {/* Vertical 1px lines */}
                  <div
                    className="h-full rounded-lg border border-current/20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 4px)`
                    }}
                  />
                  {/* Horizontal 1px lines */}
                  <div
                    className="h-full rounded-lg border border-current/20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 4px)`
                    }}
                  />
                  {/* Crosshatch */}
                  <div
                    className="h-full rounded-lg border border-current/20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 4px)`
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Subpixel Fringing Isolation View */
            <div className="space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-60">
                Colored Text Subpixel Fringing Test
              </span>
              <p className="text-xs opacity-70 max-w-xl">
                Non-standard subpixel layouts (e.g. BGR, WOLED, QD-OLED triangular subpixels) often exhibit color fringing (red/green or magenta/cyan shadows) on high-contrast text edges.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-black rounded-xl border border-slate-700 space-y-3">
                  <span className="text-[10px] font-mono text-slate-400">Dark Background (14px Text)</span>
                  <div className="space-y-1.5 font-sans text-sm">
                    <p className="text-white">Pure White Text: Crisp edge check</p>
                    <p className="text-red-500">Pure Red Text: Primary channel check</p>
                    <p className="text-emerald-400">Pure Green Text: Luminance channel check</p>
                    <p className="text-sky-400">Pure Cyan Text: Dual-subpixel check</p>
                    <p className="text-amber-400">Pure Yellow Text: Red + Green blend</p>
                  </div>
                </div>

                <div className="p-4 bg-white text-black rounded-xl border border-slate-300 space-y-3">
                  <span className="text-[10px] font-mono text-slate-500">Light Background (14px Text)</span>
                  <div className="space-y-1.5 font-sans text-sm">
                    <p className="text-black">Pure Black Text: High contrast check</p>
                    <p className="text-red-700">Deep Red Text: Negative contrast check</p>
                    <p className="text-emerald-700">Deep Green Text: Negative contrast check</p>
                    <p className="text-blue-700">Deep Blue Text: High frequency check</p>
                    <p className="text-purple-700">Deep Purple Text: Primary mixture</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      <TestInlineControls>
      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "dark-on-light", label: "Positive Contrast (Dark on Light)" },
              { id: "light-on-dark", label: "Negative Contrast (Light on Dark)" },
              { id: "colored-fringing", label: "Subpixel Fringing Isolation" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setTheme(btn.id as TextContrastTheme)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  theme === btn.id
                    ? "bg-amber-500 dark:bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-extrabold"
                    : "bg-muted dark:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              Zoom ({zoomLevel}x)
            </button>
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              <Maximize className="w-3.5 h-3.5" />
              Fullscreen
            </button>
          </div>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hardware Boundary Notice</span>
          </div>
          <p>
            Text clarity depends heavily on <strong>operating system font anti-aliasing engines (such as Microsoft ClearType or macOS Core Graphics)</strong> and display scaling factors. Subtle color fringing on non-standard subpixel layouts (like BGR or OLED pentile/triangular arrangements) is an inherent optical characteristic of font subpixel rendering algorithms, not a defective display panel.
          </p>
        </div>

        {/* Diagnostic Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">1. Native Resolution:</strong> Ensure your display is operating at its physical panel native resolution. Non-native resolutions cause soft, blurry text.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">2. Operating System Scaling:</strong> Non-integer scaling (such as 125% or 175%) can produce subtle shimmering on fine lines. Test at 100% or 200% for integer scaling.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">3. Browser Zoom:</strong> Press <kbd className="px-1 bg-background border border-border rounded">Ctrl</kbd> + <kbd className="px-1 bg-background border border-border rounded">0</kbd> to confirm your browser is set to exactly 100% zoom.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">4. Monitor Sharpening:</strong> Check your monitor OSD settings. Artificial sharpness filters above 50% often introduce white halo outlines around letters.
            </div>
          </div>
        </div>
      </div>
      </TestInlineControls>

      <TestControlBar testId={testId} title="Text Clarity & Subpixel Test" />
    </>
  );
}
