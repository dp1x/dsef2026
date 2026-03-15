"use client";

import { cn } from "@/lib/utils";

export type MascotMood = "idle" | "excited" | "thinking" | "celebrating" | "waving";

interface MascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  mood?: MascotMood;
  className?: string;
  showBackground?: boolean;
}

const sizeStyles = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const eyeStyles: Record<MascotMood, React.ReactNode> = {
  idle: (
    <>
      <circle cx="10" cy="12" r="2" fill="currentColor" />
      <circle cx="22" cy="12" r="2" fill="currentColor" />
    </>
  ),
  excited: (
    <>
      <circle cx="10" cy="11" r="2.5" fill="currentColor" />
      <circle cx="22" cy="11" r="2.5" fill="currentColor" />
      <path d="M8 16 Q16 20 24 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  thinking: (
    <>
      <circle cx="9" cy="12" r="2" fill="currentColor" />
      <circle cx="21" cy="12" r="2" fill="currentColor" />
      <path d="M12 18 Q16 16 20 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  celebrating: (
    <>
      <path d="M7 11 L11 13 M9 9 L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 11 L25 13 M23 9 L25 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 17 Q16 22 22 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  waving: (
    <>
      <circle cx="10" cy="12" r="2" fill="currentColor" />
      <circle cx="22" cy="12" r="2" fill="currentColor" />
      <path d="M10 17 Q16 21 22 17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.5" fill="#fbbf24" opacity="0.8" />
      <circle cx="22" cy="14" r="0.5" fill="#fbbf24" opacity="0.8" />
    </>
  ),
};

const animationStyles: Record<MascotMood, string> = {
  idle: "animate-pulse-subtle",
  excited: "animate-bounce-subtle",
  thinking: "",
  celebrating: "animate-bounce-in",
  waving: "animate-float",
};

export function Mascot({ 
  size = "md", 
  mood = "idle", 
  className,
  showBackground = true 
}: MascotProps) {
  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeStyles[size],
        animationStyles[mood],
        className
      )}
    >
      {showBackground && (
        <div className="absolute inset-0 bg-primary-500 rounded-full opacity-20" />
      )}
      <svg
        viewBox="0 0 32 32"
        className={cn(
          "w-full h-full",
          showBackground ? "text-primary-600" : "text-primary-500"
        )}
      >
        {/* Lightbulb base shape */}
        <path
          d="M16 2 C10 2 5 7 5 13 C5 17 7 20 10 22 L10 26 C10 28 12 30 16 30 C20 30 22 28 22 26 L22 22 C25 20 27 17 27 13 C27 7 22 2 16 2 Z"
          fill="currentColor"
          className="opacity-90"
        />
        
        {/* Lightbulb screw base */}
        <rect x="12" y="26" width="8" height="2" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="13" y="28" width="6" height="2" rx="1" fill="currentColor" opacity="0.5" />
        
        {/* Inner glow */}
        <ellipse cx="16" cy="11" rx="6" ry="5" fill="#fef3c7" opacity="0.6" />
        
        {/* Eyes and expression based on mood */}
        <g className="text-white">
          {eyeStyles[mood]}
        </g>
        
        {/* Sparkle for celebrating */}
        {mood === "celebrating" && (
          <>
            <path d="M4 8 L6 6 L8 8 L6 10 Z" fill="#fbbf24" />
            <path d="M24 8 L26 6 L28 8 L26 10 Z" fill="#fbbf24" />
            <path d="M14 0 L16 -2 L18 0 L16 2 Z" fill="#fbbf24" />
          </>
        )}
      </svg>
    </div>
  );
}

export function MascotInline({ 
  mood = "idle",
  className 
}: { 
  mood?: MascotMood;
  className?: string;
}) {
  return (
    <span className={cn("inline-block", className)}>
      <Mascot size="sm" mood={mood} showBackground={false} />
    </span>
  );
}

export default Mascot;
