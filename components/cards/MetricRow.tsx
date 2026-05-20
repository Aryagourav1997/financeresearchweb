import { cn } from "@/lib/utils";

interface MetricRowProps {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "bad" | "warn";
}

const toneClass: Record<NonNullable<MetricRowProps["tone"]>, string> = {
  neutral: "text-ink",
  good: "text-bull",
  bad: "text-bear",
  warn: "text-caution",
};

export function MetricRow({ label, value, tone = "neutral" }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-bg-border last:border-0">
      <div className="text-xs text-ink-muted">{label}</div>
      <div className={cn("text-sm font-medium tabular-nums", toneClass[tone])}>{value}</div>
    </div>
  );
}
