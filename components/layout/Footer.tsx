import Link from "next/link";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function Footer() {
  return (
    <footer className="border-t border-bg-border bg-bg-panel/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="text-ink font-semibold">Kubematrix Financial Research</div>
          <p className="mt-2 text-ink-muted text-xs leading-relaxed">
            AI-powered institutional-grade equity research, delivered to your WhatsApp & inbox.
          </p>
        </div>
        <div>
          <div className="text-ink-muted text-xs uppercase tracking-widest mb-3">Platform</div>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/dashboard" className="hover:text-ink">Dashboard</Link></li>
            <li><Link href="/research" className="hover:text-ink">Research report</Link></li>
            <li><Link href="/technical" className="hover:text-ink">Technical analysis</Link></li>
            <li><Link href="/competitors" className="hover:text-ink">Competitor comparison</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink-muted text-xs uppercase tracking-widest mb-3">Company</div>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/pricing" className="hover:text-ink">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/about#contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink-muted text-xs uppercase tracking-widest mb-3">Delivery</div>
          <ul className="space-y-2 text-ink-muted">
            <li>WhatsApp reports</li>
            <li>Email reports (PDF)</li>
            <li>Web dashboard access</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-8">
        <Disclaimer compact />
        <div className="mt-4 text-[11px] text-ink-subtle">© {new Date().getFullYear()} Kubematrix Financial Research. All rights reserved.</div>
      </div>
    </footer>
  );
}
