import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/cards/KpiCard";
import { NewsList } from "@/components/research/NewsList";
import { buildResearchBundle } from "@/lib/researchEngine";

export default function MarketPage({ searchParams }: { searchParams: { q?: string } }) {
  const { company, technical, intel, recommendation } = buildResearchBundle(searchParams.q);

  return (
    <DashboardShell searchBase="/market">
      <CompanyHeader company={company} tech={technical} recommendation={recommendation} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="News sentiment" value={intel.newsSentimentScore.toString()} change={intel.newsSentimentScore} hint="Range -100 to 100" />
        <KpiCard label="Institutional flow" value={intel.institutionalFlow} hint={intel.hedgeFundActivity} />
        <KpiCard label="Analyst delta" value={`+${intel.analystUpgrades} / -${intel.analystDowngrades}`} hint="Last 90D" />
        <KpiCard label="Sector momentum" value={`${intel.sectorMomentum}/100`} change={intel.sectorMomentum - 50} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <NewsList news={intel.news} />
          <Card>
            <CardHeader>
              <CardTitle>Macro indicators</CardTitle>
              <Badge tone="brand">Live-style</Badge>
            </CardHeader>
            <CardBody>
              <table className="w-full text-sm">
                <tbody>
                  {intel.macroIndicators.map((m) => (
                    <tr key={m.name} className="border-b border-bg-border last:border-0">
                      <td className="py-2 text-ink-muted">{m.name}</td>
                      <td className="py-2 text-right tabular-nums text-ink">{m.value}</td>
                      <td className="py-2 text-right">
                        <Badge tone={m.impact === "positive" ? "bull" : m.impact === "negative" ? "bear" : "neutral"}>
                          {m.impact}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Flow signals</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2 text-sm">
              <Row label="Institutional flow" value={intel.institutionalFlow} />
              <Row label="Insider activity" value={intel.insiderActivity} />
              <Row label="Hedge fund stance" value={intel.hedgeFundActivity} />
              <Row label="ETF exposure" value={`${intel.etfExposure}/100`} />
              <Row label="Analyst upgrades" value={`+${intel.analystUpgrades}`} />
              <Row label="Analyst downgrades" value={`-${intel.analystDowngrades}`} />
              <Row label="Geopolitical risk" value={`${intel.geopoliticalRisk}/100`} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency & commodity exposure</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Currencies</div>
                <div className="flex flex-wrap gap-1.5">
                  {intel.currencyExposure.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Commodities</div>
                <div className="flex flex-wrap gap-1.5">
                  {intel.commodityExposure.length === 0 && <span className="text-xs text-ink-subtle">No direct commodity exposure</span>}
                  {intel.commodityExposure.map((c) => <Badge key={c} tone="caution">{c}</Badge>)}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-bg-border pb-1.5 last:border-0 last:pb-0">
      <span className="text-ink-muted text-xs">{label}</span>
      <span className="text-ink text-xs">{value}</span>
    </div>
  );
}
