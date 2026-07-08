import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "brand" | "honey" | "outline" | "neutral";

const variantClasses: Record<Variant, string> = {
  brand: "bg-brand-500 text-white",
  honey: "bg-honey text-brand-900",
  outline: "border border-brand-300 text-brand-700",
  neutral: "bg-brand-50 text-brand-700",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
