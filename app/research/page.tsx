import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompanyHeader } from "@/components/research/CompanyHeader";
import { ResearchReport } from "@/components/research/ResearchReport";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { CashFlowChart } from "@/components/charts/CashFlowChart";
import { PeerBarChart } from "@/components/charts/PeerBarChart";
import { buildResearchBundle } from "@/lib/researchEngine";

export default function ResearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const bundle = buildResearchBundle(searchParams.q);

  return (
    <DashboardShell searchBase="/research">
      <CompanyHeader company={bundle.company} tech={bundle.technical} recommendation={bundle.recommendation} />

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Revenue trajectory</CardTitle>
          </CardHeader>
          <CardBody><RevenueChart data={bundle.financials.history} /></CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cash generation</CardTitle>
          </CardHeader>
          <CardBody><CashFlowChart data={bundle.financials.history} /></CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Peer multiples</CardTitle>
        </CardHeader>
        <CardBody><PeerBarChart data={bundle.financials.peerMultiples} /></CardBody>
      </Card>

      <ResearchReport bundle={bundle} />
    </DashboardShell>
  );
}
