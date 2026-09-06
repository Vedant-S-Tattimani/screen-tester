import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface WorkflowStepProps {
  stepNumber: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export function WorkflowStep({ stepNumber, title, description, href, onClick }: WorkflowStepProps) {
  const content = (
    <div className="group flex flex-col sm:flex-row sm:items-center py-6 sm:py-8 border-b border-border/50 transition-colors hover:bg-muted/20 px-4 -mx-4 rounded-xl cursor-pointer">
      {/* Step Number */}
      <div className="w-16 sm:w-24 shrink-0 mb-2 sm:mb-0">
        <span className="text-xs font-mono font-medium tracking-widest text-muted-foreground uppercase">
          {stepNumber}
        </span>
      </div>
      
      {/* Details */}
      <div className="flex-1 pr-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      {/* Arrow */}
      <div className="shrink-0 mt-4 sm:mt-0 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1 duration-300">
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full text-left appearance-none">
      {content}
    </button>
  );
}
