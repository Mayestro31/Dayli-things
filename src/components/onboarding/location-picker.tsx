"use client";

import { useState } from "react";
import { LocateFixed, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    initialLat != null && initialLng != null ? { lat: initialLat, lng: initialLng } : null
  );

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
        setCoords({ lat, lng });
        setStatus("done");
        onChange(lat, lng);
      },
      () => setStatus("error"),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-brand-300 bg-brand-50 p-3">
      <MapPin className="h-5 w-5 shrink-0 text-brand-500" />
      <div className="flex-1 text-sm text-brand-700">
        {status === "done" && coords
          ? `Standort gesetzt (${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)})`
          : status === "error"
            ? "Standort konnte nicht ermittelt werden. Du kannst die Stadt trotzdem manuell angeben."
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
  );
}
