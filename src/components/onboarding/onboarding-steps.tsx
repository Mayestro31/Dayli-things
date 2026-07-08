import { cn } from "@/lib/utils";

export function OnboardingSteps({ step }: { step: 1 | 2 }) {
  const steps = ["Profil", "Präferenzen"];
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {steps.map((label, index) => {
        const active = index + 1 === step;
        const done = index + 1 < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                active && "bg-brand-500 text-white",
                done && "bg-brand-200 text-brand-800",
                !active && !done && "bg-brand-50 text-brand-400"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                active ? "text-brand-800" : "text-brand-400"
              )}
            >
              {label}
            </span>
            {index < steps.length - 1 && <div className="h-px w-6 bg-brand-200" />}
          </div>
        );
      })}
    </div>
  );
}
