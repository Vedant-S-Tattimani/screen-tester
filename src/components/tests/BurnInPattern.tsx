"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight, Info, Timer, Eye, Flame } from "lucide-react";

export type OledTestMode = "near_black" | "subpixels" | "retention_stress";

interface OledPatternPreset {
  id: string;
  label: string;
  category: "near_black" | "subpixels";
  color: string;
  description: string;
}

const OLED_PATTERNS: OledPatternPreset[] = [
  // Near-Black Uniformity & Banding Presets
  { id: "nb-1", label: "1% Dark Gray", category: "near_black", color: "#030303", description: "Extreme near-black threshold (tests pixel turn-on uniformity and black crush)." },
  { id: "nb-2", label: "2% Dark Gray", category: "near_black", color: "#050505", description: "Reveals early near-black chrominance overshoot and dark edge vignetting." },
  { id: "nb-5", label: "5% Dark Gray (Critical)", category: "near_black", color: "#0d0d0d", description: "Industry standard 5% gray field for detecting OLED vertical banding streaks." },
  { id: "nb-10", label: "10% Dark Gray", category: "near_black", color: "#1a1a1a", description: "Verifies mid-shadow uniformity and panel tint consistency." },
  { id: "nb-15", label: "15% Dark Gray", category: "near_black", color: "#262626", description: "Shadow-to-midtone transition field." },
  { id: "nb-20", label: "20% Dark Gray", category: "near_black", color: "#333333", description: "Uniformity field for checking dirty screen effect (DSE)." },
  { id: "nb-50", label: "50% Neutral Gray", category: "near_black", color: "#808080", description: "Reference mid-tone field for verifying overall panel tint and color neutrality." },

  // Subpixel Aging & Burn-In Primaries
  { id: "red", label: "Pure Red", category: "subpixels", color: "#FF0000", description: "Isolates Red subpixels (common burn-in channel from news chyrons and YouTube logos)." },
  { id: "green", label: "Pure Green", category: "subpixels", color: "#00FF00", description: "Isolates Green subpixels (highest human eye luminance sensitivity)." },
  { id: "blue", label: "Pure Blue", category: "subpixels", color: "#0000FF", description: "Isolates Blue subpixels (highest physical wear rate on traditional OLED stacks)." },
  { id: "yellow", label: "Yellow (R+G)", category: "subpixels", color: "#FFFF00", description: "Stresses combined Red and Green subpixels." },
  { id: "magenta", label: "Magenta (R+B)", category: "subpixels", color: "#FF00FF", description: "Stresses combined Red and Blue subpixels." },
  { id: "cyan", label: "Cyan (G+B)", category: "subpixels", color: "#00FFFF", description: "Stresses combined Green and Blue subpixels." },
  { id: "white", label: "100% White", category: "subpixels", color: "#FFFFFF", description: "Stresses all subpixel channels simultaneously to reveal any differential ghosting." }
];

interface BurnInPatternProps {
  testId?: string;
}

