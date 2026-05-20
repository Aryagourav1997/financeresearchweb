import type { Company } from "@/types/company";
import type { FinancialPack } from "@/types/financial";
import type { TechnicalSnapshot } from "@/types/technical";
import type { MarketIntel } from "@/types/research";
import { mockCompanies, findCompany } from "@/data/mockCompanies";
import { mockFinancials } from "@/data/mockFinancials";
import { mockTechnical } from "@/data/mockTechnical";
import { mockMarketIntel } from "@/data/mockNews";
import { templateForCompany } from "./sectorDetection";
import { computeInvestorMatrix } from "./scoringEngine";
import { buildRecommendation } from "./recommendationEngine";
import { buildScenarios } from "./valuationEngine";

export interface ResearchBundle {
  company: Company;
  financials: FinancialPack;
  technical: TechnicalSnapshot;
  intel: MarketIntel;
  template: ReturnType<typeof templateForCompany>;
  matrix: ReturnType<typeof computeInvestorMatrix>;
  recommendation: ReturnType<typeof buildRecommendation>;
  scenarios: ReturnType<typeof buildScenarios>;
}

export function resolveCompany(query: string | undefined): Company {
  if (!query) return mockCompanies[0];
  return findCompany(query) ?? mockCompanies[0];
}

export function buildResearchBundle(query?: string): ResearchBundle {
  const company = resolveCompany(query);
  const financials = mockFinancials[company.id] ?? mockFinancials[mockCompanies[0].id];
  const technical = mockTechnical[company.id] ?? mockTechnical[mockCompanies[0].id];
  const intel = mockMarketIntel[company.id] ?? mockMarketIntel[mockCompanies[0].id];
  const template = templateForCompany(company);
  const matrix = computeInvestorMatrix(company, financials, technical, intel);
  const recommendation = buildRecommendation(company, matrix, technical);
  const scenarios = buildScenarios(company, financials, technical);
  return { company, financials, technical, intel, template, matrix, recommendation, scenarios };
}
