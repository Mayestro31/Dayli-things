import Link from "next/link";
import { Daysi } from "@/components/mascot/daysi";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Daysi size={40} />
          <span className="text-lg font-bold text-brand-700">DayliThings</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Anmelden
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Registrieren</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
