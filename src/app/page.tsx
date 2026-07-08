import Link from "next/link";
import { Crown, MapPin, MessageCircle, Sparkles, Star, UserCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Daysi } from "@/components/mascot/daysi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: UserCircle,
    title: "Dein Profil",
    description: "Stell dich vor – mit Foto, Bio und dem, was dich ausmacht.",
  },
  {
    icon: Sparkles,
    title: "Alltag & Hobby Präferenzen",
    description: "Wähle Aktivitäten von Kochen bis Wandern – Daysi findet passende Menschen.",
  },
  {
    icon: MapPin,
    title: "Standortbasierte Suche",
    description: "Entdecke Leute in deiner Nähe, sortiert nach Entfernung.",
  },
  {
    icon: MessageCircle,
    title: "Chat",
    description: "Schreib direkt in Echtzeit mit neuen Bekanntschaften.",
  },
  {
    icon: Star,
    title: "Bewertungen",
    description: "Ein faires Bewertungssystem sorgt für eine vertrauensvolle Community.",
  },
  {
    icon: Crown,
    title: "Premium",
    description: "Mehr Sichtbarkeit, mehr Filter, mehr Möglichkeiten mit DayliThings Premium.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gradient-to-b from-brand-50 via-white to-white">
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-24">
          <Daysi size={140} />
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Deine Community. Dein Alltag.
          </h1>
          <p className="max-w-xl text-lg text-gray-text">
            DayliThings verbindet dich mit Menschen in deiner Nähe, die deine Hobbys und
            Alltagsvorlieben teilen.{" "}
            <span className="block">Willkommen bei den Daysi&apos;s 🌼</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg">Jetzt kostenlos starten</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Bereits Daysi? Anmelden
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-brand-900">{feature.title}</h3>
                  <p className="text-sm text-brand-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-brand-100 bg-brand-500">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Bereit, neue Menschen kennenzulernen?
            </h2>
            <p className="max-w-xl text-brand-50">
              Erstelle in wenigen Minuten dein Profil und starte deine ersten Chats.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
                Jetzt loslegen
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-brand-100 bg-white py-6 text-center text-sm text-brand-500">
        © {new Date().getFullYear()} DayliThings – mit 🧡 von Daysi
      </footer>
    </>
  );
}
