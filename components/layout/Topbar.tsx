"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search, MessageCircle, Mail, Bell } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Topbar({ basePath = "/research" }: { basePath?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(`${basePath}?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="h-16 sticky top-0 z-30 border-b border-bg-border bg-bg-panel/80 backdrop-blur flex items-center gap-3 px-4 lg:px-6">
      <form onSubmit={onSubmit} className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company, ticker, ISIN, or sector (e.g. NVDA, HDFCBANK, semiconductor)"
            className="w-full h-10 pl-9 pr-4 rounded-md bg-bg-card border border-bg-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/40"
          />
        </div>
      </form>

      <div className="hidden md:flex items-center gap-2 text-xs text-ink-muted">
        <Badge tone="bull" className="gap-1.5">
          <MessageCircle className="h-3 w-3" />
          WhatsApp delivery
        </Badge>
        <Badge tone="brand" className="gap-1.5">
          <Mail className="h-3 w-3" />
          Email reports
        </Badge>
      </div>

      <button className="h-10 w-10 inline-flex items-center justify-center rounded-md text-ink-muted hover:text-ink hover:bg-bg-elevated">
        <Bell className="h-4 w-4" />
      </button>
    </header>
  );
}
