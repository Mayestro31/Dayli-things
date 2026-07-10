import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Impressum – DayliThings",
};

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 to-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="mb-6 text-3xl font-extrabold text-foreground">Impressum</h1>

        <Card className="mb-6 border-brand-200 bg-brand-50">
          <CardContent className="p-4 text-sm text-brand-800">
            Diese Seite enthält noch Platzhalter (in eckigen Klammern). Bitte durch die
            tatsächlichen Angaben ersetzen, bevor die Website öffentlich live geht – ein
            Impressum ist in Deutschland gemäß § 5 TMG Pflicht.
          </CardContent>
        </Card>

        <div className="space-y-6 text-sm leading-relaxed text-gray-text">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
            <p>
              [Vollständiger Name / Firmenname]
              <br />
              [Straße und Hausnummer]
              <br />
              [Postleitzahl und Ort]
              <br />
              [Land]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Kontakt</h2>
            <p>
              E-Mail: [deine@email.de]
              <br />
              Telefon: [optional, deine Telefonnummer]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              [Vollständiger Name]
              <br />
              [Anschrift wie oben]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p>
              [Falls vorhanden: USt-IdNr. gemäß § 27 a Umsatzsteuergesetz. Falls nicht
              vorhanden, diesen Abschnitt entfernen.]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte
              oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
