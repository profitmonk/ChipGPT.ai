import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo — ChipGPT RTL/DV Co-worker",
  description:
    "Watch an AI co-worker find real bugs in production open-source chips — and prove each one the right way (formal, simulation, structural). On your hardware, with your LLM, your RTL never leaves.",
};

// The interactive demo is a standalone app under public/coworker-app/ (kept
// standalone so it can also be recorded full-screen). Here it's hosted inside
// the site shell — the real Navbar + Footer wrap it — so navigation is identical
// to every other page. The navbar is fixed (h-14 / 3.5rem); the iframe fills the
// rest of the viewport.
export default function CoworkerPage() {
  return (
    <div className="pt-14">
      <iframe
        src="/coworker-app/index.html"
        title="ChipGPT RTL/DV Co-worker — live demo"
        className="block h-[calc(100vh-3.5rem)] w-full border-0"
      />
    </div>
  );
}
