import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight, Moon } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;
  return {
    title: "How to Check Backlight Bleed vs IPS Glow | Monitor Tester",
    description: "Learn how to differentiate true backlight bleed from normal IPS glow, proper dark room testing methods, and when to request a replacement.",
    alternates: {
      canonical: "/guides/how-to-check-backlight-bleed"
    }
  };
}

export default async function BacklightBleedGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-8">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          DISPLAY GUIDE & LUMINANCE
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Backlight Bleed vs IPS Glow: Testing & Diagnosis
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          When viewing dark scenes on an LCD monitor, light imperfections are often noticed in corners or along the bezel edges. Differentiating structural backlight bleed from normal IPS optical glow is critical before deciding to RMA a display.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-3">
            Hardware Assembly Defect
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Backlight Bleed</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Unintended light leaking from behind the LCD matrix through uneven bezel pressure, loose frame tolerances, or pinched panel corners.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <strong>Behavior:</strong> Remains fixed in the exact same spot and brightness regardless of your viewing angle or viewing distance.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <strong>Appearance:</strong> Jagged white or yellow light puddles spilling inwards from the edges or corners.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <strong>Action:</strong> Severe bleed affecting daily usage justifies a retailer exchange.
            </li>
          </ul>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 mb-3">
            Normal Optical Characteristic
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">IPS Glow</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            An inherent optical phenomenon of In-Plane Switching liquid crystal panels where light reflects at wide viewing angles.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <strong>Behavior:</strong> Changes intensity, shifts position, or disappears entirely as you tilt your head or step further back from the screen.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <strong>Appearance:</strong> A soft silver, amber, or violet sheen primarily visible in the 4 corners on dark backgrounds.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <strong>Action:</strong> Present on almost all IPS panels; mitigated by lowering brightness and maintaining arm&apos;s-length viewing distance.
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-muted/20 my-10 space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-500" />
          The Isolation Test Method
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          1. Dim the room lights completely so reflections do not mask dark details.<br/>
          2. Open our full screen Backlight Bleed test.<br/>
          3. Set your monitor brightness to your normal working level (around 120-150 nits, usually 30-50% on monitor OSD).<br/>
          4. Look at the corners from an arm&apos;s length. Now step back 2 meters and bob your head side to side.<br/>
          5. If the light shifts with your head position, it is IPS glow. If the light stays anchored to the bezel edge, it is backlight bleed.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-4">Run Diagnostic Tests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tests/backlight-bleed-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Backlight Bleed Test</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Fullscreen 0% pure black pattern with brightness calibration</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/tests/uniformity-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Screen Uniformity Test</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Inspect gray and luminance steps across screen quadrants</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
