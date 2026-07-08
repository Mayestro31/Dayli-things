"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import {
  createCustomHobbyAction,
  savePreferencesAction,
  type PreferencesFormState,
} from "@/app/onboarding/preferences/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Hobby, HobbyCategory } from "@/types/database.types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Speichern…" : "Zu DayliThings"}
    </Button>
  );
}

function HobbyChip({
  hobby,
  selected,
  onToggle,
}: {
  hobby: Hobby;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
      )}
    >
      <span>{hobby.icon}</span>
      {hobby.name}
    </button>
  );
}

function HobbyCategorySection({
  category,
  title,
  hint,
  placeholder,
  hobbies,
  selected,
  onToggle,
  onCreated,
}: {
  category: HobbyCategory;
  title: string;
  hint: string;
  placeholder: string;
  hobbies: Hobby[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onCreated: (hobby: Hobby) => void;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit() {
    const name = draft.trim();
    if (!name) return;
    setError("");
    startTransition(async () => {
      const result = await createCustomHobbyAction(category, name);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.hobby) {
        onCreated(result.hobby);
        setDraft("");
      }
    });
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-brand-900">{title}</h3>
      <p className="mb-2 text-xs text-brand-500">{hint}</p>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby) => (
          <HobbyChip
            key={hobby.id}
            hobby={hobby}
            selected={selected.has(hobby.id)}
            onToggle={() => onToggle(hobby.id)}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          maxLength={40}
          className="h-10"
        />
        <Button type="button" variant="outline" onClick={submit} disabled={isPending || !draft.trim()}>
          {isPending ? "…" : "Hinzufügen"}
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function PreferencesForm({
  alltagHobbies,
  freizeitHobbies,
  sonstigeHobbies,
  initialSelected,
}: {
  alltagHobbies: Hobby[];
  freizeitHobbies: Hobby[];
  sonstigeHobbies: Hobby[];
  initialSelected: string[];
}) {
  const [state, formAction] = useActionState<PreferencesFormState, FormData>(
    savePreferencesAction,
    null
  );
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));
  const [alltagList, setAlltagList] = useState<Hobby[]>(alltagHobbies);
  const [hobbyList, setHobbyList] = useState<Hobby[]>(freizeitHobbies);
  const [sonstigeList, setSonstigeList] = useState<Hobby[]>(sonstigeHobbies);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function addToList(setList: (updater: (prev: Hobby[]) => Hobby[]) => void, hobby: Hobby) {
    setList((prev) => (prev.some((h) => h.id === hobby.id) ? prev : [...prev, hobby]));
    setSelected((prev) => new Set(prev).add(hobby.id));
  }

  return (
    <form action={formAction} className="space-y-6">
      {[...selected].map((id) => (
        <input key={id} type="hidden" name="hobbyIds" value={id} />
      ))}

      <HobbyCategorySection
        category="alltag"
        title="Alltag"
        hint="Nicht dabei? Trag deine eigene Alltagshilfe ein."
        placeholder="Eigene Alltagshilfe, z. B. Fenster putzen"
        hobbies={alltagList}
        selected={selected}
        onToggle={toggle}
        onCreated={(hobby) => addToList(setAlltagList, hobby)}
      />

      <HobbyCategorySection
        category="hobby"
        title="Hobbys"
        hint="Nicht dabei? Trag dein eigenes Hobby ein."
        placeholder="Eigenes Hobby, z. B. Klettern"
        hobbies={hobbyList}
        selected={selected}
        onToggle={toggle}
        onCreated={(hobby) => addToList(setHobbyList, hobby)}
      />

      <HobbyCategorySection
        category="sonstige"
        title="Sonstige"
        hint="Passt in keine der beiden Kategorien? Trag es hier ein."
        placeholder="Eigenes Stichwort, z. B. Angeln"
        hobbies={sonstigeList}
        selected={selected}
        onToggle={toggle}
        onCreated={(hobby) => addToList(setSonstigeList, hobby)}
      />

      <p className="text-xs text-brand-500">{selected.size} ausgewählt</p>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
