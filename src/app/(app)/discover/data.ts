import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Hobby } from "@/types/database.types";
import type { DiscoverListing, DiscoverProfile } from "@/components/discover/discover-explorer";

export async function fetchNearbyData(
  supabase: SupabaseClient<Database>,
  {
    originLat,
    originLng,
    myHobbyIds,
    hobbyById,
  }: {
    originLat: number;
    originLng: number;
    myHobbyIds: Set<string>;
    hobbyById: Map<string, Hobby>;
  }
): Promise<{ profiles: DiscoverProfile[]; listings: DiscoverListing[] }> {
  const [{ data: nearby }, { data: nearbyListings }] = await Promise.all([
    supabase.rpc("nearby_profiles", {
      origin_lat: originLat,
      origin_lng: originLng,
      radius_km: 50,
      max_results: 60,
    }),
    supabase.rpc("nearby_listings", {
      origin_lat: originLat,
      origin_lng: originLng,
      radius_km: 50,
      max_results: 100,
    }),
  ]);

  const profileIds = (nearby ?? []).map((p) => p.id);

  const [{ data: theirPrefs }, { data: ratings }] = await Promise.all([
    profileIds.length
      ? supabase.from("profile_preferences").select("profile_id, hobby_id").in("profile_id", profileIds)
      : Promise.resolve({ data: [] as { profile_id: string; hobby_id: string }[] }),
    profileIds.length
      ? supabase.from("ratings").select("rated_user_id, stars").in("rated_user_id", profileIds)
      : Promise.resolve({ data: [] as { rated_user_id: string; stars: number }[] }),
  ]);

  const ratingByUser = new Map<string, { sum: number; count: number }>();
  for (const r of ratings ?? []) {
    const entry = ratingByUser.get(r.rated_user_id) ?? { sum: 0, count: 0 };
    entry.sum += r.stars;
    entry.count += 1;
    ratingByUser.set(r.rated_user_id, entry);
  }

  const prefsByProfile = new Map<string, string[]>();
  for (const p of theirPrefs ?? []) {
    const list = prefsByProfile.get(p.profile_id) ?? [];
    list.push(p.hobby_id);
    prefsByProfile.set(p.profile_id, list);
  }

  const profiles: DiscoverProfile[] = (nearby ?? []).map((p) => {
    const hobbyIds = prefsByProfile.get(p.id) ?? [];
    const allHobbies = hobbyIds
      .map((id) => hobbyById.get(id))
      .filter((h): h is NonNullable<typeof h> => !!h);
    const shared = allHobbies.filter((h) => myHobbyIds.has(h.id));
    const rating = ratingByUser.get(p.id);
    return {
      id: p.id,
      displayName: p.display_name,
      bio: p.bio,
      avatarUrl: p.avatar_url,
      city: p.city,
      isPremium: p.is_premium,
      distanceKm: p.distance_km,
      allHobbies,
      sharedHobbies: shared,
      avgRating: rating ? rating.sum / rating.count : 0,
      ratingCount: rating?.count ?? 0,
    };
  });

  const authorIds = [...new Set((nearbyListings ?? []).map((l) => l.author_id))];
  const { data: authors } = authorIds.length
    ? await supabase.from("profiles").select("id, display_name, avatar_url").in("id", authorIds)
    : { data: [] as { id: string; display_name: string; avatar_url: string | null }[] };
  const authorById = new Map((authors ?? []).map((a) => [a.id, a]));

  const listings: DiscoverListing[] = (nearbyListings ?? []).map((l) => ({
    id: l.id,
    authorId: l.author_id,
    authorName: authorById.get(l.author_id)?.display_name ?? "Unbekannt",
    authorAvatarUrl: authorById.get(l.author_id)?.avatar_url ?? null,
    hobby: l.hobby_id ? (hobbyById.get(l.hobby_id) ?? null) : null,
    title: l.title,
    description: l.description,
    city: l.city,
    eventAt: l.event_at,
    distanceKm: l.distance_km,
  }));

  return { profiles, listings };
}
