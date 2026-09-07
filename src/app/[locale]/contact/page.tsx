import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Mail, Bug, GitPullRequest, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/contact"
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  
  return (
    <div className="max-w-3xl mx-auto py-16 sm:py-24 px-4 sm:px-6 w-full flex-1">
      <div className="mb-8">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          SUPPORT & FEEDBACK
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t("intro")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-10">
        {/* GitHub Issues */}
        <a
          href="https://github.com/Vedant-S-Tattimani/screen-tester/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 border border-border/80 rounded-2xl bg-card hover:border-foreground/30 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Bug className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
              <span>{t("reportBug")}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("reportBugDesc")}
            </p>
          </div>
          <span className="text-xs font-medium text-blue-600 mt-4 group-hover:underline inline-block">
            Open GitHub Issue Tracker →
          </span>
        </a>

        {/* GitHub Pull Requests / Contribute */}
        <a
          href="https://github.com/Vedant-S-Tattimani/screen-tester"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 border border-border/80 rounded-2xl bg-card hover:border-foreground/30 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
              <span>{t("contribute")}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("contributeDesc")}
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-600 mt-4 group-hover:underline inline-block">
            View Source Code on GitHub →
          </span>
        </a>

        {/* Email Inquiries */}
        <div className="sm:col-span-2 p-6 border border-border/80 rounded-2xl bg-muted/20">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground mb-1">
                {t("directEmail")}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                {t("directEmailDesc")}
              </p>
              <a
                href="mailto:vedantst6@gmail.com"
                className="font-mono text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                vedantst6@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
