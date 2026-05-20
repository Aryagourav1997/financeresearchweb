import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types/research";

const map: Record<Recommendation, { label: string; class: string }> = {
  "Strong Buy": { label: "Strong Buy", class: "bg-bull/20 text-bull border-bull/40" },
  Buy: { label: "Buy", class: "bg-bull/15 text-bull border-bull/30" },
  Accumulate: { label: "Accumulate", class: "bg-neutral/15 text-neutral border-neutral/30" },
  Hold: { label: "Hold", class: "bg-bg-elevated text-ink-muted border-bg-border" },
  Reduce: { label: "Reduce", class: "bg-caution/15 text-caution border-caution/30" },
  Sell: { label: "Sell", class: "bg-bear/15 text-bear border-bear/30" },
  "Strong Sell": { label: "Strong Sell", class: "bg-bear/25 text-bear border-bear/50" },
};

export function RatingPill({ rating, size = "md" }: { rating: Recommendation; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "text-base h-9 px-4" : size === "sm" ? "text-[11px] h-6 px-2" : "text-sm h-8 px-3";
  return (
    <span className={cn("inline-flex items-center rounded-md border font-semibold", map[rating].class, sz)}>
      {map[rating].label}
    </span>
  );
}
