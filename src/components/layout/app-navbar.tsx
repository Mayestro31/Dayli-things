"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Crown, LogOut, MessageCircle } from "lucide-react";
import { logoutAction } from "@/app/actions";
import { Daysi } from "@/components/mascot/daysi";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/discover", label: "Entdecken", icon: Compass },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/premium", label: "Premium", icon: Crown },
];

export function AppNavbar({
  profile,
}: {
  profile: { id: string; display_name: string; avatar_url: string | null; is_premium: boolean };
}) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6">
          <Link href="/discover" className="flex items-center gap-2">
            <Daysi size={36} />
            <span className="hidden text-lg font-bold text-brand-700 sm:inline">DayliThings</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "bg-brand-500 text-white" : "text-brand-700 hover:bg-brand-50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${profile.id}`}
              className="flex items-center gap-2 rounded-full border border-brand-200 py-1 pl-1 pr-3 hover:bg-brand-50"
            >
              <Avatar
                src={profile.avatar_url}
                name={profile.display_name}
                size={28}
                className="border-0 bg-brand-100 text-xs text-brand-600"
              />
              <span className="hidden text-sm font-medium text-brand-800 sm:inline">
                {profile.display_name}
              </span>
              {profile.is_premium && <Crown className="h-3.5 w-3.5 text-honey" />}
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-500 hover:bg-brand-50"
                title="Abmelden"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-brand-100 bg-white/95 backdrop-blur sm:hidden">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium",
                active ? "text-brand-600" : "text-brand-400"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
