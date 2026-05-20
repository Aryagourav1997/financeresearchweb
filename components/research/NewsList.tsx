import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { NewsItem } from "@/types/research";

const sentimentTone = (s: NewsItem["sentiment"]) =>
  s === "Positive" ? "bull" : s === "Negative" ? "bear" : "neutral";

export function NewsList({ news }: { news: NewsItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News & Sentiment</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3">
        {news.map((n) => (
          <div key={n.id} className="flex items-start gap-3 pb-3 border-b border-bg-border last:border-0 last:pb-0">
            <div className="text-[11px] text-ink-subtle w-20 shrink-0 pt-0.5">{n.date}</div>
            <div className="flex-1">
              <div className="text-sm text-ink leading-snug">{n.headline}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] text-ink-muted">{n.source}</span>
                <Badge tone={sentimentTone(n.sentiment)}>{n.sentiment}</Badge>
                <Badge tone="neutral">{n.category}</Badge>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
