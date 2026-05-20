import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PeerBarChart } from "@/components/charts/PeerBarChart";
import { buildResearchBundle } from "@/lib/researchEngine";

export default function CompetitorsPage({ searchParams }: { searchParams: { q?: string } }) {
  const { company, financials, technical, recommendation } = buildResearchBundle(searchParams.q);
  const last = financials.history[financials.history.length - 1];
  const first = financials.history[0];
  const revCagr = (Math.pow(last.revenue / first.revenue, 1 / (financials.history.length - 1)) - 1) * 100;

  // Build comparison rows: subject + peers
  const subjectRow = {
    company: company.ticker,
    marketCap: `$${company.marketCap.toLocaleString()}M`,
    revGrowth: `${revCagr.toFixed(1)}%`,
    ebitdaMargin: `${last.ebitdaMargin}%`,
    pe: financials.multiples.pe.toFixed(1),
    evEbitda: financials.multiples.evEbitda.toFixed(1),
    debtToEquity: last.debtToEquity.toFixed(2),
    roe: `${last.roe}%`,
    roic: `${last.roic}%`,
    divYield: `${financials.multiples.dividendYield.toFixed(2)}%`,
    rating: recommendation.rating,
    technical: technical.interpretation,
    aiReady: company.companyTypes.includes("AI-driven") ? "High" : "Moderate",
    isSubject: true,
  };

  const peerRows = financials.peerMultiples.map((p, i) => ({
    company: p.peer,
    marketCap: `$${(company.marketCap * (0.4 + Math.random() * 1.4)).toFixed(0)}M`,
    revGrowth: `${(revCagr * (0.6 + Math.random() * 0.8)).toFixed(1)}%`,
    ebitdaMargin: `${(last.ebitdaMargin * (0.7 + Math.random() * 0.5)).toFixed(1)}%`,
    pe: p.pe.toFixed(1),
    evEbitda: p.evEbitda.toFixed(1),
    debtToEquity: (last.debtToEquity * (0.6 + Math.random() * 0.9)).toFixed(2),
    roe: `${(last.roe * (0.5 + Math.random() * 1)).toFixed(1)}%`,
    roic: `${(last.roic * (0.5 + Math.random() * 1)).toFixed(1)}%`,
    divYield: `${(Math.random() * 2).toFixed(2)}%`,
    rating: i % 2 === 0 ? "Buy" : "Hold",
    technical: ["Bullish breakout", "Consolidation", "Oversold", "Accumulation phase"][i % 4],
    aiReady: ["High", "Moderate", "Low"][i % 3],
    isSubject: false,
  }));

  const rows = [subjectRow, ...peerRows];

  return (
    <DashboardShell searchBase="/competitors">
      <CompanyHeader company={company} tech={technical} recommendation={recommendation} />

      <Card>
        <CardHeader>
          <CardTitle>Peer multiples</CardTitle>
        </CardHeader>
        <CardBody><PeerBarChart data={financials.peerMultiples} /></CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competitor comparison</CardTitle>
          <Badge tone="brand">{company.competitors.length + 1} companies</Badge>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-ink-muted text-[10px] uppercase tracking-widest">
              <tr>
                <th className="text-left py-2 pr-4">Company</th>
                <th className="text-right pr-4">Market cap</th>
                <th className="text-right pr-4">Rev CAGR</th>
                <th className="text-right pr-4">EBITDA mgn</th>
                <th className="text-right pr-4">P/E</th>
                <th className="text-right pr-4">EV/EBITDA</th>
                <th className="text-right pr-4">Debt/Eq</th>
                <th className="text-right pr-4">ROE</th>
                <th className="text-right pr-4">ROIC</th>
                <th className="text-right pr-4">Div yield</th>
                <th className="text-left pr-4">Rating</th>
                <th className="text-left pr-4">Technical</th>
                <th className="text-left">AI ready</th>
              </tr>
            </thead>
            <tbody className="text-ink tabular-nums">
              {rows.map((r) => (
                <tr key={r.company} className={`border-t border-bg-border ${r.isSubject ? "bg-brand/5" : ""}`}>
                  <td className="py-2 pr-4 font-medium">
                    {r.company}
                    {r.isSubject && <Badge tone="brand" className="ml-2">Subject</Badge>}
                  </td>
                  <td className="text-right pr-4">{r.marketCap}</td>
                  <td className="text-right pr-4">{r.revGrowth}</td>
                  <td className="text-right pr-4">{r.ebitdaMargin}</td>
                  <td className="text-right pr-4">{r.pe}</td>
                  <td className="text-right pr-4">{r.evEbitda}</td>
                  <td className="text-right pr-4">{r.debtToEquity}</td>
                  <td className="text-right pr-4">{r.roe}</td>
                  <td className="text-right pr-4">{r.roic}</td>
                  <td className="text-right pr-4">{r.divYield}</td>
                  <td className="pr-4">{r.rating}</td>
                  <td className="pr-4 text-ink-muted">{r.technical}</td>
                  <td className="text-ink-muted">{r.aiReady}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </DashboardShell>
  );
}
