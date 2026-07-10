import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-100 bg-white py-6 text-center text-sm text-brand-500">
      <p>© {new Date().getFullYear()} DayliThings – mit 🧡 von Daysi</p>
      <nav className="mt-2 flex items-center justify-center gap-4">
        <Link href="/impressum" className="hover:text-brand-700 hover:underline">
          Impressum
        </Link>
        <Link href="/datenschutz" className="hover:text-brand-700 hover:underline">
          Datenschutz
        </Link>
      </nav>
    </footer>
  );
}
