import Link from "next/link";
import { Telescope, MessageCircle } from "lucide-react";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-bg-border bg-bg/80 backdrop-blur">
      <div className="max-w-7xl mx-auto h-16 px-4 lg:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand to-brand-600 flex items-center justify-center">
            <Telescope className="h-4 w-4 text-bg" />
          </div>
          <div className="leading-tight">
            <div className="text-ink font-semibold text-sm">Kubematrix</div>
            <div className="text-[10px] tracking-widest text-ink-muted uppercase">Financial Research</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink-muted">
          <Link href="/dashboard" className="hover:text-ink">Dashboard</Link>
          <Link href="/research" className="hover:text-ink">Research</Link>
          <Link href="/pricing" className="hover:text-ink">Pricing</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/pricing" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp + Email
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-500 text-bg text-sm font-medium h-9 px-4 shadow-glow"
          >
            Launch dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
