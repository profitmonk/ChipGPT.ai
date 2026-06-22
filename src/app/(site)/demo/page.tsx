import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { BriefingForm } from "@/components/briefing-form";
import { CTA_SUPPORTING, SITE_DESCRIPTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a Briefing — ChipGPT",
  description: SITE_DESCRIPTION,
};

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a Briefing"
        description={`${CTA_SUPPORTING} Share your program stage, team structure, and primary use case to begin a technical conversation.`}
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="panel p-8">
                <p className="mono-label text-zinc-600">Briefing Includes</p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Platform architecture walkthrough",
                    "Agent capability review for your lifecycle stage",
                    "Deployment and security discussion",
                    "Integration assessment with your engineering systems",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] text-zinc-400">
                      <span className="font-mono text-[10px] text-green-700">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel p-8">
                <p className="mono-label text-zinc-600">Prefer to look first?</p>
                <p className="mt-4 text-[14px] leading-relaxed text-zinc-500">
                  See the RTL/DV co-worker find real bugs in production open-source
                  chips — no signup required.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="outline" size="lg" asChild>
                    <a href="/coworker">▶ Watch the Co-worker (Live Demo)</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/platform">Explore Platform</Link>
                  </Button>
                </div>
              </div>
            </div>

            <BriefingForm />
          </div>
        </div>
      </section>
    </>
  );
}
