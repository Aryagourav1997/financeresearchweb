import type { FinancialPack, ScenarioPoint } from "@/types/financial";
import type { TechnicalSnapshot } from "@/types/technical";
import type { Company } from "@/types/company";
import { templateForCompany } from "./sectorDetection";

export function buildScenarios(
  company: Company,
  fin: FinancialPack,
  tech: TechnicalSnapshot,
): ScenarioPoint[] {
  const last = fin.history[fin.history.length - 1];
  const template = templateForCompany(company);
  const base = tech.currentPrice;
  const bull = +(base * (1.18 + (last.ebitdaMargin / 100) * 0.2)).toFixed(0);
  const bear = +(base * (0.78 - (last.debtToEquity / 5))).toFixed(0);
  const baseTarget = +(base * 1.08).toFixed(0);

  return [
    {
      scenario: "Bull",
      probability: 30,
      targetPrice: bull,
      upsidePct: +(((bull - base) / base) * 100).toFixed(1),
      rationale: `${template.thesisTags[0]} accelerates; multiple expansion on ${template.valuationMethods[0]}`,
    },
    {
      scenario: "Base",
      probability: 50,
      targetPrice: baseTarget,
      upsidePct: +(((baseTarget - base) / base) * 100).toFixed(1),
      rationale: `In-line execution; valuation supported by ${template.valuationMethods[1]}`,
    },
    {
      scenario: "Bear",
      probability: 20,
      targetPrice: bear,
      upsidePct: +(((bear - base) / base) * 100).toFixed(1),
      rationale: `${template.keyRisks[0]} materializes; de-rating on ${template.valuationMethods[0]}`,
    },
  ];
}

export function probabilityWeightedTarget(scenarios: ScenarioPoint[]): number {
  const total = scenarios.reduce((s, x) => s + x.probability, 0) || 100;
  return +(scenarios.reduce((s, x) => s + (x.targetPrice * x.probability) / total, 0)).toFixed(0);
}
