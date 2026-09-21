"use client";

import { Fragment, useEffect, useMemo, useState, useTransition } from "react";
import { Loader2, MapPin, Plus, Search } from "lucide-react";
import {
  geocodeLocationAction,
  searchNearbyAction,
  startConversationAction,
  type GeocodeResult,
} from "@/app/(app)/discover/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RatingStars } from "@/components/ui/rating-stars";
import { Avatar } from "@/components/ui/avatar";
import { Daysi } from "@/components/mascot/daysi";
import { CreateListingForm } from "@/components/discover/create-listing-form";
import { ListingCard, MyListingCard, type ListingCardData, type MyListingData } from "@/components/discover/listing-card";
import { AdCard } from "@/components/ads/ad-card";
import { cn, formatDistance } from "@/lib/utils";
import type { Hobby, HobbyCategory } from "@/types/database.types";

export type DiscoverProfile = {
  id: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  city: string | null;
  isPremium: boolean;
  distanceKm: number;
  allHobbies: Hobby[];
  sharedHobbies: Hobby[];
  avgRating: number;
  ratingCount: number;
};

export type DiscoverListing = ListingCardData;
export type MyListing = MyListingData;

type Mode = "suchen" | "anbieten";

const categoryTabs: { key: HobbyCategory; label: string }[] = [
  { key: "alltag", label: "Alltagshilfen" },
  { key: "hobby", label: "Hobbys" },
];

