"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Mascot } from "@/components/ui/Mascot";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import type { MascotMood } from "@/components/ui/Mascot";

const MOODS: MascotMood[] = ["waving", "excited", "celebrating", "thinking", "idle"];

export function HeroMascot() {
  const [mascotMood, setMascotMood] = useState<MascotMood>("waving");
  const [messageCount, setMessageCount] = useState(0);
  const [mascotX, setMascotX] = useState(0);
  const [mascotY, setMascotY] = useState(0);
  const [bubbleSide, setBubbleSide] = useState<"left" | "right">("left");

  const handleMessageChange = useCallback((newIndex: number) => {
    setMessageCount((prev) => {
      const next = prev + 1;
      
      // Change expression
      const newMood = MOODS[next % MOODS.length];
      setMascotMood(newMood);
      
      // Move mascot to random position every 2-4 messages
      if (next % 3 === 0) {
        setMascotX(Math.floor((Math.random() - 0.5) * 120));
        setMascotY(Math.floor((Math.random() - 0.5) * 60));
        
        // Switch bubble side occasionally
        if (Math.random() > 0.5) {
          setBubbleSide((s) => s === "left" ? "right" : "left");
        }
      }
      
      return next;
    });
  }, []);

  return (
    <div className="relative hidden lg:flex items-center justify-center min-h-[400px] w-full">
      <div className="relative w-full max-w-xl h-[400px]">
        {/* Message text - positioned relative to mascot */}
        <motion.div
          className="absolute z-20"
          style={{
            left: bubbleSide === "left" ? "10%" : "60%",
            top: "20%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SpeechBubble 
            interval={3000} 
            onMessageChange={handleMessageChange}
          />
        </motion.div>

        {/* Mascot - moves around freely */}
        <motion.div
          className="absolute z-10"
          style={{ left: "50%", top: "50%" }}
          animate={{
            x: mascotX,
            y: mascotY,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Glow */}
            <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-3xl scale-150" />
            
            {/* Mascot - 2xl size (160px) */}
            <Mascot size="2xl" mood={mascotMood} className="drop-shadow-2xl relative" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
