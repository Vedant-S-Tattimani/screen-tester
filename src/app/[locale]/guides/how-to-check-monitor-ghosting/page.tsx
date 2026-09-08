import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;
  return {
    title: "How to Check Monitor Ghosting & Pixel Response Time",
    description: "Learn what monitor ghosting and inverse ghosting (coronas) are, how to inspect pixel response times, and how to configure overdrive.",
    alternates: {
      canonical: "/guides/how-to-check-monitor-ghosting"
    }
  };
}

export default async function MonitorGhostingGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-8">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          DISPLAY GUIDE & MOTION CLARITY
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          How to Check Monitor Ghosting & Motion Clarity
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Monitor ghosting occurs when liquid crystals take too long to transition from one color or brightness level to another. Understanding the visual symptoms helps you fine-tune your monitor&apos;s overdrive settings for optimal clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-2">Standard Ghosting (Trailing)</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A fuzzy, dark or smudged trail following behind moving objects against contrasting backgrounds.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <strong>Primary Cause:</strong> Slow Gray-to-Gray (GtG) pixel response times. Typical on standard VA panels in dark transitions.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <strong>Solution:</strong> Increase the monitor&apos;s OSD Overdrive / Trace Free / AMA setting by one step.
            </li>
          </ul>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-2">Inverse Ghosting (Coronas / Overshoot)</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A bright, inverted-colored or glowing halo trailing behind moving objects.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <strong>Primary Cause:</strong> Excessive panel overdrive voltage pushing liquid crystals past target color states (overshoot).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <strong>Solution:</strong> Lower the monitor&apos;s Overdrive setting. Never use &quot;Extreme&quot; or &quot;Fastest&quot; mode unless running at maximum refresh rate.
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-muted/20 my-10 space-y-4">
        <h3 className="text-lg font-bold text-foreground">How to Test Motion Clarity in Your Browser</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Open our Ghosting and Motion Blur tests at full screen. Focus your gaze on a moving shape as it passes across the display. If the shape leaves a dark smear behind, overdrive is set too low. If you observe a bright, unnatural glow, overdrive is set too aggressively.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Important Limitation:</strong> While browser tests provide accurate visual cues for adjusting monitor overdrive, true response times (GtG in milliseconds) require specialized high-speed photodiode oscilloscopes.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-4">Related Diagnostic Tests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tests/ghosting-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Ghosting Test</h4>
              <p className="text-xs text-muted-foreground mt-0.5">High contrast moving blocks across various speed profiles</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/tests/refresh-rate-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Refresh Rate Test</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Measure browser frame timing and animation fluidity</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
