import type { SectorKey } from "@/types/company";

export interface SectorTemplate {
  key: SectorKey;
  label: string;
  keyMetrics: string[];
  keyRisks: string[];
  keyCharts: string[];
  valuationMethods: string[];
  technicalFactors: string[];
  macroDependencies: string[];
  competitorTypes: string[];
  thesisTags: string[];
}

export const sectorTemplates: Record<SectorKey, SectorTemplate> = {
  semiconductor: {
    key: "semiconductor",
    label: "Semiconductors",
    keyMetrics: ["Foundry utilization", "AI accelerator mix", "Gross margin", "Inventory days", "R&D / Revenue"],
    keyRisks: ["China export controls", "Cyclical demand", "Foundry concentration risk", "Capex overbuild"],
    keyCharts: ["Revenue by node", "Datacenter vs consumer mix", "Gross margin trend"],
    valuationMethods: ["EV/EBITDA cycle-adjusted", "Forward P/E", "PEG"],
    technicalFactors: ["AI demand pulse", "Memory pricing cycle", "Foundry capex commentary"],
    macroDependencies: ["USD index", "Asia capex cycle", "AI infrastructure spend"],
    competitorTypes: ["Pure-play foundry", "IDM", "Fabless designer", "EDA"],
    thesisTags: ["AI demand", "Chip cycle", "China restrictions", "Foundry dependency"],
  },
  banking: {
    key: "banking",
    label: "Banks & Financials",
    keyMetrics: ["Net Interest Margin", "Cost-to-Income", "CASA Ratio", "Gross NPA", "Net NPA", "CET1"],
    keyRisks: ["Credit cycle", "Rate compression", "Regulatory action", "Unsecured exposure"],
    keyCharts: ["NIM trend", "Loan book composition", "NPA cohort", "Provisioning coverage"],
    valuationMethods: ["P/B vs ROE", "Residual income", "Dividend discount"],
    technicalFactors: ["Rate path", "Yield curve shape", "Credit spread"],
    macroDependencies: ["Policy rate", "Inflation", "GDP", "Credit growth"],
    competitorTypes: ["PSU bank", "Private bank", "Small finance", "NBFC"],
    thesisTags: ["NIM", "Deposits", "Loan quality", "Credit risk", "Interest rates"],
  },
  airline: {
    key: "airline",
    label: "Airlines & Travel",
    keyMetrics: ["RASK", "CASK ex-fuel", "Load factor", "Fleet age", "Yield"],
    keyRisks: ["Fuel price shock", "Recession demand drop", "Currency depreciation", "Regulatory caps"],
    keyCharts: ["Load factor seasonality", "Fuel hedge ladder", "Yield vs capacity"],
    valuationMethods: ["EV/EBITDAR", "P/Sales", "Replacement value"],
    technicalFactors: ["Crude oil", "USD/INR", "Tourism PMI"],
    macroDependencies: ["Brent crude", "Disposable income", "FX volatility"],
    competitorTypes: ["LCC", "Full-service", "Charter", "Cargo"],
    thesisTags: ["Fuel prices", "Fleet cost", "Tourism", "Recession risk"],
  },
  saas: {
    key: "saas",
    label: "Cloud & SaaS",
    keyMetrics: ["ARR", "NRR", "Gross retention", "Rule of 40", "FCF margin"],
    keyRisks: ["Churn", "AI commoditization", "Hyperscaler dependency", "Long sales cycles"],
    keyCharts: ["ARR cohort", "NRR by segment", "Magic number"],
    valuationMethods: ["EV/Revenue", "Rule of 40", "DCF growth-adjusted"],
    technicalFactors: ["Cloud capex", "Software TAM expansion", "AI agent adoption"],
    macroDependencies: ["IT budgets", "Wage inflation", "USD strength"],
    competitorTypes: ["Vertical SaaS", "Horizontal SaaS", "Platform", "AI-native"],
    thesisTags: ["ARR", "Churn", "Retention", "Margins", "AI disruption"],
  },
  retail: {
    key: "retail",
    label: "Retail & Consumer",
    keyMetrics: ["SSSG", "Gross margin", "Inventory turns", "Footfall", "ASP"],
    keyRisks: ["Discretionary slowdown", "Inventory glut", "Quick-commerce disruption", "Real-estate inflation"],
    keyCharts: ["SSSG by format", "GM bridge", "Inventory days"],
    valuationMethods: ["EV/Sales", "P/E", "Sum-of-parts"],
    technicalFactors: ["Consumer confidence", "Festive cycle", "Promotion intensity"],
    macroDependencies: ["Inflation", "Disposable income", "Rural demand"],
    competitorTypes: ["Offline value", "Premium", "Quick-commerce", "Marketplace"],
    thesisTags: ["Consumer spending", "Inflation", "Inventory turnover"],
  },
  energy: {
    key: "energy",
    label: "Energy & Commodities",
    keyMetrics: ["Realized price", "Lifting cost", "Reserve life", "Refining margin"],
    keyRisks: ["Crude crash", "OPEC supply shock", "Energy transition", "Carbon tax"],
    keyCharts: ["Production curve", "Realized vs Brent", "Capex/Cashflow"],
    valuationMethods: ["EV/EBITDA", "NAV", "P/Reserves"],
    technicalFactors: ["Brent path", "Refining cracks", "Inventory data"],
    macroDependencies: ["OPEC policy", "Global GDP", "USD"],
    competitorTypes: ["Upstream", "Downstream", "Integrated", "Renewables"],
    thesisTags: ["Commodity cycle", "Energy transition", "Capex discipline"],
  },
  pharma: {
    key: "pharma",
    label: "Pharma & Healthcare",
    keyMetrics: ["ANDA approvals", "Pipeline NPV", "API mix", "USFDA observations"],
    keyRisks: ["Patent cliff", "USFDA action", "Pricing pressure", "Litigation"],
    keyCharts: ["ANDA pipeline", "Top-10 product concentration", "Therapy mix"],
    valuationMethods: ["EV/EBITDA", "DCF with pipeline NPV", "Sum-of-parts"],
    technicalFactors: ["USFDA inspection cadence", "Specialty launches"],
    macroDependencies: ["USD/INR", "US generic pricing", "Insurance reform"],
    competitorTypes: ["Generics", "Branded", "CDMO", "Biosimilars"],
    thesisTags: ["FDA approvals", "Patent cliffs", "Pipeline strength"],
  },
  ev: {
    key: "ev",
    label: "EV & Mobility",
    keyMetrics: ["Units delivered", "Battery cost / kWh", "Gross margin per vehicle", "Service network"],
    keyRisks: ["Battery cost volatility", "China BoM exposure", "Subsidy cuts", "Charging infra"],
    keyCharts: ["Delivery ramp", "BoM bridge", "Margin per vehicle"],
    valuationMethods: ["EV/Sales", "DCF with adoption S-curve", "P/Deliveries"],
    technicalFactors: ["Lithium prices", "Subsidy policy", "Charging additions"],
    macroDependencies: ["Lithium", "Copper", "Government incentives"],
    competitorTypes: ["Pure-play EV", "ICE-to-EV", "2W EV", "Commercial EV"],
    thesisTags: ["Battery costs", "Lithium", "China exposure", "Subsidy risk"],
  },
  fmcg: {
    key: "fmcg",
    label: "FMCG & Staples",
    keyMetrics: ["Volume growth", "Gross margin", "A&P intensity", "Distribution reach"],
    keyRisks: ["Rural slowdown", "Input cost spike", "D2C disruption", "Private label"],
    keyCharts: ["Volume vs Value growth", "GM bridge", "Rural vs Urban"],
    valuationMethods: ["P/E", "EV/EBITDA", "DCF with terminal premium"],
    technicalFactors: ["Palm oil", "Crude derivatives", "Monsoon"],
    macroDependencies: ["Rural income", "Monsoon", "Commodity basket"],
    competitorTypes: ["Legacy MNC", "Domestic incumbent", "D2C challenger"],
    thesisTags: ["Volume", "Premiumization", "Rural recovery"],
  },
  generic: {
    key: "generic",
    label: "Diversified",
    keyMetrics: ["Revenue growth", "EBITDA margin", "ROCE", "FCF conversion"],
    keyRisks: ["Cyclical exposure", "Capital allocation", "Execution risk"],
    keyCharts: ["Revenue trend", "Margin trend", "Cash conversion"],
    valuationMethods: ["P/E", "EV/EBITDA", "DCF"],
    technicalFactors: ["Sector momentum", "Index inclusion"],
    macroDependencies: ["GDP", "Inflation", "Rates"],
    competitorTypes: ["Direct peers", "Substitutes", "New entrants"],
    thesisTags: ["Growth", "Quality", "Cash generation"],
  },
};
