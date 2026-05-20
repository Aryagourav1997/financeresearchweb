import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Company } from "@/types/company";
import type { SectorTemplate } from "@/data/sectorTemplates";

export function CompanyOverview({ company, template }: { company: Company; template: SectorTemplate }) {
  const rows: [string, string | string[]][] = [
    ["Country", company.country],
    ["Exchange", company.exchange],
    ["Status", company.isPublic ? "Public" : "Private"],
    ["Sector", company.sector],
    ["Industry", company.industry],
    ["Reporting standard", company.reportingStandard],
    ["Market cap", `$${company.marketCap.toLocaleString()}M`],
    ["Competitor ecosystem", company.competitors],
    ["Macro dependencies", company.macroDependencies],
    ["Geopolitical exposure", company.geopoliticalExposure],
    ["Company type", company.companyTypes],
    ["Sector template", template.label],
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <Badge tone="brand">{template.label}</Badge>
      </CardHeader>
      <CardBody className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3 py-1.5 border-b border-bg-border last:border-0">
            <div className="text-xs text-ink-muted">{label}</div>
            <div className="text-xs text-ink text-right max-w-[60%]">
              {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-1 justify-end">
                  {value.map((v) => <Badge key={v} tone="neutral">{v}</Badge>)}
                </div>
              ) : value}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
