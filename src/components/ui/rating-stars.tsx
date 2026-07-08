import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={cn(
              starSize,
              n <= Math.round(value) ? "fill-honey text-honey" : "fill-brand-100 text-brand-200"
            )}
          />
        ))}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-brand-500">
          {count > 0 ? `${value.toFixed(1)} (${count})` : "Noch keine Bewertungen"}
        </span>
      )}
    </div>
  );
}
