import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Check, MessageCircle, Mail, ArrowRight } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    cadence: "one-time",
    description: "Try Kubematrix with a single full research report.",
    features: [
      "1 research report (any company)",
      "WhatsApp + Email delivery",
      "Full institutional report PDF",
      "Sector-aware analysis",
      "Basic technical snapshot",
    ],
    cta: "Start free",
    href: "/dashboard",
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹999",
    cadence: "per month",
    description: "For active retail investors building a focused portfolio.",
    features: [
      "5 research reports / month",
      "WhatsApp + Email delivery",
      "Sector deep-dives",
      "Technical board access",
      "Bull / Base / Bear scenarios",
      "Priority customer support",
    ],
    cta: "Subscribe",
    href: "/dashboard",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹1,999",
    cadence: "per month",
    description: "For serious investors tracking multiple sectors.",
    features: [
      "10 research reports / month",
      "WhatsApp + Email delivery",
      "Full decision matrix (18 scores)",
      "Macro & geopolitical lens",
      "Peer comparison tables",
      "Quarterly portfolio review",
    ],
    cta: "Subscribe",
    href: "/dashboard",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro Desk",
    price: "₹5,999",
    cadence: "per month",
    description: "For HNIs, family offices and boutique advisors.",
    features: [
      "100 research reports / month",
      "Custom watchlists",
      "WhatsApp + Email + Web",
      "All institutional dashboards",
      "Quarterly refresh on watchlist",
      "Dedicated relationship manager",
    ],
    cta: "Talk to sales",
    href: "/about#contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <PublicNav />

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-14 pb-8 text-center">
        <div className="text-xs uppercase tracking-widest text-brand">Pricing</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
          Institutional research at retail-friendly prices
        </h1>
        <p className="mt-4 text-ink-muted max-w-2xl mx-auto">
          Reports are delivered to your WhatsApp and email inbox. No app required. Cancel anytime.
        </p>
        <div className="mt-4 flex justify-center gap-3 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-bull" /> WhatsApp</span>
          <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-brand" /> Email PDF</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border p-6 flex flex-col ${
                p.highlight ? "border-brand/50 bg-brand/5 shadow-glow" : "border-bg-border bg-bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                {p.badge && <span className="text-[10px] uppercase tracking-widest text-brand">{p.badge}</span>}
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold text-ink tabular-nums">{p.price}</span>
                <span className="text-xs text-ink-muted">{p.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-ink-muted">{p.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-ink flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-bull mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-md h-11 px-4 font-medium ${
                  p.highlight
                    ? "bg-brand hover:bg-brand-500 text-bg shadow-glow"
                    : "border border-bg-border bg-bg-elevated hover:bg-bg-border text-ink"
                }`}
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 lg:px-6 pb-16">
        <div className="rounded-2xl border border-bg-border bg-bg-panel/60 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-ink">Frequently asked questions</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-x-8 gap-y-5">
            <Faq q="How do I receive reports?" a="Every report is auto-delivered to your registered WhatsApp number and email as a polished PDF, plus available in your web dashboard." />
            <Faq q="Can I research any company?" a="Yes — request any listed company globally. Our sector-aware engine adapts the template to the company's industry." />
            <Faq q="Is my first report really free?" a="Yes. The Free Trial gives you one full institutional-grade report, no payment required." />
            <Faq q="Can I cancel anytime?" a="Of course. Subscriptions are monthly with no lock-in. Cancel from your dashboard." />
            <Faq q="Do you give buy / sell calls?" a="Reports include AI-generated recommendations for educational purposes. Always consult a SEBI-registered advisor for investment decisions." />
            <Faq q="What about institutional plans?" a="Pro Desk is custom-tuned for family offices. Contact our team via the About / Contact page for enterprise pricing." />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <Disclaimer />
      </section>

      <Footer />
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-ink">{q}</div>
      <div className="mt-1 text-sm text-ink-muted leading-relaxed">{a}</div>
    </div>
  );
}