export function BurnInPattern({ testId = "burn-in-test" }: BurnInPatternProps) {
  const { registerNavigation } = useTestContext();
  
  const [activeMode, setActiveMode] = useState<OledTestMode>("near_black");
  const [patternIndex, setPatternIndex] = useState(2); // Start on 5% gray (index 2)
  const [showEduInfo, setShowEduInfo] = useState(false);

  // Retention Stress Simulator State
  const [stressActive, setStressActive] = useState(false);
  const [stressSecondsLeft, setStressSecondsLeft] = useState(15);
  const [stressCompleted, setStressCompleted] = useState(false);

  // Active filtered list based on mode
  const currentList = OLED_PATTERNS.filter((p) => p.category === activeMode);
  const currentPattern = currentList[patternIndex % currentList.length] || OLED_PATTERNS[2];

  const nextPattern = useCallback(() => {
    setPatternIndex((i) => (i + 1) % currentList.length);
  }, [currentList.length]);

  const prevPattern = useCallback(() => {
    setPatternIndex((i) => (i - 1 + currentList.length) % currentList.length);
  }, [currentList.length]);

  useEffect(() => {
    registerNavigation({
      next: nextPattern,
      prev: prevPattern,
      reset: () => {
        setPatternIndex(2);
        setActiveMode("near_black");
        setStressActive(false);
        setStressCompleted(false);
      },
    });
  }, [registerNavigation, nextPattern, prevPattern]);

  // Timer countdown for Retention Stress Test
  useEffect(() => {
    if (!stressActive) return;

    const timer = setInterval(() => {
      setStressSecondsLeft((prev) => {
        if (prev <= 1) {
          setStressActive(false);
          setStressCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stressActive]);

  const startRetentionTest = () => {
    setStressCompleted(false);
    setStressSecondsLeft(15);
    setStressActive(true);
  };

  const resetRetentionTest = () => {
    setStressActive(false);
    setStressCompleted(false);
    setStressSecondsLeft(15);
  };

  return (
    <>
      <div 
        className="absolute inset-0 select-none overflow-hidden"
        onClick={activeMode !== "retention_stress" ? nextPattern : undefined}
      >
        {/* Modes: Near-Black and Subpixel Uniformity */}
        {activeMode !== "retention_stress" && (
          <div 
            className="w-full h-full transition-colors duration-0 flex flex-col justify-end p-6"
            style={{ backgroundColor: currentPattern.color }}
          >
            {/* Subtle Info Badge on screen */}
            <div className="bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-white max-w-sm text-xs pointer-events-none self-start opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-mono font-semibold text-amber-400 block">{currentPattern.label}</span>
              <span className="text-[11px] text-white/70">{currentPattern.description}</span>
            </div>
          </div>
        )}

        {/* Mode: Retention Stress Conditioning */}
        {activeMode === "retention_stress" && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {stressActive && (
              /* Phase A: High-Contrast Conditioning Grid */
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundImage: "conic-gradient(#fff 90deg, #000 90deg 180deg, #fff 180deg 270deg, #000 270deg)",
                  backgroundSize: "120px 120px"
                }}
              >
                <div className="bg-neutral-950/90 border border-white/20 p-6 rounded-2xl text-center text-white shadow-2xl backdrop-blur-md max-w-sm">
                  <div className="text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                    <Timer className="w-4 h-4 animate-pulse" />
                    <span>Stress Conditioning In Progress</span>
                  </div>
                  <div className="text-4xl font-extrabold font-mono my-2 text-white">
                    {stressSecondsLeft}s
                  </div>
                  <p className="text-xs text-white/70">
                    Displaying high-contrast static checkerboard to condition pixel capacitance. Screen will automatically flip to 5% gray when timer expires.
                  </p>
                </div>
              </div>
            )}

            {stressCompleted && (
              /* Phase B: 5% Gray Observation Field */
              <div className="w-full h-full bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="bg-neutral-950/90 border border-white/20 p-6 rounded-2xl shadow-2xl backdrop-blur-md max-w-md space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>Observation Phase (5% Gray Field)</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Carefully inspect the screen now. Do you notice faint ghost checkerboard squares lingering on this dark gray background?
                  </p>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left text-[11px] text-white/70 space-y-1">
                    <strong className="text-white block">Key Distinction:</strong>
                    <p>
                      • <strong>Temporary Image Retention (Normal):</strong> If you see faint outlines that gradually fade away over the next 1–3 minutes, this is reversible transistor capacitance charge.
                    </p>
                    <p>
                      • <strong>Permanent Burn-In:</strong> True burn-in is cumulative degradation that remains visible permanently across days and weeks of normal usage.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      onClick={startRetentionTest}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
                    >
                      Restart Stress Timer
                    </button>
                    <button
                      onClick={resetRetentionTest}
                      className="px-3.5 py-1.5 rounded-lg border border-white/20 text-white/80 font-medium text-xs hover:bg-white/10 transition-colors"
                    >
                      Exit Test
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!stressActive && !stressCompleted && (
              /* Ready Screen */
              <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-md space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Image Retention vs. Burn-In Test</h3>
                    <p className="text-xs text-white/70 mt-1">
                      Evaluates your panel&apos;s resistance to temporary ghosting (TFT charge retention) without causing permanent harm.
                    </p>
                  </div>
                  <button
                    onClick={startRetentionTest}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors shadow-xs"
                  >
                    Start 15-Second Conditioning Test
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Educational Info Modal */}
        {showEduInfo && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Info className="w-4 h-4" />
                <span>OLED Uniformity, Image Retention & Burn-In Explained</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="mt-3 space-y-2.5 text-white/80 leading-relaxed">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <strong>Core Principle:</strong> Temporary image retention ≠ automatically permanent burn-in. Do not assume your monitor is defective if you observe temporary retention.
              </div>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <strong>5% Gray Vertical Banding:</strong> Almost all large OLED panels exhibit faint vertical streaks on very dark 5% gray slides due to manufacturing tolerances in the thin-film transistor backplane. This is typical for OLED technology and is virtually invisible in real content.
                </li>
                <li>
                  <strong>Temporary Image Retention (Ghosting):</strong> Storing a bright static logo for minutes can leave a faint imprint that fades within seconds or minutes. Modern OLED monitors run automatic pixel-cleaning / pixel-refresh cycles when in standby to equalize residual voltage.
                </li>
                <li>
                  <strong>Permanent Burn-In:</strong> Occurs only after thousands of cumulative hours displaying static elements at maximum brightness without compensation cycles. Modern QD-OLED and WOLED panels use pixel shift, logo luminance dimming, and thermal dissipation to mitigate this.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="OLED & Image Retention">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => {
                setActiveMode("near_black");
                setPatternIndex(2); // 5% gray
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "near_black" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Near-Black (5% Gray)
            </button>
            <button
              onClick={() => {
                setActiveMode("subpixels");
                setPatternIndex(0); // Red
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "subpixels" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Subpixel Aging (RGB/CMY)
            </button>
            <button
              onClick={() => {
                setActiveMode("retention_stress");
                resetRetentionTest();
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "retention_stress" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Retention Stress Test
            </button>
          </div>

          {/* Stepper for Near-Black and Subpixel Modes */}
          {activeMode !== "retention_stress" && (
            <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40 text-xs">
              <button 
                onClick={prevPattern}
                className="p-1 hover:bg-muted rounded text-foreground transition-colors"
                title="Previous pattern (Left Arrow)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-medium px-2 min-w-[120px] text-center text-foreground font-mono truncate">
                {currentPattern.label}
              </span>
              <button 
                onClick={nextPattern}
                className="p-1 hover:bg-muted rounded text-foreground transition-colors"
                title="Next pattern (Right Arrow)"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Educational Info Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              showEduInfo ? "bg-amber-500/20 text-amber-500 border-amber-500/40" : "hover:bg-muted text-muted-foreground border-border/50"
            }`}
            title="Read about OLED near-black banding and burn-in"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
