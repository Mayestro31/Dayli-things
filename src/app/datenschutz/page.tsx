import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Datenschutz – DayliThings",
};

export default function DatenschutzPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 to-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="mb-6 text-3xl font-extrabold text-foreground">Datenschutzerklärung</h1>

        <Card className="mb-6 border-brand-200 bg-brand-50">
          <CardContent className="p-4 text-sm text-brand-800">
            Diese Seite enthält noch Platzhalter (in eckigen Klammern), z. B. für den
            Verantwortlichen. Bitte vor dem Live-Gang ausfüllen und prüfen, ob alle genannten
            Dienste (z. B. SMS-Verifizierung) tatsächlich aktiv sind.
          </CardContent>
        </Card>

        <div className="space-y-8 text-sm leading-relaxed text-gray-text">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
            <p>
              [Vollständiger Name / Firmenname]
              <br />
              [Straße und Hausnummer]
              <br />
              [Postleitzahl und Ort]
              <br />
              E-Mail: [deine@email.de]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              2. Registrierung und Nutzerkonto
            </h2>
            <p>
              Bei der Registrierung erheben wir Vorname, Nachname, E-Mail-Adresse, Handynummer
              und ein Passwort. Die Handynummer wird per SMS-Code verifiziert; hierfür wird sie
              an unseren SMS-Versanddienstleister (z. B. Twilio) übermittelt. Passwörter werden
              ausschließlich verschlüsselt (gehasht) gespeichert. Rechtsgrundlage ist die
              Erfüllung des Nutzungsvertrags (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">3. Profildaten</h2>
            <p>
              Im Profil kannst du zusätzlich einen Anzeigenamen, ein Profilfoto, eine
              Kurzbeschreibung sowie deinen Standort und deine Alltags-/Hobby-Präferenzen
              angeben. Diese Angaben sind für andere Nutzer:innen der Plattform sichtbar, damit
              die Kernfunktion der App – das Finden passender Personen in deiner Nähe –
              funktioniert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
              sowie, soweit du freiwillig zusätzliche Angaben machst, Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              4. Standortsuche und Geocoding
            </h2>
            <p>
              Für die standortbasierte Suche wandeln wir von dir eingegebene Ortsnamen in
              geografische Koordinaten um. Dafür nutzen wir den Geocoding-Dienst Nominatim von
              OpenStreetMap. Die eingegebene Ortsbezeichnung wird zu diesem Zweck an
              OpenStreetMap übermittelt. Weitere Informationen findest du in der
              Datenschutzerklärung der OpenStreetMap Foundation.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              5. Chat, Bewertungen und Inserate
            </h2>
            <p>
              Nachrichten, die du über die Chat-Funktion versendest, sowie Bewertungen und von
              dir erstellte Inserate werden gespeichert, damit die jeweiligen Empfänger:innen
              bzw. andere Nutzer:innen sie einsehen können. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b DSGVO.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              6. Hosting und technische Infrastruktur
            </h2>
            <p>
              Diese Website wird über Vercel gehostet; unsere Datenbank, Authentifizierung und
              Dateispeicherung (z. B. Profilbilder) laufen über Supabase. Beide Dienstleister
              verarbeiten dabei technisch notwendige Daten wie IP-Adressen und Zugriffszeiten in
              Server-Logs. Mit beiden Anbietern bestehen bzw. werden Auftragsverarbeitungsverträge
              nach Art. 28 DSGVO abgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              7. Cookies und lokale Speicherung
            </h2>
            <p>
              Zur Aufrechterhaltung deines Login-Status verwenden wir technisch notwendige
              Cookies bzw. lokalen Speicher (Local Storage) deines Browsers. Diese sind für den
              Betrieb der Plattform erforderlich; eine Einwilligung ist hierfür nicht
              erforderlich (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">8. Speicherdauer</h2>
            <p>
              Wir speichern deine Daten, solange dein Nutzerkonto besteht. Nach Löschung deines
              Kontos werden deine Daten gelöscht oder anonymisiert, soweit keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">9. Deine Rechte</h2>
            <p>
              Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
              Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung
              (Art. 21 DSGVO). Wende dich hierfür an die oben genannte Kontaktadresse. Außerdem
              steht dir ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">10. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz wende dich bitte an: [deine@email.de]
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
