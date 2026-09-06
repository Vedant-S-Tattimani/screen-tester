import { Link } from "@/i18n/routing";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-150 bg-white py-12 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-gray-100">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-sans text-[14px] font-bold uppercase tracking-wider text-gray-950">
                MONITOR TESTER
              </span>
              <span className="text-[9px] font-mono font-medium tracking-[0.22em] text-gray-400 block">
                CHECK · INSPECT · UNDERSTAND
              </span>
            </Link>
            <p className="text-xs text-gray-500 mt-2 max-w-xs">
              A precision web utility for testing and calibrating external displays, laptops, and mobile screens.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium text-gray-600" aria-label="Footer Navigation">
            <Link href="/tests" className="hover:text-gray-950 transition-colors">
              Tests
            </Link>
            <Link href="/monitor-inspection" className="hover:text-gray-950 transition-colors">
              Inspection
            </Link>
            <Link href="/guides" className="hover:text-gray-950 transition-colors">
              Guides
            </Link>
            <Link href="/privacy" className="hover:text-gray-950 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-950 transition-colors">
              Terms
            </Link>
          </nav>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <p>© {currentYear} Monitor Tester. All rights reserved.</p>
          <p className="font-mono">Free, open & client-side browser diagnostics.</p>
        </div>
      </div>
    </footer>
  );
}