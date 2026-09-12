import { Link } from "@/i18n/routing";
import { CheckCircle2, AlertTriangle, Eye, ShieldAlert, ArrowRight, Lightbulb } from "lucide-react";

export interface VisualCue {
  label: string;
  description: string;
}

export interface ExplainerData {
  overview?: string;
  whatToLookFor?: VisualCue[];
  canObserve: string[];
  cannotMeasure: string[];
  interpretation?: string;
  nextSteps?: {
    text: string;
    actionLabel?: string;
    actionHref?: string;
  };
}

export interface ExplainerLabels {
  overviewHeading?: string;
  whatToLookForHeading?: string;
  boundariesHeading?: string;
  canObserveLabel?: string;
  cannotMeasureLabel?: string;
  interpretationHeading?: string;
  nextStepsHeading?: string;
}

interface FeatureExplainerProps {
  data: ExplainerData;
  labels?: ExplainerLabels;
}

export function FeatureExplainer({ data, labels }: FeatureExplainerProps) {
  const l = {
    overviewHeading: labels?.overviewHeading || "Display Inspection Overview",
    whatToLookForHeading: labels?.whatToLookForHeading || "What to Look For During Inspection",
    boundariesHeading: labels?.boundariesHeading || "Measurement Boundaries & Technical Honesty",
    canObserveLabel: labels?.canObserveLabel || "What Screen Tester Can Observe",
    cannotMeasureLabel: labels?.cannotMeasureLabel || "What the Browser Cannot Reliably Measure",
    interpretationHeading: labels?.interpretationHeading || "Interpreting Your Observations",
    nextStepsHeading: labels?.nextStepsHeading || "Recommended Next Steps",
  };

  return (
    <section aria-label="Technical Details and Inspection Guidance" className="space-y-10 border-t border-border/80 pt-10 text-foreground">
      {/* Overview & Visual Cues */}
      {(data.overview || (data.whatToLookFor && data.whatToLookFor.length > 0)) && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
            <span>{l.whatToLookForHeading}</span>
          </h2>

          {data.overview && (
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {data.overview}
            </p>
          )}

          {data.whatToLookFor && data.whatToLookFor.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {data.whatToLookFor.map((cue, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-card border border-border/70 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                      {cue.label}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-normal">
                      {cue.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Technical Honesty & Hardware Boundaries */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
          <span>{l.boundariesHeading}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What Screen Tester Can Observe */}
          <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span>{l.canObserveLabel}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 leading-relaxed list-disc list-inside">
              {data.canObserve.map((item, idx) => (
                <li key={idx} className="pl-1">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Screen Tester Cannot Reliably Measure */}
          <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-950/10 border border-amber-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
              <span>{l.cannotMeasureLabel}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed list-disc list-inside">
              {data.cannotMeasure.map((item, idx) => (
                <li key={idx} className="pl-1">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interpretation & Next Steps */}
      {(data.interpretation || data.nextSteps) && (
        <div className="space-y-4">
          {data.interpretation && (
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                <span>{l.interpretationHeading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {data.interpretation}
              </p>
            </div>
          )}

          {data.nextSteps && (
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-2xs">
              <div className="space-y-1">
                <span className="font-semibold text-foreground block">
                  {l.nextStepsHeading}
                </span>
                <span className="text-muted-foreground block">
                  {data.nextSteps.text}
                </span>
              </div>
              {data.nextSteps.actionHref && data.nextSteps.actionLabel && (
                <Link
                  href={data.nextSteps.actionHref}
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0 self-start sm:self-auto text-xs sm:text-sm"
                >
                  <span>{data.nextSteps.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
