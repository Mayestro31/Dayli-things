"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import {
  createListingAction,
  type ListingFormState,
} from "@/app/(app)/discover/actions";
import { createCustomHobbyAction } from "@/app/onboarding/preferences/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Hobby, HobbyCategory } from "@/types/database.types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Wird veröffentlicht…" : "Inserat veröffentlichen"}
    </Button>
  );
}

export function CreateListingForm({
  category,
  hobbies,
  defaultCity,
}: {
  category: HobbyCategory;
  hobbies: Hobby[];
  defaultCity: string | null;
}) {
  const [state, formAction] = useActionState<ListingFormState, FormData>(createListingAction, null);
  const [allHobbies, setAllHobbies] = useState(hobbies);
  const [selectedHobby, setSelectedHobby] = useState<string>("");
  const [customDraft, setCustomDraft] = useState("");
  const [customError, setCustomError] = useState("");
  const [isPending, startTransition] = useTransition();

  function addCustomHobby() {
    const name = customDraft.trim();
    if (!name) return;
    setCustomError("");
    startTransition(async () => {
      const result = await createCustomHobbyAction(category, name);
      if (result.error) {
        setCustomError(result.error);
        return;
      }
      if (result.hobby) {
        setAllHobbies((prev) => (prev.some((h) => h.id === result.hobby!.id) ? prev : [...prev, result.hobby!]));
        setSelectedHobby(result.hobby.id);
        setCustomDraft("");
      }
    });
  }

  if (state?.success) {
    return (
      <p className="rounded-lg bg-success-pale px-4 py-3 text-sm font-semibold text-success">
        Dein Inserat ist online! Andere Daysi&apos;s in der Nähe können es jetzt in „Suchen&rdquo;
        finden. 🌼
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="hobbyId" value={selectedHobby} />
      <div>
        <Label htmlFor="title">Titel</Label>
        <Input
          id="title"
          name="title"
          required
          maxLength={140}
          placeholder="z. B. Suche Mittwoch einen vierten Mann zum Padel spielen"
        />
      </div>

      <div>
        <Label htmlFor="description">Details (optional)</Label>
        <Textarea id="description" name="description" rows={3} maxLength={1000} placeholder="Weitere Infos…" />
      </div>

      <div>
        <Label htmlFor="city">Ort</Label>
        <Input id="city" name="city" required defaultValue={defaultCity ?? ""} placeholder="z. B. Koblenz" />
      </div>

      <div>
        <Label htmlFor="eventAt">Wann (optional)</Label>
        <Input id="eventAt" name="eventAt" type="datetime-local" />
      </div>

      <div>
        <Label>Passendes Stichwort (optional)</Label>
        <div className="flex flex-wrap gap-2">
          {allHobbies.map((hobby) => {
            const active = selectedHobby === hobby.id;
            return (
              <button
                key={hobby.id}
                type="button"
                onClick={() => setSelectedHobby(active ? "" : hobby.id)}
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
        <div className="mt-2 flex gap-2">
          <Input
            value={customDraft}
            onChange={(e) => setCustomDraft(e.target.value)}
            placeholder="Eigenes Stichwort, z. B. Padel"
            maxLength={40}
            className="h-9 text-sm"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCustomHobby}
            disabled={isPending || !customDraft.trim()}
          >
            {isPending ? "…" : "Hinzufügen"}
          </Button>
        </div>
        {customError && <p className="mt-1 text-xs text-red-600">{customError}</p>}
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
