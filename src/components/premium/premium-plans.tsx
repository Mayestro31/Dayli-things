"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { upgradeToPremiumAction, cancelPremiumAction } from "@/app/(app)/premium/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  { key: "monthly", label: "Monatlich", price: "4,99 €", sub: "pro Monat" },
  { key: "yearly", label: "Jährlich", price: "39,99 €", sub: "3,33 €/Monat · spare 33%", popular: true },
] as const;

function UpgradeButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Wird aktiviert…" : "Jetzt Premium werden ⭐"}
    </Button>
  );
}

function CancelButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "…" : "Premium kündigen"}
    </Button>
  );
}

export function PremiumPlans({
  isPremium,
  currentPlan,
}: {
  isPremium: boolean;
  currentPlan?: "monthly" | "yearly" | null;
}) {
  const [selected, setSelected] = useState<(typeof plans)[number]["key"]>("yearly");

  if (isPremium) {
    const planLabel = plans.find((p) => p.key === currentPlan)?.label;
    return (
      <div className="space-y-3 text-center">
        <p className="rounded-xl bg-success-pale px-4 py-3 text-sm font-semibold text-success">
          Du bist bereits Premium-Mitglied{planLabel ? ` (${planLabel})` : ""}. Danke, dass du
          DayliThings unterstützt! 🌼
        </p>
        <form action={cancelPremiumAction}>
          <CancelButton />
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {plans.map((plan) => (
          <button
            key={plan.key}
            type="button"
            onClick={() => setSelected(plan.key)}
            className={cn(
              "rounded-2xl border-2 p-4 text-center transition-colors",
              selected === plan.key
                ? "border-brand-500 bg-brand-50"
                : "border-gray-mid bg-white hover:border-brand-300"
            )}
          >
            {"popular" in plan && plan.popular && (
              <span className="mb-1.5 inline-block rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">
                BELIEBT
              </span>
            )}
            <p className="font-extrabold text-foreground">{plan.label}</p>
            <p className="mt-1 text-xl font-extrabold text-brand-600">{plan.price}</p>
            <p className="text-xs text-gray-text">{plan.sub}</p>
          </button>
        ))}
      </div>
      <form action={upgradeToPremiumAction}>
        <input type="hidden" name="plan" value={selected} />
        <UpgradeButton />
      </form>
      <p className="text-center text-xs text-gray-text">Jederzeit kündbar · Keine versteckten Kosten</p>
    </div>
  );
}
