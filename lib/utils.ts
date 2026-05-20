import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(n: number, currency = "USD"): string {
  if (n === 0) return "—";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "";
  if (abs >= 1_000_000) return `${sign}${symbol}${(abs / 1_000_000).toFixed(2)}T`;
  if (abs >= 1_000) return `${sign}${symbol}${(abs / 1_000).toFixed(2)}B`;
  return `${sign}${symbol}${abs.toFixed(1)}M`;
}

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPct(n: number, digits = 1): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(digits)}%`;
}

export function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

export function scoreColor(score: number): string {
  if (score >= 75) return "text-bull";
  if (score >= 55) return "text-neutral";
  if (score >= 40) return "text-caution";
  return "text-bear";
}

export function scoreBg(score: number): string {
  if (score >= 75) return "bg-bull/15 border-bull/30";
  if (score >= 55) return "bg-neutral/15 border-neutral/30";
  if (score >= 40) return "bg-caution/15 border-caution/30";
  return "bg-bear/15 border-bear/30";
}
