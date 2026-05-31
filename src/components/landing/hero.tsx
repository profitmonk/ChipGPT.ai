"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandCenterPanel } from "@/components/landing/command-center-panel";
import { CTA_LABEL, DEMO_HREF, SITE_DESCRIPTION } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative border-b border-white/[0.06] pt-14">
      <div
        className="pointer-events-none absolute inset-0 grid-circuit opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-20 px-6 py-28 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16 lg:px-10 lg:py-36">
        <div>
          <p className="mono-label mb-8 text-green-600">
            Semiconductor Engineering Infrastructure
          </p>

          <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
            AI Co-Workers for the Semiconductor Lifecycle
          </h1>

          <p className="mt-7 max-w-2xl text-[15px] leading-[1.7] text-zinc-500">
            {SITE_DESCRIPTION}
          </p>

          <div className="mt-11 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={DEMO_HREF}>
                {CTA_LABEL}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/platform">Explore Platform</Link>
            </Button>
          </div>
        </div>

        <CommandCenterPanel />
      </div>
    </section>
  );
}
