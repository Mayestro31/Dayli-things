import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <AuthShell title="Anmelden" bubble="Schön, dass du wieder da bist! 🌼">
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
