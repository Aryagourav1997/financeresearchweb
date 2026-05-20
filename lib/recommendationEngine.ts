import type { Company } from "@/types/company";
import type { InvestorMatrix } from "@/types/research";
import type { TechnicalSnapshot } from "@/types/technical";
import type { FinalRecommendation, Recommendation } from "@/types/research";
import { templateForCompany } from "./sectorDetection";

function ratingFromScore(score: number): Recommendation {
  if (score >= 80) return "Strong Buy";
  if (score >= 70) return "Buy";
  if (score >= 60) return "Accumulate";
  if (score >= 50) return "Hold";
  if (score >= 40) return "Reduce";
  if (score >= 30) return "Sell";
  return "Strong Sell";
}

export function buildRecommendation(
  company: Company,
  matrix: InvestorMatrix,
  tech: TechnicalSnapshot,
): FinalRecommendation {
  const composite =
    matrix.financialHealth * 0.12 +
    matrix.profitability * 0.12 +
    matrix.growth * 0.16 +
    matrix.technicalStrength * 0.1 +
    matrix.valuation * 0.12 +
    matrix.competitiveStrength * 0.12 +
    matrix.longTermPotential * 0.12 +
    matrix.marketSentiment * 0.08 -
    matrix.geopoliticalRisk * 0.06;

  const score = Math.round(composite + 35); // shift baseline
  const rating = ratingFromScore(score);
  const upside = +(tech.resistance / tech.currentPrice - 1).toFixed(3) * 100;
  const downside = +(1 - tech.support / tech.currentPrice).toFixed(3) * 100;

  const template = templateForCompany(company);
  const catalysts = [
    `${template.thesisTags[0]} tailwind into next 2 quarters`,
    `Sector momentum readout at ${Math.round(matrix.marketSentiment)}`,
    company.companyTypes.includes("AI-driven") ? "AI mix expansion drives margin re-rate" : "Operating leverage from scale",
    "Analyst revisions skew positive after recent print",
  ];
  const risks = [
    template.keyRisks[0],
    template.keyRisks[1],
    `Macro sensitivity score ${Math.round(matrix.macroSensitivity)} — watch ${company.macroDependencies[0]}`,
    `Geopolitical exposure: ${company.geopoliticalExposure[0] ?? "limited"}`,
  ];

  return {
    rating,
    confidence: Math.max(40, Math.min(95, Math.round(score))),
    horizon: matrix.longTermPotential > 65 ? "Long-term" : matrix.shortTermTrade > 65 ? "Short-term" : "Medium-term",
    upsidePct: Math.max(0, +upside.toFixed(1)),
    downsidePct: Math.max(0, +downside.toFixed(1)),
    riskAdjustedReturn: +(upside - downside * 0.6).toFixed(1),
    catalysts,
    risks,
  };
}
