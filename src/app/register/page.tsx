import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell title="Registrieren" bubble="Willkommen! Ich bin Daysi 🌼 Gleich bist du dabei!">
      <RegisterForm />
    </AuthShell>
  );
}
