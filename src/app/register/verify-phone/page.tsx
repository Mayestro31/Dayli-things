import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyPhoneForm } from "@/components/auth/verify-phone-form";

export default async function VerifyPhonePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("phone, phone_verified")
    .eq("id", user.id)
    .single();

  if (!profile?.phone || profile.phone_verified) {
    redirect("/onboarding/profile");
  }

  return (
    <AuthShell
      title="Telefon verifizieren 📱"
      bubble="Für deine Sicherheit verifizieren wir deine Handynummer. Wir senden dir einen 6-stelligen Code per SMS."
    >
      <VerifyPhoneForm phone={profile.phone} />
    </AuthShell>
  );
}
