"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-bg-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap border-b-2",
              active === tab.id
                ? "text-ink border-brand"
                : "text-ink-muted hover:text-ink border-transparent",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-5">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}
