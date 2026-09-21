"use client";

import Link from "next/link";
import { Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PaywallModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Crown className="h-6 w-6" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-text hover:text-foreground"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <h2 className="mb-2 text-lg font-bold text-foreground">Mehr geht nur mit Premium</h2>
          <p className="mb-4 text-sm text-gray-text">
            Kostenlos sind 3 Präferenzen pro Bereich drin. Mit DayliThings Premium bekommst du:
          </p>
          <ul className="mb-5 space-y-2 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <span>✅</span> Alles aus der kostenlosen Version
            </li>
            <li className="flex items-center gap-2">
              <span>✅</span> Unbegrenzt viele Alltag- & Hobby-Präferenzen
            </li>
            <li className="flex items-center gap-2">
              <span>✅</span> Keine Werbung
            </li>
          </ul>
          <Link href="/premium">
            <Button size="lg" className="w-full">
              Premium ansehen
            </Button>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full text-center text-sm text-gray-text hover:underline"
          >
            Vielleicht später
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
