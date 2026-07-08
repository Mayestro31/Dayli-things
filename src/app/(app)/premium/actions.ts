"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/server";
import type { PremiumPlan } from "@/types/database.types";

export async function upgradeToPremiumAction(formData: FormData) {
  const { supabase, user } = await requireUser();

  const planRaw = String(formData.get("plan") ?? "");
  const plan: PremiumPlan = planRaw === "monthly" ? "monthly" : "yearly";

  await supabase
    .from("profiles")
    .update({ is_premium: true, premium_since: new Date().toISOString(), premium_plan: plan })
    .eq("id", user.id);

  revalidatePath("/premium");
}

export async function cancelPremiumAction() {
  const { supabase, user } = await requireUser();

  await supabase
    .from("profiles")
    .update({ is_premium: false, premium_since: null, premium_plan: null })
    .eq("id", user.id);

  revalidatePath("/premium");
}
