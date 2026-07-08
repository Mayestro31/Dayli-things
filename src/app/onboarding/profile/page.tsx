import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { OnboardingSteps } from "@/components/onboarding/onboarding-steps";
import { ProfileForm } from "@/components/onboarding/profile-form";

export default async function OnboardingProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  return (
    <AuthShell title="Dein Profil 👋" bubble="Lass uns dein Profil einrichten! Wie sollen andere Daysi's dich kennenlernen?">
      <OnboardingSteps step={1} />
      <ProfileForm userId={user.id} profile={profile} />
    </AuthShell>
  );
}
