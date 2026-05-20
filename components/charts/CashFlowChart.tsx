"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import type { YearMetric } from "@/types/financial";

const tooltipStyle = {
  backgroundColor: "#0f1623",
  border: "1px solid #1f2a40",
  borderRadius: 8,
  color: "#e6edf6",
  fontSize: 12,
};

export function CashFlowChart({ data }: { data: YearMetric[] }) {
  const enriched = data.map((row, i) => ({
    ...row,
    niDir: i === 0 ? row.netIncome >= 0 : row.netIncome >= data[i - 1].netIncome,
    fcfDir: i === 0 ? row.fcf >= 0 : row.fcf >= data[i - 1].fcf,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={enriched}>
        <CartesianGrid stroke="#1f2a40" strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke="#8a96ad" fontSize={11} />
        <YAxis stroke="#8a96ad" fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11, color: "#8a96ad" }} />
        <Bar dataKey="netIncome" name="Net income" radius={[3, 3, 0, 0]}>
          {enriched.map((row, i) => (
            <Cell key={`ni-${i}`} fill={row.niDir ? "#22c55e" : "#ef4444"} />
          ))}
        </Bar>
        <Bar dataKey="fcf" name="Free cash flow" radius={[3, 3, 0, 0]}>
          {enriched.map((row, i) => (
            <Cell key={`fcf-${i}`} fill={row.fcfDir ? "#16a34a" : "#dc2626"} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
