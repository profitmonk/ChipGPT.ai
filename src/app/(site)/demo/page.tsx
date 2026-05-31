import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { CTA_LABEL, CTA_SUPPORTING, SITE_DESCRIPTION } from "@/lib/content";

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
            <div className="panel p-8">
              <p className="mono-label text-zinc-600">Briefing Includes</p>
              <ul className="mt-5 space-y-3">
                {[
                  "Platform architecture walkthrough",
                  "Agent capability review for your lifecycle stage",
                  "Deployment and security discussion",
                  "Integration assessment with your engineering systems",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[13px] text-zinc-400"
                  >
                    <span className="font-mono text-[10px] text-green-700">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-8">
              <p className="mono-label text-zinc-600">Get Started</p>
              <p className="mt-4 text-[14px] leading-relaxed text-zinc-500">
                Contact{" "}
                <a
                  href="mailto:demo@chipgpt.com"
                  className="text-green-600 hover:text-green-500"
                >
                  demo@chipgpt.com
                </a>{" "}
                to request a briefing. {CTA_SUPPORTING}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" asChild>
                  <a href="mailto:demo@chipgpt.com">{CTA_LABEL}</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/platform">Explore Platform</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
