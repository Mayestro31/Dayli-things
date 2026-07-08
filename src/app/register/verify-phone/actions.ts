"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/server";
import { translateAuthError } from "@/lib/auth-errors";

export type SendCodeState = { error?: string; sent?: boolean } | null;
export type VerifyCodeState = { error?: string } | null;

export async function sendPhoneCodeAction(
  _prevState: SendCodeState,
  formData: FormData
): Promise<SendCodeState> {
  const { supabase } = await requireUser();

  const phone = String(formData.get("phone") ?? "").trim();
  if (!phone) {
    return { error: "Keine Handynummer hinterlegt." };
  }

  const { error } = await supabase.auth.updateUser({ phone });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  return { sent: true };
}

export async function verifyPhoneCodeAction(
  phone: string,
  _prevState: VerifyCodeState,
  formData: FormData
): Promise<VerifyCodeState> {
  const { supabase } = await requireUser();

  const code = String(formData.get("code") ?? "").trim();
  if (code.length < 4) {
    return { error: "Bitte gib den vollständigen Code ein." };
  }

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token: code,
    type: "phone_change",
  });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  redirect("/onboarding/profile");
}

export async function skipPhoneVerificationAction() {
  await requireUser();
  redirect("/onboarding/profile");
}
