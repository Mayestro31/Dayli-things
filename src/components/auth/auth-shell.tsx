import Link from "next/link";
import { DaysiBubble } from "@/components/mascot/daysi";
import { Card, CardContent } from "@/components/ui/card";
import { SiteFooter } from "@/components/layout/site-footer";

export function AuthShell({
  title,
  bubble,
  children,
}: {
  title: string;
  bubble: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 to-white">
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-5 flex items-center justify-center gap-2">
            <span className="text-xl font-black text-foreground">
              Dayli<span className="text-brand-500">Things</span>
            </span>
          </Link>
          <DaysiBubble text={bubble} />
          <Card className="mt-5">
            <CardContent className="p-6 sm:p-8">
              <h1 className="mb-6 text-center text-xl font-extrabold text-foreground">{title}</h1>
              {children}
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
