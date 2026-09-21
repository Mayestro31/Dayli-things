"use client";

import { useEffect, useState } from "react";
import { LocateFixed, Loader2, MapPin } from "lucide-react";
import { geocodeLocationAction, type GeocodeResult } from "@/app/(app)/discover/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LocationPicker({
  initialLat,
  initialLng,
  onChange,
}: {
  initialLat?: number | null;
  initialLng?: number | null;
  onChange: (lat: number, lng: number) => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    initialLat != null && initialLng != null ? "done" : "idle"
  );
  const [label, setLabel] = useState<string | null>(
    initialLat != null && initialLng != null
      ? `${initialLat.toFixed(3)}, ${initialLng.toFixed(3)}`
      : null
  );

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const trimmed = query.trim();
    const timer = setTimeout(async () => {
      if (trimmed.length < 3) {
        if (!cancelled) {
          setSuggestions([]);
          setIsSearching(false);
        }
        return;
      }
      setIsSearching(true);
      const result = await geocodeLocationAction(trimmed);
      if (cancelled) return;
      setIsSearching(false);
      setSuggestions("error" in result ? [] : result.results);
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLabel(`${lat.toFixed(3)}, ${lng.toFixed(3)}`);
        setStatus("done");
        onChange(lat, lng);
      },
      () => setStatus("error"),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  function selectPlace(place: GeocodeResult) {
    setQuery("");
    setSuggestions([]);
    setLabel(place.label.split(",")[0].trim());
    setStatus("done");
    onChange(place.lat, place.lng);
  }

  return (
    <div className="space-y-3 rounded-xl border border-dashed border-brand-300 bg-brand-50 p-3">
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 shrink-0 text-brand-500" />
        <div className="flex-1 text-sm text-brand-700">
          {status === "done" && label
            ? `Standort gesetzt (${label})`
            : status === "error"
              ? "Standort konnte nicht ermittelt werden. Gib deinen Ort unten manuell ein."
              : "Damit dich andere in deiner Nähe finden, teile deinen ungefähren Standort."}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={requestLocation}
          disabled={status === "loading"}
        >
          <LocateFixed className="h-4 w-4" />
          {status === "loading" ? "Ermittle…" : "Standort verwenden"}
        </Button>
      </div>

      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Oder Ort eingeben, z. B. Berlin"
        />
        {isSearching && (
          <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-500" />
        )}
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-mid bg-white shadow-lg">
            {suggestions.map((place, i) => (
              <button
                key={`${place.lat}-${place.lng}-${i}`}
                type="button"
                onClick={() => selectPlace(place)}
                className="block w-full px-3.5 py-2 text-left text-sm text-foreground hover:bg-brand-50"
              >
                {place.label}
              </button>
            ))}
          </div>
        )}
        {!isSearching && suggestions.length === 0 && query.trim().length >= 3 && (
          <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-mid bg-white px-3.5 py-2 text-sm text-gray-text shadow-lg">
            Keine Orte gefunden.
          </div>
        )}
      </div>
    </div>
  );
}
