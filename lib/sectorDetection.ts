import type { Company, SectorKey } from "@/types/company";
import { sectorTemplates, type SectorTemplate } from "@/data/sectorTemplates";

const keywordMap: { keywords: string[]; key: SectorKey }[] = [
  { keywords: ["semiconductor", "chip", "gpu", "foundry", "nvda", "amd", "tsmc"], key: "semiconductor" },
  { keywords: ["bank", "nbfc", "financial", "lender", "credit"], key: "banking" },
  { keywords: ["airline", "aviation", "airways", "carrier"], key: "airline" },
  { keywords: ["saas", "software", "cloud", "cyber", "platform"], key: "saas" },
  { keywords: ["retail", "supermart", "consumer discretionary", "ecommerce"], key: "retail" },
  { keywords: ["oil", "gas", "energy", "petroleum", "refining"], key: "energy" },
  { keywords: ["pharma", "drug", "healthcare", "biotech"], key: "pharma" },
  { keywords: ["ev", "electric vehicle", "battery", "auto"], key: "ev" },
  { keywords: ["fmcg", "staples", "personal care", "home care"], key: "fmcg" },
];

export function detectSectorKey(query: string): SectorKey {
  const q = query.toLowerCase();
  for (const { keywords, key } of keywordMap) {
    if (keywords.some((k) => q.includes(k))) return key;
  }
  return "generic";
}

export function getSectorTemplate(key: SectorKey): SectorTemplate {
  return sectorTemplates[key] || sectorTemplates.generic;
}

export function templateForCompany(company: Company): SectorTemplate {
  return getSectorTemplate(company.sectorKey);
}
