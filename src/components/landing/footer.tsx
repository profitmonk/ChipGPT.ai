import Link from "next/link";
import { CTA_LABEL, DEMO_HREF, NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#030303]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 border-t border-white/[0.06] pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center border border-green-800/50 bg-[#0a120a] text-[9px] font-semibold text-green-600">
                CG
              </span>
              <span className="text-sm font-semibold text-white">ChipGPT</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-zinc-600">
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
                className="text-[12px] text-zinc-600 transition-colors hover:text-zinc-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={DEMO_HREF}
              className="text-[12px] text-zinc-600 transition-colors hover:text-zinc-400"
            >
              {CTA_LABEL}
            </Link>
          </nav>
        </div>

        <p className="mt-10 font-mono text-[10px] text-zinc-800">
          © {new Date().getFullYear()} ChipGPT · Semiconductor Engineering
          Infrastructure
        </p>
      </div>
    </footer>
  );
}
