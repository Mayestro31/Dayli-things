import type { Hobby } from "@/types/database.types";

const LOCATION_PATTERNS = [
  /in der nähe von\s+/iu,
  /in der nähe\s+(?:von\s+)?/iu,
  /nähe von\s+/iu,
  /im umkreis von\s+/iu,
  /im raum\s+/iu,
  /rund um\s+/iu,
  /(?:aus der gegend|gegend von)\s+/iu,
  /(?:bei|nahe)\s+/iu,
  /\bin\s+/iu,
];

// Liefert Kandidaten für den gesuchten Ort, vom längsten zum kürzesten
// Wortfenster (bis zu 5 Wörter) nach dem ERSTEN erkannten Präpositions-
// Muster ("in der Nähe von", "bei", "in", …). Bewusst ohne Großschreibungs-
// Annahme oder Stoppwortliste: statt zu raten, wo der Ortsname endet,
// probiert der Aufrufer die Kandidaten der Reihe nach gegen eine echte
// Geocoding-API durch (siehe daysi-actions.ts) und nimmt den ersten
// Treffer – dadurch funktionieren auch kleingeschriebene und mehrteilige
// Ortsnamen ("frankfurt am main", "bergisch gladbach") zuverlässig.
export function extractCityCandidates(message: string): string[] {
  for (const pattern of LOCATION_PATTERNS) {
    const match = message.match(pattern);
    if (match?.index == null) continue;

    const words = message
      .slice(match.index + match[0].length)
      .trim()
      .split(/\s+/)
      .map((w) => w.replace(/^["'„«]+|["',.;:!?«»]+$/g, ""))
      .filter(Boolean);

    if (words.length === 0) continue;

    const maxWords = Math.min(words.length, 5);
    const candidates: string[] = [];
    for (let n = maxWords; n >= 1; n--) {
      candidates.push(words.slice(0, n).join(" "));
    }
    return candidates;
  }

  return [];
}

// Zusätzliche Synonyme/Verbformen je Hobby, damit auch Umschreibungen
// erkannt werden, die nicht einfach eine Vorsilbe des Hobby-Namens sind
// (z. B. "Rasen mähen" statt "Rasenmähen", "kicken" statt "Fußball").
const SYNONYMS: Record<string, string[]> = {
  Heimwerken: ["heimwerker", "reparieren", "reparatur", "handwerk", "werkzeug", "möbel aufbauen"],
  Einkaufen: ["einkauf", "einkäufe", "besorgungen", "supermarkt", "einkaufen gehen"],
  Rasenmähen: ["rasen mähen", "rasen", "rasenmäher", "mähen"],
  "Hecke schneiden": ["hecke", "heckenschnitt", "sträucher schneiden"],
  "Blumen gießen": ["blumen", "gießen", "pflanzen gießen"],
  Gartenarbeit: ["garten", "gärtnern", "gartenpflege", "im garten"],
  Fahrgemeinschaften: ["fahrdienst", "mitfahren", "abholen", "chauffieren", "pendeln", "fahren"],
  Hundesitting: ["hund hüten", "hundebetreuung", "hundesitter"],
  Haustiere: ["haustier", "tiere", "tiersitting"],
  Babysitting: ["babysitter", "kinderbetreuung", "kinder hüten", "aufpassen", "kinderaufsicht"],
  Putzhilfe: ["putzen", "reinigung", "saubermachen", "haushaltshilfe"],
  Bügelhilfe: ["bügeln", "wäsche bügeln"],
  Nachbarschaftshilfen: ["nachbarschaftshilfe", "nachbarschaft", "nachbarn helfen"],
  "Kochen & Backen": ["kochen", "backen", "kuchen backen", "essen kochen"],
  Joggen: ["laufen", "jogging", "laufsport", "laufen gehen"],
  Fahrradfahren: ["radfahren", "rad fahren", "fahrrad", "radtour", "biken", "mountainbiken"],
  Gesellschaftsspiele: ["brettspiele", "brettspiel", "spieleabend", "gesellschaftsspiel"],
  Fotografie: ["fotografieren", "fotos machen", "fotograf", "fotoshooting"],
  Tanzen: ["tanz", "tanzkurs", "tanzen gehen"],
  Lesen: ["bücher", "buch lesen", "lesezirkel", "leseratte"],
  "Malen & Zeichnen": ["malen", "zeichnen", "kunst machen"],
  "Gassi gehen": ["gassi", "hund ausführen", "hund gassi"],
  Reiten: ["pferde", "pferd", "reitstunde", "reiten gehen"],
  "Musik machen": ["musik", "musizieren", "instrument spielen", "band"],
  Schwimmen: ["schwimmbad", "schwimmen gehen", "schwimmkurs"],
  Gym: ["fitnessstudio", "krafttraining", "fitness", "gym gehen"],
  Padel: ["padel tennis", "padeltennis"],
  Schach: ["schachspielen", "schachspiel", "schach spielen"],
  Yoga: ["yogakurs", "yoga machen"],
  Fußball: ["fussball", "kicken", "fußballspielen", "fußball spielen"],
  Handball: ["handballspielen", "handball spielen"],
  Tennis: ["tennisspielen", "tennisplatz", "tennis spielen"],
  Golf: ["golfen", "golfplatz", "golfspielen", "golf spielen"],
  Wandern: ["wanderung", "hiking", "spazieren", "wanderweg", "wandern gehen"],
  Videospiele: ["gaming", "zocken", "videospiel", "videospiele spielen"],
  Reisen: ["reise", "urlaub", "verreisen", "reisen gehen"],
  Jagen: ["jagd", "jäger", "jagen gehen"],
  Pickleball: ["pickle ball", "pickelball"],
  Hyrox: ["hyrox training"],
};

// Gleicht Stichworte der Nachricht gegen die Hobby-/Alltagshilfe-Liste ab:
// zuerst über eine grobe Wortstamm-Erkennung (z. B. "Garten" für
// "Gartenarbeit"), zusätzlich über ein Synonym-Wörterbuch mit gängigen
// Umschreibungen und Verbformen. Kein echtes Sprachverständnis – rein
// stichwortbasierter Abgleich.
export function matchHobbiesInMessage(message: string, hobbies: Hobby[]): Hobby[] {
  const lower = message.toLowerCase();
  return hobbies.filter((hobby) => {
    const firstWord = hobby.name.split(/[\s&]/)[0]?.toLowerCase() ?? "";
    const stem = firstWord.slice(0, Math.min(6, firstWord.length));
    if (stem.length >= 3 && lower.includes(stem)) return true;

    const synonyms = SYNONYMS[hobby.name];
    return synonyms?.some((word) => lower.includes(word)) ?? false;
  });
}

const RECIPIENT_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /für meine mutter/iu, label: "deine Mutter" },
  { pattern: /für meinen vater/iu, label: "deinen Vater" },
  { pattern: /für meine (oma|großmutter)/iu, label: "deine Oma" },
  { pattern: /für meinen (opa|großvater)/iu, label: "deinen Opa" },
  { pattern: /für meine(n)? (nachbar\w*)/iu, label: "deine Nachbarn" },
  { pattern: /für meine(n)? freund\w*/iu, label: "deine:n Freund:in" },
  { pattern: /für mich/iu, label: "dich" },
];

// Erkennt, für wen gesucht wird ("für meine Mutter" etc.), damit Daysi das
// in ihrer Antwort widerspiegeln kann. Rein für den Ton der Antwort, hat
// keinen Einfluss auf die eigentliche Suche.
export function extractRecipient(message: string): string | null {
  for (const { pattern, label } of RECIPIENT_PATTERNS) {
    if (pattern.test(message)) return label;
  }
  return null;
}

const GREETING_PATTERN = /^\s*(hi|hallo|hey|servus|moin|guten tag|na|yo)\b/iu;

export function isGreeting(message: string): boolean {
  return GREETING_PATTERN.test(message.trim());
}

const SEARCH_INTENT_PATTERN =
  /such|find|zeig|brauch|hilfe|jemand|person|profil|leute|nachbar|unterstütz/iu;

// Grobe Einschätzung, ob die Nachricht überhaupt wie ein Suchauftrag klingt.
// Verhindert, dass auf themenfremde Nachrichten ("Was kostet Premium?")
// trotzdem eine "0 Personen gefunden"-Antwort kommt.
export function looksLikeSearchRequest(message: string): boolean {
  return SEARCH_INTENT_PATTERN.test(message);
}
