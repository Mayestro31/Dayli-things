"use server";

import { requireUser } from "@/lib/supabase/server";
import {
  extractCityCandidates,
  extractRecipient,
  isGreeting,
  looksLikeSearchRequest,
  matchHobbiesInMessage,
} from "@/lib/daysi-parser";
import { fetchNearbyData } from "./data";
import type { DiscoverProfile } from "@/components/discover/discover-explorer";

export type DaysiSearchResult = {
  reply: string;
  profiles: DiscoverProfile[];
};

async function geocode(query: string): Promise<{ lat: number; lng: number; label: string } | null> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("accept-language", "de");
    // Auf Deutschland eingegrenzt, damit z. B. "Paris" nicht versehentlich
    // nach Frankreich statt in die deutsche Gemeinde auflöst.
    url.searchParams.set("countrycodes", "de");

    const res = await fetch(url, {
      headers: { "User-Agent": "DayliThings/1.0 (Community-App Demo; kein Produktivbetrieb)" },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { lat: string; lon: string; display_name: string }[];
    if (!data[0]) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      label: data[0].display_name.split(",")[0].trim(),
    };
  } catch {
    return null;
  }
}

// Probiert die Ortskandidaten der Reihe nach (längster zuerst) gegen die
// Geocoding-API durch und nimmt den ersten Treffer. So lässt sich zuverlässig
// jeder Ort in Deutschland erkennen, unabhängig von Groß-/Kleinschreibung
// oder mehrteiligen Namen ("Bergisch Gladbach", "Frankfurt am Main") – ohne
// dass eine Regex vorher raten muss, wo der Ortsname endet.
async function resolveCity(candidates: string[]): Promise<{ lat: number; lng: number; label: string } | null> {
  for (const candidate of candidates) {
    const result = await geocode(candidate);
    if (result) return result;
  }
  return null;
}

export async function daysiSearchAction(message: string): Promise<DaysiSearchResult> {
  const { supabase, user } = await requireUser();

  const trimmed = message.trim();
  if (!trimmed) {
    return {
      reply: "Frag mich einfach, wonach oder nach wem du suchst! 🌼",
      profiles: [],
    };
  }

  if (isGreeting(trimmed)) {
    return {
      reply:
        "Hallo! 🌼 Beschreib mir am besten in einem Satz, wonach du suchst und wo – z. B. „Ich suche Hilfe beim Rasenmähen in der Nähe von Frankfurt am Main.\"",
      profiles: [],
    };
  }

  const { data: hobbies } = await supabase.from("hobbies").select("*");
  const matchedHobbies = matchHobbiesInMessage(trimmed, hobbies ?? []);
  const cityCandidates = extractCityCandidates(trimmed);
  const recipient = extractRecipient(trimmed);

  if (cityCandidates.length === 0 && matchedHobbies.length === 0 && !looksLikeSearchRequest(trimmed)) {
    return {
      reply:
        "Das habe ich nicht ganz verstanden. Beschreib mir gerne, wonach du suchst und in welcher Gegend – z. B. „Suche jemanden zum Wandern in der Nähe von München.\"",
      profiles: [],
    };
  }

  const resolvedCity = cityCandidates.length > 0 ? await resolveCity(cityCandidates) : null;
  let origin = resolvedCity ? { lat: resolvedCity.lat, lng: resolvedCity.lng } : null;
  let cityLabel = resolvedCity?.label ?? null;

  if (!origin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("lat, lng")
      .eq("id", user.id)
      .single();
    if (profile?.lat != null && profile?.lng != null) {
      origin = { lat: profile.lat, lng: profile.lng };
    }
    cityLabel = null;
  }

  if (!origin) {
    return {
      reply:
        "Ich konnte weder den genannten Ort finden noch deinen eigenen Standort ermitteln. Nenn mir gerne einen bekannteren Ort, oder trag deinen Standort in deinem Profil ein.",
      profiles: [],
    };
  }

  const hobbyById = new Map((hobbies ?? []).map((h) => [h.id, h]));
  const { profiles } = await fetchNearbyData(supabase, {
    originLat: origin.lat,
    originLng: origin.lng,
    myHobbyIds: new Set(),
    hobbyById,
  });

  const matchedIds = new Set(matchedHobbies.map((h) => h.id));
  const filtered =
    matchedIds.size > 0
      ? profiles.filter((p) => p.allHobbies.some((h) => matchedIds.has(h.id)))
      : profiles;

  const hobbyLabel = matchedHobbies.map((h) => `${h.icon} ${h.name}`).join(", ");
  const locationLabel = cityLabel ? ` in der Nähe von ${cityLabel}` : " in deiner Nähe";
  const forLabel = recipient ? ` für ${recipient}` : "";

  let reply: string;
  if (filtered.length === 0) {
    reply = `Ich habe leider niemanden${forLabel}${locationLabel}${
      hobbyLabel ? ` mit "${hobbyLabel}"` : ""
    } gefunden. Versuch es mit anderen Begriffen oder einem anderen Ort.`;
  } else {
    reply = `Ich habe${forLabel} ${filtered.length} Person${
      filtered.length === 1 ? "" : "en"
    }${locationLabel}${hobbyLabel ? ` mit "${hobbyLabel}"` : ""} gefunden:`;
  }

  return { reply, profiles: filtered.slice(0, 6) };
}
