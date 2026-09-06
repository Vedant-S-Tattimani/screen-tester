"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { CheckCircle2, XCircle, HelpCircle, MinusCircle, RefreshCw, Trash2, Printer } from "lucide-react";

export function InspectionSummary() {
  const t = useTranslations("Inspection.summary");
  const [results, setResults] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem("monitor-tester-observations");
        if (stored) {
          setResults(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoaded(true);
      }
    });
  }, []);

  const clearData = () => {
    localStorage.removeItem("monitor-tester-observations");
    setResults({});
  };

  const getIcon = (status: string) => {
    switch (status) {
      case "PASS": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "ISSUE": return <XCircle className="w-5 h-5 text-red-500" />;
      case "CHECK": return <HelpCircle className="w-5 h-5 text-yellow-500" />;
      default: return <MinusCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const formatTestName = (testId: string) => {
    // Basic formatting from route to readable name
    const parts = testId.replace("/", "").replace("-test", "").split("-");
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  };

  if (!isLoaded) return null;

  const hasResults = Object.keys(results).length > 0;

  return (
    <div className="space-y-12">
      {hasResults ? (
        <div className="bg-muted/10 border border-border/50 rounded-2xl overflow-hidden">
          <div className="divide-y divide-border/50">
            {Object.entries(results).map(([testId, status]) => (
              <div key={testId} className="flex items-center justify-between p-6 bg-background">
                <div className="flex items-center gap-4">
                  {getIcon(status)}
                  <span className="font-medium text-foreground">{formatTestName(testId)}</span>
                </div>
                <div className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
                  {status === "PASS" && t("passed")}
                  {status === "ISSUE" && t("needsAttention")}
                  {status === "CHECK" && "Unsure"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/20 border border-border/50 rounded-2xl">
          <p className="text-muted-foreground">No inspection data found.</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          href="/monitor-inspection"
          className="flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-foreground/90 transition-transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{t("restart")}</span>
        </Link>
        <button 
          onClick={clearData}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium border border-border/50 hover:bg-muted/50 transition-colors w-full sm:w-auto text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t("clear")}</span>
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium border border-border/50 hover:bg-muted/50 transition-colors w-full sm:w-auto text-muted-foreground hover:text-foreground"
        >
          <Printer className="w-4 h-4" />
          <span>{t("print")}</span>
        </button>
      </div>
    </div>
  );
}
