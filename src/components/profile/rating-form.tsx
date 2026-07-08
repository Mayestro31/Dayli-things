"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitRatingAction, type RatingFormState } from "@/app/(app)/profile/[id]/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { StarInput } from "@/components/ui/star-input";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Wird gesendet…" : "Bewertung absenden"}
    </Button>
  );
}

export function RatingForm({
  ratedUserId,
  ratedUserName,
  existing,
}: {
  ratedUserId: string;
  ratedUserName: string;
  existing?: { stars: number; comment: string | null } | null;
}) {
  const action = submitRatingAction.bind(null, ratedUserId);
  const [state, formAction] = useActionState<RatingFormState, FormData>(action, null);

  return (
    <form action={formAction} className="space-y-3">
      <p className="text-sm font-semibold text-foreground">
        Wie war deine Erfahrung mit {ratedUserName}?
      </p>
      <StarInput name="stars" defaultValue={existing?.stars ?? 0} />
      <Textarea
        name="comment"
        rows={2}
        maxLength={300}
        defaultValue={existing?.comment ?? ""}
        placeholder="Schreib einen Kommentar (optional)…"
      />
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-success-pale px-3 py-2 text-sm text-success">
          Danke für deine Bewertung! 🌼
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
