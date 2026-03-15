import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, size = "md", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const sizes = {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    };

    return (
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizes[size])} {...props}>
        <div
          ref={ref}
          className={cn("h-full bg-emerald-500 rounded-full transition-all duration-300", className)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };