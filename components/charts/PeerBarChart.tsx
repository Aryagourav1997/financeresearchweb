"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const tooltipStyle = {
  backgroundColor: "#0f1623",
  border: "1px solid #1f2a40",
  borderRadius: 8,
  color: "#e6edf6",
  fontSize: 12,
};

interface Peer {
  peer: string;
  pe: number;
  evEbitda: number;
  ps: number;
}

export function PeerBarChart({ data }: { data: Peer[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid stroke="#1f2a40" strokeDasharray="3 3" />
        <XAxis dataKey="peer" stroke="#8a96ad" fontSize={11} />
        <YAxis stroke="#8a96ad" fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="pe" fill="#6aa6ff" name="P/E" radius={[3, 3, 0, 0]} />
        <Bar dataKey="evEbitda" fill="#22c55e" name="EV/EBITDA" radius={[3, 3, 0, 0]} />
        <Bar dataKey="ps" fill="#f59e0b" name="P/S" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
