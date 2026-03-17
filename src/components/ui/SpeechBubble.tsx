"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  text: string;
}

const MESSAGES: Message[] = [
  { text: "5 courses ready to explore" },
  { text: "AI tutor available 24/7" },
  { text: "Free forever - no credit card" },
  { text: "Learn practical skills fast" },
  { text: "Workers from 50+ countries" },
  { text: "Start in 30 seconds" },
  { text: "Communication & Leadership" },
  { text: "Real-world scenarios" },
  { text: "Instant AI feedback" },
  { text: "No boring lectures" },
  { text: "Build skills that matter" },
  { text: "Your journey starts here" },
];

interface SpeechBubbleProps {
  className?: string;
  interval?: number;
  onMessageChange?: (index: number) => void;
}

export function SpeechBubble({
  className = "",
  interval = 3000,
  onMessageChange,
}: SpeechBubbleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMessage = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % MESSAGES.length;
      onMessageChange?.(next);
      return next;
    });
  }, [onMessageChange]);

  useEffect(() => {
    const timer = setInterval(nextMessage, interval);
    return () => clearInterval(timer);
  }, [interval, nextMessage]);

  const currentMessage = MESSAGES[currentIndex];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-slate-700 font-semibold text-lg"
        >
          {currentMessage.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export type { SpeechBubbleProps };
