import Link from "next/link";
import { CTA_LABEL, DEMO_HREF, NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 border-t border-rule pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center border border-accent/25 bg-accent-soft text-[9px] font-semibold text-accent">
                CG
              </span>
              <span className="text-sm font-semibold text-ink">ChipGPT</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-3">
              AI Co-Workers for the Semiconductor Lifecycle. Engineering
              infrastructure for RTL, verification, bring-up, yield, and failure
              analysis.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-ink-3 transition-colors hover:text-ink-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={DEMO_HREF}
              className="text-[12px] text-ink-3 transition-colors hover:text-ink-2"
            >
              {CTA_LABEL}
            </Link>
          </nav>
        </div>

        <p className="mt-10 font-mono text-[10px] text-ink-3">
          © {new Date().getFullYear()} ChipGPT · Semiconductor Engineering
          Infrastructure
        </p>
      </div>
    </footer>
  );
}
