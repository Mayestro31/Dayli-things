"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveProfileAction, type ProfileFormState } from "@/app/onboarding/profile/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { AvatarUpload } from "@/components/onboarding/avatar-upload";
import { LocationPicker } from "@/components/onboarding/location-picker";
import type { Profile } from "@/types/database.types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Speichern…" : "Weiter zu Präferenzen"}
    </Button>
  );
}

export function ProfileForm({ userId, profile }: { userId: string; profile: Profile }) {
  const [state, formAction] = useActionState<ProfileFormState, FormData>(saveProfileAction, null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [coords, setCoords] = useState({
    lat: profile.lat ?? null,
    lng: profile.lng ?? null,
  });

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="avatarUrl" value={avatarUrl} />
      <input type="hidden" name="lat" value={coords.lat ?? ""} />
      <input type="hidden" name="lng" value={coords.lng ?? ""} />

      <AvatarUpload
        userId={userId}
        displayName={profile.display_name}
        initialUrl={profile.avatar_url}
        onUploaded={setAvatarUrl}
      />

      <div>
        <Label htmlFor="displayName">Name</Label>
        <Input
          id="displayName"
          name="displayName"
          required
          minLength={2}
          defaultValue={profile.display_name}
        />
      </div>

      <div>
        <Label htmlFor="bio">Über mich</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          maxLength={500}
          defaultValue={profile.bio ?? ""}
          placeholder="Erzähl kurz, wer du bist und was du dir von DayliThings wünschst…"
        />
      </div>

      <div>
        <Label htmlFor="city">Stadt</Label>
        <Input id="city" name="city" defaultValue={profile.city ?? ""} placeholder="z. B. Berlin" />
      </div>

      <LocationPicker
        initialLat={profile.lat}
        initialLng={profile.lng}
        onChange={(lat, lng) => setCoords({ lat, lng })}
      />

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
