import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { VoiceRecorder } from "@/components/tools/VoiceRecorder";
import { Mic } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VoiceRecorder" });
  return generateSeoMetadata(
    "/tools/voice-recorder",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function VoiceRecorderPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "VoiceRecorder" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });

  const breadcrumbs = [
    { label: tBreadcrumbs("tools"), href: "/tools" },
    { label: t("header.title"), href: "/tools/voice-recorder" }
  ];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 text-gray-900 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-3 text-center sm:text-left mx-auto sm:mx-0">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
            <Mic className="w-4 h-4" />
            <span>{t("header.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950">
            {t("header.title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Voice Recorder Client Tool */}
        <VoiceRecorder />

      </div>
    </div>
  );
}
