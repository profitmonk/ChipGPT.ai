"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_LABEL, DEMO_HREF, NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled || pathname !== "/"
          ? "border-rule bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center border border-accent/50 bg-accent-soft text-[10px] font-semibold tracking-wider text-accent">
            CG
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">
            ChipGPT
          </span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          {NAV_LINKS.map((link) => {
            const cls = cn(
              "whitespace-nowrap text-[13px] transition-colors",
              isActive(link.href) ? "text-ink" : "text-ink-3 hover:text-ink"
            );
            return link.external ? (
              <a key={link.href} href={link.href} className={cls}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={cls}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Button variant="outline" size="sm" asChild>
            <Link href={DEMO_HREF}>{CTA_LABEL}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="text-ink-2 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-rule bg-paper px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const cls = cn(
                "text-sm",
                isActive(link.href) ? "text-ink" : "text-ink-2"
              );
              return link.external ? (
                <a key={link.href} href={link.href} onClick={closeMobile} className={cls}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} onClick={closeMobile} className={cls}>
                  {link.label}
                </Link>
              );
            })}
            <Button variant="outline" size="sm" asChild>
              <Link href={DEMO_HREF} onClick={closeMobile}>
                {CTA_LABEL}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
