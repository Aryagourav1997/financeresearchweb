import { Progress } from "@/components/ui/Progress";
import { cn, scoreColor } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  value: number;
  note?: string;
  className?: string;
}

export function ScoreCard({ label, value, note, className }: ScoreCardProps) {
  const v = Math.round(value);
  return (
    <div className={cn("rounded-xl border border-bg-border bg-bg-card p-3.5 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wider text-ink-muted">{label}</div>
        <div className={cn("text-sm font-semibold tabular-nums", scoreColor(v))}>{v}</div>
      </div>
      <Progress value={v} className="mt-2" />
      {note && <div className="mt-2 text-[11px] text-ink-subtle">{note}</div>}
    </div>
  );
}
