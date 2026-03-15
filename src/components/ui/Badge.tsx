import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-700",
      primary: "bg-emerald-100 text-emerald-700",
      secondary: "bg-blue-100 text-blue-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };