"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { startConversationAction } from "@/app/(app)/discover/actions";
import { daysiSearchAction } from "@/app/(app)/discover/daysi-actions";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RatingStars } from "@/components/ui/rating-stars";
import { Daysi } from "@/components/mascot/daysi";
import { formatDistance } from "@/lib/utils";
import type { DiscoverProfile } from "./discover-explorer";

type ChatMessage =
  | { role: "user"; text: string }
  | { role: "daysi"; text: string; profiles?: DiscoverProfile[] };

const EXAMPLE =
  "Ich suche für meine Mutter in der Nähe von Köln Hilfe beim Einkaufen und im Garten.";

export function DaysiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "daysi",
      text: `Hallo! Ich bin Daysi 🌼 Beschreib mir einfach, wonach oder für wen du suchst, z. B.: „${EXAMPLE}"`,
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isPending]);

  function send() {
    const text = draft.trim();
    if (!text || isPending) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setDraft("");
    startTransition(async () => {
      const result = await daysiSearchAction(text);
      setMessages((prev) => [...prev, { role: "daysi", text: result.reply, profiles: result.profiles }]);
    });
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2.5 bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-white">
        <Daysi size={36} />
        <div>
          <p className="font-bold leading-tight">Frag Daysi</p>
          <p className="text-xs text-brand-50">Beschreib in eigenen Worten, wonach du suchst</p>
        </div>
      </div>

      <div ref={scrollRef} className="max-h-[420px] space-y-3 overflow-y-auto p-4">
        {messages.map((message, i) =>
          message.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-500 px-3.5 py-2 text-sm text-white">
                {message.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex max-w-[92%] gap-2">
              <Daysi size={28} />
              <div className="min-w-0 space-y-2">
                <div className="rounded-2xl rounded-bl-md border border-gray-mid bg-white px-3.5 py-2 text-sm text-foreground">
                  {message.text}
                </div>
                {message.profiles && message.profiles.length > 0 && (
                  <div className="space-y-2">
                    {message.profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="flex items-center gap-2.5 rounded-xl border border-gray-mid bg-white p-2.5"
                      >
                        <Avatar src={profile.avatarUrl} name={profile.displayName} size={36} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <a
                              href={`/profile/${profile.id}`}
                              className="truncate text-sm font-semibold text-foreground hover:underline"
                            >
                              {profile.displayName}
                            </a>
                            <span className="shrink-0 text-xs text-gray-text">
                              {formatDistance(profile.distanceKm)}
                            </span>
                          </div>
                          <RatingStars value={profile.avgRating} count={profile.ratingCount} />
                        </div>
                        <form action={startConversationAction.bind(null, profile.id)}>
                          <Button type="submit" size="sm" variant="outline">
                            💬
                          </Button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
        {isPending && (
          <div className="flex items-center gap-2 text-sm text-gray-text">
            <Daysi size={28} />
            Daysi durchsucht die Profile…
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 border-t border-brand-100 p-3"
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="z. B. Ich suche Hilfe beim Einkaufen in der Nähe von Köln…"
          className="flex-1"
        />
        <Button type="submit" disabled={!draft.trim() || isPending}>
          Senden
        </Button>
      </form>
    </Card>
  );
}
