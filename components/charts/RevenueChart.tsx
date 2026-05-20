"use client";

import { Bar, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { YearMetric } from "@/types/financial";

const tooltipStyle = {
  backgroundColor: "#0f1623",
  border: "1px solid #1f2a40",
  borderRadius: 8,
  color: "#e6edf6",
  fontSize: 12,
};

export function RevenueChart({ data }: { data: YearMetric[] }) {
  const enriched = data.map((row, i) => ({
    ...row,
    yoy: i === 0 ? 0 : ((row.revenue - data[i - 1].revenue) / data[i - 1].revenue) * 100,
  }));
  const marginDir = data[data.length - 1].ebitdaMargin - data[0].ebitdaMargin;
  const marginColor = marginDir >= 0 ? "#22c55e" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={enriched}>
        <CartesianGrid stroke="#1f2a40" strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke="#8a96ad" fontSize={11} />
        <YAxis yAxisId="left" stroke="#8a96ad" fontSize={11} />
        <YAxis yAxisId="right" orientation="right" stroke="#8a96ad" fontSize={11} unit="%" />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar yAxisId="left" dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]}>
          {enriched.map((row, i) => (
            <Cell key={i} fill={row.yoy >= 0 ? "#22c55e" : "#ef4444"} />
          ))}
        </Bar>
        <Line yAxisId="right" dataKey="ebitdaMargin" stroke={marginColor} strokeWidth={2} name="EBITDA margin %" dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
