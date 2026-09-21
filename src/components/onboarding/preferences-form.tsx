"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  createCustomHobbyAction,
  savePreferencesAction,
  type PreferencesFormState,
} from "@/app/onboarding/preferences/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Hobby, HobbyCategory } from "@/types/database.types";

const FREE_LIMIT_PER_CATEGORY = 3;

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
  disabled,
  onToggle,
}: {
  hobby: Hobby;
  selected: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-brand-500 bg-brand-500 text-white"
          : disabled
            ? "cursor-not-allowed border-gray-mid bg-gray-50 text-gray-text opacity-60"
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
  isPremium,
  onToggle,
  onCreated,
}: {
  category: HobbyCategory;
  title: string;
  hint: string;
  placeholder: string;
  hobbies: Hobby[];
  selected: Set<string>;
  isPremium: boolean;
  onToggle: (id: string) => void;
  onCreated: (hobby: Hobby) => void;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedCount = hobbies.filter((h) => selected.has(h.id)).length;
  const atLimit = !isPremium && selectedCount >= FREE_LIMIT_PER_CATEGORY;

  function handleToggle(hobby: Hobby) {
    if (!selected.has(hobby.id) && atLimit) return;
    onToggle(hobby.id);
  }

  function submit() {
    if (atLimit) return;
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
            disabled={!selected.has(hobby.id) && atLimit}
            onToggle={() => handleToggle(hobby)}
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
          disabled={atLimit}
        />
        <Button
          type="button"
          variant="outline"
          onClick={submit}
          disabled={isPending || !draft.trim() || atLimit}
        >
          {isPending ? "…" : "Hinzufügen"}
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {!isPremium &&
        (atLimit ? (
          <p className="mt-2 text-xs text-brand-600">
            Kostenlos sind {FREE_LIMIT_PER_CATEGORY} {title}-Präferenzen möglich.{" "}
            <Link href="/premium" className="font-semibold underline underline-offset-2">
              Mit Premium unbegrenzt wählen →
            </Link>
          </p>
        ) : (
          <p className="mt-2 text-xs text-gray-text">
            {selectedCount}/{FREE_LIMIT_PER_CATEGORY} kostenlos ausgewählt
          </p>
        ))}
    </div>
  );
}

export function PreferencesForm({
  alltagHobbies,
  freizeitHobbies,
  isPremium,
  initialSelected,
}: {
  alltagHobbies: Hobby[];
  freizeitHobbies: Hobby[];
  isPremium: boolean;
  initialSelected: string[];
}) {
  const [state, formAction] = useActionState<PreferencesFormState, FormData>(
    savePreferencesAction,
    null
  );
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));
  const [alltagList, setAlltagList] = useState<Hobby[]>(alltagHobbies);
  const [hobbyList, setHobbyList] = useState<Hobby[]>(freizeitHobbies);

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
        isPremium={isPremium}
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
        isPremium={isPremium}
        onToggle={toggle}
        onCreated={(hobby) => addToList(setHobbyList, hobby)}
      />

      <p className="text-xs text-brand-500">{selected.size} ausgewählt</p>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
