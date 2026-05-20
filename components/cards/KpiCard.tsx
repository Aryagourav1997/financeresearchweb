import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  change?: number; // percent
  hint?: string;
  className?: string;
}

export function KpiCard({ label, value, change, hint, className }: KpiCardProps) {
  const Trend = change === undefined ? Minus : change >= 0 ? ArrowUpRight : ArrowDownRight;
  const trendColor =
    change === undefined ? "text-ink-muted" : change >= 0 ? "text-bull" : "text-bear";
  return (
    <div className={cn("rounded-xl border border-bg-border bg-bg-card p-4 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted">{label}</div>
        {change !== undefined && (
          <span className={cn("inline-flex items-center gap-1 text-xs font-medium", trendColor)}>
            <Trend className="h-3 w-3" />
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="mt-2 text-2xl font-semibold text-ink tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-ink-subtle">{hint}</div>}
    </div>
  );
}
