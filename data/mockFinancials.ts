import type { FinancialPack } from "@/types/financial";

function buildHistory(base: number, growth: number, margin: number) {
  const years = [2020, 2021, 2022, 2023, 2024];
  return years.map((year, i) => {
    const revenue = Math.round(base * Math.pow(1 + growth, i));
    const ebitda = Math.round(revenue * margin);
    const netIncome = Math.round(ebitda * 0.55);
    const fcf = Math.round(ebitda * 0.65 - revenue * 0.05);
    const capex = Math.round(revenue * 0.06);
    const debt = Math.round(revenue * 0.4);
    const equity = Math.round(revenue * 0.9 + i * base * 0.05);
    return {
      year,
      revenue,
      ebitda,
      ebitdaMargin: +(margin * 100).toFixed(1),
      netIncome,
      fcf,
      capex,
      debt,
      equity,
      debtToEquity: +(debt / equity).toFixed(2),
      roe: +((netIncome / equity) * 100).toFixed(1),
      roic: +(((netIncome + 0.3 * netIncome) / (equity + debt)) * 100).toFixed(1),
    };
  });
}

export const mockFinancials: Record<string, FinancialPack> = {
  nvda: {
    companyId: "nvda",
    currency: "USD",
    history: buildHistory(16000, 0.45, 0.45),
    multiples: { pe: 55, evEbitda: 38, ps: 28, pb: 50, pegRatio: 1.4, dividendYield: 0.03 },
    peerMultiples: [
      { peer: "AMD", pe: 42, evEbitda: 28, ps: 9 },
      { peer: "INTC", pe: 22, evEbitda: 9, ps: 2 },
      { peer: "AVGO", pe: 35, evEbitda: 22, ps: 14 },
      { peer: "TSM", pe: 28, evEbitda: 14, ps: 9 },
    ],
  },
  hdfcbank: {
    companyId: "hdfcbank",
    currency: "INR",
    history: buildHistory(150000, 0.16, 0.5),
    multiples: { pe: 18, evEbitda: 14, ps: 4, pb: 2.6, pegRatio: 1.3, dividendYield: 1.1 },
    peerMultiples: [
      { peer: "ICICIBANK", pe: 17, evEbitda: 13, ps: 3.8 },
      { peer: "AXISBANK", pe: 14, evEbitda: 11, ps: 2.9 },
      { peer: "KOTAKBANK", pe: 22, evEbitda: 17, ps: 5.2 },
      { peer: "SBIN", pe: 10, evEbitda: 8, ps: 1.8 },
    ],
  },
  indigo: {
    companyId: "indigo",
    currency: "INR",
    history: buildHistory(35000, 0.22, 0.22),
    multiples: { pe: 24, evEbitda: 11, ps: 2.5, pb: 12, pegRatio: 0.9, dividendYield: 0 },
    peerMultiples: [
      { peer: "SPICEJET", pe: 0, evEbitda: 18, ps: 1.1 },
      { peer: "AKASA", pe: 0, evEbitda: 0, ps: 0 },
      { peer: "RYANAIR", pe: 12, evEbitda: 7, ps: 1.6 },
    ],
  },
  crwd: {
    companyId: "crwd",
    currency: "USD",
    history: buildHistory(900, 0.55, 0.22),
    multiples: { pe: 110, evEbitda: 70, ps: 19, pb: 26, pegRatio: 2.6, dividendYield: 0 },
    peerMultiples: [
      { peer: "PANW", pe: 55, evEbitda: 40, ps: 14 },
      { peer: "S", pe: 0, evEbitda: 0, ps: 11 },
      { peer: "ZS", pe: 90, evEbitda: 60, ps: 16 },
    ],
  },
  dmart: {
    companyId: "dmart",
    currency: "INR",
    history: buildHistory(24000, 0.2, 0.085),
    multiples: { pe: 88, evEbitda: 55, ps: 6, pb: 14, pegRatio: 4, dividendYield: 0 },
    peerMultiples: [
      { peer: "TRENT", pe: 130, evEbitda: 80, ps: 11 },
      { peer: "RELIANCE-Retail", pe: 0, evEbitda: 35, ps: 4 },
    ],
  },
  reliance: {
    companyId: "reliance",
    currency: "INR",
    history: buildHistory(550000, 0.1, 0.16),
    multiples: { pe: 27, evEbitda: 13, ps: 1.7, pb: 2.2, pegRatio: 2.4, dividendYield: 0.4 },
    peerMultiples: [
      { peer: "ONGC", pe: 7, evEbitda: 4, ps: 0.8 },
      { peer: "BPCL", pe: 6, evEbitda: 5, ps: 0.2 },
      { peer: "IOC", pe: 5, evEbitda: 4, ps: 0.1 },
    ],
  },
  sunpharma: {
    companyId: "sunpharma",
    currency: "INR",
    history: buildHistory(35000, 0.12, 0.28),
    multiples: { pe: 32, evEbitda: 22, ps: 6, pb: 5.6, pegRatio: 2.5, dividendYield: 0.7 },
    peerMultiples: [
      { peer: "DRREDDY", pe: 21, evEbitda: 14, ps: 3.5 },
      { peer: "CIPLA", pe: 26, evEbitda: 17, ps: 4.2 },
      { peer: "LUPIN", pe: 30, evEbitda: 19, ps: 3.9 },
    ],
  },
  tatamotors: {
    companyId: "tatamotors",
    currency: "INR",
    history: buildHistory(280000, 0.14, 0.14),
    multiples: { pe: 14, evEbitda: 6, ps: 0.9, pb: 4.2, pegRatio: 0.8, dividendYield: 0.3 },
    peerMultiples: [
      { peer: "M&M", pe: 22, evEbitda: 13, ps: 2.2 },
      { peer: "MARUTI", pe: 26, evEbitda: 16, ps: 2.7 },
      { peer: "BYD", pe: 22, evEbitda: 11, ps: 1.6 },
    ],
  },
  hul: {
    companyId: "hul",
    currency: "INR",
    history: buildHistory(48000, 0.08, 0.24),
    multiples: { pe: 55, evEbitda: 38, ps: 9, pb: 12, pegRatio: 5.6, dividendYield: 1.6 },
    peerMultiples: [
      { peer: "ITC", pe: 27, evEbitda: 19, ps: 6 },
      { peer: "NESTLEIND", pe: 75, evEbitda: 52, ps: 13 },
      { peer: "DABUR", pe: 50, evEbitda: 38, ps: 8 },
    ],
  },
};
