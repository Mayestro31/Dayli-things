"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, requireUser } from "@/lib/supabase/server";
import { fetchNearbyData } from "./data";
import type { DiscoverListing, DiscoverProfile } from "@/components/discover/discover-explorer";

export async function startConversationAction(otherUserId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_or_create_conversation", {
    other_user_id: otherUserId,
  });

  if (error || !data) {
    throw new Error(error?.message ?? "Konversation konnte nicht gestartet werden.");
  }

  redirect(`/chat/${data}`);
}

export type ListingFormState = { error?: string; success?: boolean } | null;

export async function createListingAction(
  _prevState: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  const { supabase, user } = await requireUser();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const hobbyId = String(formData.get("hobbyId") ?? "").trim();
  const eventAtRaw = String(formData.get("eventAt") ?? "").trim();

  if (title.length < 3) {
    return { error: "Bitte gib einen kurzen Titel ein (mind. 3 Zeichen)." };
  }
  if (!city) {
    return { error: "Bitte gib einen Ort ein." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("lat, lng")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("listings").insert({
    author_id: user.id,
    hobby_id: hobbyId || null,
    title,
    description: description || null,
    city,
    lat: profile?.lat ?? null,
    lng: profile?.lng ?? null,
    event_at: eventAtRaw ? new Date(eventAtRaw).toISOString() : null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/discover");
  return { success: true };
}

export async function deactivateListingAction(listingId: string) {
  const { supabase, user } = await requireUser();

  await supabase
    .from("listings")
    .update({ is_active: false })
    .eq("id", listingId)
    .eq("author_id", user.id);

  revalidatePath("/discover");
}

export type GeocodeResult = { label: string; lat: number; lng: number };

// Geocoding über die freie OpenStreetMap-Nominatim-API (kein API-Key nötig),
// damit sich beim Suchen ein beliebiger Ort statt nur einer festen Städteliste eingeben lässt.
export async function geocodeLocationAction(
  query: string
): Promise<{ results: GeocodeResult[] } | { error: string }> {
  await requireUser();

  const trimmed = query.trim();
  if (trimmed.length < 3) {
    return { results: [] };
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", trimmed);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "5");
    url.searchParams.set("accept-language", "de");

    const res = await fetch(url, {
      headers: {
        "User-Agent": "DayliThings/1.0 (Community-App Demo; kein Produktivbetrieb)",
      },
    });

    if (!res.ok) {
      return { error: "Ortssuche momentan nicht erreichbar." };
    }

    const data = (await res.json()) as {
      display_name: string;
      lat: string;
      lon: string;
    }[];

    return {
      results: data.map((r) => ({
        label: r.display_name,
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
      })),
    };
  } catch {
    return { error: "Ortssuche momentan nicht erreichbar." };
  }
}

export type SearchNearbyResult =
  | { success: true; profiles: DiscoverProfile[]; listings: DiscoverListing[] }
  | { success: false; error: string };

export async function searchNearbyAction(lat: number, lng: number): Promise<SearchNearbyResult> {
  const { supabase, user } = await requireUser();

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { success: false, error: "Ungültiger Ort." };
  }

  const [{ data: hobbies }, { data: myPrefs }] = await Promise.all([
    supabase.from("hobbies").select("*"),
    supabase.from("profile_preferences").select("hobby_id").eq("profile_id", user.id),
  ]);

  const hobbyById = new Map((hobbies ?? []).map((h) => [h.id, h]));
  const myHobbyIds = new Set((myPrefs ?? []).map((p) => p.hobby_id));

  const { profiles, listings } = await fetchNearbyData(supabase, {
    originLat: lat,
    originLng: lng,
    myHobbyIds,
    hobbyById,
  });
  return { success: true, profiles, listings };
}
