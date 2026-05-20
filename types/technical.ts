export interface PricePoint {
  date: string;
  close: number;
  volume: number;
  sma50?: number;
  sma200?: number;
  ema20?: number;
  vwap?: number;
  upperBB?: number;
  lowerBB?: number;
}

export type TechnicalSignal =
  | "Bullish breakout"
  | "Consolidation"
  | "Overbought"
  | "Oversold"
  | "Bearish divergence"
  | "Accumulation phase"
  | "Distribution phase";

export interface TechnicalSnapshot {
  companyId: string;
  currentPrice: number;
  rsi: number;
  macd: number;
  macdSignal: number;
  sma50: number;
  sma200: number;
  ema20: number;
  vwap: number;
  upperBB: number;
  lowerBB: number;
  atr: number;
  volumeTrend: "Rising" | "Falling" | "Flat";
  support: number;
  resistance: number;
  momentum: "Strong Up" | "Up" | "Flat" | "Down" | "Strong Down";
  swingSetup: string;
  stopLoss: number;
  riskReward: number;
  interpretation: TechnicalSignal;
  priceHistory: PricePoint[];
}
