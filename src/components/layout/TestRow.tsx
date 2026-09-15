import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

interface TestRowProps {
  title: string;
  description: string;
  href: string;
  target?: string;
  rel?: string;
}

export function TestRow({ title, description, href, target, rel }: TestRowProps) {
  const isTestOrTool = href.startsWith("/tests/") || href.startsWith("/tools/") || href.startsWith("http");
  const effectiveTarget = target !== undefined ? target : (isTestOrTool ? "_blank" : undefined);
  const effectiveRel = rel !== undefined ? rel : (effectiveTarget === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <Link 
      href={href} 
      target={effectiveTarget}
      rel={effectiveRel}
      className="group flex flex-col md:flex-row md:items-start py-8 border-b border-border/40 hover:bg-accent/30 transition-colors"
    >
      <div className="w-full md:w-[35%] mb-2 md:mb-0 md:pr-8">
        <h3 className="text-lg font-medium text-foreground tracking-tight">
          {title}
        </h3>
      </div>
      
      <div className="w-full md:w-[65%] flex items-start justify-between gap-6">
        <p className="text-muted-foreground leading-relaxed text-base max-w-xl">
          {description}
        </p>
        <ArrowRight 
          className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex-shrink-0 mt-1" 
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}
