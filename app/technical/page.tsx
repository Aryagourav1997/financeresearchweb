import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { PriceChart } from "@/components/charts/PriceChart";
import { TechnicalGrid } from "@/components/technical/TechnicalGrid";
import { Badge } from "@/components/ui/Badge";
import { buildResearchBundle } from "@/lib/researchEngine";
import { KpiCard } from "@/components/cards/KpiCard";

export default function TechnicalPage({ searchParams }: { searchParams: { q?: string } }) {
  const { company, technical, recommendation } = buildResearchBundle(searchParams.q);
  const first = technical.priceHistory[0].close;
  const change = ((technical.currentPrice - first) / first) * 100;

  return (
    <DashboardShell searchBase="/technical">
      <CompanyHeader company={company} tech={technical} recommendation={recommendation} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="90D price change" value={`${change >= 0 ? "+" : ""}${change.toFixed(1)}%`} change={change} />
        <KpiCard label="RSI" value={technical.rsi.toFixed(0)} hint={technical.rsi >= 70 ? "Overbought zone" : technical.rsi <= 30 ? "Oversold zone" : "Neutral"} />
        <KpiCard label="Risk / Reward" value={`${technical.riskReward.toFixed(1)}:1`} hint={`Stop ${technical.stopLoss.toLocaleString()}`} />
        <KpiCard label="Momentum" value={technical.momentum} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price action with SMA & Bollinger Bands</CardTitle>
          <Badge tone="brand">{technical.interpretation}</Badge>
        </CardHeader>
        <CardBody><PriceChart data={technical.priceHistory} /></CardBody>
      </Card>

      <TechnicalGrid tech={technical} />

      <Card>
        <CardHeader>
          <CardTitle>Trade plan</CardTitle>
        </CardHeader>
        <CardBody className="grid md:grid-cols-3 gap-4 text-sm">
          <Block label="Setup" value={technical.swingSetup} />
          <Block label="Entry zone" value={`${technical.support.toLocaleString()} – ${technical.currentPrice.toLocaleString()}`} />
          <Block label="Targets" value={`${technical.resistance.toLocaleString()} / ${(technical.resistance * 1.05).toFixed(0)}`} />
          <Block label="Stop-loss" value={technical.stopLoss.toLocaleString()} tone="bear" />
          <Block label="Risk / Reward" value={`${technical.riskReward.toFixed(1)} : 1`} />
          <Block label="Interpretation" value={technical.interpretation} />
        </CardBody>
      </Card>
    </DashboardShell>
  );
}

function Block({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "bear" }) {
  return (
    <div className={`rounded-md border px-3 py-2.5 ${tone === "bear" ? "border-bear/40 bg-bear/5" : "border-bg-border bg-bg-elevated"}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="text-sm text-ink mt-0.5">{value}</div>
    </div>
  );
}
