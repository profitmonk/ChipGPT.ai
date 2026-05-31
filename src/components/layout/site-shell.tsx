import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-white/[0.06] bg-[#060606] pt-14">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <p className="mono-label mb-5 text-green-600">{eyebrow}</p>
        <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-zinc-500">
          {description}
        </p>
      </div>
    </header>
  );
}

export function LearnMoreLink({ href, label = "Learn more" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-green-600 transition-colors hover:text-green-500"
    >
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}
