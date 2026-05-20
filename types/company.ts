export type CompanyType =
  | "Growth"
  | "Value"
  | "Cyclical"
  | "Defensive"
  | "Dividend"
  | "Turnaround"
  | "AI-driven"
  | "Commodity-linked"
  | "SaaS"
  | "Banking"
  | "Energy"
  | "Pharma"
  | "EV"
  | "Semiconductor";

export type SectorKey =
  | "semiconductor"
  | "banking"
  | "airline"
  | "saas"
  | "retail"
  | "energy"
  | "pharma"
  | "ev"
  | "fmcg"
  | "generic";

export interface Company {
  id: string;
  name: string;
  ticker: string;
  isin: string;
  country: string;
  exchange: string;
  isPublic: boolean;
  sector: string;
  industry: string;
  sectorKey: SectorKey;
  marketCap: number; // in USD millions
  reportingStandard: "IFRS" | "US GAAP" | "Ind AS";
  competitors: string[];
  macroDependencies: string[];
  geopoliticalExposure: string[];
  companyTypes: CompanyType[];
  description: string;
  logoEmoji?: string;
}
