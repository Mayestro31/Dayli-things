# DayliThings

Community-App, die Menschen über Alltag- und Hobby-Präferenzen in ihrer Nähe verbindet.
Gebaut mit Next.js (App Router), Tailwind CSS und Supabase (Auth, Postgres, Realtime, Storage).

## Features

- **Registrierung & Login** per E-Mail/Passwort (Supabase Auth)
- **Profil erstellen** mit Avatar-Upload, Bio und Standort
- **Alltag- & Hobby-Präferenzen** als Tags
- **Standortbasierte Suche** ("Entdecken") mit Radius- und Präferenzfilter
- **Chat** in Echtzeit (Supabase Realtime)
- **Bewertungssystem** (Sterne + Kommentar) je Profil
- **Premium-Account** (Upgrade-Flow, Feature-Vergleich)

## 1. Supabase-Projekt einrichten

1. Erstelle unter [supabase.com](https://supabase.com) ein neues Projekt.
2. Öffne den **SQL Editor** und führe die Dateien in dieser Reihenfolge aus:
   - `supabase/migrations/0001_init.sql`
   - `supabase/migrations/0002_seed_hobbies.sql`
3. Unter **Authentication → Providers** ist E-Mail/Passwort standardmäßig aktiv.
   - Für schnelles lokales Testen kannst du unter **Authentication → Settings** die Option
     "Confirm email" deaktivieren, dann ist nach der Registrierung kein Klick auf den
     Bestätigungslink nötig.
4. Unter **Authentication → URL Configuration** die Redirect-URL
   `http://localhost:3000/auth/confirm` (bzw. deine Produktions-URL) hinzufügen.
5. Unter **Project Settings → API** findest du die Werte für die `.env.local` (siehe unten).

## 2. Umgebungsvariablen

Kopiere `.env.local.example` zu `.env.local` und trage deine Supabase-Werte ein:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 3. Entwicklung

```bash
npm install
npm run dev
```

Die App läuft danach unter [http://localhost:3000](http://localhost:3000).

## Projektstruktur

```
src/app/                  Next.js App Router Seiten
  (app)/                  Geschützter Bereich (Navbar, Bottom-Nav)
    discover/              Standortbasierte Suche
    chat/                  Konversationsliste & Chat-Thread
    profile/[id]/          Profilansicht, Bewertungen
    premium/               Premium-Upgrade
  onboarding/              Profil- & Präferenzen-Einrichtung
  login/, register/        Auth-Screens
src/components/            UI-Bausteine, Mascot, Domain-Komponenten
src/lib/supabase/          Supabase Client-Helfer (Browser/Server/Middleware)
supabase/migrations/       SQL-Schema, RLS-Policies, Seed-Daten
```

## Hinweise

- **Premium-Zahlung**: Der Upgrade-Button setzt aktuell direkt das `is_premium`-Flag in der
  Datenbank (kein echter Zahlungsanbieter angebunden). Für echte Zahlungen müsste ein
  Anbieter wie Stripe integriert werden.
- **Standort**: Wird per Browser-Geolocation-API abgefragt und als Lat/Lng im Profil
  gespeichert. Die Nähe-Suche nutzt eine SQL-Funktion (`nearby_profiles`) mit
  Haversine-Distanzberechnung.
- **Realtime-Chat**: Setzt voraus, dass `supabase_realtime` die Tabelle `messages` publiziert
  (bereits Teil der Migration).
