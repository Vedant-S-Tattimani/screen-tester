import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { generateSeoMetadata } from "@/lib/seo";
import { 
  Monitor, 
  Sliders, 
  Grid, 
  Ruler, 
  AlertCircle, 
  ClipboardCheck, 
  ArrowRight,
  Cpu,
  Mic,
  Eye
} from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });
  return generateSeoMetadata(
    "/tools",
    t("metaTitle"),
    t("metaDescription")
  );
}

const TOOLS_CONFIG = [
  {
    id: "display-info",
    key: "displayInfo",
    href: "/tests/display-info",
    icon: Monitor,
    iconColor: "text-blue-600"
  },
  {
    id: "browser-compatibility",
    key: "browserCompatibility",
    href: "/tools/browser-compatibility",
    icon: Cpu,
    iconColor: "text-cyan-600"
  },
  {
    id: "compare-displays",
    key: "compareDisplays",
    href: "/tests/compare-displays",
    icon: Sliders,
    iconColor: "text-purple-600"
  },
  {
    id: "custom-pattern",
    key: "customPattern",
    href: "/tests/custom-pattern",
    icon: Grid,
    iconColor: "text-emerald-600"
  },
  {
    id: "resolution-checker",
    key: "resolutionChecker",
    href: "/tests/resolution-checker",
    icon: Ruler,
    iconColor: "text-indigo-600"
  },
  {
    id: "diagnostic-wizard",
    key: "diagnostic",
    href: "/monitor-inspection/diagnostic",
    icon: AlertCircle,
    iconColor: "text-amber-600"
  },
  {
    id: "voice-recorder",
    key: "voiceRecorder",
    href: "/tools/voice-recorder",
    icon: Mic,
    iconColor: "text-rose-600"
  },
  {
    id: "inspection-summary",
    key: "summary",
    href: "/monitor-inspection/summary",
    icon: ClipboardCheck,
    iconColor: "text-purple-600"
  },
  {
    id: "display-bandwidth-calculator",
    key: "displayBandwidthCalculator",
    href: "/tools/display-bandwidth-calculator",
    icon: Cpu,
    iconColor: "text-indigo-600"
  },
  {
    id: "viewing-distance-calculator",
    key: "viewingDistanceCalculator",
    href: "/tools/viewing-distance-calculator",
    icon: Eye,
    iconColor: "text-purple-600"
  },
  {
    id: "dual-monitor-matcher",
    key: "dualMonitorMatcher",
    href: "/tools/dual-monitor-matcher",
    icon: Sliders,
    iconColor: "text-cyan-600"
  }
];

export default async function ToolsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Tools" });

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
            {t("eyebrow")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 mb-3">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed font-normal">
            {t("subtitle")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS_CONFIG.map((tool) => {
            const Icon = tool.icon;
            const title = t(`items.${tool.key}.title`);
            const description = t(`items.${tool.key}.description`);
            const badge = t(`items.${tool.key}.badge`);
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="flex flex-col justify-between p-6 bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-2xl transition-all group hover:shadow-xs min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-2xs">
                      <Icon className={`w-5 h-5 ${tool.iconColor} stroke-[1.8]`} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200/60 text-gray-600">
                      {badge}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-gray-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-6 pt-3 border-t border-gray-200/60 self-start w-full justify-between">
                  <span>{t("openTool")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
