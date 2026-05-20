import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-bold text-cyan-300">
            CG
          </span>
          <span className="text-sm font-medium text-white">ChipGPT</span>
          <span className="text-sm text-zinc-600">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-zinc-600">
          AI Co-Workers for the Semiconductor Lifecycle
        </p>
      </div>
    </footer>
  );
}
