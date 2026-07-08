export function translateAuthError(message: string): string {
  const known: Record<string, string> = {
    "Invalid login credentials": "E-Mail oder Passwort ist falsch.",
    "User already registered": "Für diese E-Mail existiert bereits ein Konto.",
    "Email not confirmed": "Bitte bestätige zuerst deine E-Mail-Adresse.",
    "Password should be at least 6 characters": "Das Passwort muss mindestens 6 Zeichen lang sein.",
    "Unable to validate phone number: invalid format": "Bitte gib eine gültige Handynummer ein.",
    "Phone provider is disabled": "SMS-Verifizierung ist aktuell nicht eingerichtet.",
    "Token has expired or is invalid": "Der Code ist abgelaufen oder ungültig. Bitte fordere einen neuen an.",
    "Phone number already registered by another user": "Diese Handynummer wird bereits von einem anderen Konto verwendet.",
    "SMS provider error: probably wrong configuration": "SMS-Versand ist aktuell nicht verfügbar. Bitte versuch es später erneut.",
  };
  return known[message] ?? message;
}
