"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { deactivateListingAction, startConversationAction } from "@/app/(app)/discover/actions";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistance } from "@/lib/utils";
import type { Hobby } from "@/types/database.types";

function formatEventAt(eventAt: string | null) {
  if (!eventAt) return null;
  return new Date(eventAt).toLocaleString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export type ListingCardData = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string | null;
  hobby: Hobby | null;
  title: string;
  description: string | null;
  city: string;
  eventAt: string | null;
  distanceKm: number;
};

export function ListingCard({ listing }: { listing: ListingCardData }) {
  const eventLabel = formatEventAt(listing.eventAt);
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex gap-3 p-4">
        <Avatar src={listing.authorAvatarUrl} name={listing.authorName} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold text-foreground">{listing.title}</p>
            <span className="flex shrink-0 items-center gap-1 text-xs text-gray-text">
              <MapPin className="h-3 w-3" />
              {formatDistance(listing.distanceKm)}
            </span>
          </div>
          <p className="text-xs text-gray-text">
            von{" "}
            <a href={`/profile/${listing.authorId}`} className="font-medium hover:underline">
              {listing.authorName}
            </a>{" "}
            · {listing.city}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {listing.hobby && (
              <Badge variant="neutral">
                {listing.hobby.icon} {listing.hobby.name}
              </Badge>
            )}
            {eventLabel && (
              <Badge variant="outline">
                <CalendarDays className="h-3 w-3" />
                {eventLabel}
              </Badge>
            )}
          </div>
          {listing.description && (
            <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{listing.description}</p>
          )}
          <form action={startConversationAction.bind(null, listing.authorId)} className="mt-3">
            <Button type="submit" size="sm" variant="outline">
              💬 Nachricht schreiben
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export type MyListingData = {
  id: string;
  hobby: Hobby | null;
  title: string;
  description: string | null;
  city: string;
  eventAt: string | null;
  isActive: boolean;
};

export function MyListingCard({ listing }: { listing: MyListingData }) {
  const eventLabel = formatEventAt(listing.eventAt);
  return (
    <Card className={listing.isActive ? undefined : "opacity-60"}>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="font-bold text-foreground">{listing.title}</p>
          <p className="text-xs text-gray-text">{listing.city}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {listing.hobby && (
              <Badge variant="neutral">
                {listing.hobby.icon} {listing.hobby.name}
              </Badge>
            )}
            {eventLabel && (
              <Badge variant="outline">
                <CalendarDays className="h-3 w-3" />
                {eventLabel}
              </Badge>
            )}
            {!listing.isActive && <Badge variant="neutral">Deaktiviert</Badge>}
          </div>
          {listing.description && (
            <p className="mt-2 text-sm text-foreground/80">{listing.description}</p>
          )}
        </div>
        {listing.isActive && (
          <form action={deactivateListingAction.bind(null, listing.id)}>
            <Button type="submit" size="sm" variant="outline">
              Deaktivieren
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
