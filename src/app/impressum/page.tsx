import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = {
  title: "Impressum – DayliThings",
};

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 to-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="mb-6 text-3xl font-extrabold text-foreground">Impressum</h1>

        <div className="space-y-6 text-sm leading-relaxed text-gray-text">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
            <p>
              Lukas Mayer
              <br />
              Dockweilerstraße 14
              <br />
              54550 Daun
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Kontakt</h2>
            <p>E-Mail: Lukimayer@web.de</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              Lukas Mayer
              <br />
              Dockweilerstraße 14, 54550 Daun
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