export function DiscoverExplorer({
  initialProfiles,
  hobbies,
  initialListings,
  myListings,
  defaultCity,
  viewerIsPremium,
}: {
  initialProfiles: DiscoverProfile[];
  hobbies: Hobby[];
  initialListings: DiscoverListing[];
  myListings: MyListing[];
  defaultCity: string | null;
  viewerIsPremium: boolean;
}) {
  const [mode, setMode] = useState<Mode>("suchen");
  const [radius, setRadius] = useState(25);
  const [activeCategory, setActiveCategory] = useState<HobbyCategory>("alltag");
  const [activeHobbies, setActiveHobbies] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [profiles, setProfiles] = useState(initialProfiles);
  const [listings, setListings] = useState(initialListings);
  const [originLabel, setOriginLabel] = useState(defaultCity ?? "Mein Standort");
  const [cityQuery, setCityQuery] = useState("");
  const [locationError, setLocationError] = useState("");
  const [geoSuggestions, setGeoSuggestions] = useState<GeocodeResult[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isSearchingOrigin, startOriginTransition] = useTransition();

  const isHome = originLabel === (defaultCity ?? "Mein Standort");

  useEffect(() => {
    let cancelled = false;
    const query = cityQuery.trim();
    const timer = setTimeout(async () => {
      if (query.length < 3) {
        if (!cancelled) {
          setGeoSuggestions([]);
          setIsLoadingSuggestions(false);
        }
        return;
      }
      setIsLoadingSuggestions(true);
      const result = await geocodeLocationAction(query);
      if (cancelled) return;
      setIsLoadingSuggestions(false);
      setGeoSuggestions("error" in result ? [] : result.results);
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [cityQuery]);

  function selectCity(place: GeocodeResult) {
    setCityQuery("");
    setGeoSuggestions([]);
    setLocationError("");
    startOriginTransition(async () => {
      const result = await searchNearbyAction(place.lat, place.lng);
      if (!result.success) {
        setLocationError(result.error);
        return;
      }
      setProfiles(result.profiles);
      setListings(result.listings);
      setOriginLabel(place.label.split(",")[0].trim());
    });
  }

  function resetToHome() {
    setCityQuery("");
    setGeoSuggestions([]);
    setLocationError("");
    setProfiles(initialProfiles);
    setListings(initialListings);
    setOriginLabel(defaultCity ?? "Mein Standort");
  }

  function toggleHobby(id: string) {
    setActiveHobbies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hobbiesByCategory = useMemo(() => {
    const map = new Map<HobbyCategory, Hobby[]>();
    for (const hobby of hobbies) {
      const list = map.get(hobby.category) ?? [];
      list.push(hobby);
      map.set(hobby.category, list);
    }
    return map;
  }, [hobbies]);

  const term = searchTerm.trim().toLowerCase();

  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((p) => p.distanceKm <= radius)
      .filter(
        (p) => activeHobbies.size === 0 || p.allHobbies.some((h) => activeHobbies.has(h.id))
      )
      .filter((p) => {
        if (!term) return true;
        return (
          p.displayName.toLowerCase().includes(term) ||
          (p.bio?.toLowerCase().includes(term) ?? false) ||
          p.allHobbies.some((h) => h.name.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [profiles, radius, activeHobbies, term]);

  const filteredListings = useMemo(() => {
    return listings
      .filter((l) => l.distanceKm <= radius)
      .filter((l) => activeHobbies.size === 0 || (l.hobby && activeHobbies.has(l.hobby.id)))
      .filter((l) => {
        if (!term) return true;
        return (
          l.title.toLowerCase().includes(term) ||
          (l.description?.toLowerCase().includes(term) ?? false) ||
          (l.hobby?.name.toLowerCase().includes(term) ?? false)
        );
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [listings, radius, activeHobbies, term]);

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="p-1.5">
          <div className="flex rounded-xl bg-brand-50 p-1">
            {(["suchen", "anbieten"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-semibold transition-colors",
                  mode === m ? "bg-brand-500 text-white shadow-sm" : "text-brand-700"
                )}
              >
                {m === "suchen" ? "🔍 Suchen" : "📣 Anbieten"}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {mode === "anbieten" ? (
        <div className="space-y-5">
          <Card>
            <CardContent className="space-y-2 p-4">
              <h2 className="text-sm font-semibold text-brand-900">
                Worum geht es? <span className="text-red-500">*</span>
              </h2>
              <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
            </CardContent>
          </Card>

          {!showCreateForm ? (
            <Button size="lg" className="w-full" onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4" />
              Neues Hobby/Hilfe-Gesuch erstellen
            </Button>
          ) : (
            <Card>
              <CardContent className="p-4">
                <CreateListingForm
                  key={activeCategory}
                  category={activeCategory}
                  hobbies={hobbiesByCategory.get(activeCategory) ?? []}
                  defaultCity={defaultCity}
                />
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              Meine Inserate ({myListings.length})
            </h2>
            {myListings.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <Daysi size={64} />
                <p className="text-sm text-gray-text">
                  Du hast noch kein Inserat erstellt.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myListings.map((listing) => (
                  <MyListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <Card>
            <CardContent className="space-y-4 p-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-text">
                  Standort für die Suche:
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text" />
                  <Input
                    value={cityQuery}
                    onChange={(e) => setCityQuery(e.target.value)}
                    placeholder={`Aktuell: ${originLabel}`}
                    className="pl-10"
                    disabled={isSearchingOrigin}
                  />
                  {(isSearchingOrigin || isLoadingSuggestions) && (
                    <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-500" />
                  )}
                  {geoSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-mid bg-white shadow-lg">
                      {geoSuggestions.map((place, i) => (
                        <button
                          key={`${place.lat}-${place.lng}-${i}`}
                          type="button"
                          onClick={() => selectCity(place)}
                          className="block w-full px-3.5 py-2 text-left text-sm text-foreground hover:bg-brand-50"
                        >
                          {place.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {!isLoadingSuggestions &&
                    geoSuggestions.length === 0 &&
                    cityQuery.trim().length >= 3 && (
                      <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-mid bg-white px-3.5 py-2 text-sm text-gray-text shadow-lg">
                        Keine Orte gefunden.
                      </div>
                    )}
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  {locationError ? (
                    <p className="text-xs text-red-600">{locationError}</p>
                  ) : (
                    <p className="text-xs text-gray-text">
                      Du suchst gerade von <span className="font-semibold">{originLabel}</span> aus.
                    </p>
                  )}
                  {!isHome && (
                    <button
                      type="button"
                      onClick={resetToHome}
                      className="shrink-0 text-xs font-semibold text-brand-600 hover:underline"
                    >
                      Zu meinem Standort zurück
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-text">Radius:</span>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="flex-1 accent-brand-500"
                />
                <span className="w-14 text-right text-sm font-bold text-brand-500">
                  {radius} km
                </span>
              </div>

              <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

              <div className="flex flex-wrap gap-2">
                {(hobbiesByCategory.get(activeCategory) ?? []).map((hobby) => {
                  const active = activeHobbies.has(hobby.id);
                  return (
                    <button
                      key={hobby.id}
                      type="button"
                      onClick={() => toggleHobby(hobby.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                        active
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-gray-mid bg-white text-gray-text hover:border-brand-300"
                      )}
                    >
                      <span>{hobby.icon}</span>
                      {hobby.name}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Wonach suchst du?"
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-gray-text">
            {filteredProfiles.length} Daysi{filteredProfiles.length === 1 ? "" : "'s"} gefunden ·{" "}
            {radius} km
          </p>

          {filteredProfiles.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Daysi size={90} />
              <p className="text-sm text-gray-text">
                Niemand gefunden. Versuch einen größeren Radius, andere Präferenzen oder einen
                anderen Suchbegriff.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredProfiles.map((profile, i) => (
                <Fragment key={profile.id}>
                  <ProfileCard profile={profile} />
                  {!viewerIsPremium && i % 3 === 2 && <AdCard index={i} />}
                </Fragment>
              ))}
            </div>
          )}

          {filteredListings.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-bold text-foreground">
                Inserate in der Nähe ({filteredListings.length})
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CategoryTabs({
  active,
  onChange,
}: {
  active: HobbyCategory;
  onChange: (category: HobbyCategory) => void;
}) {
  return (
    <div className="flex gap-2">
      {categoryTabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              isActive ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function ProfileCard({ profile }: { profile: DiscoverProfile }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex gap-3 p-4">
        <Avatar src={profile.avatarUrl} name={profile.displayName} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <a
              href={`/profile/${profile.id}`}
              className="truncate font-bold text-foreground hover:underline"
            >
              {profile.displayName}
            </a>
            <span className="flex shrink-0 items-center gap-1 text-xs text-gray-text">
              <MapPin className="h-3 w-3" />
              {formatDistance(profile.distanceKm)}
            </span>
          </div>
          {profile.city && <p className="text-xs text-gray-text">{profile.city}</p>}
          <div className="mt-1.5 flex items-center gap-2">
            <RatingStars value={profile.avgRating} count={profile.ratingCount} />
            {profile.isPremium && <Badge variant="honey">⭐ Premium</Badge>}
          </div>
          {profile.bio && (
            <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{profile.bio}</p>
          )}
          {profile.sharedHobbies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.sharedHobbies.slice(0, 4).map((hobby) => (
                <Badge key={hobby.id} variant="neutral">
                  {hobby.icon} {hobby.name}
                </Badge>
              ))}
            </div>
          )}
          <form action={startConversationAction.bind(null, profile.id)} className="mt-3">
            <Button type="submit" size="sm" variant="outline">
              💬 Nachricht schreiben
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
