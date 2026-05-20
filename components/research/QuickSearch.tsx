"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { mockCompanies } from "@/data/mockCompanies";

export function QuickSearch({ basePath = "/research" }: { basePath?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    router.push(`${basePath}?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div className="rounded-2xl border border-bg-border bg-gradient-to-br from-bg-card to-bg-panel p-6 shadow-card">
      <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-widest font-semibold">
        <Sparkles className="h-3.5 w-3.5" />
        AI Company Research Engine
      </div>
      <h2 className="mt-1 text-xl md:text-2xl font-semibold text-ink">
        Enter any company, ticker, ISIN, brand or sector
      </h2>
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. NVIDIA, NVDA, US67066G1040, semiconductor, EV"
            className="w-full h-12 pl-9 pr-4 rounded-md bg-bg border border-bg-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/40"
          />
        </div>
        <button
          type="submit"
          className="h-12 px-5 rounded-md bg-brand hover:bg-brand-500 text-bg font-medium text-sm shadow-glow"
        >
          Generate Report
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-[11px] text-ink-muted">Try:</span>
        {mockCompanies.slice(0, 6).map((c) => (
          <button
            key={c.id}
            onClick={() => router.push(`${basePath}?q=${c.ticker}`)}
            className="text-[11px] px-2 py-0.5 rounded border border-bg-border text-ink-muted hover:text-ink hover:border-brand/40"
          >
            {c.ticker}
          </button>
        ))}
      </div>
    </div>
  );
}
