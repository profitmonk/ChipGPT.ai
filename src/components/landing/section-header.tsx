import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeaderProps) {
  return (
    <header
      id={id}
      className={cn(
        "mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mono-label mb-5 text-green-600">{eyebrow}</p>
      )}
      <h2 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2rem] lg:text-[2.25rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-[15px] leading-[1.65] text-zinc-500">
          {description}
        </p>
      )}
    </header>
  );
}
