"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { registerAction, type RegisterFormState } from "@/app/register/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Daysi } from "@/components/mascot/daysi";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Konto wird erstellt…" : "Konto erstellen"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState<RegisterFormState, FormData>(registerAction, null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const passwordsMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;

  if (state?.checkEmail) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <Daysi size={112} />
        <h2 className="text-xl font-semibold text-brand-900">Fast geschafft!</h2>
        <p className="text-sm text-brand-700">
          Wir haben dir eine Bestätigungs-E-Mail geschickt. Klicke auf den Link darin, um dein
          Konto zu aktivieren.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="firstName">Vorname</Label>
          <Input id="firstName" name="firstName" required minLength={2} placeholder="Maria" />
        </div>
        <div>
          <Label htmlFor="lastName">Nachname</Label>
          <Input id="lastName" name="lastName" required minLength={2} placeholder="Schmidt" />
        </div>
      </div>
      <div>
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="du@beispiel.de" />
      </div>
      <div>
        <Label htmlFor="phone">Handynummer</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="0170 1234567"
        />
        <p className="mt-1 text-xs text-brand-500">Zum Verifizieren per SMS-Code.</p>
      </div>
      <div>
        <Label htmlFor="password">Passwort</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mindestens 6 Zeichen"
        />
      </div>
      <div>
        <Label htmlFor="passwordConfirm">Passwort wiederholen</Label>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Passwort bestätigen"
        />
        {passwordsMismatch && (
          <p className="mt-1 text-xs text-red-600">Die Passwörter stimmen nicht überein.</p>
        )}
      </div>
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      <SubmitButton />
      <p className="text-center text-sm text-brand-700">
        Schon dabei?{" "}
        <Link href="/login" className="font-semibold underline underline-offset-2">
          Zum Login
        </Link>
      </p>
    </form>
  );
}
