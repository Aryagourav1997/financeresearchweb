# Kubematrix Financial Research

AI-powered institutional-grade equity research platform. Reports delivered to WhatsApp & email.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Recharts · Framer Motion · lucide-react**.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` — Landing page with hero, features, pricing teaser
- `/dashboard` — Live KPI + chart dashboard for any company
- `/research` — Full institutional research report (executive summary, thesis, financials, valuation, technicals, scenarios, recommendation)
- `/technical` — Technical analysis board (RSI, MACD, SMA, EMA, VWAP, BB, ATR, swing setup)
- `/valuation` — Bull / Base / Bear scenarios + valuation multiples + peer chart
- `/competitors` — Peer comparison table with multiples, growth, ratings
- `/market` — Market intelligence: news sentiment, flows, macro indicators
- `/decision` — 18-card Smart Investor Decision Matrix + radar + risk heatmap
- `/pricing` — Free / ₹999 / ₹1,999 / ₹5,999 subscription plans
- `/about` — About + contact form

## How to research a company

Use the search bar at the top of any dashboard page, or pass `?q=<ticker>` in the URL:

- `/dashboard?q=NVDA` — NVIDIA
- `/research?q=HDFCBANK` — HDFC Bank
- `/technical?q=INDIGO` — IndiGo Aviation
- `/competitors?q=TATAMOTORS` — Tata Motors

The search accepts company name, ticker, ISIN, brand or sector keyword. Unknown queries fall back to the default company.

## Architecture

```
/app                     Next.js App Router pages
/components
  /layout                Sidebar, Topbar, DashboardShell, PublicNav, Footer
  /ui                    Button, Card, Badge, Tabs, Progress, Disclaimer
  /charts                Revenue, CashFlow, Price, Radar, Scenario, Peer, Heatmap
  /cards                 KPI, Score, MetricRow, RatingPill
  /research              CompanyHeader, CompanyOverview, ResearchReport, NewsList, QuickSearch
  /technical             TechnicalGrid
/data                    mockCompanies, mockFinancials, mockTechnical, mockNews, sectorTemplates
/lib                     researchEngine, scoringEngine, recommendationEngine, valuationEngine, sectorDetection, utils
/types                   company, financial, technical, research
```

## Sector-aware engine

Reports are not generic. The platform ships with sector templates for:

- Semiconductors · Banking · Airlines · SaaS · Retail · Energy · Pharma · EV · FMCG

Each template defines key metrics, key risks, valuation methods, technical factors, macro dependencies and competitor types — and the report sections adapt to the company's sector.

## Connecting real data

All mock data lives in `/data`. To wire a real provider (Refinitiv, Alpha Vantage, NSE/BSE feeds, FMP, etc.), replace the resolvers in `/lib/researchEngine.ts` with API calls — every page consumes data through the same `ResearchBundle` shape, so no UI changes are needed.

## Disclaimer

This platform provides AI-generated financial research for informational and educational purposes only. It is not financial advice. Investors should verify data independently and consult a licensed financial advisor before making investment decisions.
