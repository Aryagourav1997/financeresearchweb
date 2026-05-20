export type Recommendation =
  | "Strong Buy"
  | "Buy"
  | "Accumulate"
  | "Hold"
  | "Reduce"
  | "Sell"
  | "Strong Sell";

export interface ScoreCardItem {
  label: string;
  value: number; // 0-100
  trend?: "up" | "down" | "flat";
  note?: string;
}

export interface InvestorMatrix {
  financialHealth: number;
  profitability: number;
  growth: number;
  technicalStrength: number;
  valuation: number;
  liquidity: number;
  institutionalConfidence: number;
  marketSentiment: number;
  competitiveStrength: number;
  geopoliticalRisk: number;
  macroSensitivity: number;
  longTermPotential: number;
  shortTermTrade: number;
  swingPotential: number;
  dividendQuality: number;
  esg: number;
  aiReadiness: number;
  innovation: number;
}

export interface NewsItem {
  id: string;
  source: string;
  headline: string;
  date: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  category: "Earnings" | "M&A" | "Macro" | "Regulatory" | "Product" | "Analyst";
}

export interface MarketIntel {
  companyId: string;
  newsSentimentScore: number; // -100 to 100
  institutionalFlow: "Inflow" | "Outflow" | "Mixed";
  insiderActivity: "Buying" | "Selling" | "Neutral";
  etfExposure: number;
  hedgeFundActivity: "Accumulating" | "Distributing" | "Neutral";
  analystUpgrades: number;
  analystDowngrades: number;
  sectorMomentum: number;
  macroIndicators: { name: string; value: string; impact: "positive" | "negative" | "neutral" }[];
  currencyExposure: string[];
  commodityExposure: string[];
  geopoliticalRisk: number;
  news: NewsItem[];
}

export interface FinalRecommendation {
  rating: Recommendation;
  confidence: number; // 0-100
  horizon: "Short-term" | "Medium-term" | "Long-term";
  upsidePct: number;
  downsidePct: number;
  riskAdjustedReturn: number;
  catalysts: string[];
  risks: string[];
}
