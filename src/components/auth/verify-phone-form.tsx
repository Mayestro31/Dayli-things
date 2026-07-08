"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  sendPhoneCodeAction,
  skipPhoneVerificationAction,
  verifyPhoneCodeAction,
  type SendCodeState,
  type VerifyCodeState,
} from "@/app/register/verify-phone/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

function SendButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Wird gesendet…" : label}
    </Button>
  );
}

function VerifyButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Wird geprüft…" : "Bestätigen ✓"}
    </Button>
  );
}

export function VerifyPhoneForm({ phone }: { phone: string }) {
  const [sendState, sendAction] = useActionState<SendCodeState, FormData>(
    sendPhoneCodeAction,
    null
  );
  const verifyWithPhone = verifyPhoneCodeAction.bind(null, phone);
  const [verifyState, verifyAction] = useActionState<VerifyCodeState, FormData>(
    verifyWithPhone,
    null
  );

  const codeSent = Boolean(sendState?.sent);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-brand-50 px-4 py-3 text-center">
        <p className="text-xs text-brand-500">Handynummer</p>
        <p className="font-semibold text-brand-900">{phone}</p>
      </div>

      {!codeSent ? (
        <form action={sendAction} className="space-y-4">
          <input type="hidden" name="phone" value={phone} />
          {sendState?.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{sendState.error}</p>
          )}
          <SendButton label="SMS-Code senden" />
        </form>
      ) : (
        <>
          <p className="rounded-lg bg-success-pale px-3 py-2 text-center text-sm text-success">
            Code wurde an {phone} gesendet.
          </p>
          <form action={verifyAction} className="space-y-4">
            <div>
              <Label htmlFor="code">6-stelliger Code</Label>
              <Input id="code" name="code" inputMode="numeric" maxLength={8} placeholder="z. B. 123456" />
            </div>
            {verifyState?.error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{verifyState.error}</p>
            )}
            <VerifyButton />
          </form>
          <form action={sendAction}>
            <input type="hidden" name="phone" value={phone} />
            <button type="submit" className="w-full text-center text-sm font-semibold text-brand-600 hover:underline">
              Code erneut senden
            </button>
          </form>
        </>
      )}

      <form action={skipPhoneVerificationAction}>
        <button
          type="submit"
          className="w-full text-center text-sm text-gray-text hover:underline"
        >
          Später verifizieren
        </button>
      </form>
    </div>
  );
}
