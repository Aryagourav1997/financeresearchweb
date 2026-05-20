import { cn } from "@/lib/utils";

export function Disclaimer({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-caution/30 bg-caution/5 text-ink-muted",
        compact ? "px-3 py-2 text-[11px]" : "px-4 py-3 text-xs",
        className,
      )}
    >
      <span className="font-semibold text-caution">Disclaimer · </span>
      This platform provides AI-generated financial research for informational and educational purposes only. It is not financial advice.
      Investors should verify data independently and consult a licensed financial advisor before making investment decisions.
    </div>
  );
}
