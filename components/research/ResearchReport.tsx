import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RatingPill } from "@/components/cards/RatingPill";
import type { ResearchBundle } from "@/lib/researchEngine";
import { formatPct } from "@/lib/utils";

export function ResearchReport({ bundle }: { bundle: ResearchBundle }) {
  const { company, financials, technical, intel, template, matrix, recommendation, scenarios } = bundle;
  const last = financials.history[financials.history.length - 1];
  const prev = financials.history[financials.history.length - 2];
  const revGrowth = ((last.revenue - prev.revenue) / prev.revenue) * 100;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <RatingPill rating={recommendation.rating} />
        </CardHeader>
        <CardBody className="text-sm text-ink leading-relaxed space-y-3">
          <p>
            <strong className="text-ink">{company.name}</strong> ({company.exchange}:{company.ticker}) operates in {company.industry} with a {template.label.toLowerCase()} profile.
            FY{last.year} revenue grew {formatPct(revGrowth)} YoY to {last.revenue.toLocaleString()} {financials.currency}M with EBITDA margin of {last.ebitdaMargin}%.
            ROE stands at {last.roe}% and ROIC at {last.roic}%, with debt-to-equity at {last.debtToEquity}.
          </p>
          <p>
            We rate the stock <strong className={ratingColor(recommendation.rating)}>{recommendation.rating}</strong> with {recommendation.confidence}% confidence on a {recommendation.horizon.toLowerCase()} horizon.
            Probability-weighted upside is {recommendation.upsidePct.toFixed(1)}% vs downside risk of {recommendation.downsidePct.toFixed(1)}%, implying risk-adjusted return of {recommendation.riskAdjustedReturn.toFixed(1)}%.
          </p>
        </CardBody>
      </Card>

      <ReportSection title="Investment Thesis">
        <ul className="space-y-2 text-sm text-ink">
          {template.thesisTags.map((tag) => (
            <li key={tag} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
              <span><strong>{tag}:</strong> {generateThesisLine(tag, company.name)}</span>
            </li>
          ))}
        </ul>
      </ReportSection>

      <ReportSection title="Business Overview & Revenue Drivers">
        <p className="text-sm text-ink leading-relaxed">{company.description}</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-ink-muted uppercase tracking-widest text-[10px] mb-1">Key Metrics</div>
            <ul className="space-y-1 text-ink">
              {template.keyMetrics.map((m) => <li key={m}>• {m}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-ink-muted uppercase tracking-widest text-[10px] mb-1">Competitor Ecosystem</div>
            <div className="flex flex-wrap gap-1.5">
              {company.competitors.map((c) => <Badge key={c} tone="neutral">{c}</Badge>)}
            </div>
          </div>
        </div>
      </ReportSection>

      <ReportSection title="Financial Performance & Margin Analysis">
        <table className="w-full text-xs">
          <thead className="text-ink-muted text-[10px] uppercase tracking-widest">
            <tr>
              <th className="text-left py-2">Year</th>
              <th className="text-right">Revenue</th>
              <th className="text-right">EBITDA</th>
              <th className="text-right">Margin</th>
              <th className="text-right">Net Inc.</th>
              <th className="text-right">FCF</th>
              <th className="text-right">D/E</th>
              <th className="text-right">ROE</th>
            </tr>
          </thead>
          <tbody className="text-ink tabular-nums">
            {financials.history.map((y) => (
              <tr key={y.year} className="border-t border-bg-border">
                <td className="py-1.5">{y.year}</td>
                <td className="text-right">{y.revenue.toLocaleString()}</td>
                <td className="text-right">{y.ebitda.toLocaleString()}</td>
                <td className="text-right">{y.ebitdaMargin}%</td>
                <td className="text-right">{y.netIncome.toLocaleString()}</td>
                <td className="text-right">{y.fcf.toLocaleString()}</td>
                <td className="text-right">{y.debtToEquity}</td>
                <td className="text-right">{y.roe}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ReportSection>

      <ReportSection title="Valuation Overview">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <Metric label="P/E" value={financials.multiples.pe.toFixed(1)} />
          <Metric label="EV/EBITDA" value={financials.multiples.evEbitda.toFixed(1)} />
          <Metric label="P/S" value={financials.multiples.ps.toFixed(1)} />
          <Metric label="P/B" value={financials.multiples.pb.toFixed(1)} />
          <Metric label="PEG" value={financials.multiples.pegRatio.toFixed(2)} />
          <Metric label="Div yield" value={`${financials.multiples.dividendYield.toFixed(2)}%`} />
        </div>
        <div className="mt-3 text-xs text-ink-muted">
          Preferred methods for {template.label}: {template.valuationMethods.join(" · ")}
        </div>
      </ReportSection>

      <ReportSection title="Technical Analysis Snapshot">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <Metric label="Price" value={technical.currentPrice.toLocaleString()} />
          <Metric label="RSI" value={technical.rsi.toFixed(0)} />
          <Metric label="MACD" value={`${technical.macd} / ${technical.macdSignal}`} />
          <Metric label="Interpretation" value={technical.interpretation} />
          <Metric label="Support" value={technical.support.toLocaleString()} />
          <Metric label="Resistance" value={technical.resistance.toLocaleString()} />
          <Metric label="Stop-loss" value={technical.stopLoss.toLocaleString()} />
          <Metric label="Risk/Reward" value={technical.riskReward.toFixed(1)} />
        </div>
      </ReportSection>

      <ReportSection title="Macro & Geopolitical Risks">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-ink-muted text-[10px] uppercase tracking-widest mb-1">Macro dependencies</div>
            <ul className="space-y-1 text-ink">
              {company.macroDependencies.map((m) => <li key={m}>• {m}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-ink-muted text-[10px] uppercase tracking-widest mb-1">Geopolitical exposure</div>
            <ul className="space-y-1 text-ink">
              {company.geopoliticalExposure.map((g) => <li key={g}>• {g}</li>)}
            </ul>
          </div>
        </div>
      </ReportSection>

      <ReportSection title="Bull / Base / Bear Scenarios">
        <div className="grid md:grid-cols-3 gap-3">
          {scenarios.map((s) => (
            <div key={s.scenario} className="rounded-lg border border-bg-border bg-bg-elevated p-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${s.scenario === "Bull" ? "text-bull" : s.scenario === "Bear" ? "text-bear" : "text-neutral"}`}>{s.scenario} Case</span>
                <Badge tone="neutral">{s.probability}% prob</Badge>
              </div>
              <div className="mt-2 text-xl font-semibold text-ink tabular-nums">{s.targetPrice.toLocaleString()}</div>
              <div className="text-xs text-ink-muted">{formatPct(s.upsidePct)} vs current</div>
              <div className="mt-2 text-xs text-ink-muted leading-relaxed">{s.rationale}</div>
            </div>
          ))}
        </div>
      </ReportSection>

      <ReportSection title="Final Recommendation">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <RatingPill rating={recommendation.rating} size="lg" />
          <Badge tone="brand">Confidence {recommendation.confidence}%</Badge>
          <Badge tone="neutral">{recommendation.horizon}</Badge>
          <Badge tone="bull">Upside {recommendation.upsidePct.toFixed(1)}%</Badge>
          <Badge tone="bear">Downside {recommendation.downsidePct.toFixed(1)}%</Badge>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-ink-muted text-[10px] uppercase tracking-widest mb-1">Key catalysts</div>
            <ul className="space-y-1 text-ink">
              {recommendation.catalysts.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-ink-muted text-[10px] uppercase tracking-widest mb-1">Key risks</div>
            <ul className="space-y-1 text-ink">
              {recommendation.risks.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
        </div>
      </ReportSection>
    </div>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-bg-border bg-bg-elevated px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="text-sm font-medium text-ink tabular-nums">{value}</div>
    </div>
  );
}

function ratingColor(r: string) {
  if (r.includes("Buy")) return "text-bull";
  if (r.includes("Sell")) return "text-bear";
  if (r === "Hold" || r === "Accumulate") return "text-neutral";
  return "text-caution";
}

function generateThesisLine(tag: string, name: string): string {
  const map: Record<string, string> = {
    "AI demand": `${name} is a primary beneficiary of accelerating AI infrastructure spend across hyperscalers and sovereigns.`,
    "Chip cycle": "Inventory normalization and order-book replenishment support multi-quarter operating leverage.",
    "China restrictions": "Carve-outs and product re-tailoring partially offset export-control headwinds.",
    "Foundry dependency": "Diversified node mix and HBM partnerships de-risk single-source exposure.",
    NIM: "Asset-side repricing keeps NIM resilient even as deposit costs normalize.",
    Deposits: "Sticky CASA franchise underpins low-cost funding through the rate cycle.",
    "Loan quality": "Granular retail book with low restructured exposure keeps credit cost contained.",
    "Credit risk": "Provisioning buffers exceed regulatory thresholds with stable PCR.",
    "Interest rates": "Rate path benign — neutral to mildly positive impact on earnings.",
    "Fuel prices": "ATF moderation expands EBITDAR margin band into seasonal strength.",
    "Fleet cost": "Aircraft induction pipeline locks in unit economics through 2027.",
    Tourism: "Domestic pax growth structurally outpaces global average.",
    "Recession risk": "Defensive route mix and cost flex protect downside.",
    ARR: "Net new ARR remains durable led by AI-attached upsell motion.",
    Churn: "Logo retention holds firm; expansion ARR variability is the swing factor.",
    Retention: "NRR drift bears watching; pricing rationalization could re-accelerate.",
    Margins: "Operating leverage compounds as gross margin mix shifts to platform.",
    "AI disruption": "Native AI offering converts threat into category-defining moat.",
    "Consumer spending": "Wallet-share gains in value tier insulate from discretionary slowdown.",
    Inflation: "Margin recovery supported by softer input basket and pricing flexibility.",
    "Inventory turnover": "Throughput per store remains industry-leading versus peers.",
    "Battery costs": "BoM tailwind from softer lithium and improving cell chemistry.",
    Lithium: "Hedged supply and JV pipeline reduce price volatility exposure.",
    "China exposure": "Localization roadmap reduces dependency on Chinese cell imports.",
    "Subsidy risk": "Profitability holds at unit level even under no-subsidy scenarios.",
    "FDA approvals": "Specialty pipeline drives mix shift and pricing power expansion.",
    "Patent cliffs": "Biosimilar and complex generics offset upcoming branded LoEs.",
    "Pipeline strength": "Phase III readouts in dermatology and ophthalmology de-risk the next 12 months.",
    "Commodity cycle": "Disciplined capex and integrated value chain absorb cyclical swings.",
    "Energy transition": "New-energy gigafactory build positions for medium-term re-rating.",
    "Capex discipline": "Cash generation funds growth capex without leverage creep.",
    Growth: "Top-line compounding remains in the top quartile of the sector.",
    Quality: "ROIC consistently exceeds cost of capital across cycles.",
    "Cash generation": "FCF conversion supports buybacks and dividends without operational drag.",
    Volume: "Volume-led recovery is stronger than pricing-led peers.",
    Premiumization: "Mix shift to premium SKUs lifts blended GM by 60–80 bps annually.",
    "Rural recovery": "Rural volume momentum extends for a fourth consecutive quarter.",
  };
  return map[tag] ?? "Sector-specific tailwinds remain intact based on current operating signals.";
}
