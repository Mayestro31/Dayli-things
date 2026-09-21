"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/server";
import type { Hobby, HobbyCategory } from "@/types/database.types";

export type PreferencesFormState = { error?: string } | null;

export async function createCustomHobbyAction(
  category: HobbyCategory,
  name: string
): Promise<{ hobby?: Hobby; error?: string }> {
  const { supabase } = await requireUser();

  const trimmed = name.trim();
  if (!trimmed) {
    return { error: "Bitte gib einen Namen ein." };
  }
  if (trimmed.length > 40) {
    return { error: "Bitte kürzer als 40 Zeichen." };
  }

  const { data: existing } = await supabase
    .from("hobbies")
    .select("*")
    .ilike("name", trimmed)
    .maybeSingle();

  if (existing) {
    return { hobby: existing };
  }

  const { data: created, error } = await supabase
    .from("hobbies")
    .insert({ name: trimmed, category, icon: "🏷️" })
    .select("*")
    .single();

  if (error || !created) {
    return { error: error?.message ?? "Konnte nicht angelegt werden." };
  }

  return { hobby: created };
}

export async function savePreferencesAction(
  _prevState: PreferencesFormState,
  formData: FormData
): Promise<PreferencesFormState> {
  const { supabase, user } = await requireUser();

  const hobbyIds = formData.getAll("hobbyIds").map(String);

  if (hobbyIds.length === 0) {
    return { error: "Bitte wähle mindestens eine Präferenz aus." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_premium")
    .eq("id", user.id)
    .single();

  if (!profile?.is_premium) {
    const { data: chosenHobbies } = await supabase
      .from("hobbies")
      .select("id, category")
      .in("id", hobbyIds);

    const counts = { alltag: 0, hobby: 0 };
    for (const hobby of chosenHobbies ?? []) {
      counts[hobby.category as "alltag" | "hobby"]++;
    }

    if (counts.alltag > 3 || counts.hobby > 3) {
      return {
        error:
          "Kostenlos sind maximal 3 Alltag- und 3 Hobby-Präferenzen möglich. Für mehr brauchst du DayliThings Premium.",
      };
    }
  }

  const { error: deleteError } = await supabase
    .from("profile_preferences")
    .delete()
    .eq("profile_id", user.id);

  if (deleteError) {
    return { error: deleteError.message };
  }

  const { error: insertError } = await supabase
    .from("profile_preferences")
    .insert(hobbyIds.map((hobby_id) => ({ profile_id: user.id, hobby_id })));

  if (insertError) {
    return { error: insertError.message };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", user.id);

  if (profileError) {
    return { error: profileError.message };
  }

  redirect("/discover");
}
