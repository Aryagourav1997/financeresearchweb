import { cn } from "@/lib/utils";
import { clamp } from "@/lib/utils";

function barColor(value: number) {
  if (value >= 75) return "bg-bull";
  if (value >= 55) return "bg-neutral";
  if (value >= 40) return "bg-caution";
  return "bg-bear";
}

export function Progress({ value, className }: { value: number; className?: string }) {
  const v = clamp(value);
  return (
    <div className={cn("h-1.5 w-full rounded-full bg-bg-elevated overflow-hidden", className)}>
      <div className={cn("h-full transition-all", barColor(v))} style={{ width: `${v}%` }} />
    </div>
  );
}
