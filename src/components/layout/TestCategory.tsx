import { TestRow } from "./TestRow";

interface TestCategoryProps {
  title: string;
  tests: {
    title: string;
    description: string;
    href: string;
  }[];
}

export function TestCategory({ title, tests }: TestCategoryProps) {
  return (
    <div className="mb-24 last:mb-0">
      <div className="flex items-center gap-6 mb-2">
        <h2 className="text-sm font-medium tracking-[0.15em] text-foreground uppercase whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px w-full bg-border/80"></div>
      </div>
      
      <div className="flex flex-col">
        {tests.map((test, index) => (
          <TestRow 
            key={index}
            title={test.title}
            description={test.description}
            href={test.href}
          />
        ))}
      </div>
    </div>
  );
}
