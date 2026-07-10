import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppNavbar } from "@/components/layout/app-navbar";
import { SiteFooter } from "@/components/layout/site-footer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, is_premium, onboarding_completed")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  if (!profile.onboarding_completed) {
    redirect("/onboarding/profile");
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-50/40">
      <AppNavbar profile={profile} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-20 pt-6 sm:px-6 sm:pb-6">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
