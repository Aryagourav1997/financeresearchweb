import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Telescope, Brain, ShieldCheck, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <PublicNav />

      <section className="max-w-5xl mx-auto px-4 lg:px-6 pt-14 pb-10">
        <div className="text-xs uppercase tracking-widest text-brand">About Kubematrix</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          Institutional intelligence for everyone.
        </h1>
        <p className="mt-4 text-ink-muted text-lg max-w-3xl">
          Kubematrix Financial Research is an AI-powered equity research platform that gives every investor the same caliber of
          analysis used at Bloomberg terminals, Goldman desks and Morgan Stanley research benches — delivered to your
          WhatsApp and inbox.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 lg:px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-4">
          <Feature icon={<Telescope className="h-5 w-5" />} title="Our mission" body="Democratize institutional-grade research so retail investors are no longer second-class citizens in capital markets." />
          <Feature icon={<Brain className="h-5 w-5" />} title="How we work" body="Our sector-aware engine fuses fundamentals, technicals, peers, news and macro into one cohesive report — never generic." />
          <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Our promise" body="Transparent methodology, clear disclaimers, and reports you can actually act on after independent verification with your advisor." />
        </div>
      </section>

      <section id="contact" className="max-w-5xl mx-auto px-4 lg:px-6 pb-16">
        <div className="rounded-2xl border border-bg-border bg-bg-panel/60 p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-brand">Contact us</div>
              <h2 className="mt-2 text-2xl font-semibold">Get in touch</h2>
              <p className="mt-2 text-sm text-ink-muted max-w-md">
                Talk to our team for custom enterprise plans, partnerships, or to share feedback. We typically respond within
                24 hours.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value="research@kubematrix.com" />
                <ContactRow icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" value="+91 98xxx xxxxx" />
                <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value="+91 80xx xxx xxx" />
                <ContactRow icon={<MapPin className="h-4 w-4" />} label="Office" value="Bengaluru, India" />
              </ul>
            </div>

            <form className="grid gap-3">
              <Field label="Full name" type="text" placeholder="Your name" />
              <Field label="Email" type="email" placeholder="you@example.com" />
              <Field label="WhatsApp number" type="tel" placeholder="+91" />
              <div>
                <label className="text-xs text-ink-muted uppercase tracking-widest">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-md bg-bg-card border border-bg-border text-sm text-ink px-3 py-2 focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/40"
                  placeholder="Tell us a bit about what you’re looking for…"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-500 text-bg h-11 font-medium shadow-glow"
              >
                Send message
              </button>
              <p className="text-[11px] text-ink-subtle">By submitting, you agree to be contacted by Kubematrix Financial Research.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-8 md:flex items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-ink">Try a free research report today.</h3>
            <p className="text-sm text-ink-muted mt-1">Pick any company. We’ll deliver a full institutional report to your WhatsApp & email.</p>
          </div>
          <Link
            href="/dashboard"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-md bg-brand hover:bg-brand-500 text-bg h-11 px-6 font-medium shadow-glow"
          >
            Launch dashboard
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <Disclaimer />
      </section>

      <Footer />
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-bg-border bg-bg-card p-5">
      <div className="h-9 w-9 rounded-md bg-brand/15 text-brand inline-flex items-center justify-center">{icon}</div>
      <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="h-9 w-9 rounded-md bg-bg-elevated border border-bg-border text-brand inline-flex items-center justify-center">{icon}</span>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
        <div className="text-sm text-ink">{value}</div>
      </div>
    </li>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-ink-muted uppercase tracking-widest">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 rounded-md bg-bg-card border border-bg-border text-sm text-ink px-3 focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/40"
      />
    </label>
  );
}
