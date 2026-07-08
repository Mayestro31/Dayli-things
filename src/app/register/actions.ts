"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { translateAuthError } from "@/lib/auth-errors";

export type RegisterFormState = { error?: string; checkEmail?: boolean } | null;

// Einfache Normalisierung auf E.164 für den deutschen Markt: "0170..." -> "+49170...".
// Nummern, die bereits mit "+" beginnen, werden unverändert übernommen.
function normalizePhone(raw: string): string | null {
  const trimmed = raw.replace(/[\s()-]/g, "");
  if (/^\+[1-9]\d{6,14}$/.test(trimmed)) {
    return trimmed;
  }
  if (/^0\d{6,14}$/.test(trimmed)) {
    return `+49${trimmed.slice(1)}`;
  }
  return null;
}

export async function registerAction(
  _prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  if (!firstName || !lastName || !email || !phoneRaw || !password || !passwordConfirm) {
    return { error: "Bitte alle Felder ausfüllen." };
  }

  if (firstName.length < 2 || lastName.length < 2) {
    return { error: "Vor- und Nachname müssen mindestens 2 Zeichen lang sein." };
  }

  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return { error: "Bitte gib eine gültige Handynummer ein, z. B. 0170 1234567." };
  }

  if (password.length < 6) {
    return { error: "Das Passwort muss mindestens 6 Zeichen lang sein." };
  }

  if (password !== passwordConfirm) {
    return { error: "Die Passwörter stimmen nicht überein." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        display_name: `${firstName} ${lastName[0]}.`,
        phone,
      },
    },
  });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  if (!data.session) {
    return { checkEmail: true };
  }

  redirect("/register/verify-phone");
}
