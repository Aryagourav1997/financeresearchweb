import { Badge } from "@/components/ui/Badge";
import { RatingPill } from "@/components/cards/RatingPill";
import type { Company } from "@/types/company";
import type { TechnicalSnapshot } from "@/types/technical";
import type { FinalRecommendation } from "@/types/research";
import { formatPct } from "@/lib/utils";

interface Props {
  company: Company;
  tech: TechnicalSnapshot;
  recommendation: FinalRecommendation;
}

export function CompanyHeader({ company, tech, recommendation }: Props) {
  const change = ((tech.currentPrice - tech.priceHistory[0].close) / tech.priceHistory[0].close) * 100;
  return (
    <div className="rounded-xl border border-bg-border bg-gradient-to-br from-bg-card to-bg-panel p-5 shadow-card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-bg-elevated border border-bg-border flex items-center justify-center text-2xl">
            {company.logoEmoji ?? "📈"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-semibold text-ink">{company.name}</h1>
              <Badge tone="neutral" className="font-mono">{company.exchange}:{company.ticker}</Badge>
              <Badge tone="brand">{company.industry}</Badge>
              {company.companyTypes.slice(0, 3).map((t) => (
                <Badge key={t} tone="neutral">{t}</Badge>
              ))}
            </div>
            <p className="mt-1 text-sm text-ink-muted max-w-2xl">{company.description}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-ink-subtle">
              <span>ISIN {company.isin}</span>
              <span>· {company.country}</span>
              <span>· {company.reportingStandard}</span>
              <span>· {company.isPublic ? "Public" : "Private"}</span>
              <span>· Mkt cap ${company.marketCap.toLocaleString()}M</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-ink tabular-nums">{tech.currentPrice.toLocaleString()}</span>
            <span className={change >= 0 ? "text-bull text-sm" : "text-bear text-sm"}>
              {formatPct(change)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RatingPill rating={recommendation.rating} size="md" />
            <span className="text-[11px] text-ink-muted">Confidence {recommendation.confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
