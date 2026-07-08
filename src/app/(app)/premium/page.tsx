import { createClient } from "@/lib/supabase/server";
import { Daysi } from "@/components/mascot/daysi";
import { Card, CardContent } from "@/components/ui/card";
import { PremiumPlans } from "@/components/premium/premium-plans";

const perks = [
  { icon: "🏷️", title: "Unbegrenzte Präferenzen", desc: "Wähle so viele Alltag- & Hobby-Tags wie du willst." },
  { icon: "🔍", title: "Erweiterte Suche", desc: "Filter nach Bewertung, Entfernung und mehr." },
  { icon: "📣", title: "Top-Platzierung", desc: "Dein Profil erscheint ganz oben in den Ergebnissen." },
  { icon: "💬", title: "Unbegrenzte Chats", desc: "Schreib so vielen Daysi's wie du möchtest." },
  { icon: "⭐", title: "Premium-Badge", desc: "Zeig, dass du ein echtes Community-Mitglied bist." },
];

export default async function PremiumPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_premium, premium_plan")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-8 text-center text-white">
          <Daysi size={72} />
          <h1 className="text-2xl font-extrabold">DayliThings Premium ⭐</h1>
          <p className="text-sm text-brand-50">Hol das Beste aus deiner Community raus.</p>
        </div>
        <CardContent className="space-y-5 p-5">
          <div className="space-y-4">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">
                  {perk.icon}
                </div>
                <div>
                  <p className="font-bold text-foreground">{perk.title}</p>
                  <p className="text-sm text-gray-text">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <PremiumPlans
            isPremium={profile?.is_premium ?? false}
            currentPlan={profile?.premium_plan}
          />
        </CardContent>
      </Card>
    </div>
  );
}
