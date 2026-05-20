"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileBarChart,
  LineChart,
  Calculator,
  Users,
  Newspaper,
  Sparkles,
  CreditCard,
  Info,
  Telescope,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/research", icon: FileBarChart, label: "Research Report" },
  { href: "/market", icon: Newspaper, label: "Market Intelligence" },
  { href: "/technical", icon: LineChart, label: "Technical Analysis" },
  { href: "/competitors", icon: Users, label: "Competitors" },
  { href: "/valuation", icon: Calculator, label: "Valuation" },
  { href: "/decision", icon: Sparkles, label: "Decision Matrix" },
];

const secondary = [
  { href: "/pricing", icon: CreditCard, label: "Pricing" },
  { href: "/about", icon: Info, label: "About / Contact" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-bg-border bg-bg-panel/60 backdrop-blur min-h-screen sticky top-0">
      <Link href="/" className="flex items-center gap-2 px-5 h-16 border-b border-bg-border">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand to-brand-600 flex items-center justify-center">
          <Telescope className="h-4 w-4 text-bg" />
        </div>
        <div className="leading-tight">
          <div className="text-ink font-semibold text-sm">Kubematrix</div>
          <div className="text-[10px] tracking-widest text-ink-muted uppercase">Financial Research</div>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <div className="px-3 pb-2 text-[10px] tracking-widest uppercase text-ink-subtle">Research</div>
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-bg-elevated text-ink border border-bg-border"
                  : "text-ink-muted hover:text-ink hover:bg-bg-elevated/60",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="px-3 pt-5 pb-2 text-[10px] tracking-widest uppercase text-ink-subtle">Account</div>
        {secondary.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-bg-elevated text-ink border border-bg-border"
                  : "text-ink-muted hover:text-ink hover:bg-bg-elevated/60",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-lg border border-brand/30 bg-brand/5 p-3">
        <div className="text-xs text-brand font-semibold mb-1">Subscribe</div>
        <p className="text-[11px] text-ink-muted leading-relaxed">
          Reports via WhatsApp & Email · Start free, then ₹999 for 5 companies.
        </p>
        <Link
          href="/pricing"
          className="mt-2 inline-flex text-[11px] text-brand hover:text-brand-400"
        >
          View plans →
        </Link>
      </div>
    </aside>
  );
}
