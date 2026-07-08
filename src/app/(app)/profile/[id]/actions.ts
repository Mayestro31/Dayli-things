"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/server";

export type RatingFormState = { error?: string; success?: boolean } | null;

export async function submitRatingAction(
  ratedUserId: string,
  _prevState: RatingFormState,
  formData: FormData
): Promise<RatingFormState> {
  const { supabase, user } = await requireUser();

  if (user.id === ratedUserId) {
    return { error: "Du kannst dich nicht selbst bewerten." };
  }

  const stars = Number(formData.get("stars"));
  const comment = String(formData.get("comment") ?? "").trim();

  if (!stars || stars < 1 || stars > 5) {
    return { error: "Bitte wähle eine Sternebewertung." };
  }

  const { error } = await supabase.from("ratings").upsert(
    {
      rated_user_id: ratedUserId,
      rated_by_id: user.id,
      stars,
      comment: comment || null,
    },
    { onConflict: "rated_user_id,rated_by_id" }
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/profile/${ratedUserId}`);
  return { success: true };
}
