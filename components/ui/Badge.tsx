import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "neutral" | "bull" | "bear" | "caution" | "brand";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  neutral: "bg-bg-elevated text-ink-muted border-bg-border",
  bull: "bg-bull/15 text-bull border-bull/30",
  bear: "bg-bear/15 text-bear border-bear/30",
  caution: "bg-caution/15 text-caution border-caution/30",
  brand: "bg-brand/15 text-brand border-brand/30",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
