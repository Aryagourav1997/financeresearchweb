import { cn } from "@/lib/utils";

interface Cell {
  label: string;
  score: number; // 0-100 risk score, higher = more risk
}

function colorFor(score: number) {
  if (score >= 70) return "bg-bear/30 border-bear/50 text-bear";
  if (score >= 50) return "bg-caution/30 border-caution/50 text-caution";
  if (score >= 30) return "bg-neutral/20 border-neutral/40 text-neutral";
  return "bg-bull/20 border-bull/40 text-bull";
}

export function RiskHeatmap({ cells }: { cells: Cell[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {cells.map((c) => (
        <div
          key={c.label}
          className={cn(
            "rounded-md border px-3 py-2.5 flex items-center justify-between",
            colorFor(c.score),
          )}
        >
          <div className="text-xs font-medium text-ink/90">{c.label}</div>
          <div className="text-sm font-semibold tabular-nums">{Math.round(c.score)}</div>
        </div>
      ))}
    </div>
  );
}
