"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/server";

export type ProfileFormState = { error?: string } | null;

export async function saveProfileAction(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const { supabase, user } = await requireUser();

  const displayName = String(formData.get("displayName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const latRaw = formData.get("lat");
  const lngRaw = formData.get("lng");

  if (displayName.length < 2) {
    return { error: "Der Name muss mindestens 2 Zeichen lang sein." };
  }

  const { data: updated, error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      bio: bio || null,
      city: city || null,
      avatar_url: avatarUrl || null,
      lat: latRaw ? Number(latRaw) : null,
      lng: lngRaw ? Number(lngRaw) : null,
    })
    .eq("id", user.id)
    .select("onboarding_completed")
    .single();

  if (error) {
    return { error: error.message };
  }

  redirect(updated.onboarding_completed ? "/discover" : "/onboarding/preferences");
}
