"use client";

import { Link } from "@/i18n/routing";
import { Monitor, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center" suppressHydrationWarning>
      <div className="mb-8 p-6 bg-muted/30 rounded-full" suppressHydrationWarning>
        <Monitor className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
        {t("title")}
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-md mb-12">
        {t("description")}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/#tests"
          className="flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {t("viewAllTests")}
        </Link>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 border border-border/50 bg-background text-foreground px-8 py-3 rounded-full font-medium hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
