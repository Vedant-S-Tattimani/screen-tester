import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface TestCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
}

export function TestCard({ href, title, description, icon: Icon, tags = [] }: TestCardProps) {
  const t = useTranslations("TestLibrary");

  return (
    <Link 
      href={href} 
      className="group flex flex-col justify-between border border-border/60 bg-card rounded-sm p-6 hover:border-foreground/30 transition-all duration-300 h-full"
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="p-2.5 bg-muted rounded-sm text-foreground group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          
          {tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 bg-muted text-muted-foreground rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="font-semibold text-lg text-foreground tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/40 text-muted-foreground group-hover:text-foreground transition-colors">
        <span className="font-mono text-xs uppercase tracking-widest font-medium">
          {t("launchTest")}
        </span>
        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
      </div>
    </Link>
  );
}
