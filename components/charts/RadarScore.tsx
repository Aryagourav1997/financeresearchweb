"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface RadarPoint {
  label: string;
  value: number;
}

const tooltipStyle = {
  backgroundColor: "#0f1623",
  border: "1px solid #1f2a40",
  borderRadius: 8,
  color: "#e6edf6",
  fontSize: 12,
};

export function RadarScore({ data }: { data: RadarPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} outerRadius="80%">
        <PolarGrid stroke="#1f2a40" />
        <PolarAngleAxis dataKey="label" stroke="#8a96ad" fontSize={10} />
        <PolarRadiusAxis stroke="#1f2a40" tick={false} domain={[0, 100]} />
        <Radar dataKey="value" stroke="#6aa6ff" fill="#6aa6ff" fillOpacity={0.35} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
