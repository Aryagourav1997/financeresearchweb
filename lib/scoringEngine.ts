import type { Company } from "@/types/company";
import type { FinancialPack } from "@/types/financial";
import type { TechnicalSnapshot } from "@/types/technical";
import type { InvestorMatrix, MarketIntel } from "@/types/research";
import { clamp } from "./utils";

export function computeInvestorMatrix(
  company: Company,
  fin: FinancialPack,
  tech: TechnicalSnapshot,
  intel: MarketIntel,
): InvestorMatrix {
  const last = fin.history[fin.history.length - 1];
  const first = fin.history[0];
  const revGrowthCagr = Math.pow(last.revenue / first.revenue, 1 / (fin.history.length - 1)) - 1;

  const profitability = clamp(50 + last.ebitdaMargin * 0.9);
  const financialHealth = clamp(85 - last.debtToEquity * 25);
  const growth = clamp(45 + revGrowthCagr * 180);
  const technicalStrength = clamp(50 + (tech.rsi - 50) * 1.2 + (tech.macd > tech.macdSignal ? 12 : -8));
  const valuationBase = fin.multiples.pegRatio
    ? clamp(95 - fin.multiples.pegRatio * 15)
    : clamp(60 - fin.multiples.pe * 0.3);
  const liquidity = clamp(60 + (last.fcf > 0 ? 25 : -15) - last.debtToEquity * 10);
  const institutionalConfidence = clamp(
    50 + (intel.institutionalFlow === "Inflow" ? 22 : intel.institutionalFlow === "Outflow" ? -22 : 0)
      + intel.analystUpgrades * 2 - intel.analystDowngrades * 2,
  );
  const marketSentiment = clamp(50 + intel.newsSentimentScore * 0.5);
  const competitiveStrength = clamp(55 + (last.roic - 12) * 1.8);
  const geopoliticalRisk = clamp(intel.geopoliticalRisk);
  const macroSensitivity = clamp(40 + company.macroDependencies.length * 8);
  const longTermPotential = clamp((growth + profitability + competitiveStrength) / 3);
  const shortTermTrade = clamp(technicalStrength * 0.6 + marketSentiment * 0.4);
  const swingPotential = clamp(technicalStrength * 0.7 + (tech.riskReward * 12));
  const dividendQuality = clamp(40 + fin.multiples.dividendYield * 18 + (financialHealth - 50) * 0.4);
  const esg = clamp(55 + (company.sectorKey === "energy" ? -15 : company.sectorKey === "saas" ? 15 : 0));
  const aiReadiness = clamp(
    50 +
      (company.companyTypes.includes("AI-driven") ? 35 : 0) +
      (company.sectorKey === "saas" || company.sectorKey === "semiconductor" ? 20 : 0),
  );
  const innovation = clamp(55 + (company.companyTypes.includes("Growth") ? 18 : 0) + (aiReadiness > 70 ? 15 : 0));

  return {
    financialHealth,
    profitability,
    growth,
    technicalStrength,
    valuation: valuationBase,
    liquidity,
    institutionalConfidence,
    marketSentiment,
    competitiveStrength,
    geopoliticalRisk,
    macroSensitivity,
    longTermPotential,
    shortTermTrade,
    swingPotential,
    dividendQuality,
    esg,
    aiReadiness,
    innovation,
  };
}

export function matrixToScorecards(m: InvestorMatrix) {
  return [
    { label: "Financial Health", value: m.financialHealth },
    { label: "Profitability", value: m.profitability },
    { label: "Growth", value: m.growth },
    { label: "Technical Strength", value: m.technicalStrength },
    { label: "Valuation", value: m.valuation },
    { label: "Liquidity", value: m.liquidity },
    { label: "Institutional Confidence", value: m.institutionalConfidence },
    { label: "Market Sentiment", value: m.marketSentiment },
    { label: "Competitive Strength", value: m.competitiveStrength },
    { label: "Geopolitical Risk", value: m.geopoliticalRisk },
    { label: "Macro Sensitivity", value: m.macroSensitivity },
    { label: "Long-Term Potential", value: m.longTermPotential },
    { label: "Short-Term Trade", value: m.shortTermTrade },
    { label: "Swing Potential", value: m.swingPotential },
    { label: "Dividend Quality", value: m.dividendQuality },
    { label: "ESG", value: m.esg },
    { label: "AI Readiness", value: m.aiReadiness },
    { label: "Innovation", value: m.innovation },
  ];
}
