import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DaysiBubble } from "@/components/mascot/daysi";
import { Button } from "@/components/ui/button";
import { DiscoverExplorer, type MyListing } from "@/components/discover/discover-explorer";
import { DaysiChat } from "@/components/discover/daysi-chat";
import { fetchNearbyData } from "./data";

export default async function DiscoverPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: me } = await supabase
    .from("profiles")
    .select("lat, lng, city, is_premium")
    .eq("id", user.id)
    .single();

  if (me?.lat == null || me?.lng == null) {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <DaysiBubble text="Ich kann noch niemanden in deiner Nähe finden – teile zuerst deinen Standort in deinem Profil! 📍" />
        <Link href="/onboarding/profile">
          <Button size="lg">Standort hinzufügen</Button>
        </Link>
      </div>
    );
  }

  const [{ data: hobbies }, { data: myPrefs }, { data: myListings }] = await Promise.all([
    supabase.from("hobbies").select("*").order("name"),
    supabase.from("profile_preferences").select("hobby_id").eq("profile_id", user.id),
    supabase.from("listings").select("*").eq("author_id", user.id).order("created_at", { ascending: false }),
  ]);

  const hobbyById = new Map((hobbies ?? []).map((h) => [h.id, h]));
  const myHobbyIds = new Set((myPrefs ?? []).map((p) => p.hobby_id));

  const { profiles, listings } = await fetchNearbyData(supabase, {
    originLat: me.lat,
    originLng: me.lng,
    myHobbyIds,
    hobbyById,
  });

  const myListingsMapped: MyListing[] = (myListings ?? []).map((l) => ({
    id: l.id,
    hobby: l.hobby_id ? (hobbyById.get(l.hobby_id) ?? null) : null,
    title: l.title,
    description: l.description,
    city: l.city,
    eventAt: l.event_at,
    isActive: l.is_active,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Entdecken 🔍</h1>
        <p className="text-sm text-gray-text">Finde Daysi&apos;s für Alltag & Hobbys in deiner Nähe.</p>
      </div>
      <DaysiChat />
      <DiscoverExplorer
        initialProfiles={profiles}
        hobbies={hobbies ?? []}
        initialListings={listings}
        myListings={myListingsMapped}
        defaultCity={me.city}
        viewerIsPremium={me.is_premium}
      />
    </div>
  );
}
