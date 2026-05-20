import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { CompanyOverview } from "@/components/research/CompanyOverview";
import { KpiCard } from "@/components/cards/KpiCard";
import { ScoreCard } from "@/components/cards/ScoreCard";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { CashFlowChart } from "@/components/charts/CashFlowChart";
import { PriceChart } from "@/components/charts/PriceChart";
import { RadarScore } from "@/components/charts/RadarScore";
import { ScenarioChart } from "@/components/charts/ScenarioChart";
import { RiskHeatmap } from "@/components/charts/RiskHeatmap";
import { Badge } from "@/components/ui/Badge";
import { RatingPill } from "@/components/cards/RatingPill";
import { buildResearchBundle } from "@/lib/researchEngine";
import { matrixToScorecards } from "@/lib/scoringEngine";
import { formatPct } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardPage({ searchParams }: { searchParams: { q?: string } }) {
  const bundle = buildResearchBundle(searchParams.q);
  const { company, financials, technical, intel, template, matrix, recommendation, scenarios } = bundle;
  const last = financials.history[financials.history.length - 1];
  const prev = financials.history[financials.history.length - 2];
  const revGrowth = ((last.revenue - prev.revenue) / prev.revenue) * 100;
  const cards = matrixToScorecards(matrix);
  const radarData = [
    { label: "Health", value: matrix.financialHealth },
    { label: "Profit", value: matrix.profitability },
    { label: "Growth", value: matrix.growth },
    { label: "Technical", value: matrix.technicalStrength },
    { label: "Valuation", value: matrix.valuation },
    { label: "Sentiment", value: matrix.marketSentiment },
    { label: "Moat", value: matrix.competitiveStrength },
    { label: "AI", value: matrix.aiReadiness },
  ];
  const riskCells = [
    { label: "Geopolitical", score: matrix.geopoliticalRisk },
    { label: "Macro sensitivity", score: matrix.macroSensitivity },
    { label: "Valuation", score: 100 - matrix.valuation },
    { label: "Technical risk", score: 100 - matrix.technicalStrength },
    { label: "Sentiment risk", score: 100 - matrix.marketSentiment },
    { label: "Liquidity risk", score: 100 - matrix.liquidity },
  ];

  return (
    <DashboardShell searchBase="/dashboard">
      <CompanyHeader company={company} tech={technical} recommendation={recommendation} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Last revenue" value={`${(last.revenue / 1000).toFixed(1)}B ${financials.currency}`} change={revGrowth} hint={`FY${last.year}`} />
        <KpiCard label="EBITDA margin" value={`${last.ebitdaMargin}%`} change={last.ebitdaMargin - prev.ebitdaMargin} />
        <KpiCard label="ROE" value={`${last.roe}%`} change={last.roe - prev.roe} />
        <KpiCard label="Free cash flow" value={`${(last.fcf / 1000).toFixed(2)}B`} change={((last.fcf - prev.fcf) / Math.abs(prev.fcf || 1)) * 100} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & EBITDA margin</CardTitle>
            <Badge tone="neutral">5Y trend</Badge>
          </CardHeader>
          <CardBody><RevenueChart data={financials.history} /></CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Investor radar</CardTitle>
            <Badge tone="brand">{template.label}</Badge>
          </CardHeader>
          <CardBody><RadarScore data={radarData} /></CardBody>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Price action (90D)</CardTitle>
            <Badge tone={technical.interpretation.includes("Bullish") ? "bull" : technical.interpretation.includes("Bear") ? "bear" : "neutral"}>
              {technical.interpretation}
            </Badge>
          </CardHeader>
          <CardBody><PriceChart data={technical.priceHistory} /></CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scenario targets</CardTitle>
          </CardHeader>
          <CardBody>
            <ScenarioChart data={scenarios} />
            <div className="mt-3 space-y-2 text-xs">
              {scenarios.map((s) => (
                <div key={s.scenario} className="flex items-center justify-between border-t border-bg-border pt-2">
                  <span className={`font-medium ${s.scenario === "Bull" ? "text-bull" : s.scenario === "Bear" ? "text-bear" : "text-neutral"}`}>{s.scenario}</span>
                  <span className="text-ink tabular-nums">{s.targetPrice.toLocaleString()} <span className="text-ink-muted">({formatPct(s.upsidePct)})</span></span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Decision matrix</CardTitle>
            <Link href="/decision" className="text-xs text-brand inline-flex items-center gap-1">
              Open full matrix <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardBody className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cards.slice(0, 9).map((s) => (
              <ScoreCard key={s.label} label={s.label} value={s.value} />
            ))}
          </CardBody>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
              <RatingPill rating={recommendation.rating} />
            </CardHeader>
            <CardBody className="space-y-2 text-sm">
              <div className="flex justify-between text-ink-muted text-xs">
                <span>Confidence</span><span className="text-ink">{recommendation.confidence}%</span>
              </div>
              <div className="flex justify-between text-ink-muted text-xs">
                <span>Horizon</span><span className="text-ink">{recommendation.horizon}</span>
              </div>
              <div className="flex justify-between text-ink-muted text-xs">
                <span>Upside</span><span className="text-bull">{recommendation.upsidePct.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-ink-muted text-xs">
                <span>Downside</span><span className="text-bear">{recommendation.downsidePct.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-ink-muted text-xs">
                <span>Risk-adj return</span><span className="text-ink">{recommendation.riskAdjustedReturn.toFixed(1)}%</span>
              </div>
              <Link href={`/research?q=${company.ticker}`} className="mt-2 inline-flex items-center gap-1 text-brand text-xs">
                Read full report <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Risk heatmap</CardTitle>
            </CardHeader>
            <CardBody><RiskHeatmap cells={riskCells} /></CardBody>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Net income & free cash flow</CardTitle>
          </CardHeader>
          <CardBody><CashFlowChart data={financials.history} /></CardBody>
        </Card>
        <CompanyOverview company={company} template={template} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
        </CardHeader>
        <CardBody className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <QuickLink href={`/research?q=${company.ticker}`} title="Equity research" desc="Bloomberg-style full report" />
          <QuickLink href={`/technical?q=${company.ticker}`} title="Technical board" desc="RSI, MACD, BB, swing setup" />
          <QuickLink href={`/competitors?q=${company.ticker}`} title="Competitor comparison" desc="Peer multiples & ratings" />
          <QuickLink href={`/valuation?q=${company.ticker}`} title="Valuation & scenarios" desc="Bull / Base / Bear targets" />
        </CardBody>
      </Card>
    </DashboardShell>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="rounded-md border border-bg-border bg-bg-elevated hover:border-brand/40 hover:bg-bg-card transition-colors p-3 block">
      <div className="text-sm font-medium text-ink">{title}</div>
      <div className="text-xs text-ink-muted">{desc}</div>
    </Link>
  );
}
