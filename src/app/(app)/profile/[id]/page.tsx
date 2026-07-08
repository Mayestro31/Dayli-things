import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating-stars";
import { RatingForm } from "@/components/profile/rating-form";
import { Daysi } from "@/components/mascot/daysi";
import { startConversationAction } from "@/app/(app)/discover/actions";
import { Avatar } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (!profile) notFound();

  const [{ data: ratings }, { data: prefs }, { data: hobbies }] = await Promise.all([
    supabase
      .from("ratings")
      .select("id, rated_by_id, stars, comment, created_at")
      .eq("rated_user_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("profile_preferences").select("hobby_id").eq("profile_id", id),
    supabase.from("hobbies").select("*"),
  ]);

  const raterIds = (ratings ?? []).map((r) => r.rated_by_id);
  const { data: raters } = raterIds.length
    ? await supabase.from("profiles").select("id, display_name, avatar_url").in("id", raterIds)
    : { data: [] as { id: string; display_name: string; avatar_url: string | null }[] };
  const raterById = new Map((raters ?? []).map((r) => [r.id, r]));

  const hobbyById = new Map((hobbies ?? []).map((h) => [h.id, h]));
  const myHobbies = (prefs ?? [])
    .map((p) => hobbyById.get(p.hobby_id))
    .filter((h): h is NonNullable<typeof h> => !!h);

  const avgRating = ratings?.length
    ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
    : 0;

  const isOwn = user.id === id;
  const existingRating = ratings?.find((r) => r.rated_by_id === user.id);

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-6 text-white">
          <div className="flex items-center gap-4">
            <Avatar
              src={profile.avatar_url}
              name={profile.display_name}
              size={64}
              className="border-white/70 bg-white/20 text-xl text-white"
            />
            <div>
              <h1 className="text-xl font-extrabold">{profile.display_name}</h1>
              {profile.city && (
                <p className="mt-0.5 flex items-center gap-1 text-sm text-brand-50">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.city}
                </p>
              )}
              <div className="mt-1.5 flex items-center gap-2">
                {profile.is_premium && <Badge variant="honey">⭐ Premium</Badge>}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
            <RatingStars value={avgRating} size="md" />
            <div className="text-right">
              <p className="text-2xl font-extrabold text-brand-600">{avgRating.toFixed(1)}</p>
              <p className="text-xs text-gray-text">{ratings?.length ?? 0} Bewertungen</p>
            </div>
          </div>

          {profile.bio && <p className="text-sm leading-relaxed text-foreground">{profile.bio}</p>}

          {myHobbies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {myHobbies.map((hobby) => (
                <Badge key={hobby.id} variant="neutral">
                  {hobby.icon} {hobby.name}
                </Badge>
              ))}
            </div>
          )}

          {isOwn ? (
            <Link href="/onboarding/profile">
              <Button variant="outline" className="w-full">
                Profil bearbeiten
              </Button>
            </Link>
          ) : (
            <form action={startConversationAction.bind(null, profile.id)}>
              <Button type="submit" className="w-full">
                💬 Nachricht schreiben
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {!isOwn && (
        <Card>
          <CardContent className="p-5">
            <RatingForm
              ratedUserId={profile.id}
              ratedUserName={profile.display_name}
              existing={existingRating}
            />
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 text-lg font-bold text-foreground">
          Bewertungen ({ratings?.length ?? 0})
        </h2>
        {!ratings?.length ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <Daysi size={64} />
            <p className="text-sm text-gray-text">Noch keine Bewertungen vorhanden.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ratings.map((rating) => {
              const rater = raterById.get(rating.rated_by_id);
              return (
                <Card key={rating.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={rater?.avatar_url}
                          name={rater?.display_name ?? "?"}
                          size={32}
                          className="border-0 bg-brand-100 text-xs text-brand-700"
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {rater?.display_name ?? "Unbekannt"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-text">
                        {formatRelativeTime(rating.created_at)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <RatingStars value={rating.stars} />
                    </div>
                    {rating.comment && (
                      <p className="mt-2 text-sm text-foreground/80">{rating.comment}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
