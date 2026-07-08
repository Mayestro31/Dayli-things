import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { OnboardingSteps } from "@/components/onboarding/onboarding-steps";
import { PreferencesForm } from "@/components/onboarding/preferences-form";

export default async function OnboardingPreferencesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: hobbies }, { data: existing }] = await Promise.all([
    supabase.from("hobbies").select("*").order("name"),
    supabase.from("profile_preferences").select("hobby_id").eq("profile_id", user.id),
  ]);

  const alltagHobbies = (hobbies ?? []).filter((h) => h.category === "alltag");
  const freizeitHobbies = (hobbies ?? []).filter((h) => h.category === "hobby");
  const sonstigeHobbies = (hobbies ?? []).filter((h) => h.category === "sonstige");
  const initialSelected = (existing ?? []).map((row) => row.hobby_id);

  return (
    <AuthShell
      title="Alltag & Hobbys 🏡"
      bubble="Was kannst du anbieten oder wobei brauchst du Hilfe? Wähle so viele Punkte wie du möchtest."
    >
      <OnboardingSteps step={2} />
      <PreferencesForm
        alltagHobbies={alltagHobbies}
        freizeitHobbies={freizeitHobbies}
        sonstigeHobbies={sonstigeHobbies}
        initialSelected={initialSelected}
      />
    </AuthShell>
  );
}
