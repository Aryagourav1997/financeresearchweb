import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScenarioChart } from "@/components/charts/ScenarioChart";
import { PeerBarChart } from "@/components/charts/PeerBarChart";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/cards/KpiCard";
import { buildResearchBundle } from "@/lib/researchEngine";
import { probabilityWeightedTarget } from "@/lib/valuationEngine";
import { formatPct } from "@/lib/utils";

export default function ValuationPage({ searchParams }: { searchParams: { q?: string } }) {
  const bundle = buildResearchBundle(searchParams.q);
  const { company, financials, technical, template, scenarios, recommendation } = bundle;
  const weighted = probabilityWeightedTarget(scenarios);
  const weightedUpside = ((weighted - technical.currentPrice) / technical.currentPrice) * 100;

  return (
    <DashboardShell searchBase="/valuation">
      <CompanyHeader company={company} tech={technical} recommendation={recommendation} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Current price" value={technical.currentPrice.toLocaleString()} />
        <KpiCard label="Prob. wtd target" value={weighted.toLocaleString()} change={weightedUpside} />
        <KpiCard label="P/E" value={financials.multiples.pe.toFixed(1)} />
        <KpiCard label="EV/EBITDA" value={financials.multiples.evEbitda.toFixed(1)} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scenario analysis</CardTitle>
            <Badge tone="brand">{template.label}</Badge>
          </CardHeader>
          <CardBody>
            <ScenarioChart data={scenarios} />
            <div className="mt-4 grid md:grid-cols-3 gap-3">
              {scenarios.map((s) => (
                <div key={s.scenario} className={`rounded-lg border p-3 ${s.scenario === "Bull" ? "border-bull/30 bg-bull/5" : s.scenario === "Bear" ? "border-bear/30 bg-bear/5" : "border-neutral/30 bg-neutral/5"}`}>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{s.scenario} case</span>
                    <Badge tone="neutral">{s.probability}%</Badge>
                  </div>
                  <div className="text-xl font-semibold mt-1 tabular-nums text-ink">{s.targetPrice.toLocaleString()}</div>
                  <div className="text-xs text-ink-muted">{formatPct(s.upsidePct)} vs current</div>
                  <div className="mt-2 text-xs text-ink-muted leading-relaxed">{s.rationale}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valuation methods</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            {template.valuationMethods.map((m, i) => (
              <div key={m} className="flex items-start gap-2">
                <span className="text-[10px] text-brand pt-1">{(i + 1).toString().padStart(2, "0")}</span>
                <span className="text-ink">{m}</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-bg-border space-y-1.5 text-xs">
              <Row label="P/E" value={financials.multiples.pe.toFixed(1)} />
              <Row label="EV/EBITDA" value={financials.multiples.evEbitda.toFixed(1)} />
              <Row label="P/S" value={financials.multiples.ps.toFixed(1)} />
              <Row label="P/B" value={financials.multiples.pb.toFixed(1)} />
              <Row label="PEG" value={financials.multiples.pegRatio.toFixed(2)} />
              <Row label="Dividend yield" value={`${financials.multiples.dividendYield.toFixed(2)}%`} />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Peer multiples</CardTitle>
        </CardHeader>
        <CardBody><PeerBarChart data={financials.peerMultiples} /></CardBody>
      </Card>
    </DashboardShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className="text-ink tabular-nums">{value}</span>
    </div>
  );
}
