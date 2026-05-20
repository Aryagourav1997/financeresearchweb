import type { TechnicalSnapshot } from "@/types/technical";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

function signalTone(s: string): "bull" | "bear" | "caution" | "neutral" {
  if (s.includes("Bullish") || s.includes("Accumulation")) return "bull";
  if (s.includes("Bearish") || s.includes("Distribution") || s.includes("Overbought")) return "bear";
  if (s.includes("Oversold")) return "caution";
  return "neutral";
}

const cardCls = "rounded-md border border-bg-border bg-bg-elevated px-3 py-2.5";

export function TechnicalGrid({ tech }: { tech: TechnicalSnapshot }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Snapshot</CardTitle>
        <Badge tone={signalTone(tech.interpretation)}>{tech.interpretation}</Badge>
      </CardHeader>
      <CardBody className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <Item label="Current price" value={tech.currentPrice.toLocaleString()} />
        <Item label="RSI (14)" value={tech.rsi.toFixed(0)} tone={tech.rsi >= 70 ? "bear" : tech.rsi <= 30 ? "caution" : "neutral"} />
        <Item label="MACD" value={tech.macd.toFixed(2)} tone={tech.macd > tech.macdSignal ? "bull" : "bear"} />
        <Item label="MACD signal" value={tech.macdSignal.toFixed(2)} />
        <Item label="SMA 50" value={tech.sma50.toLocaleString()} />
        <Item label="SMA 200" value={tech.sma200.toLocaleString()} />
        <Item label="EMA 20" value={tech.ema20.toLocaleString()} />
        <Item label="VWAP" value={tech.vwap.toLocaleString()} />
        <Item label="Upper BB" value={tech.upperBB.toLocaleString()} />
        <Item label="Lower BB" value={tech.lowerBB.toLocaleString()} />
        <Item label="ATR" value={tech.atr.toFixed(1)} />
        <Item label="Volume trend" value={tech.volumeTrend} tone={tech.volumeTrend === "Rising" ? "bull" : tech.volumeTrend === "Falling" ? "bear" : "neutral"} />
        <Item label="Support" value={tech.support.toLocaleString()} tone="bull" />
        <Item label="Resistance" value={tech.resistance.toLocaleString()} tone="caution" />
        <Item label="Stop-loss" value={tech.stopLoss.toLocaleString()} tone="bear" />
        <Item label="Risk / Reward" value={`${tech.riskReward.toFixed(1)} : 1`} />
        <Item label="Momentum" value={tech.momentum} tone={tech.momentum.includes("Up") ? "bull" : tech.momentum.includes("Down") ? "bear" : "neutral"} />
        <div className="col-span-2 md:col-span-3 rounded-md border border-bg-border bg-bg-elevated px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Swing setup</div>
          <div className="text-sm text-ink mt-0.5">{tech.swingSetup}</div>
        </div>
      </CardBody>
    </Card>
  );
}

function Item({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "bull" | "bear" | "caution" | "neutral" }) {
  const color = tone === "bull" ? "text-bull" : tone === "bear" ? "text-bear" : tone === "caution" ? "text-caution" : "text-ink";
  return (
    <div className={cardCls}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className={`text-sm font-medium tabular-nums ${color}`}>{value}</div>
    </div>
  );
}
