import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kubematrix Financial Research — AI-powered Equity Intelligence",
  description:
    "Institutional-grade AI financial research on any company. Reports delivered to WhatsApp & email. Start free.",
  metadataBase: new URL("https://kubematrix.example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
