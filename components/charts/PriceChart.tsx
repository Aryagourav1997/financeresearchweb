"use client";

import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PricePoint } from "@/types/technical";

const tooltipStyle = {
  backgroundColor: "#0f1623",
  border: "1px solid #1f2a40",
  borderRadius: 8,
  color: "#e6edf6",
  fontSize: 12,
};

export function PriceChart({ data }: { data: PricePoint[] }) {
  const first = data[0]?.close ?? 0;
  const last = data[data.length - 1]?.close ?? 0;
  const bullish = last >= first;
  const color = bullish ? "#22c55e" : "#ef4444";
  const gradId = bullish ? "priceGradBull" : "priceGradBear";

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.45} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1f2a40" strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#8a96ad" fontSize={10} tickFormatter={(d) => String(d).slice(5)} />
        <YAxis stroke="#8a96ad" fontSize={11} domain={["auto", "auto"]} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area dataKey="close" stroke={color} fill={`url(#${gradId})`} strokeWidth={2} name="Close" />
        <Line dataKey="sma50" stroke="#6aa6ff" strokeWidth={1.5} dot={false} name="SMA 50" />
        <Line dataKey="sma200" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="SMA 200" />
        <Line dataKey="upperBB" stroke="#5b6478" strokeDasharray="3 3" dot={false} name="Upper BB" />
        <Line dataKey="lowerBB" stroke="#5b6478" strokeDasharray="3 3" dot={false} name="Lower BB" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
