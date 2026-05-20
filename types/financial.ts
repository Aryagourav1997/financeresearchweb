export interface YearMetric {
  year: number;
  revenue: number;
  ebitda: number;
  ebitdaMargin: number;
  netIncome: number;
  fcf: number;
  capex: number;
  debt: number;
  equity: number;
  debtToEquity: number;
  roe: number;
  roic: number;
}

export interface ValuationMultiples {
  pe: number;
  evEbitda: number;
  ps: number;
  pb: number;
  pegRatio: number;
  dividendYield: number;
}

export interface FinancialPack {
  companyId: string;
  currency: string;
  history: YearMetric[];
  multiples: ValuationMultiples;
  peerMultiples: { peer: string; pe: number; evEbitda: number; ps: number }[];
}

export interface ScenarioPoint {
  scenario: "Bear" | "Base" | "Bull";
  probability: number;
  targetPrice: number;
  upsidePct: number;
  rationale: string;
}
