import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScoreCard } from "@/components/cards/ScoreCard";
import { RadarScore } from "@/components/charts/RadarScore";
import { RiskHeatmap } from "@/components/charts/RiskHeatmap";
import { RatingPill } from "@/components/cards/RatingPill";
import { Badge } from "@/components/ui/Badge";
import { buildResearchBundle } from "@/lib/researchEngine";
import { matrixToScorecards } from "@/lib/scoringEngine";

export default function DecisionPage({ searchParams }: { searchParams: { q?: string } }) {
  const bundle = buildResearchBundle(searchParams.q);
  const { company, technical, matrix, recommendation } = bundle;
  const cards = matrixToScorecards(matrix);
  const radarData = cards.slice(0, 12).map((c) => ({ label: c.label.split(" ")[0], value: c.value }));
  const riskCells = [
    { label: "Geopolitical", score: matrix.geopoliticalRisk },
    { label: "Macro sensitivity", score: matrix.macroSensitivity },
    { label: "Valuation", score: 100 - matrix.valuation },
    { label: "Technical", score: 100 - matrix.technicalStrength },
    { label: "Sentiment", score: 100 - matrix.marketSentiment },
    { label: "Liquidity", score: 100 - matrix.liquidity },
    { label: "Competitive", score: 100 - matrix.competitiveStrength },
    { label: "Profitability", score: 100 - matrix.profitability },
    { label: "ESG", score: 100 - matrix.esg },
  ];

  return (
    <DashboardShell searchBase="/decision">
      <CompanyHeader company={company} tech={technical} recommendation={recommendation} />

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Final recommendation</CardTitle>
            <RatingPill rating={recommendation.rating} size="lg" />
          </CardHeader>
          <CardBody className="grid sm:grid-cols-4 gap-3 text-sm">
            <Tile label="Confidence" value={`${recommendation.confidence}%`} tone="brand" />
            <Tile label="Horizon" value={recommendation.horizon} />
            <Tile label="Upside" value={`${recommendation.upsidePct.toFixed(1)}%`} tone="bull" />
            <Tile label="Downside" value={`${recommendation.downsidePct.toFixed(1)}%`} tone="bear" />
            <div className="sm:col-span-2 rounded-md border border-bg-border bg-bg-elevated px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-widest text-ink-muted">Catalysts</div>
              <ul className="mt-1 space-y-1 text-xs text-ink">
                {recommendation.catalysts.map((c, i) => <li key={i}>• {c}</li>)}
              </ul>
            </div>
            <div className="sm:col-span-2 rounded-md border border-bg-border bg-bg-elevated px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-widest text-ink-muted">Risks</div>
              <ul className="mt-1 space-y-1 text-xs text-ink">
                {recommendation.risks.map((c, i) => <li key={i}>• {c}</li>)}
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investor radar</CardTitle>
          </CardHeader>
          <CardBody><RadarScore data={radarData} /></CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Smart investor decision matrix</CardTitle>
          <Badge tone="brand">18 scorecards</Badge>
        </CardHeader>
        <CardBody className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {cards.map((c) => (
            <ScoreCard key={c.label} label={c.label} value={c.value} />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk heatmap</CardTitle>
        </CardHeader>
        <CardBody><RiskHeatmap cells={riskCells} /></CardBody>
      </Card>
    </DashboardShell>
  );
}

function Tile({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "bull" | "bear" | "brand" | "neutral" }) {
  const cls =
    tone === "bull" ? "border-bull/40 bg-bull/5 text-bull" :
    tone === "bear" ? "border-bear/40 bg-bear/5 text-bear" :
    tone === "brand" ? "border-brand/40 bg-brand/5 text-brand" :
    "border-bg-border bg-bg-elevated text-ink";
  return (
    <div className={`rounded-md border px-3 py-2.5 ${cls}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
