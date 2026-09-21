import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MESSAGES = [
  "Stört die Werbung? Mit Premium ist hier Schluss.",
  "Zeig dich groß – mit Premium mehr Sichtbarkeit für dein Profil.",
  "Unbegrenzt Alltag- & Hobby-Präferenzen gibt's mit Premium.",
];

export function AdCard({ index = 0 }: { index?: number }) {
  const message = MESSAGES[index % MESSAGES.length];

  return (
    <Card className="overflow-hidden border-dashed border-brand-200 bg-brand-50/60">
      <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-text">
          Anzeige
        </span>
        <Sparkles className="h-6 w-6 text-brand-400" />
        <p className="text-sm text-foreground">{message}</p>
        <Link
          href="/premium"
          className="text-sm font-semibold text-brand-600 underline underline-offset-2"
        >
          Mehr erfahren →
        </Link>
      </CardContent>
    </Card>
  );
}
