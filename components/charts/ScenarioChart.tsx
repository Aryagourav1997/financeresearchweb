"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ScenarioPoint } from "@/types/financial";

const tooltipStyle = {
  backgroundColor: "#0f1623",
  border: "1px solid #1f2a40",
  borderRadius: 8,
  color: "#e6edf6",
  fontSize: 12,
};

const colorFor = (s: string) => (s === "Bull" ? "#22c55e" : s === "Bear" ? "#ef4444" : "#6aa6ff");

export function ScenarioChart({ data }: { data: ScenarioPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid stroke="#1f2a40" strokeDasharray="3 3" />
        <XAxis dataKey="scenario" stroke="#8a96ad" fontSize={11} />
        <YAxis stroke="#8a96ad" fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="targetPrice" name="Target price" radius={[4, 4, 0, 0]}>
          {data.map((d) => (
            <Cell key={d.scenario} fill={colorFor(d.scenario)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
