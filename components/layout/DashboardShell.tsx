import { Suspense, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function DashboardShell({
  children,
  searchBase = "/research",
}: {
  children: ReactNode;
  searchBase?: string;
}) {
  return (
    <div className="min-h-screen flex bg-bg text-ink">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Suspense fallback={<div className="h-16 border-b border-bg-border bg-bg-panel/80" />}>
          <Topbar basePath={searchBase} />
        </Suspense>
        <main className="flex-1 px-4 lg:px-8 py-6 space-y-6">
          {children}
          <Disclaimer />
        </main>
      </div>
    </div>
  );
}
